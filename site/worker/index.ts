/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";
import sitemap from "../app/sitemap";

interface Env {
  ASSETS: Fetcher;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function renderSitemap() {
  const entries = sitemap()
    .map(
      (entry) => `<url>
  <loc>${escapeXml(entry.url.toString())}</loc>
  <changefreq>${entry.changeFrequency ?? "monthly"}</changefreq>
  <priority>${entry.priority ?? 0.7}</priority>
</url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    if (url.pathname === "/sitemap.xml" || url.pathname === "/sitemap.xml/") {
      return new Response(renderSitemap(), {
        headers: {
          "content-type": "application/xml; charset=utf-8",
          "cache-control": "public, max-age=0, s-maxage=3600",
        },
      });
    }

    if (url.pathname === "/robots.txt" || url.pathname === "/robots.txt/") {
      return new Response(
        "User-agent: *\nDisallow: /\n\nSitemap: https://media87.com/sitemap.xml\n",
        {
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "public, max-age=0, s-maxage=3600",
          },
        },
      );
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
