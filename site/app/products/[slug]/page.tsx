import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailPage } from "../../components/DetailPage";
import { ProductDetailPage } from "../../components/ProductDetailPage";
import { getProductPage } from "../../lib/product-data";
import { getPage, products } from "../../lib/site-data";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const productPage = getProductPage(slug);
  const product = getPage(products, slug);
  if (!product) return {};
  return {
    title: product.title,
    description: productPage?.description ?? product.summary,
    alternates: {
      canonical: product.canonicalPath ?? `/products/${product.slug}/`,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getPage(products, slug);
  if (!product) notFound();
  const productPage = getProductPage(slug);

  if (productPage) {
    return <ProductDetailPage product={productPage} />;
  }

  return (
    <DetailPage
      record={product}
      parentLabel="Products"
      parentHref="/products/"
    />
  );
}
