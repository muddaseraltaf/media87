import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(scriptDir, "..");
const sourceDir = path.join(projectDir, "main architecture");
const outputDir = path.join(projectDir, "dist");

if (!fs.existsSync(path.join(sourceDir, "index.html"))) {
  throw new Error("The static source is missing its top-level index.html");
}

fs.rmSync(outputDir, { recursive: true, force: true });
fs.cpSync(sourceDir, outputDir, { recursive: true });

for (const requiredFile of [
  "index.html",
  "404.html",
  "_headers",
  "_redirects",
  "robots.txt",
  "sitemap.xml",
  "llms.txt",
  "llms-full.txt",
  "ads.txt",
]) {
  if (!fs.existsSync(path.join(outputDir, requiredFile))) {
    throw new Error(`Cloudflare output is missing ${requiredFile}`);
  }
}

console.log(
  JSON.stringify(
    {
      status: "ready",
      outputDirectory: "dist",
      files: countFiles(outputDir),
    },
    null,
    2,
  ),
);

function countFiles(dir) {
  let count = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const target = path.join(dir, entry.name);
    count += entry.isDirectory() ? countFiles(target) : 1;
  }
  return count;
}
