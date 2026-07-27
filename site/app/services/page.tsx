import type { Metadata } from "next";
import Link from "next/link";
import { CallToAction } from "../components/CallToAction";
import { StaticImage } from "../components/StaticImage";
import { services } from "../lib/site-data";

export const metadata: Metadata = {
  title: "Digital Marketing Services",
  description:
    "Explore Media87 services across reputation, conversational AI, chatbots, ads management, local SEO, content, websites and automation.",
  alternates: { canonical: "/services/" },
};

const primaryOffers = [
  {
    slug: "reputation-management",
    image: "/images/recovered/reputation-management.jpg",
    alt: "Media87 reputation management service artwork",
  },
  {
    slug: "ai-powered-conversations",
    image: "/images/recovered/ai-powered-conversations.jpg",
    alt: "Media87 AI-powered conversation service artwork",
  },
  {
    slug: "chatbot-development",
    image: "/images/recovered/chatbot-development.jpg",
    alt: "Media87 chatbot development service artwork",
  },
  {
    slug: "google-ads",
    image: "/images/recovered/ads-management.jpg",
    alt: "Media87 ads management service artwork",
  },
  {
    slug: "local-seo",
    image: "/images/recovered/local-seo.jpg",
    alt: "Media87 local SEO service artwork",
  },
]
  .map((item) => {
    const service = services.find((candidate) => candidate.slug === item.slug);
    return service ? { ...item, service } : null;
  })
  .filter((item) => item !== null);

const supportingServices = services.filter(
  (service) => !primaryOffers.some((item) => item.service.slug === service.slug),
);

const operatingPrinciples = [
  {
    title: "Insight before activity",
    body: "Start with the business decision, buyer journey and available evidence before choosing a channel.",
  },
  {
    title: "Creative and technical together",
    body: "Campaigns, content, pages, automation and measurement work as one customer experience.",
  },
  {
    title: "Visible handoffs",
    body: "Responsibilities, inputs, approvals, exceptions and reporting are clear enough to inspect.",
  },
  {
    title: "Scale after evidence",
    body: "Expand only when quality, measurement and the team’s ability to respond are ready.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="services-hero">
        <div className="hero-grid-pattern" />
        <div className="hero-orb hero-orb-lime" data-float-speed="-0.05" />
        <div className="hero-orb hero-orb-violet" data-float-speed="0.04" />
        <div className="shell services-hero-layout">
          <div>
            <span className="eyebrow">Media87 services</span>
            <h1>Specialist services connected around the customer journey.</h1>
          </div>
          <div>
            <p>
              The recovered site leads with five offers: reputation management,
              AI-powered conversations, chatbot development, ads management and
              local SEO. The new system keeps those owners clear, then connects
              the creative and technical capabilities that support delivery.
            </p>
            <Link className="button button-ink" href="/contact-us/">
              Discuss the right starting point <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section services-primary-section">
        <div className="shell split-heading" data-reveal-stagger>
          <div>
            <span className="eyebrow">Five primary offers</span>
            <h2>Closer to the live business. Clearer for the buyer.</h2>
          </div>
          <p>
            Each page explains fit, scope, process, limits and the related
            product or resource. Original artwork is retained as supporting
            context and treated to sit inside the current brand system.
          </p>
        </div>

        <div className="shell services-primary-grid" data-reveal-stagger>
          {primaryOffers.map((item, index) => (
            <Link
              data-cursor-label="Explore"
              data-tilt="3"
              href={
                item.service.canonicalPath ??
                `/services/${item.service.slug}/`
              }
              key={item.service.slug}
            >
              <div className="services-primary-image">
                <StaticImage
                  src={item.image}
                  alt={item.alt}
                  width={1024}
                  height={1024}
                  loading={index < 2 ? "eager" : "lazy"}
                  sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
                />
              </div>
              <div className="services-primary-copy">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <small>{item.service.eyebrow}</small>
                <h2>{item.service.title}</h2>
                <p>{item.service.summary}</p>
                <strong>
                  Explore the offer <span aria-hidden="true">↗</span>
                </strong>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section section-ink services-support-section">
        <div className="shell section-heading-light" data-reveal>
          <span className="eyebrow eyebrow-dark">Supporting capabilities</span>
          <h2>The work around the five core offers.</h2>
          <p>
            These pages remain useful when they own a distinct scope. They are
            no longer presented as an undifferentiated list of equal packages.
          </p>
        </div>
        <div className="shell services-support-grid" data-reveal-stagger>
          {supportingServices.map((service, index) => (
            <Link
              data-cursor-label="Explore"
              href={service.canonicalPath ?? `/services/${service.slug}/`}
              key={service.slug}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <small>{service.eyebrow}</small>
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
              </div>
              <strong aria-hidden="true">↗</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="section service-principles-section">
        <div className="shell service-principles-layout" data-reveal-stagger>
          <div>
            <span className="eyebrow">How Media87 works</span>
            <h2>AI and experience are useful when the operating detail is visible.</h2>
            <p>
              The live site’s strongest message is a combination of data,
              creative thinking and technical execution. These principles make
              that message testable.
            </p>
          </div>
          <div className="service-principles-grid" data-reveal-stagger>
            {operatingPrinciples.map((principle, index) => (
              <article key={principle.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{principle.title}</h3>
                <p>{principle.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CallToAction
        title="Which part of the customer journey is weakest?"
        body="Start with the outcome and the broken handoff. Media87 can then determine whether the right next step is a service, a product workflow or a smaller diagnostic."
      />
    </>
  );
}
