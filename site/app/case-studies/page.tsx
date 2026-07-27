import type { Metadata } from "next";
import Link from "next/link";
import { CallToAction } from "../components/CallToAction";

export const metadata: Metadata = {
  title: "Digital Marketing Case Studies",
  description:
    "The Media87 case-study framework for approved, attributable work and measurable outcomes.",
  alternates: { canonical: "/case-studies/" },
};

const caseStudyFields = [
  "Initial situation and commercial objective",
  "Work completed and client inputs",
  "Timeframe, baseline and measurement source",
  "Outcome, attribution limits and lessons",
];

export default function CaseStudiesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero-orb hero-orb-lime" />
        <div className="hero-orb hero-orb-violet" />
        <div className="shell page-hero-inner">
          <span className="eyebrow">Case studies</span>
          <h1>Proof before promises.</h1>
          <p>
            Media87 case studies will show the starting point, the work, the
            measurement source and the limits—not just an isolated result.
          </p>
          <p className="draft-note">
            No client or result will appear here until publication permission and
            evidence are approved.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell split-heading">
          <div>
            <span className="eyebrow">Evidence template</span>
            <h2>Every story must answer the questions a buyer would ask.</h2>
          </div>
          <p>
            This shared framework keeps proof useful, comparable and connected to
            the service that produced it.
          </p>
        </div>
        <div className="shell focus-grid">
          {caseStudyFields.map((field, index) => (
            <article key={field}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{field}</h3>
            </article>
          ))}
        </div>
        <div className="shell centered-link">
          <Link className="text-link" href="/services/">
            Explore the services that proof will support <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <CallToAction
        title="Have an approved project we should document?"
        body="The case-study workflow starts with permission, source material and a clear account of what Media87 actually influenced."
      />
    </>
  );
}
