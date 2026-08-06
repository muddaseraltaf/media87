import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(scriptDir, "..");
const architectureDir = path.join(projectDir, "main architecture");
const siteUrl = "https://media87.com";
const organizationId = `${siteUrl}/#organization`;
const websiteId = `${siteUrl}/#website`;
const founderId = `${siteUrl}/authors-team/#muddaser-altaf`;
const googleBusinessProfileUrl =
  "https://maps.app.goo.gl/MnLoZ7Vj2iKCbeFWA";

const serviceItems = [
  ["Local SEO", "/local-seo-services/"],
  ["Ads Management", "/ads-management/"],
  ["AI Conversations", "/ai-powered-conversations/"],
  ["AI Video Creation", "/ai-video-creation-service/"],
  ["ChatZen", "/chatzen/"],
  ["LocalZen", "/localzen/"],
  ["Restaurant SEO & Ads", "/seo-and-ads-management-for-restaurants/"],
  ["AI & LLM Visibility", "/llm-package/"],
];

const dubaiServiceRoutes = new Set([
  "digital-marketing-services-in-dubai",
  "local-seo-services",
]);

function walk(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...walk(target));
    else if (entry.name === "index.html") files.push(target);
  }
  return files;
}

function decodeHtml(value = "") {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&apos;", "'")
    .replaceAll("&nbsp;", " ")
    .replaceAll("&ndash;", "–")
    .replaceAll("&mdash;", "—")
    .replaceAll("&hellip;", "…")
    .replace(/&#(\d+);/g, (_, value) => String.fromCodePoint(Number(value)))
    .replace(/&#x([0-9a-f]+);/gi, (_, value) =>
      String.fromCodePoint(Number.parseInt(value, 16)),
    );
}

function stripHtml(value = "") {
  return decodeHtml(
    value
      .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .replace(/\s+([,.;:!?])/g, "$1")
      .trim(),
  );
}

function routeFor(file) {
  return path.relative(architectureDir, path.dirname(file)).split(path.sep).join("/");
}

function typeIncludes(node, type) {
  const nodeTypes = Array.isArray(node?.["@type"])
    ? node["@type"]
    : [node?.["@type"]];
  return nodeTypes.includes(type);
}

function extractFaqs(html, route) {
  const entries = [];
  for (const match of html.matchAll(
    /<div\s+class="[^"]*faq-item[^"]*">[\s\S]*?<button\b[^>]*class="[^"]*faq-q[^"]*"[^>]*>([\s\S]*?)<\/button>[\s\S]*?<div\b[^>]*class="[^"]*faq-a[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/gi,
  )) {
    const button = match[1];
    const answer = match[2];
    const spans = [...button.matchAll(/<span\b[^>]*>([\s\S]*?)<\/span>/gi)]
      .map((span) => stripHtml(span[1]))
      .filter(Boolean);
    const question = spans.length > 1 ? spans[1] : stripHtml(button);
    const answerText = stripHtml(answer);
    if (question && answerText) entries.push([question, answerText]);
  }
  if (!entries.length && route === "faqs") {
    for (const match of html.matchAll(
      /<section\s+class="[^"]*content-block[^"]*"[^>]*>[\s\S]*?<h2[^>]*>([\s\S]*?)<\/h2>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>[\s\S]*?<\/section>/gi,
    )) {
      const question = stripHtml(match[1]);
      const answer = stripHtml(match[2]);
      if (question && answer) entries.push([question, answer]);
    }
  }
  return entries;
}

function organizationNode() {
  return {
    "@type": "Organization",
    "@id": organizationId,
    name: "Media87",
    url: `${siteUrl}/`,
    description:
      "Dubai-based digital marketing agency providing SEO, paid advertising, content creation and practical AI automation.",
    logo: {
      "@type": "ImageObject",
      "@id": `${siteUrl}/#logo`,
      url: `${siteUrl}/assets/logo-color-405.webp`,
      contentUrl: `${siteUrl}/assets/logo-color-405.webp`,
      width: 405,
      height: 80,
    },
    email: "hello@media87.com",
    telephone: "+971503321743",
    founder: { "@id": founderId },
    location: {
      "@type": "Place",
      name: "Dubai, United Arab Emirates",
      hasMap: googleBusinessProfileUrl,
    },
    sameAs: [
      "https://facebook.com/media87hq",
      "https://www.instagram.com/media87hq/",
      "https://www.youtube.com/@media87hq",
    ],
  };
}

function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: `${siteUrl}/`,
    name: "Media87",
    inLanguage: "en",
    publisher: { "@id": organizationId },
  };
}

function founderNode() {
  return {
    "@type": "Person",
    "@id": founderId,
    name: "Muddaser Altaf",
    jobTitle: "Founder",
    url: `${siteUrl}/authors-team/#muddaser-altaf`,
    image: `${siteUrl}/assets/img/site/articles/top-digital-marketers/muddaser-altaf-hd.jpg`,
    worksFor: { "@id": organizationId },
    sameAs: ["https://muddaser.com"],
  };
}

function enhanceGraph(graph, route, html) {
  const pageTitle = decodeHtml(
    html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || "Media87",
  );
  const pageDescription = decodeHtml(
    html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1] || "",
  );
  const pageHeading = stripHtml(
    html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || pageTitle,
  );
  const pageImage =
    html.match(/<meta\s+property="og:image"\s+content="([^"]*)"/i)?.[1] || "";
  const filtered = graph.filter(
    (node) =>
      !typeIncludes(node, "Organization") &&
      !typeIncludes(node, "WebSite") &&
      !typeIncludes(node, "FAQPage") &&
      !(route === "authors-team" && typeIncludes(node, "Person")) &&
      !(route === "services" && typeIncludes(node, "ItemList")),
  );
  const enhanced = [organizationNode(), websiteNode()];
  if (route === "authors-team") enhanced.push(founderNode());

  for (const node of filtered) {
    if (
      typeIncludes(node, "WebPage") ||
      /#webpage$/.test(node?.["@id"] || "")
    ) {
      node.name = pageTitle;
      node.description = pageDescription;
      node.isPartOf = { "@id": websiteId };
      if (pageImage) {
        node.primaryImageOfPage = {
          "@type": "ImageObject",
          url: pageImage,
        };
      }
      if (route === "about-us") node.about = { "@id": organizationId };
      if (route === "contact-us") {
        node.about = { "@id": organizationId };
        node.mainEntity = { "@id": organizationId };
      }
      if (route === "authors-team") node.mainEntity = { "@id": founderId };
    }
    if (typeIncludes(node, "Service")) {
      node.name = pageHeading;
      node.description = pageDescription;
      node.provider = { "@id": organizationId };
      if (dubaiServiceRoutes.has(route)) {
        node.areaServed = { "@type": "City", name: "Dubai" };
      }
    }
    if (
      typeIncludes(node, "SoftwareApplication") ||
      typeIncludes(node, "WebApplication")
    ) {
      node.publisher = { "@id": organizationId };
    }
    if (typeIncludes(node, "Article")) {
      node.publisher = { "@id": organizationId };
      if (typeIncludes(node.author, "Organization")) {
        node.author = { "@id": organizationId };
      }
    }
    if (typeIncludes(node, "BreadcrumbList")) {
      const items = Array.isArray(node.itemListElement)
        ? node.itemListElement
        : [];
      if (items.length) items[items.length - 1].name = pageHeading;
    }
    enhanced.push(node);
  }

  if (route === "services") {
    enhanced.push({
      "@type": "ItemList",
      "@id": `${siteUrl}/services/#service-list`,
      name: "Media87 services and products",
      itemListElement: serviceItems.map(([name, url], index) => ({
        "@type": "ListItem",
        position: index + 1,
        name,
        url: `${siteUrl}${url}`,
      })),
    });
  }

  if (
    route === "seo-for-dubai-businesses" &&
    !enhanced.some((node) => typeIncludes(node, "Article"))
  ) {
    const pageUrl = `${siteUrl}/seo-for-dubai-businesses/`;
    const headline = stripHtml(
      html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ||
        "SEO for Dubai Businesses",
    );
    const description = decodeHtml(
      html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1] || "",
    );
    enhanced.push({
      "@type": "Article",
      "@id": `${pageUrl}#article`,
      headline,
      description,
      url: pageUrl,
      datePublished: "2026-07-27",
      dateModified: "2026-08-03",
      author: { "@id": organizationId },
      publisher: { "@id": organizationId },
      mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
    });
  }

  const faqs = extractFaqs(html, route);
  if (faqs.length) {
    const pageUrl = route ? `${siteUrl}/${route}/` : `${siteUrl}/`;
    enhanced.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: faqs.map(([name, text]) => ({
        "@type": "Question",
        name,
        acceptedAnswer: { "@type": "Answer", text },
      })),
    });
  }
  return enhanced;
}

let changedPages = 0;
for (const file of walk(architectureDir)) {
  const route = routeFor(file);
  const original = fs.readFileSync(file, "utf8");
  let revised = original;
  let updated = false;
  revised = revised.replace(
    /<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/i,
    (full, rawJson) => {
      let parsed;
      try {
        parsed = JSON.parse(rawJson);
      } catch {
        return full;
      }
      if (parsed?.["@context"] !== "https://schema.org") return full;
      const graph = Array.isArray(parsed["@graph"])
        ? parsed["@graph"]
        : [parsed];
      const enhanced = {
        "@context": "https://schema.org",
        "@graph": enhanceGraph(graph, route, original),
      };
      const replacement = `<script type="application/ld+json">${JSON.stringify(enhanced)}</script>`;
      if (replacement !== full) updated = true;
      return replacement;
    },
  );
  if (updated && revised !== original) {
    fs.writeFileSync(file, revised);
    changedPages += 1;
  }
}

console.log(
  JSON.stringify(
    { status: "complete", changedPages },
    null,
    2,
  ),
);
