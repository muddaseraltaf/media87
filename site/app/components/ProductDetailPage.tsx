import Link from "next/link";
import type { ProductPageData } from "../lib/product-data";
import { CallToAction } from "./CallToAction";
import { LiteEmbed } from "./LiteEmbed";
import { MeshHero } from "./MeshHero";
import { StaticImage } from "./StaticImage";

function ProductPreview({ product }: { product: ProductPageData }) {
  if (product.slug === "localzen") {
    return (
      <div className="localzen-preview" aria-label="Illustrative LocalZen kiosk workflow">
        <div className="preview-topbar">
          <span>LocalZen</span>
          <small>Feedback journey</small>
        </div>
        <div className="kiosk-copy">
          <span className="preview-check">✓</span>
          <strong>How was your experience?</strong>
          <p>Scan to share feedback from your own device.</p>
        </div>
        <div className="qr-illustration" aria-hidden="true">
          {Array.from({ length: 49 }).map((_, index) => (
            <i key={index} />
          ))}
        </div>
        <div className="preview-status">
          <span>QR</span>
          <span>SMS</span>
          <span>Email</span>
        </div>
      </div>
    );
  }

  return (
    <div className="chatzen-preview" aria-label="Illustrative ChatZen conversation">
      <div className="preview-topbar">
        <span>ChatZen</span>
        <small><i /> Online</small>
      </div>
      <div className="chat-bubble chat-bubble-ai">
        Hi—what would you like help with today?
      </div>
      <div className="chat-options">
        <span>Explore a service</span>
        <span>Book a meeting</span>
        <span>Ask a question</span>
      </div>
      <div className="chat-bubble chat-bubble-user">
        I need help with local visibility.
      </div>
      <div className="chat-handoff">
        <span>Context captured</span>
        <strong>Route to the right person →</strong>
      </div>
    </div>
  );
}

function ProductSchema({ product }: { product: ProductPageData }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: product.title,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: product.description,
        url: `https://media87.com/${product.slug}/`,
        provider: {
          "@type": "Organization",
          name: "Media87",
          url: "https://media87.com/",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: product.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function ProductDetailPage({
  product,
}: {
  product: ProductPageData;
}) {
  return (
    <>
      <ProductSchema product={product} />

      <section className="product-detail-hero">
        <div className="hero-grid-pattern" />
        <div className="hero-orb hero-orb-lime" data-float-speed="-0.05" />
        <div className="hero-orb hero-orb-violet" data-float-speed="0.04" />
        <div className="shell product-hero-shell">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/products/">Products</Link>
            <span aria-hidden="true">/</span>
            <span>{product.title}</span>
          </nav>

          <div className="product-hero-topline">
            <span className="eyebrow">{product.eyebrow}</span>
            <span className="product-live-note">Offer rebuilt from the original Media87 page</span>
          </div>

          <MeshHero
            lineOne={product.mesh.lineOne}
            lineTwoPrefix={product.mesh.lineTwoPrefix}
            highlight={product.mesh.highlight}
            hint="Move through the product"
          />

          <div className="product-hero-grid">
            <div className="product-hero-copy">
              <p>{product.intro}</p>
              <div className="hero-actions">
                <Link className="button button-ink" href="#product-tour">
                  Watch the product tour <span aria-hidden="true">↓</span>
                </Link>
                <Link className="button button-outline" href="/contact-us/">
                  Discuss your workflow
                </Link>
              </div>
              <p className="location-context">
                <span aria-hidden="true">●</span> Operated from Dubai, adaptable
                to international teams and customers.
              </p>
            </div>

            <ul className="product-promise-list">
              {product.promise.map((item) => (
                <li key={item}>
                  <span aria-hidden="true">↗</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section-tight">
        <div className="shell product-intro-stage" data-reveal-stagger>
          <div>
            <span className="eyebrow">How it feels to use</span>
            <h2>
              {product.slug === "localzen"
                ? "A reputation workflow your team can actually follow."
                : "A useful first conversation, not another dead-end widget."}
            </h2>
            <p>
              {product.slug === "localzen"
                ? "The interface concept keeps requests, profiles, response ownership and insight in one understandable flow."
                : "The interface concept makes choices clear, captures context progressively and keeps human handoff visible."}
            </p>
          </div>
          <div data-tilt="2">
            <ProductPreview product={product} />
          </div>
        </div>
      </section>

      <section className="section section-muted" id="product-tour">
        <div className="shell product-video-layout" data-reveal-stagger>
          <div className="sticky-copy">
            <span className="eyebrow">Original product tour</span>
            <h2>See the offer in motion.</h2>
            <p>{product.video.caption}</p>
          </div>
          <figure className="product-video">
            <LiteEmbed
              title={product.video.title}
              src={`https://player.vimeo.com/video/${product.video.id}?autoplay=1&dnt=1&title=0&byline=0&portrait=0`}
              label="Play the original product tour"
              poster={`/images/recovered/${product.slug}-overview.png`}
            />
            <figcaption>
              {product.video.title} · Media87 original Vimeo video
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section">
        <div className="shell split-heading" data-reveal-stagger>
          <div>
            <span className="eyebrow">How it works</span>
            <h2>{product.processHeading}</h2>
          </div>
          <p>{product.processIntro}</p>
        </div>

        <ol className="shell product-process-grid" data-reveal-stagger>
          {product.process.map((step, index) => (
            <li key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section section-ink product-feature-stage">
        <div className="shell section-heading-light" data-reveal>
          <span className="eyebrow eyebrow-dark">Core capabilities</span>
          <h2>{product.featuresHeading}</h2>
          <p>{product.featuresIntro}</p>
        </div>

        <div className="shell product-feature-grid" data-reveal-stagger>
          {product.features.map((feature, index) => (
            <article
              className={`product-feature-card${feature.image ? " product-feature-card-image" : ""}`}
              data-tilt="2"
              key={feature.title}
            >
              {feature.image ? (
                <div className="product-feature-visual">
                  <StaticImage
                    src={feature.image.src}
                    alt={feature.image.alt}
                    width={1024}
                    height={1024}
                    sizes="(max-width: 760px) 100vw, 36vw"
                  />
                </div>
              ) : null}
              <div>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
                {feature.note ? <small>{feature.note}</small> : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="shell integration-panel" data-reveal-stagger>
          <div>
            <span className="eyebrow">Connection map</span>
            <h2>Designed to fit the systems customers already touch.</h2>
            <p>
              These are the platforms and connection categories named in the
              original offer. Exact access, permissions and automation are
              confirmed in the implementation scope.
            </p>
          </div>
          <div className="integration-cloud">
            {product.integrations.map((integration) => (
              <span key={integration}>{integration}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="shell split-heading" data-reveal-stagger>
          <div>
            <span className="eyebrow">Where it fits</span>
            <h2>Use cases with a clear operational reason.</h2>
          </div>
          <p>
            The right configuration depends on volume, customer sensitivity,
            locations, channels and who owns the handoff after automation.
          </p>
        </div>
        <div className="shell product-use-case-grid" data-reveal-stagger>
          {product.useCases.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="shell product-operating-note" data-reveal-stagger>
          <div>
            <span className="eyebrow">{product.operatingNote.eyebrow}</span>
            <h2>{product.operatingNote.title}</h2>
            <p>{product.operatingNote.body}</p>
          </div>
          <ul>
            {product.operatingNote.points.map((point) => (
              <li key={point}><span aria-hidden="true">✓</span>{point}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-muted">
        <div className="shell faq-layout" data-reveal-stagger>
          <div className="sticky-copy">
            <span className="eyebrow">Questions before onboarding</span>
            <h2>What a careful buyer should ask.</h2>
            <p>
              Features, connected platforms, data handling and commercial scope
              should be explicit before the workflow goes live.
            </p>
          </div>
          <div className="faq-list">
            {product.faq.map((item) => (
              <details key={item.question}>
                <summary>{item.question}<span aria-hidden="true">+</span></summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CallToAction
        title={`Would ${product.title} improve the customer journey you have now?`}
        body="Map the current process first. Media87 can then confirm the useful workflow, supported connections, safeguards and implementation scope."
      />
    </>
  );
}
