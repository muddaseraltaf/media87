import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // The architecture preview must stay out of search until migration approval.
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
    sitemap: "https://media87.com/sitemap.xml",
  };
}
