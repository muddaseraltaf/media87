import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const architectureDir = path.resolve(scriptDir, "../main architecture");

const requiredRoutes = [
  "",
  "services",
  "ads-management",
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
  "llms.txt",
  "llms-full.txt",
  "_redirects",
  "_headers",
  "ads.txt",
  "assets/site-tags.js",
  "assets/chatbot-loader.js",
  "assets/localzen.css",
  "assets/og/media87-social-card.jpg",
]) {
  if (!fs.existsSync(path.join(architectureDir, requiredFile))) {
    errors.push(`Missing technical SEO file: ${requiredFile}`);
  }
}

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const route = routeFor(file);
  const visibleText = html
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:nbsp|amp|quot|#39);/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  for (const [label, pattern] of [
    ["title", /<title>[^<]+<\/title>/i],
    ["description", /<meta\s+name="description"\s+content="[^"]+"/i],
    ["canonical", /<link\s+rel="canonical"\s+href="[^"]+"/i],
    ["robots", /<meta\s+name="robots"\s+content="[^"]+"/i],
    ["H1", /<h1\b/i],
    ["main landmark", /<main(?:\s|>)/i],
    ["header", /<header\s+id="header"/i],
    ["footer", /<footer>/i],
    ["Open Graph title", /<meta\s+property="og:title"\s+content="[^"]+"/i],
    ["Open Graph description", /<meta\s+property="og:description"\s+content="[^"]+"/i],
    ["Open Graph URL", /<meta\s+property="og:url"\s+content="[^"]+"/i],
    ["Open Graph image", /<meta\s+property="og:image"\s+content="[^"]+"/i],
    ["Twitter card", /<meta\s+name="twitter:card"\s+content="summary_large_image"/i],
    ["JSON-LD", /<script\s+type="application\/ld\+json">/i],
    ["site tag loader", /<script\s+src="\/assets\/site-tags\.js\?v=[^"]+"\s+defer><\/script>/i],
    ["chatbot loader", /<script\s+src="\/assets\/chatbot-loader\.js\?v=[^"]+"\s+defer><\/script>/i],
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

  const schemaNodes = [];
  for (const match of html.matchAll(
    /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/gi,
  )) {
    try {
      const parsed = JSON.parse(match[1]);
      if (parsed["@context"] !== "https://schema.org") {
        errors.push(`${route}: JSON-LD has an unexpected context`);
      }
      schemaNodes.push(
        ...(Array.isArray(parsed["@graph"]) ? parsed["@graph"] : [parsed]),
      );
    } catch {
      errors.push(`${route}: JSON-LD is not valid JSON`);
    }
  }

  for (const [label, type] of [
    ["Organization entity", "Organization"],
    ["WebSite entity", "WebSite"],
  ]) {
    if (!schemaNodes.some((node) => schemaTypeIncludes(node, type))) {
      errors.push(`${route}: missing ${label}`);
    }
  }
  if (!schemaNodes.some((node) => /#webpage$/.test(node?.["@id"] || ""))) {
    errors.push(`${route}: missing linked page entity`);
  }
  const pageEntity = schemaNodes.find((node) =>
    /#webpage$/.test(node?.["@id"] || ""),
  );
  if (decodeEntities(pageEntity?.name || "") !== decodeEntities(title)) {
    errors.push(`${route}: page entity name differs from the HTML title`);
  }
  const metaDescription = valueFor(
    html,
    /<meta\s+name="description"\s+content="([^"]+)"/i,
  );
  if (
    decodeEntities(pageEntity?.description || "") !==
    decodeEntities(metaDescription)
  ) {
    errors.push(`${route}: page entity description differs from the meta description`);
  }
  const organizationNode = schemaNodes.find((node) =>
    schemaTypeIncludes(node, "Organization"),
  );
  if (
    organizationNode?.location?.hasMap !==
    "https://maps.app.goo.gl/MnLoZ7Vj2iKCbeFWA"
  ) {
    errors.push(`${route}: Organization location is missing the Google Business Profile`);
  }

  const visibleFaqCount =
    (html.match(/class="[^"]*faq-item[^"]*"/gi) || []).length ||
    (route === "/faqs/"
      ? (html.match(/class="[^"]*content-block[^"]*"/gi) || []).length
      : 0);
  const faqNode = schemaNodes.find((node) =>
    schemaTypeIncludes(node, "FAQPage"),
  );
  if (visibleFaqCount && !faqNode) {
    errors.push(`${route}: visible FAQs are missing FAQPage schema`);
  } else if (
    visibleFaqCount &&
    (!Array.isArray(faqNode.mainEntity) ||
      faqNode.mainEntity.length !== visibleFaqCount)
  ) {
    errors.push(`${route}: FAQPage schema does not match the visible FAQ count`);
  }

  if (
    route === "/authors-team/" &&
    !schemaNodes.some(
      (node) =>
        schemaTypeIncludes(node, "Person") &&
        node["@id"] ===
          "https://media87.com/authors-team/#muddaser-altaf",
    )
  ) {
    errors.push("/authors-team/: missing the linked founder Person entity");
  }
  if (
    route === "/services/" &&
    !schemaNodes.some((node) => schemaTypeIncludes(node, "ItemList"))
  ) {
    errors.push("/services/: missing the visible service ItemList entity");
  }
  if (
    route === "/seo-for-dubai-businesses/" &&
    !schemaNodes.some((node) => schemaTypeIncludes(node, "Article"))
  ) {
    errors.push("/seo-for-dubai-businesses/: missing Article schema");
  }
  for (const article of schemaNodes.filter((node) =>
    schemaTypeIncludes(node, "Article"),
  )) {
    if (article.publisher?.["@id"] !== "https://media87.com/#organization") {
      errors.push(`${route}: Article publisher is not linked to Media87`);
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
    /(?:lorem ipsum|\bTODO\b|\bTBD\b|\[your number\]|the headline is alive|hosted form endpoint will be connected|migration draft|placeholder date|architecture-stage answers|redirect pending|proposed index|AI-Powered IMAP Email Auto-Resp…)/i.test(
      html,
    )
  ) {
    errors.push(`${route}: contains public placeholder or internal build copy`);
  }

  if (
    /\b(?:PRD|SVC|SYS|LOG|FAQ)\.[A-Z0-9_-]{2,}\b/i.test(visibleText) ||
    /class="[^"]*\b(?:idx|q-idx)\b[^"]*"[^>]*>\s*(?:\/|Q\.)0*\d+/i.test(html)
  ) {
    errors.push(`${route}: contains a visible internal interface code`);
  }

  if (
    /\.(?:eneric|ofessional|tomer|oogle)\b/i.test(
      visibleText,
    )
  ) {
    errors.push(`${route}: contains malformed public copy`);
  }

  if (/(?:href|action)="#"/i.test(html)) {
    errors.push(`${route}: contains a non-functional placeholder control`);
  }

  for (const match of html.matchAll(
    /<(a|button)\b([^>]*)>([\s\S]*?)<\/\1>/gi,
  )) {
    const attributes = match[2];
    const content = match[3];
    const accessibleText = [
      valueFor(attributes, /\baria-label="([^"]+)"/i),
      valueFor(content, /\balt="([^"]+)"/i),
      content.replace(/<[^>]+>/g, " ").replace(/&[a-z0-9#]+;/gi, " "),
    ]
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    if (!accessibleText) {
      errors.push(`${route}: contains an empty ${match[1].toLowerCase()} control`);
    }
  }

  if (
    !/<meta\s+name="robots"\s+content="noindex,follow"/i.test(html) &&
    route !== "/localzen/" &&
    /(?:5\.0 client|1\.5M followers|combined following of 1\.5 million|ROAS 4\.8|270% conversion|100\+ campaigns|100\+ local businesses|100\+ successful|position 1|4\.9★|trusted by thousands|join thousands|\$49|\$249|Sarah M\.|Ahmed K\.)/i.test(
      html,
    )
  ) {
    errors.push(`${route}: contains an unsupported placeholder claim`);
  }
}

const articleDrafts = htmlFiles.filter((file) => {
  const html = fs.readFileSync(file, "utf8");
  return (
    /<body class="content-page article-page"/.test(html) &&
    /<meta\s+name="robots"\s+content="noindex,follow"/i.test(html)
  );
});
if (articleDrafts.length !== 19) {
  errors.push(`Expected 19 noindex article drafts; found ${articleDrafts.length}`);
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

for (const llmsFile of ["llms.txt", "llms-full.txt"]) {
  const llmsPath = path.join(architectureDir, llmsFile);
  if (!fs.existsSync(llmsPath)) continue;
  const llms = fs.readFileSync(llmsPath, "utf8");
  if (!/^#\s+Media87/im.test(llms)) {
    errors.push(`${llmsFile} does not identify Media87`);
  }
  if (!llms.includes("https://media87.com/")) {
    errors.push(`${llmsFile} does not link to the canonical site`);
  }
  if (llms.includes("/ads-managment/")) {
    errors.push(`${llmsFile} contains the retired ads URL`);
  }
}

const redirectsPath = path.join(architectureDir, "_redirects");
if (fs.existsSync(redirectsPath)) {
  const redirects = fs.readFileSync(redirectsPath, "utf8");
  if (!/^\/ads-managment\/?\s+\/ads-management\/\s+301$/m.test(redirects)) {
    errors.push("_redirects does not permanently redirect the retired ads URL");
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

const siteTagsPath = path.join(
  architectureDir,
  "assets/site-tags.js",
);
if (fs.existsSync(siteTagsPath)) {
  const siteTags = fs.readFileSync(siteTagsPath, "utf8");
  for (const identifier of [
    "GT-KVFLZP7K",
    "942291175461032",
    "ca-pub-6396157876082473",
  ]) {
    if (!siteTags.includes(identifier)) {
      errors.push(`Site tag loader is missing ${identifier}`);
    }
  }
  if (/data-consent-choice|data-cookie-settings|consent-panel/.test(siteTags)) {
    errors.push("Site tag loader still contains the removed consent popup");
  }
}

const chatbotLoaderPath = path.join(
  architectureDir,
  "assets/chatbot-loader.js",
);
if (fs.existsSync(chatbotLoaderPath)) {
  const chatbotLoader = fs.readFileSync(chatbotLoaderPath, "utf8");
  for (const identifier of [
    "bfa81d9bba3647f9907117b422fca4cf",
    "https://chat.media87.com",
    "embed.min.js",
  ]) {
    if (!chatbotLoader.includes(identifier)) {
      errors.push(`Chatbot loader is missing ${identifier}`);
    }
  }
  if (!/requestIdleCallback/.test(chatbotLoader)) {
    errors.push("Chatbot loader is not deferred until the browser is idle");
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
if (fs.existsSync(stylePath)) {
  const styles = fs.readFileSync(stylePath, "utf8");
  for (const fontFile of [
    "inter-latin.woff2",
    "sora-latin.woff2",
    "space-mono-regular-latin.woff2",
    "space-mono-bold-latin.woff2",
  ]) {
    if (!styles.includes(`/assets/fonts/${fontFile}`)) {
      errors.push(`Self-hosted font is missing from the stylesheet: ${fontFile}`);
    }
  }
  if (!/\.content-page main\{overflow:visible\}/.test(styles)) {
    errors.push("Article/content page vertical overflow is not explicitly visible");
  }
  if (
    !/@media\(max-width:640px\)\{[\s\S]*?\.foot-grid\{grid-template-columns:1fr;/.test(
      styles,
    )
  ) {
    errors.push("Footer does not collapse to one column on mobile");
  }
  if (
    !/\.faq-q\{[\s\S]*?grid-template-columns:32px minmax\(0,1fr\) 32px;/.test(
      styles,
    )
  ) {
    errors.push("FAQ questions do not use a centered responsive layout");
  }
  if (
    !/#header\{[\s\S]*?position:fixed/.test(styles) ||
    /(?:^|\})\s*header\{[\s\S]*?position:fixed/m.test(styles)
  ) {
    errors.push("Fixed navigation styles are not scoped to the site header ID");
  }
}

const headersPath = path.join(architectureDir, "_headers");
if (fs.existsSync(headersPath)) {
  const headers = fs.readFileSync(headersPath, "utf8");
  if (
    !/\/assets\/\*[\s\S]*?Cache-Control:\s*public,\s*max-age=31536000,\s*immutable/i.test(
      headers,
    )
  ) {
    errors.push("Static assets do not have a long-lived immutable cache policy");
  }
}

const mainScriptPath = path.join(architectureDir, "assets/main.js");
if (fs.existsSync(mainScriptPath)) {
  const mainScript = fs.readFileSync(mainScriptPath, "utf8");
  if (
    !/stripe-buy-button/.test(mainScript) ||
    !/https:\/\/js\.stripe\.com\/v3\/buy-button\.js/.test(mainScript)
  ) {
    errors.push("LocalZen Stripe checkout loader is missing");
  }
}

const contactPath = path.join(architectureDir, "contact-us/index.html");
if (fs.existsSync(contactPath)) {
  const contactHtml = fs.readFileSync(contactPath, "utf8");
  for (const [label, pattern] of [
    ["Tally form", /tally\.so\/embed\/aQXBzB/i],
    ["dynamic form height", /dynamicHeight=1/i],
    ["transparent form background", /transparentBackground=1/i],
    ["descriptive iframe title", /<iframe[\s\S]*?title="Contact Media87"/i],
    ["Tally embed loader", /tally\.so\/widgets\/embed\.js/i],
    ["privacy link", /href="\/privacy-policy\/"/i],
    ["email fallback", /href="mailto:hello@media87\.com"/i],
    ["Google Business Profile link", /maps\.app\.goo\.gl\/MnLoZ7Vj2iKCbeFWA/i],
  ]) {
    if (!pattern.test(contactHtml)) errors.push(`/contact-us/: missing ${label}`);
  }
}

const localzenPath = path.join(architectureDir, "localzen/index.html");
if (fs.existsSync(localzenPath)) {
  const localzenHtml = fs.readFileSync(localzenPath, "utf8");
  for (const [label, pattern] of [
    ["page-specific stylesheet", /href="\/assets\/localzen\.css\?v=[^"]+"/i],
    ["LocalZen interaction bundle", /src="\/assets\/main\.js\?v=20260728-localzen3"/i],
    ["product tour", /player\.vimeo\.com\/video\/1135612271/i],
    ["Tally demo form", /tally\.so\/embed\/aQXBzB/i],
    ["Tally demo title", /<iframe[\s\S]*?title="Book a LocalZen demo"/i],
    ["Tally embed loader", /tally\.so\/widgets\/embed\.js/i],
    ["demo privacy link", /href="\/privacy-policy\/"/i],
    ["honest-feedback safeguard", /not review gating/i],
    ["AI visibility limitation", /does not guarantee a position/i],
    ["Stripe purchase component", /buy-button-id="buy_btn_1T4aZbAMjPY69v29hGKZOOZK"/i],
    ["verified monthly prices", /\$49[\s\S]*?\$249/i],
    ["post-purchase access guidance", /login and onboarding details are sent to the email used at checkout/i],
    ["LocalZen software schema", /"@type":\s*"SoftwareApplication"[\s\S]*?"name":\s*"LocalZen"/i],
  ]) {
    if (!pattern.test(localzenHtml)) errors.push(`/localzen/: missing ${label}`);
  }
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

function decodeEntities(value = "") {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&apos;", "'")
    .replaceAll("&nbsp;", " ")
    .replace(/&#(\d+);/g, (_, number) =>
      String.fromCodePoint(Number(number)),
    )
    .replace(/&#x([0-9a-f]+);/gi, (_, number) =>
      String.fromCodePoint(Number.parseInt(number, 16)),
    );
}

function schemaTypeIncludes(node, expectedType) {
  const types = Array.isArray(node?.["@type"])
    ? node["@type"]
    : [node?.["@type"]];
  return types.includes(expectedType);
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
