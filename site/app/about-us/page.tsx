import type { Metadata } from "next";
import Link from "next/link";
import { CallToAction } from "../components/CallToAction";
import { StaticImage } from "../components/StaticImage";

export const metadata: Metadata = {
  title: "About Media87",
  description:
    "Media87 combines creativity, technology and strategy across local SEO, digital marketing and practical AI automation.",
  alternates: { canonical: "/about-us/" },
};

const principles = [
  [
    "Creativity with a job",
    "Ideas should clarify the offer, improve the customer journey or make the work more useful.",
  ],
  [
    "Technology with oversight",
    "Automation supports speed and consistency while people retain judgement and responsibility.",
  ],
  [
    "Strategy with evidence",
    "Pages, campaigns and workflows should connect to an observable business decision.",
  ],
  [
    "Growth without clutter",
    "The system should become easier to operate as the website, content library and market reach expand.",
  ],
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero about-hero">
        <div className="hero-orb hero-orb-lime" />
        <div className="hero-orb hero-orb-violet" />
        <div className="shell page-hero-inner">
          <span className="eyebrow">About Media87</span>
          <h1>Creative solutions, connected to real business growth.</h1>
          <p>
            Media87 combines creativity, technology and strategy across local
            SEO, digital marketing, content and AI-enabled customer journeys.
          </p>
        </div>
      </section>

      <section className="section section-tight">
        <div className="shell about-manifesto">
          <figure>
            <StaticImage
              src="/images/live/marketing-meeting.jpg"
              alt="Conceptual marketing workshop photograph used by Media87"
              width={1280}
              height={854}
              sizes="(max-width: 900px) 100vw, 52vw"
            />
            <figcaption>
              Conceptual campaign photograph—not a portrait of the Media87 team.
            </figcaption>
          </figure>
          <div>
            <span className="eyebrow">Who we are</span>
            <h2>A forward-looking agency with a practical operating mindset.</h2>
            <p>
              The live Media87 story is centred on helping businesses improve
              local visibility, customer engagement and digital operations. This
              rebuild makes that story easier to understand by separating
              services, products, proof and editorial guidance.
            </p>
            <p>
              Dubai provides the agency’s visible market context. The underlying
              capabilities and location-neutral service pages are designed to
              support work across the GCC and international markets.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="shell split-heading">
          <div>
            <span className="eyebrow">How Media87 thinks</span>
            <h2>Creativity, technology and strategy belong together.</h2>
          </div>
          <p>
            These principles translate the strongest ideas on the current live
            site into standards the rebuilt website and future work can follow.
          </p>
        </div>
        <div className="shell principle-grid">
          {principles.map(([title, body], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="shell founder-band">
          <div>
            <span className="eyebrow eyebrow-dark">Founder-led direction</span>
            <h2>Muddaser Altaf</h2>
          </div>
          <div>
            <p>
              Media87’s live website identifies Muddaser Altaf as its founder and
              connects the agency to hands-on digital marketing and AI content
              work. A fuller biography, credentials and verified channel metrics
              will be added only after the source material is approved.
            </p>
            <Link className="button button-lime" href="/contact-us/">
              Start a conversation <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
