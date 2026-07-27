import type { Metadata } from "next";
import { ProductDetailPage } from "../components/ProductDetailPage";
import { productPages } from "../lib/product-data";

const product = productPages.chatzen;

export const metadata: Metadata = {
  title: "ChatZen AI Conversation System",
  description: product.description,
  alternates: { canonical: "/chatzen/" },
  openGraph: {
    title: "ChatZen AI Conversation System",
    description: product.description,
    type: "website",
  },
};

export default function ChatZenPage() {
  return <ProductDetailPage product={product} />;
}
