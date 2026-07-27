import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailPage } from "../../components/DetailPage";
import { getServiceDetail } from "../../lib/service-details";
import { getPage, services } from "../../lib/site-data";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getPage(services, slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.summary,
    alternates: {
      canonical: service.canonicalPath ?? `/services/${service.slug}/`,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getPage(services, slug);
  if (!service) notFound();

  return (
    <DetailPage
      record={service}
      parentLabel="Services"
      parentHref="/services/"
      detail={getServiceDetail(service.slug)}
    />
  );
}
