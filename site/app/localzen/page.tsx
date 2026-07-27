import type { Metadata } from "next";
import { ProductDetailPage } from "../components/ProductDetailPage";
import { productPages } from "../lib/product-data";

const product = productPages.localzen;

export const metadata: Metadata = {
  title: "LocalZen Reputation Management",
  description: product.description,
  alternates: { canonical: "/localzen/" },
  openGraph: {
    title: "LocalZen Reputation Management",
    description: product.description,
    type: "website",
  },
};

export default function LocalZenPage() {
  return <ProductDetailPage product={product} />;
}
