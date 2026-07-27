import type { Metadata } from "next";
import { HubPage } from "../components/HubPage";
import { solutions } from "../lib/site-data";

export const metadata: Metadata = {
  title: "Growth Solutions",
  description:
    "Explore connected Media87 solutions for lead generation, multi-location marketing and practical automation.",
  alternates: { canonical: "/solutions/" },
};

export default function SolutionsPage() {
  return (
    <HubPage
      eyebrow="Solutions"
      title="Start with the business problem, not the channel."
      intro="Solution pages connect multiple capabilities around a real operating outcome without duplicating the individual service pages."
      records={solutions}
      basePath="/solutions/"
    />
  );
}
