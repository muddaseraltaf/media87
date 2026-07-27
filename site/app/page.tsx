import type { Metadata } from "next";
import Link from "next/link";
import { AmbientOrbit } from "./components/AmbientOrbit";
import { CallToAction } from "./components/CallToAction";
import { LiteEmbed } from "./components/LiteEmbed";
import { MeshHero } from "./components/MeshHero";
import { StaticImage } from "./components/StaticImage";
import { liveArticles } from "./lib/live-content.generated";
import { products, services } from "./lib/site-data";

export const metadata: Metadata = {
  title: "Digital Marketing, Local SEO, Content & AI Automation",
  description:
    "Media87 connects digital marketing, local SEO, content creation and practical AI automation for businesses in Dubai and international markets.",
  alternates: { canonical: "/" },
};

const featuredServiceSlugs = [
  "reputation-management",
  "ai-powered-conversations",
  "chatbot-development",
  "google-ads",
  "local-seo",
];

const featuredServices = featuredServiceSlugs
  .map((slug) => services.find((service) => service.slug === slug))
  .filter((service): service is (typeof services)[number] => Boolean(service));

const workingModel = [
  {
    number: "01",
    title: "Strategy",
    body: "Understand the business goal, market and evidence before choosing channels.",
  },
  {
    number: "02",
    title: "Consultancy",
    body: "Turn SEO, automation, content and campaign questions into practical decisions.",
  },
  {
    number: "03",
    title: "Positioning",
    body: "Put the strategy into action across pages, campaigns and customer journeys.",
  },
  {
    number: "04",
    title: "Evaluation",
    body: "Measure what is useful, improve the weak handoffs and keep learning visible.",
  },
];

const creativeCapabilities = [
  "AI avatars",
  "Photo enhancement",
  "Content translation",
  "Social automation",
  "Video editing",
  "AI video",
];

const featuredArticles = [
  "local-seo-dubai-how-to-rank-for-near-me-searches-in-2026",
  "google-ads-management-cost-dubai-2026",
  "how-to-automatically-read-classify-and-reply-to-emails-using-ai-step-by-step-n8n-guide",
]
  .map((slug) => liveArticles.find((article) => article.slug === slug))
  .filter((article): article is (typeof liveArticles)[number] => Boolean(article));

const resourceEcosystem = [
  {
    title: "Prompt library",
    body: "Visual and workflow prompts rebuilt as accessible, selectable resources.",
    href: "/prompts/",
    tag: "Resource",
  },
  {
    title: "Image geo-tagging",
    body: "The recovered browser tool, held for privacy and output-quality validation.",
    href: "/geo-tagging-images-for-seo/",
    tag: "Tool",
  },
  {
    title: "OpenClaw workshop",
    body: "Practical setup, security, automation and token-efficiency learning.",
    href: "/workshop/",
    tag: "Workshop",
  },
  {
    title: "Future Growth Lab",
    body: "The product, automation, search and creative system behind Media87’s direction.",
    href: "/future-growth-lab/",
    tag: "Innovation",
  },
];

const marketGuides = [
  {
    title: "Digital marketing services in Dubai",
    href: "/digital-marketing-services-in-dubai/",
    body: "A connected acquisition system for the way Dubai customers discover, evaluate and enquire.",
  },
  {
    title: "SEO for Dubai businesses",
    href: "/seo-for-dubai-businesses/",
    body: "Technical foundations, commercial pages, local relevance and useful content in one search strategy.",
  },
  {
    title: "Human-like AI calling bots",
    href: "/human-like-ai-calling-bots/",
    body: "A practical decision guide to use cases, safeguards, quality and human handoff.",
  },
];

export default function Home() {
  return (
    <>
      <section className="home-hero home-hero-live">
        <div className="hero-grid-pattern" />
        <div className="hero-orb hero-orb-lime" data-float-speed="-0.06" />
        <div className="hero-orb hero-orb-violet" data-float-speed="0.04" />
        <AmbientOrbit className="home-ambient-orbit" />
        <div className="shell home-hero-inner">
          <div className="hero-topline">
            <span className="eyebrow">AI-powered digital growth partner</span>
            <span className="hero-build-state">Dubai context · international reach</span>
          </div>

          <MeshHero />

          <p className="hero-copy">
            Local SEO, content creation, ads management and practical AI
            automation—designed as one connected system for ambitious businesses.
          </p>

          <div className="hero-actions">
            <Link className="button button-ink" href="/contact-us/">
              Start a conversation <span aria-hidden="true">→</span>
            </Link>
            <Link className="button button-outline" href="/services/">
              Explore the system
            </Link>
          </div>

          <p className="location-context location-context-center">
            <span aria-hidden="true">●</span> Dubai context. International
            delivery.
          </p>

          <div className="hero-ticker" aria-label="Media87 capabilities">
            <div data-marquee>
              <span>Local SEO</span>
              <span>AI automation</span>
              <span>Content creation</span>
              <span>Ads management</span>
              <span>Conversational AI</span>
              <span>Video production</span>
              <span aria-hidden="true">Local SEO</span>
              <span aria-hidden="true">AI automation</span>
              <span aria-hidden="true">Content creation</span>
              <span aria-hidden="true">Ads management</span>
              <span aria-hidden="true">Conversational AI</span>
              <span aria-hidden="true">Video production</span>
            </div>
          </div>
        </div>
      </section>

      <section className="signal-strip" aria-label="Media87 operating principles">
        <div className="shell signal-grid" data-reveal-stagger>
          <span>Fast static foundation</span>
          <span>Real URLs preserved</span>
          <span>Human-approved AI</span>
          <span>Evidence before claims</span>
        </div>
      </section>

      <section className="section">
        <div className="shell live-intro-grid" data-reveal-stagger>
          <div className="live-intro-copy">
            <span className="eyebrow">Who we are</span>
            <h2>Your AI-powered growth partner, made more coherent.</h2>
            <p>
              Media87 helps businesses grow through AI automation, local SEO,
              content creation, paid media and digital experiences. The rebuild
              keeps those real offer families, then connects them through a
              simpler architecture and a faster publishing system.
            </p>
            <Link className="text-link" href="/about-us/">
              The Media87 approach <span aria-hidden="true">→</span>
            </Link>
          </div>

          <figure
            className="editorial-image editorial-image-feature"
            data-tilt="2"
          >
            <StaticImage
              src="/images/live/growth-platform.jpeg"
              alt="Conceptual growth strategy meeting visual used by Media87"
              width={1376}
              height={768}
              sizes="(max-width: 900px) 100vw, 56vw"
            />
            <figcaption>
              Conceptual Media87 campaign visual—not a photograph of the team.
            </figcaption>
            <span className="image-stamp">Strategy / systems / growth</span>
          </figure>
        </div>
      </section>

      <section className="section section-tight home-original-video">
        <div className="shell recovered-media-layout" data-reveal-stagger>
          <div>
            <span className="eyebrow eyebrow-dark">Original Media87 overview</span>
            <h2>The recovered story, now connected to a clearer system.</h2>
            <p>
              The original homepage video remains part of the brand context. It
              is loaded only when requested, so the third-party player does not
              compete with the initial page experience.
            </p>
          </div>
          <LiteEmbed
            title="Media87 digital marketing and AI overview"
            src="https://player.vimeo.com/video/1136349054?autoplay=1&dnt=1&title=0&byline=0&portrait=0"
            label="Play the original Media87 video"
          />
        </div>
      </section>

      <section className="section section-muted">
        <div className="shell split-heading" data-reveal-stagger>
          <div>
            <span className="eyebrow">What Media87 offers</span>
            <h2>Five live service families. One connected customer journey.</h2>
          </div>
          <p>
            Reputation, conversations, chatbots, ads and local SEO are the five
            offers named on the recovered services page. Automation, content and
            production support the system without diluting those owners.
          </p>
        </div>

        <div className="shell kinetic-grid" data-reveal-stagger>
          {featuredServices.map((service, index) => (
            <Link
              className={`kinetic-card kinetic-card-${index + 1}`}
              data-cursor-label="View"
              data-tilt="3"
              href={service.canonicalPath ?? `/services/${service.slug}/`}
              key={service.slug}
            >
              <span className="kinetic-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="card-kicker">{service.eyebrow}</span>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
              <span className="kinetic-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </div>

        <div className="shell centered-link">
          <Link className="button button-outline" href="/services/">
            View all {services.length} service pages
          </Link>
        </div>
      </section>

      <section className="section product-stage">
        <div className="shell">
          <div className="product-stage-heading" data-reveal>
            <span className="eyebrow eyebrow-dark">Products in the ecosystem</span>
            <h2>Tools become useful when they fit the work around them.</h2>
            <p>
              ChatZen and LocalZen are the two best-documented Media87 products.
              Their original videos and workflows stay visible, while features,
              data handling and commercial terms remain explicit.
            </p>
          </div>

          <div className="product-deck" data-reveal-stagger>
            {products.map((product, index) => (
              <Link
                className="product-card"
                data-cursor-label="Open"
                data-tilt="3"
                href={product.canonicalPath ?? `/products/${product.slug}/`}
                key={product.slug}
              >
                <span className="product-monogram">
                  {product.title.slice(0, 2).toUpperCase()}
                </span>
                <span className="product-count">0{index + 1}</span>
                <h3>{product.title}</h3>
                <p>{product.summary}</p>
                <span className="product-status">
                  {product.canonicalPath ? "Detailed product page" : "Scope in review"}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section creative-stage">
        <div className="shell creative-layout" data-reveal-stagger>
          <div className="creative-copy">
            <span className="eyebrow">Creative AI studio</span>
            <h2>One source idea, shaped for every useful format.</h2>
            <p>
              The current website already presents AI avatars, photo enhancement,
              translation, social automation, video editing and AI video. The new
              architecture turns that list into a visible production system.
            </p>
            <div className="capability-cloud">
              {creativeCapabilities.map((capability, index) => (
                <span key={capability}>
                  <small>{String(index + 1).padStart(2, "0")}</small>
                  {capability}
                </span>
              ))}
            </div>
            <Link className="button button-ink" href="/ai-video-creation-service/">
              Explore AI video <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div
            className="creative-images"
            aria-label="Creative production visuals"
            data-float-speed="-0.04"
          >
            <figure className="creative-image creative-image-a">
              <StaticImage
                src="/images/services/social-media.jpg"
                alt="Conceptual social media campaign production visual"
                fill
                sizes="(max-width: 900px) 72vw, 34vw"
              />
            </figure>
            <figure className="creative-image creative-image-b">
              <StaticImage
                src="/images/live/smart-generation.jpg"
                alt="Conceptual audience engagement photograph used by Media87"
                fill
                sizes="(max-width: 900px) 60vw, 27vw"
              />
            </figure>
            <span className="creative-orbit">Create → adapt → approve → learn</span>
          </div>
        </div>
      </section>

      <section className="section section-ink">
        <div className="shell">
          <div className="section-heading-light" data-reveal>
            <span className="eyebrow eyebrow-dark">How the work moves</span>
            <h2>A live-site process, rebuilt as a visible operating loop.</h2>
          </div>
          <div className="working-loop" data-reveal-stagger>
            {workingModel.map((step) => (
              <article key={step.number}>
                <span>{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section recovered-ecosystem-section">
        <div className="shell split-heading" data-reveal-stagger>
          <div>
            <span className="eyebrow">Recovered ecosystem</span>
            <h2>The useful tools and learning offers now have a real home.</h2>
          </div>
          <p>
            WordPress buried these pages in a mismatched mobile menu. The rebuild
            keeps their URLs but connects each one through the task it helps a
            visitor complete.
          </p>
        </div>
        <div className="shell resource-ecosystem-grid" data-reveal-stagger>
          {resourceEcosystem.map((item, index) => (
            <Link
              data-cursor-label="Explore"
              data-tilt="3"
              href={item.href}
              key={item.href}
            >
              <span>{item.tag}</span>
              <small>{String(index + 1).padStart(2, "0")}</small>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <strong aria-hidden="true">↗</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="section section-muted market-guide-section">
        <div className="shell market-guide-layout" data-reveal-stagger>
          <div className="market-guide-copy">
            <span className="eyebrow">Dubai, used where it matters</span>
            <h2>Core services stay universal. Existing market pages stay specific.</h2>
            <p>
              The main service titles do not need a location in every heading.
              Dedicated recovered pages can still answer real Dubai decisions
              without turning location names into a page-generation system.
            </p>
            <Link className="button button-ink" href="/digital-marketing-services-in-dubai/">
              Explore the Dubai market page <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="market-guide-list" data-reveal-stagger>
            {marketGuides.map((guide, index) => (
              <Link data-cursor-label="Read" href={guide.href} key={guide.href}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{guide.title}</h3>
                  <p>{guide.body}</p>
                </div>
                <small aria-hidden="true">↗</small>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell split-heading" data-reveal-stagger>
          <div>
            <span className="eyebrow">From the existing library</span>
            <h2>Useful articles keep their URLs—and get a better home.</h2>
          </div>
          <p>
            The local build now includes every live sitemap article. These three
            show the intended mix of Dubai market context and internationally
            useful guidance.
          </p>
        </div>

        <div className="shell featured-insights" data-reveal-stagger>
          {featuredArticles.map((article) => (
            <Link
              data-cursor-label="Read"
              href={`/${article.slug}/`}
              key={article.slug}
            >
              <div>
                <span>{article.category}</span>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
              </div>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>

        <div className="shell centered-link">
          <Link className="button button-outline" href="/blog/">
            Browse the current blog
          </Link>
        </div>
      </section>

      <CallToAction
        title="Bring the business problem. We will map the right system."
        body="Media87 is based in Dubai and can work with teams in the GCC and international markets. The first conversation should clarify the goal, evidence and smallest useful next step."
      />
    </>
  );
}
