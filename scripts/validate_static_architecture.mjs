import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const architectureDir = path.resolve(scriptDir, "../main architecture");

const requiredRoutes = [
  "",
  "services",
  "ads-managment",
  "ai-powered-conversations",
  "chatzen",
  "localzen",
  "local-seo-services",
  "digital-marketing-services-in-dubai",
  "seo-for-dubai-businesses",
  "human-like-ai-calling-bots",
  "geo-tagging-images-for-seo",
  "ai-video-creation-service",
  "contact-us",
  "about-us",
  "faqs",
  "seo-and-ads-management-for-restaurants",
  "llm-package",
  "prompts",
  "authors-team",
  "editorial-guidelines",
  "privacy-policy",
  "terms-of-services",
  "blog",
  "llm-indexing-package-cp",
  "thankyou-for-the-subscription",
];

const excludedRoutes = [
  "prompt-database",
  "future-growth-lab",
  "workshop",
  "salesbot",
];

const htmlFiles = walk(architectureDir).filter(
  (file) => path.basename(file) === "index.html",
);
const errors = [];
const warnings = [];
const indexableTitles = new Map();
const indexableCanonicals = new Map();
const internalInlinks = new Map();

for (const route of requiredRoutes) {
  const file = path.join(architectureDir, route, "index.html");
  if (!fs.existsSync(file)) errors.push(`Missing required route: /${route}`);
}

for (const route of excludedRoutes) {
  const target = path.join(architectureDir, route);
  if (fs.existsSync(target)) errors.push(`Excluded route still exists: /${route}/`);
}

for (const requiredFile of [
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "_redirects",
  "_headers",
  "ads.txt",
  "assets/consent-tags.js",
  "assets/og/media87-social-card.jpg",
]) {
  if (!fs.existsSync(path.join(architectureDir, requiredFile))) {
    errors.push(`Missing technical SEO file: ${requiredFile}`);
  }
}

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const route = routeFor(file);
  for (const [label, pattern] of [
    ["title", /<title>[^<]+<\/title>/i],
    ["description", /<meta\s+name="description"\s+content="[^"]+"/i],
    ["canonical", /<link\s+rel="canonical"\s+href="[^"]+"/i],
    ["robots", /<meta\s+name="robots"\s+content="[^"]+"/i],
    ["H1", /<h1\b/i],
    ["header", /<header\s+id="header"/i],
    ["footer", /<footer>/i],
    ["Open Graph title", /<meta\s+property="og:title"\s+content="[^"]+"/i],
    ["Open Graph description", /<meta\s+property="og:description"\s+content="[^"]+"/i],
    ["Open Graph URL", /<meta\s+property="og:url"\s+content="[^"]+"/i],
    ["Open Graph image", /<meta\s+property="og:image"\s+content="[^"]+"/i],
    ["Twitter card", /<meta\s+name="twitter:card"\s+content="summary_large_image"/i],
    ["JSON-LD", /<script\s+type="application\/ld\+json">/i],
    ["consent-aware tag loader", /<script\s+src="\/assets\/consent-tags\.js\?v=[^"]+"\s+defer><\/script>/i],
    ["cookie settings control", /data-cookie-settings/i],
  ]) {
    if (!pattern.test(html)) errors.push(`${route}: missing ${label}`);
  }

  const title = valueFor(html, /<title>([\s\S]*?)<\/title>/i);
  const canonical = valueFor(
    html,
    /<link\s+rel="canonical"\s+href="([^"]+)"/i,
  );
  const robots = valueFor(
    html,
    /<meta\s+name="robots"\s+content="([^"]+)"/i,
  );
  const ogUrl = valueFor(
    html,
    /<meta\s+property="og:url"\s+content="([^"]+)"/i,
  );
  if (!canonical.startsWith("https://media87.com/")) {
    errors.push(`${route}: canonical is not on the secure Media87 host`);
  }
  if (ogUrl !== canonical) errors.push(`${route}: Open Graph URL differs from canonical`);

  for (const match of html.matchAll(
    /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi,
  )) {
    try {
      const parsed = JSON.parse(match[1]);
      if (parsed["@context"] !== "https://schema.org") {
        errors.push(`${route}: JSON-LD has an unexpected context`);
      }
    } catch {
      errors.push(`${route}: JSON-LD is not valid JSON`);
    }
  }

  if (!/\bnoindex\b/i.test(robots)) {
    const expectedCanonical =
      route === "/"
        ? "https://media87.com/"
        : `https://media87.com${route}`;
    if (canonical !== expectedCanonical) {
      errors.push(`${route}: indexable page is not self-canonical`);
    }
    if (indexableTitles.has(title)) {
      errors.push(
        `${route}: duplicates the title used by ${indexableTitles.get(title)}`,
      );
    } else {
      indexableTitles.set(title, route);
    }
    if (indexableCanonicals.has(canonical)) {
      errors.push(
        `${route}: duplicates the canonical used by ${indexableCanonicals.get(canonical)}`,
      );
    } else {
      indexableCanonicals.set(canonical, route);
    }
  }

  const references = [
    ...html.matchAll(/\b(?:href|src)="([^"]+)"/gi),
  ].map((match) => match[1]);

  for (const reference of references) {
    if (
      !reference ||
      reference.startsWith("#") ||
      /^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(reference) ||
      reference.includes("${")
    ) {
      continue;
    }
    const target = resolveReference(file, reference);
    if (!target || !fs.existsSync(target)) {
      errors.push(`${route}: broken local reference ${reference}`);
    }
    if (reference.startsWith("/")) {
      const cleanReference = reference.split(/[?#]/)[0];
      if (cleanReference.endsWith("/") || cleanReference === "/") {
        internalInlinks.set(
          cleanReference,
          (internalInlinks.get(cleanReference) || 0) + 1,
        );
      }
    }
  }

  if (
    !/<meta\s+name="robots"\s+content="noindex,follow"/i.test(html) &&
    /\b(?:lorem ipsum|TODO|TBD|\[your number\])\b/i.test(html)
  ) {
    warnings.push(`${route}: visible placeholder-like copy`);
  }

  if (
    !/<meta\s+name="robots"\s+content="noindex,follow"/i.test(html) &&
    /(?:5\.0 client|1\.5M followers|combined following of 1\.5 million|ROAS 4\.8|270% conversion|100\+ campaigns|100\+ local businesses|100\+ successful|position 1|4\.9★|trusted by thousands|join thousands|\$49|\$249|Sarah M\.|Ahmed K\.)/i.test(
      html,
    )
  ) {
    errors.push(`${route}: contains an unsupported placeholder claim`);
  }
}

const articleDrafts = htmlFiles.filter((file) => {
  const html = fs.readFileSync(file, "utf8");
  return /Migration draft · noindex/.test(html);
});
if (articleDrafts.length !== 25) {
  errors.push(`Expected 25 noindex article drafts; found ${articleDrafts.length}`);
}

const sitemapPath = path.join(architectureDir, "sitemap.xml");
if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, "utf8");
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => match[1],
  );
  const expectedUrls = [...indexableCanonicals.keys()].sort();
  if (JSON.stringify([...sitemapUrls].sort()) !== JSON.stringify(expectedUrls)) {
    errors.push("sitemap.xml does not exactly match the indexable canonical set");
  }
  for (const url of sitemapUrls) {
    const pathname = new URL(url).pathname;
    if (!internalInlinks.get(pathname)) {
      errors.push(`${pathname}: sitemap URL has no crawlable internal link`);
    }
  }
}

const robotsPath = path.join(architectureDir, "robots.txt");
if (fs.existsSync(robotsPath)) {
  const robots = fs.readFileSync(robotsPath, "utf8");
  if (!/User-agent:\s*OAI-SearchBot[\s\S]*?Allow:\s*\//i.test(robots)) {
    errors.push("robots.txt does not explicitly allow OAI-SearchBot");
  }
  if (!/Sitemap:\s*https:\/\/media87\.com\/sitemap\.xml/i.test(robots)) {
    errors.push("robots.txt does not declare the canonical sitemap");
  }
}

const adsPath = path.join(architectureDir, "ads.txt");
if (
  fs.existsSync(adsPath) &&
  !/^google\.com,\s*pub-6396157876082473,\s*DIRECT,\s*f08c47fec0942fa0200\s*$/m.test(
    fs.readFileSync(adsPath, "utf8"),
  )
) {
  errors.push("ads.txt does not contain the approved Media87 publisher record");
}

const consentTagsPath = path.join(
  architectureDir,
  "assets/consent-tags.js",
);
if (fs.existsSync(consentTagsPath)) {
  const consentTags = fs.readFileSync(consentTagsPath, "utf8");
  for (const identifier of [
    "GT-KVFLZP7K",
    "942291175461032",
    "ca-pub-6396157876082473",
  ]) {
    if (!consentTags.includes(identifier)) {
      errors.push(`Consent-aware tag loader is missing ${identifier}`);
    }
  }
  if (!/data-consent-choice/.test(consentTags)) {
    errors.push("Consent-aware tag loader is missing visitor choices");
  }
}

const notFoundPath = path.join(architectureDir, "404.html");
if (
  fs.existsSync(notFoundPath) &&
  !/<meta\s+name="robots"\s+content="noindex,follow"/i.test(
    fs.readFileSync(notFoundPath, "utf8"),
  )
) {
  errors.push("404.html is not marked noindex");
}

const stylePath = path.join(architectureDir, "assets/style.css");
if (
  !/\.content-page main\{overflow:visible\}/.test(
    fs.readFileSync(stylePath, "utf8"),
  )
) {
  errors.push("Article/content page vertical overflow is not explicitly visible");
}

console.log(
  JSON.stringify(
    {
      status: errors.length ? "failed" : "passed",
      htmlFiles: htmlFiles.length,
      requiredRoutes: requiredRoutes.length,
      indexableRoutes: indexableCanonicals.size,
      articleDrafts: articleDrafts.length,
      excludedRoutesAbsent: excludedRoutes.length,
      errors,
      warnings,
    },
    null,
    2,
  ),
);

if (errors.length) process.exitCode = 1;

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const target = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(target));
    else files.push(target);
  }
  return files;
}

function routeFor(file) {
  const relative = path.relative(architectureDir, path.dirname(file));
  return relative ? `/${relative}/` : "/";
}

function valueFor(html, pattern) {
  return html.match(pattern)?.[1] || "";
}

function resolveReference(file, reference) {
  const clean = decodeURIComponent(reference.split(/[?#]/)[0]);
  let target = clean.startsWith("/")
    ? path.join(architectureDir, clean)
    : path.resolve(path.dirname(file), clean);
  if (!target.startsWith(architectureDir)) return null;
  if (clean.endsWith("/") || (!path.extname(target) && !fs.existsSync(target))) {
    target = path.join(target, "index.html");
  } else if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
    target = path.join(target, "index.html");
  }
  return target;
}
