import Link from "next/link";
import type { ReactNode } from "react";
import type { ServicePageDetail } from "../lib/service-details";
import type { PageRecord } from "../lib/site-data";
import { CallToAction } from "./CallToAction";
import { FlowField } from "./FlowField";
import { MeshHero } from "./MeshHero";

type DetailPageProps = {
  record: PageRecord;
  parentLabel: string;
  parentHref: string;
  detail?: ServicePageDetail;
  children?: ReactNode;
};

export function DetailPage({
  record,
  parentLabel,
  parentHref,
  detail,
  children,
}: DetailPageProps) {
  return (
    <>
      <section className="detail-hero">
        <div className="shell">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href={parentHref}>{parentLabel}</Link>
            <span aria-hidden="true">/</span>
            <span>{record.title}</span>
          </nav>

          <div className="detail-hero-grid">
            <div>
              <span className="eyebrow">{record.eyebrow}</span>
              <h1>{record.h1}</h1>
              <p className="hero-copy">{record.intro}</p>
              <div className="hero-actions">
                <Link className="button button-ink" href="/contact-us/">
                  Discuss this service <span aria-hidden="true">→</span>
                </Link>
                <Link className="button button-outline" href={parentHref}>
                  View all {parentLabel.toLowerCase()}
                </Link>
              </div>
              <p className="location-context">
                <span aria-hidden="true">●</span> Based in Dubai, structured for
                international delivery.
              </p>
            </div>

            <aside className="scope-card" data-tilt="2">
              <span className="scope-label">At a glance</span>
              <strong>{record.title}</strong>
              <p>
                A focused engagement shaped around the current situation,
                available evidence and the commercial outcome that matters.
              </p>
              <dl>
                <div><dt>Core offer</dt><dd>{record.title}</dd></div>
                <div><dt>Starting point</dt><dd>Discovery and fit</dd></div>
                <div><dt>Delivery context</dt><dd>Dubai + international</dd></div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      {detail?.mesh ? (
        <section className="section service-mesh-section">
          <div className="shell service-mesh-panel">
            <span className="eyebrow">Explore the idea</span>
            <MeshHero
              lineOne={detail.mesh.lineOne}
              lineTwoPrefix={detail.mesh.lineTwoPrefix}
              highlight={detail.mesh.highlight}
              hint="Move through the service"
              as="div"
              compact
            />
          </div>
        </section>
      ) : null}

      {detail?.flowField ? (
        <section className="section service-flow-section">
          <div className="shell">
            <FlowField>
              <div className="service-flow-copy">
                <span className="eyebrow eyebrow-dark">
                  {detail.flowField.eyebrow}
                </span>
                <h2>{detail.flowField.title}</h2>
                <p>{detail.flowField.body}</p>
                <div className="service-flow-steps" aria-label="Automation stages">
                  {detail.flowField.steps.map((step, index) => (
                    <span key={step}>
                      <small>{String(index + 1).padStart(2, "0")}</small>
                      {step}
                    </span>
                  ))}
                </div>
              </div>
            </FlowField>
          </div>
        </section>
      ) : null}

      {detail ? (
        <section
          className={`section${detail.mesh || detail.flowField ? " section-tight" : ""}`}
        >
          <div className="shell service-fit-layout" data-reveal-stagger>
            <div>
              <span className="eyebrow">When this service fits</span>
              <h2>A useful starting point—not a package pushed onto every business.</h2>
              <p>
                The discovery conversation should establish whether the service
                matches the problem, the available evidence and the team’s
                ability to act on the work.
              </p>
            </div>
            <ul>
              {detail.fit.map((item) => (
                <li key={item}><span aria-hidden="true">✓</span>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="shell split-heading" data-reveal-stagger>
          <div>
            <span className="eyebrow">What the work covers</span>
            <h2>A clear scope before a sales promise.</h2>
          </div>
          <p>
            The right scope depends on the business context, but every engagement
            should make inclusions, responsibilities and measurement clear enough
            for a sensible decision.
          </p>
        </div>

        <div className="shell focus-grid" data-reveal-stagger>
          {record.focus.map((item, index) => (
            <article key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </section>

      {detail ? (
        <section className="section service-deliverables-section">
          <div className="shell split-heading" data-reveal-stagger>
            <div>
              <span className="eyebrow">What delivery includes</span>
              <h2>Specific work, not a vague monthly label.</h2>
            </div>
            <p>
              The exact volume and sequence depend on the starting point. These
              workstreams describe the substance that should appear in a scoped
              proposal for {record.title.toLowerCase()}.
            </p>
          </div>
          <div className="shell service-deliverable-grid" data-reveal-stagger>
            {detail.deliverables.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {children}

      <section className="section section-muted">
        <div className="shell process-layout" data-reveal-stagger>
          <div className="sticky-copy">
            <span className="eyebrow">Delivery model</span>
            <h2>A visible process with clear handoffs.</h2>
            <p>
              Each commercial page uses the same decision-friendly structure,
              while the actual method and proof remain specific to the service.
            </p>
          </div>
          <ol className="process-list" data-reveal-stagger>
            {record.process.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step}</h3>
                  <p>
                    Responsibilities, inputs, outputs and acceptance checks are
                    made visible before this stage begins.
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {detail ? (
        <section className="section">
          <div className="shell service-output-panel" data-reveal-stagger>
            <div>
              <span className="eyebrow">Expected outputs</span>
              <h2>What the client should be able to inspect.</h2>
              <ul>
                {detail.outputs.map((item) => (
                  <li key={item}><span aria-hidden="true">→</span>{item}</li>
                ))}
              </ul>
            </div>
            <aside>
              <span className="scope-label">Boundary before promise</span>
              <h3>What this service does not pretend to control.</h3>
              <p>{detail.boundaries}</p>
            </aside>
          </div>
        </section>
      ) : null}

      {detail?.related ? (
        <section className="section section-tight">
          <div className="shell related-product-panel" data-reveal-stagger>
            <div>
              <span className="eyebrow">{detail.related.eyebrow}</span>
              <h2>{detail.related.title}</h2>
              <p>{detail.related.body}</p>
            </div>
            <Link className="button button-ink" href={detail.related.href}>
              {detail.related.label} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="shell evidence-panel" data-reveal-stagger>
          <div>
            <span className="eyebrow">Evidence gate</span>
            <h2>Proof will sit beside the claim it supports.</h2>
          </div>
          <p>{record.evidence}</p>
        </div>
      </section>

      {detail ? (
        <section className="section section-muted">
          <div className="shell faq-layout" data-reveal-stagger>
            <div className="sticky-copy">
              <span className="eyebrow">Questions before scope</span>
              <h2>Clarify the operating detail before signing.</h2>
              <p>
                A careful service page should help a buyer understand the work,
                dependencies and limits before a sales conversation.
              </p>
            </div>
            <div className="faq-list">
              {detail.faq.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}<span aria-hidden="true">+</span></summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CallToAction
        title={`Is ${record.title.toLowerCase()} the right next step?`}
        body="Share the current situation and the outcome you need. The consultation should establish fit, constraints and the evidence required for a useful plan."
      />
    </>
  );
}
