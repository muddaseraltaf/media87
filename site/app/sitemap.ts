import type { MetadataRoute } from "next";
import {
  aiVideoService,
  products,
  services,
  siteUrl,
} from "./lib/site-data";
import { currentArticles } from "./lib/current-articles";
import { recoveredRootPages } from "./lib/recovered-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/services",
    "/products",
    "/localzen",
    "/chatzen",
    "/blog",
    "/about-us",
    "/contact-us",
    `/${aiVideoService.slug}`,
  ];

  const dynamicPaths = [
    ...services.map(
      (item) => item.canonicalPath ?? `/services/${item.slug}`,
    ),
    ...products
      .filter((item) => !item.canonicalPath)
      .map((item) => `/products/${item.slug}`),
    ...recoveredRootPages
      .filter((item) => !item.noindex)
      .map((item) => `/${item.slug}`),
    ...currentArticles.map((item) => `/${item.slug}`),
  ];

  return [...new Set([...staticPaths, ...dynamicPaths])].map((path) => {
    const cleanPath =
      path === "" ? "" : `/${path.replace(/^\/+|\/+$/g, "")}`;

    return {
      url: `${siteUrl}${cleanPath}/`,
      changeFrequency: cleanPath === "" ? "weekly" : "monthly",
      priority:
        cleanPath === ""
          ? 1
          : cleanPath.split("/").length === 2
            ? 0.8
            : 0.7,
    };
  });
}
