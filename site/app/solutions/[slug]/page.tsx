import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailPage } from "../../components/DetailPage";
import { getPage, solutions } from "../../lib/site-data";

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = getPage(solutions, slug);
  if (!solution) return {};
  return {
    title: solution.title,
    description: solution.summary,
    alternates: { canonical: `/solutions/${solution.slug}/` },
  };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = getPage(solutions, slug);
  if (!solution) notFound();
  return (
    <DetailPage
      record={solution}
      parentLabel="Solutions"
      parentHref="/solutions/"
    />
  );
}
