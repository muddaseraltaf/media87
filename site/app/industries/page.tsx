import type { Metadata } from "next";
import { HubPage } from "../components/HubPage";
import { industries } from "../lib/site-data";

export const metadata: Metadata = {
  title: "Industry Marketing Systems",
  description:
    "Proposed Media87 industry pages, gated by real experience, useful process detail and approved evidence.",
  alternates: { canonical: "/industries/" },
};

export default function IndustriesPage() {
  return (
    <HubPage
      eyebrow="Industries"
      title="Industry pages that have something real to say."
      intro="These routes are scaffolded for distinct buyer journeys. They remain draft-only until Media87 can support them with relevant experience and proof."
      records={industries}
      basePath="/industries/"
      note="Draft architecture: industry evidence is still required."
    />
  );
}
