import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(scriptDir, "..");
const sourcePath = path.resolve(projectDir, "../audit/data/page-content.jsonl");
const outputPath = path.resolve(projectDir, "app/lib/live-content.generated.ts");

const excludedPaths = new Set([
  "/",
  "/services/",
  "/about-us/",
  "/contact-us/",
  "/ai-video-creation-service/",
  "/category/blog/",
  "/author/muddaser321gmail-com/",
]);

const boilerplate = new Set([
  "At Media87, we craft strategies that drive measurable growth and real business impact.",
  "Your email address will not be published. Required fields are marked *",
  "Comment *",
  "Name *",
  "Email *",
  "Website",
  "Save my name, email, and website in this browser for the next time I comment.",
]);

function cleanTitle(title) {
  return title
    .replace(/\s+[–—-]\s+Media87\s+[–—-]\s+Ai Powered Digital Marketing$/i, "")
    .replace(/\s+[–—-]\s+Media87$/i, "")
    .trim();
}

function categoryFor(slug) {
  if (/(local-seo|seo-|seo$|search)/.test(slug)) return "SEO";
  if (/(google-ads|digital-marketing-agency|ads)/.test(slug)) return "Paid media";
  if (/(social-media|linkedin|portfolio|photo|video|voice|nano-banana|water-mark)/.test(slug)) {
    return "Content & creative";
  }
  if (/(automation|chatbot|openclaw|n8n|email)/.test(slug)) return "AI automation";
  return "Digital growth";
}

function imageFor(category) {
  const images = {
    SEO: "/images/services/seo.jpg",
    "Paid media": "/images/services/google-ads.jpg",
    "Content & creative": "/images/services/social-media.jpg",
    "AI automation": "/images/services/digital-marketing.jpg",
    "Digital growth": "/images/live/smart-generation.jpg",
  };

  return images[category];
}

const sourceRows = fs
  .readFileSync(sourcePath, "utf8")
  .trim()
  .split("\n")
  .map((line) => JSON.parse(line));

const articles = sourceRows
  .filter((row) => !excludedPaths.has(new URL(row.url).pathname))
  .map((row) => {
    const pathname = new URL(row.url).pathname;
    const slug = pathname.replace(/^\/|\/$/g, "");
    const h1 = row.headings.find((heading) => heading.level === 1)?.text;
    const category = categoryFor(slug);
    const paragraphs = row.paragraphs
      .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
      .filter((paragraph) => paragraph && !boilerplate.has(paragraph));
    const headings = row.headings
      .filter(
        (heading) =>
          heading.level === 2 &&
          !/^(table of contents|frequently asked questions)$|leave a reply/i.test(
            heading.text.trim(),
          ),
      )
      .map((heading) => heading.text.replace(/\s+/g, " ").trim());

    return {
      slug,
      title: cleanTitle(h1 || row.title),
      description:
        row.description ||
        paragraphs[0]?.slice(0, 158) ||
        `A Media87 guide to ${cleanTitle(h1 || row.title)}.`,
      category,
      image: imageFor(category),
      headings,
      paragraphs,
      originalUrl: row.url,
    };
  })
  .sort((a, b) => a.title.localeCompare(b.title));

const contents = `// Generated from audit/data/page-content.jsonl.
// Run: node scripts/generate-live-content.mjs
// This preserves the live URL inventory for the local migration build.

export type LiveArticle = {
  slug: string;
  title: string;
  description: string;
  category: string;
  image: string;
  headings: string[];
  paragraphs: string[];
  originalUrl: string;
};

export const liveArticles: LiveArticle[] = ${JSON.stringify(articles, null, 2)};

export function getLiveArticle(slug: string) {
  return liveArticles.find((article) => article.slug === slug);
}
`;

fs.writeFileSync(outputPath, contents);
console.log(`Generated ${articles.length} live article records at ${outputPath}`);
