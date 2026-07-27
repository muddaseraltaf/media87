import Link from "next/link";
import type { PageRecord } from "../lib/site-data";
import { CallToAction } from "./CallToAction";

type HubPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  records: PageRecord[];
  basePath: string;
  note?: string;
};

export function HubPage({
  eyebrow,
  title,
  intro,
  records,
  basePath,
  note,
}: HubPageProps) {
  return (
    <>
      <section className="page-hero">
        <div className="hero-orb hero-orb-lime" data-float-speed="-0.05" />
        <div className="hero-orb hero-orb-violet" data-float-speed="0.04" />
        <div className="shell page-hero-inner">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{intro}</p>
          {note ? <p className="draft-note">{note}</p> : null}
        </div>
      </section>

      <section className="section">
        <div className="shell card-grid" data-reveal-stagger>
          {records.map((record, index) => (
            <Link
              className="offer-card"
              data-cursor-label="Explore"
              data-tilt="3"
              href={record.canonicalPath ?? `${basePath}${record.slug}/`}
              key={record.slug}
            >
              <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
              <span className="card-kicker">{record.eyebrow}</span>
              <h2>{record.title}</h2>
              <p>{record.summary}</p>
              <span className="text-link">Explore the page <span aria-hidden="true">→</span></span>
            </Link>
          ))}
        </div>
      </section>

      <CallToAction />
    </>
  );
}
