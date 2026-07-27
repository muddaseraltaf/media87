import Link from "next/link";
import type { RecoveredPage as RecoveredPageData } from "../lib/recovered-pages";
import { CallToAction } from "./CallToAction";
import { LiteEmbed } from "./LiteEmbed";
import { StaticImage } from "./StaticImage";

const roleLabels: Record<RecoveredPageData["role"], string> = {
  service: "Managed service",
  market: "Market page",
  guide: "Decision guide",
  industry: "Industry system",
  innovation: "Innovation lab",
  workshop: "Learning offer",
  tool: "Media87 tool",
  resource: "Resource library",
  product: "Productised offer",
  trust: "Trust and editorial",
  legal: "Policy",
  system: "System page",
};

export function RecoveredPage({ page }: { page: RecoveredPageData }) {
  return (
    <>
      <article className={`recovered-page recovered-page-${page.role}`}>
        <header className="recovered-hero">
          <div className="recovered-hero-grid" aria-hidden="true" />
          <div className="recovered-hero-wash" aria-hidden="true" />
          <div className="shell">
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>{roleLabels[page.role]}</span>
              <span aria-hidden="true">/</span>
              <span>{page.title}</span>
            </nav>

            <div
              className={`recovered-hero-layout${
                page.image ? " recovered-hero-with-image" : ""
              }`}
            >
              <div className="recovered-hero-copy">
                <div className="recovered-topline">
                  <span className="eyebrow">{page.eyebrow}</span>
                  <span>{roleLabels[page.role]}</span>
                </div>
                <h1>{page.h1}</h1>
                <p>{page.intro}</p>
                <div className="hero-actions">
                  <Link className="button button-ink" href="/contact-us/">
                    Discuss the next step <span aria-hidden="true">→</span>
                  </Link>
                  <Link className="button button-outline" href="/services/">
                    Explore Media87
                  </Link>
                </div>
                {page.role !== "legal" && page.role !== "system" ? (
                  <p className="location-context">
                    <span aria-hidden="true">●</span> Dubai context. International
                    delivery where the scope fits.
                  </p>
                ) : null}
              </div>

              {page.image ? (
                <figure
                  className="recovered-hero-image"
                  data-float-speed="-0.025"
                  data-tilt="2"
                >
                  <StaticImage
                    src={page.image.src}
                    alt={page.image.alt}
                    width={1600}
                    height={900}
                    loading="eager"
                    fetchPriority="high"
                    sizes="(max-width: 900px) 100vw, 44vw"
                  />
                  {page.image.caption ? (
                    <figcaption>{page.image.caption}</figcaption>
                  ) : null}
                </figure>
              ) : (
                <aside
                  className="recovered-signal-board"
                  aria-label="Page focus"
                  data-tilt="2"
                >
                  <span>Focus map</span>
                  {page.signals.map((signal, index) => (
                    <div key={signal}>
                      <small>{String(index + 1).padStart(2, "0")}</small>
                      <strong>{signal}</strong>
                    </div>
                  ))}
                </aside>
              )}
            </div>
          </div>
        </header>

        {page.image ? (
          <section className="recovered-signal-strip" aria-label="Page focus">
            <div className="shell">
              {page.signals.map((signal, index) => (
                <span key={signal}>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  {signal}
                </span>
              ))}
            </div>
          </section>
        ) : null}

        <section className="section recovered-story-section">
          <div className="shell recovered-story-grid">
            <div className="recovered-story-intro" data-reveal>
              <span className="eyebrow">How this page earns its place</span>
              <h2>
                Useful detail, visible limits and a clearer path to a decision.
              </h2>
              <p>
                This page is derived from the recovered Media87 offer and
                restructured around the questions a buyer or user needs answered.
              </p>
            </div>

            <div className="recovered-section-stack" data-reveal-stagger>
              {page.sections.map((section, index) => (
                <section key={section.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h2>{section.title}</h2>
                    <p>{section.body}</p>
                    {section.items?.length ? (
                      <ul>
                        {section.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>

        {page.media ? (
          <section className="section recovered-media-section">
            <div className="shell recovered-media-layout" data-reveal-stagger>
              <div>
                <span className="eyebrow eyebrow-dark">Original experience</span>
                <h2>Load the live media only when it is useful.</h2>
                <p>
                  The external player or application stays out of the initial
                  page load. It connects after the visitor explicitly chooses to
                  use it.
                </p>
              </div>
              <LiteEmbed
                title={page.media.title}
                src={page.media.src}
                label={page.media.label}
                poster={page.media.poster}
                aspect={page.media.aspect}
              />
            </div>
          </section>
        ) : null}

        {page.process?.length ? (
          <section className="section section-muted recovered-process-section">
            <div className="shell split-heading" data-reveal-stagger>
              <div>
                <span className="eyebrow">Working sequence</span>
                <h2>A process with visible handoffs.</h2>
              </div>
              <p>
                The steps come from the recovered offer, then add the inputs,
                safeguards and measurement needed for a more useful decision.
              </p>
            </div>
            <ol className="shell recovered-process" data-reveal-stagger>
              {page.process.map((step, index) => (
                <li key={step}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step}</strong>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        <section className="section recovered-boundary-section">
          <div className="shell recovered-boundary" data-reveal-stagger>
            <div>
              <span className="eyebrow eyebrow-dark">Boundary before promise</span>
              <h2>What this page does not pretend to control.</h2>
            </div>
            <p>{page.limitations}</p>
          </div>
        </section>

        {page.faq?.length ? (
          <section className="section section-muted">
            <div className="shell faq-layout" data-reveal-stagger>
              <div className="sticky-copy">
                <span className="eyebrow">Questions before scope</span>
                <h2>Clarify the operating detail first.</h2>
                <p>
                  These answers are grounded in the recovered offer and the
                  current evidence standard. Commercial facts still require
                  approval before production.
                </p>
              </div>
              <div className="faq-list">
                {page.faq.map((item) => (
                  <details key={item.question}>
                    <summary>
                      {item.question}
                      <span aria-hidden="true">+</span>
                    </summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="section recovered-related-section">
          <div className="shell">
            <div className="recovered-related-heading" data-reveal>
              <span className="eyebrow">Continue with context</span>
              <h2>Useful next pages—not an automatic content carousel.</h2>
            </div>
            <div className="recovered-related-links" data-reveal-stagger>
              {page.related.map((item, index) => (
                <Link
                  data-cursor-label="Continue"
                  data-tilt="2"
                  href={item.href}
                  key={item.href}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item.label}</strong>
                  <small aria-hidden="true">↗</small>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </article>

      <CallToAction
        title={page.ctaTitle ?? "Bring the real situation. We will map the right next step."}
        body={
          page.ctaBody ??
          "The first conversation should confirm fit, evidence, constraints and the smallest useful scope before making a promise."
        }
      />
    </>
  );
}
