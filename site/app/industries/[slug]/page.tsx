import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailPage } from "../../components/DetailPage";
import { getPage, industries } from "../../lib/site-data";

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getPage(industries, slug);
  if (!industry) return {};
  return {
    title: industry.title,
    description: industry.summary,
    alternates: { canonical: `/industries/${industry.slug}/` },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getPage(industries, slug);
  if (!industry) notFound();
  return (
    <DetailPage
      record={industry}
      parentLabel="Industries"
      parentHref="/industries/"
    />
  );
}
