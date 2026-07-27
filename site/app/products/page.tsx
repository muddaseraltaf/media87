import type { Metadata } from "next";
import { HubPage } from "../components/HubPage";
import { products } from "../lib/site-data";

export const metadata: Metadata = {
  title: "Media87 Products",
  description:
    "Explore Media87 products for conversational journeys, reputation workflows and connected lead operations.",
  alternates: { canonical: "/products/" },
};

export default function ProductsPage() {
  return (
    <HubPage
      eyebrow="Products"
      title="Productised workflows with the operating detail made visible."
      intro="LocalZen and ChatZen explain the complete journey, original capabilities, media, safeguards and implementation questions recovered from the live website."
      records={products}
      basePath="/products/"
      note="Pricing and exact integration access are confirmed during onboarding."
    />
  );
}
