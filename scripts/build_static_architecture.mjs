import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(scriptDir, "..");
const architectureDir = path.join(projectDir, "main architecture");
const sourceSiteDir = path.join(projectDir, "site");
const postsSnapshot =
  process.argv[2] || "/private/tmp/media87-live-posts-2026-07-26.json";

const { recoveredRootPages } = await import(
  pathToFileURL(
    path.join(sourceSiteDir, "app/lib/recovered-pages.ts"),
  ).href
);
const { liveArticles } = await import(
  pathToFileURL(
    path.join(sourceSiteDir, "app/lib/live-content.generated.ts"),
  ).href
);

const livePosts = JSON.parse(fs.readFileSync(postsSnapshot, "utf8"));
const cleanArticleMap = new Map(
  liveArticles.map((article) => [article.slug, article]),
);

fs.cpSync(
  path.join(sourceSiteDir, "public/images"),
  path.join(architectureDir, "assets/img/site"),
  { recursive: true },
);

const consultationUrl =
  "https://chat.media87.com/share/bfa81d9bba3647f9907117b422fca4cf";
const siteUrl = "https://media87.com";
const organizationId = `${siteUrl}/#organization`;
const websiteId = `${siteUrl}/#website`;
const socialImageUrl = `${siteUrl}/assets/og/media87-social-card.jpg`;
const assetVersion = "20260728-performance5";
const dmcaVerification = "SGZBeklUVW1FQ2RnSlNhTysyc0c5dz090";

const entities = {
  amp: "&",
  quot: '"',
  apos: "'",
  lt: "<",
  gt: ">",
  nbsp: " ",
  ndash: "–",
  mdash: "—",
  hellip: "…",
  rsquo: "’",
  lsquo: "‘",
  rdquo: "”",
  ldquo: "“",
};

function decodeHtml(value = "") {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    )
    .replace(/&([a-z]+);/gi, (match, key) => entities[key] ?? match);
}

function stripHtml(value = "") {
  return decodeHtml(
    value
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function localImage(src) {
  if (!src) return "";
  if (src.startsWith("/images/")) {
    return `/assets/img/site/${src.slice("/images/".length)}`;
  }
  return src;
}

function brandedTitle(title) {
  const clean = decodeHtml(String(title))
    .replace(/\s*(?:\||—|-)\s*Media87(?:\s*(?:\||—|-)\s*Media87)*\s*$/i, "")
    .trim();
  return /\bMedia87\b/i.test(clean) ? clean : `${clean} | Media87`;
}

function renderSeoHead({
  title,
  description,
  canonicalUrl,
  noindex = false,
  ogType = "website",
  imageUrl = socialImageUrl,
  imageAlt = "Media87 digital growth systems",
  structuredData = [],
  preservedScripts = "",
}) {
  const finalTitle = brandedTitle(title);
  const robots = noindex
    ? "noindex,follow"
    : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";
  const jsonLd = structuredData.length
    ? `<script type="application/ld+json">${JSON.stringify({
        "@context": "https://schema.org",
        "@graph": structuredData,
      }).replaceAll("<", "\\u003c")}</script>`
    : "";
  const imageDimensions =
    imageUrl === socialImageUrl
      ? `<meta property="og:image:width" content="1659">
<meta property="og:image:height" content="948">`
      : "";
  return `<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(finalTitle)}</title>
<meta name="description" content="${escapeHtml(description)}">
<meta name="robots" content="${robots}">
<meta name="dmca-site-verification" content="${dmcaVerification}">
<link rel="canonical" href="${escapeHtml(canonicalUrl)}">
<meta property="og:type" content="${escapeHtml(ogType)}">
<meta property="og:site_name" content="Media87">
<meta property="og:locale" content="en_AE">
<meta property="og:title" content="${escapeHtml(finalTitle)}">
<meta property="og:description" content="${escapeHtml(description)}">
<meta property="og:url" content="${escapeHtml(canonicalUrl)}">
<meta property="og:image" content="${escapeHtml(imageUrl)}">
${imageDimensions}
<meta property="og:image:alt" content="${escapeHtml(imageAlt)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(finalTitle)}">
<meta name="twitter:description" content="${escapeHtml(description)}">
<meta name="twitter:image" content="${escapeHtml(imageUrl)}">
<meta name="theme-color" content="#f5f6ef">
<link rel="icon" type="image/png" href="/assets/logo.png">
<link rel="preload" href="/assets/fonts/sora-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/style.css?v=${assetVersion}">
<script src="/assets/site-tags.js?v=${assetVersion}" defer></script>
${preservedScripts}
${jsonLd}
</head>`;
}

function head({ title, description, slug = "", noindex = false, canonical }) {
  const canonicalUrl =
    canonical?.startsWith("http")
      ? canonical
      : `${siteUrl}${canonical || `/${slug ? `${slug}/` : ""}`}`;
  return `<!DOCTYPE html>
<html lang="en">
${renderSeoHead({ title, description, canonicalUrl, noindex })}`;
}

function header() {
  return `<header id="header">
  <div class="wrap nav">
    <a href="/" class="logo" aria-label="Media87 home"><img class="logo-img" src="/assets/logo-color-405.webp" alt="Media87" width="405" height="80"></a>
    <nav class="nav-links" aria-label="Main navigation">
      <div class="nav-drop">
        <button type="button" aria-haspopup="true">Services <span aria-hidden="true">⌄</span></button>
        <div class="drop-menu">
          <a href="/local-seo-services/"><span><b>Local SEO</b><small>Maps, discovery and local trust</small></span></a>
          <a href="/ads-management/"><span><b>Ads Management</b><small>Google, Meta and TikTok campaigns</small></span></a>
          <a href="/ai-powered-conversations/"><span><b>AI Conversations</b><small>Qualification, booking and handoff</small></span></a>
          <a href="/ai-video-creation-service/"><span><b>AI Video</b><small>Concept, production and adaptation</small></span></a>
          <a href="/services/"><span><b>All Services</b><small>The connected Media87 system</small></span></a>
        </div>
      </div>
      <a href="/chatzen/">ChatZen</a>
      <a href="/localzen/">LocalZen</a>
      <a href="/blog/">Blog</a>
      <a href="/about-us/">About</a>
    </nav>
    <a class="btn btn-accent btn-sm" data-magnet href="/contact-us/">Contact</a>
    <button class="burger" id="burger" type="button" aria-label="Menu">
      <span aria-hidden="true">☰</span>
    </button>
  </div>
</header>`;
}

function footer() {
  return `<footer>
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand">
        <a href="/" class="logo"><img class="logo-img" src="/assets/logo-white-405.webp" alt="Media87" width="405" height="80"></a>
        <p>Dubai-based digital marketing, local discovery and practical AI systems designed around clearer customer journeys.</p>
        <div class="foot-contact">
          <a href="mailto:hello@media87.com">hello@media87.com</a>
          <a href="tel:+971503321743">+971 50 332 1743</a>
        </div>
      </div>
      <div>
        <h2>Services</h2>
        <ul>
          <li><a href="/local-seo-services/">Local SEO</a></li>
          <li><a href="/ads-management/">Ads Management</a></li>
          <li><a href="/ai-powered-conversations/">AI Conversations</a></li>
          <li><a href="/ai-video-creation-service/">AI Video Creation</a></li>
          <li><a href="/digital-marketing-services-in-dubai/">Digital Marketing in Dubai</a></li>
          <li><a href="/seo-for-dubai-businesses/">SEO for Dubai Businesses</a></li>
          <li><a href="/human-like-ai-calling-bots/">AI Calling Guide</a></li>
          <li><a href="/geo-tagging-images-for-seo/">Image Geo-Tagger</a></li>
        </ul>
      </div>
      <div>
        <h2>Products</h2>
        <ul>
          <li><a href="/chatzen/">ChatZen</a></li>
          <li><a href="/localzen/">LocalZen</a></li>
          <li><a href="/llm-package/">LLM Package</a></li>
          <li><a href="/prompts/">Prompt Library</a></li>
        </ul>
      </div>
      <div>
        <h2>Company</h2>
        <ul>
          <li><a href="/about-us/">About</a></li>
          <li><a href="/blog/">Blog</a></li>
          <li><a href="/authors-team/">Authors</a></li>
          <li><a href="/editorial-guidelines/">Editorial Guidelines</a></li>
          <li><a href="/faqs/">FAQs</a></li>
        </ul>
      </div>
      <div>
        <h2>Contact & legal</h2>
        <ul>
          <li><a href="/contact-us/">Contact</a></li>
          <li><a href="/privacy-policy/">Privacy</a></li>
          <li><a href="/terms-of-services/">Terms</a></li>
        </ul>
      </div>
    </div>
    <div class="foot-bottom">
      <span>© 2026 Media87. All rights reserved. · Dubai, UAE</span>
      <div class="socials">
        <a href="https://facebook.com/media87hq" aria-label="Facebook">f</a>
        <a href="https://www.instagram.com/media87hq/" aria-label="Instagram">◎</a>
        <a href="https://www.youtube.com/@media87hq" aria-label="YouTube">▶</a>
      </div>
    </div>
  </div>
</footer>`;
}

function cta(
  title = "What should the next useful change be?",
  body = "Bring the current situation, the target outcome and the constraint. We will help identify the smallest useful next step.",
) {
  return `<section>
  <div class="wrap">
    <div class="cta reveal">
      <span class="tag on-dark">START — Useful next step</span>
      <h2>${escapeHtml(title)}</h2>
      <p>${escapeHtml(body)}</p>
      <a class="btn btn-accent" data-magnet href="/contact-us/">Start a conversation →</a>
      <p class="cta-meta">Clear scope · Human review · Approval before publishing</p>
    </div>
  </div>
</section>`;
}

function signalStrip(signals = []) {
  if (!signals.length) return "";
  return `<div class="detail-signal-strip" aria-label="Page focus">
  <div class="wrap">${signals
    .map(
      (signal, index) =>
        `<span><i>${String(index + 1).padStart(2, "0")}</i>${escapeHtml(signal)}</span>`,
    )
    .join("")}</div>
</div>`;
}

function pageImage(page) {
  if (!page.image) {
    return `<div class="content-hero-system hud" aria-hidden="true">
      <span>MEDIA87 / ${escapeHtml(page.role.toUpperCase())}</span>
      <b>${escapeHtml(page.signals?.[0] || "Clear purpose")}</b>
      <small>${escapeHtml(page.signals?.slice(1).join(" · ") || "Human-reviewed delivery")}</small>
    </div>`;
  }
  return `<figure class="content-hero-image hud">
    <img src="${escapeHtml(localImage(page.image.src))}" alt="${escapeHtml(page.image.alt)}" width="1200" height="900">
    ${page.image.caption ? `<figcaption>${escapeHtml(page.image.caption)}</figcaption>` : ""}
  </figure>`;
}

function renderSections(page) {
  return (page.sections || [])
    .map(
      (section, index) => `<section class="content-block reveal" id="section-${index + 1}">
      <span class="content-index">${String(index + 1).padStart(2, "0")}</span>
      <h2>${escapeHtml(section.title)}</h2>
      <p>${escapeHtml(section.body)}</p>
      ${
        section.items?.length
          ? `<ul class="feature-list">${section.items
              .map((item) => `<li><span aria-hidden="true">✓</span>${escapeHtml(item)}</li>`)
              .join("")}</ul>`
          : ""
      }
    </section>`,
    )
    .join("");
}

function renderProcess(process = []) {
  if (!process.length) return "";
  return `<section class="section-muted process-section">
  <div class="wrap">
    <span class="tag reveal">SYS.PROCESS — Working sequence</span>
    <h2 class="h2" data-split>A clear sequence, with review points.</h2>
    <div class="process-grid">${process
      .map(
        (step, index) => `<article class="process-card reveal">
        <span>${String(index + 1).padStart(2, "0")}</span>
        <h3>${escapeHtml(step)}</h3>
      </article>`,
      )
      .join("")}</div>
  </div>
</section>`;
}

function renderFaq(faq = []) {
  if (!faq.length) return "";
  return `<section>
  <div class="wrap">
    <div class="center">
      <span class="tag reveal">FAQ — Direct answers</span>
      <h2 class="h2" data-split>Questions, answered clearly.</h2>
    </div>
    <div class="faq reveal">${faq
      .map(
        (item, index) => `<div class="faq-item">
        <button class="faq-q" type="button"><span class="q-idx">Q.${String(index + 1).padStart(2, "0")}</span><span>${escapeHtml(item.question)}</span><span aria-hidden="true">＋</span></button>
        <div class="faq-a"><p>${escapeHtml(item.answer)}</p></div>
      </div>`,
      )
      .join("")}</div>
  </div>
</section>`;
}

function renderRelated(related = []) {
  if (!related.length) return "";
  const routeAliases = new Map([
    ["/products/", "/services/"],
    ["/services/seo/", "/local-seo-services/"],
    ["/services/content-creation/", "/services/"],
    [
      "/industries/restaurants-hospitality/",
      "/seo-and-ads-management-for-restaurants/",
    ],
  ]);
  return `<section class="related-section">
  <div class="wrap">
    <span class="tag reveal">NEXT — Continue exploring</span>
    <div class="related-grid">${related
      .map(
        (item) => `<a class="related-card reveal" href="${escapeHtml(routeAliases.get(item.href) || item.href)}">
        <span>Explore</span><b>${escapeHtml(item.label)}</b><i aria-hidden="true">→</i>
      </a>`,
      )
      .join("")}</div>
  </div>
</section>`;
}

function pageTemplate(page, extraHtml = "") {
  const canonical = page.canonicalPath || `/${page.slug}/`;
  return `${head({
    title: page.title,
    description: page.description,
    slug: page.slug,
    noindex: page.noindex,
    canonical,
  })}
<body class="content-page content-page-${escapeHtml(page.role)}">
<div id="progress"></div>
${header()}
<main>
  <section class="page-hero content-hero lab-grid">
    <div class="blob blob-a" data-speed="-0.04"></div>
    <div class="blob blob-b" data-speed="0.03"></div>
    <div class="wrap page-hero-grid">
      <div>
        <nav class="crumbs reveal" aria-label="Breadcrumb"><a href="/">Home</a><span>${escapeHtml(page.title)}</span></nav>
        <span class="tag reveal d1">${escapeHtml(page.eyebrow || page.role)}</span>
        <h1 data-split>${escapeHtml(page.h1)}</h1>
        <p class="lead reveal d2">${escapeHtml(page.description)}</p>
        <div class="page-hero-cta reveal d3">
          <a class="btn btn-primary" data-magnet href="/contact-us/">Discuss this page →</a>
          <a class="btn btn-ghost" href="#page-content">Read the details</a>
        </div>
      </div>
      ${pageImage(page)}
    </div>
  </section>
  ${signalStrip(page.signals)}
  <section class="content-story" id="page-content">
    <div class="wrap content-story-grid">
      <aside class="content-rail reveal">
        <span>PAGE FOCUS</span>
        <strong>${escapeHtml(page.title)}</strong>
        <p>${escapeHtml(page.intro)}</p>
        <a href="/contact-us/">Discuss your situation →</a>
      </aside>
      <div class="content-stack">${renderSections(page)}</div>
    </div>
  </section>
  ${extraHtml}
  ${renderProcess(page.process)}
  <section class="boundary-section">
    <div class="wrap boundary-band reveal">
      <span>BOUNDARIES</span>
      <p>${escapeHtml(page.limitations)}</p>
    </div>
  </section>
  ${renderFaq(page.faq)}
  ${renderRelated(page.related)}
  ${cta(page.ctaTitle, page.ctaBody)}
</main>
${footer()}
<script src="/assets/main.js"></script>
</body>
</html>`;
}

const customPages = [
  {
    slug: "ai-video-creation-service",
    title: "AI Video Creation Service",
    eyebrow: "AI-assisted production",
    h1: "Create video with a clear idea, a usable workflow and human review.",
    description:
      "Media87 plans and produces AI-assisted video concepts, short-form creative, explainers, avatars and campaign adaptations without treating generation as the strategy.",
    intro:
      "The useful starting point is not a tool. It is the audience, message, format, distribution channel and approval standard. AI can then reduce production friction while editors remain responsible for accuracy, brand fit and the final result.",
    role: "service",
    image: {
      src: "/images/live/smart-generation.jpg",
      alt: "Conceptual AI-assisted content production image",
      caption: "Conceptual image representing an AI-assisted production workflow.",
    },
    signals: ["Concept direction", "AI-assisted production", "Human editing", "Channel adaptation"],
    sections: [
      {
        title: "Start with the message and destination",
        body:
          "Define who should watch, what they should understand and where the finished video will run. A paid advert, product explanation, training clip and founder-led social post need different structures.",
        items: ["Audience and offer brief", "Hook and message hierarchy", "Format and channel plan"],
      },
      {
        title: "Use AI where it improves production",
        body:
          "Generation can support storyboards, visual concepts, avatars, voice, scene variations, captions and localisation. The workflow should record what is generated, what is licensed and what requires human correction.",
      },
      {
        title: "Edit for clarity, not novelty",
        body:
          "The final pass checks pace, claims, pronunciation, brand treatment, subtitles, accessibility and the call to action. The goal is a useful piece of communication, not a demonstration of an AI tool.",
      },
    ],
    process: ["Brief and source review", "Concept and script", "Storyboard and generation", "Human edit", "Approval", "Channel delivery"],
    limitations:
      "AI-generated people, voices, products and locations can be misleading. Consent, disclosure, usage rights, factual review and platform policies must be checked for every project. Media87 will not create deceptive endorsements or fabricated evidence.",
    faq: [
      { question: "Do I need to provide footage?", answer: "Not always. The right method depends on authenticity, product detail, budget, channel and whether a generated visual would mislead the audience." },
      { question: "Can one video be adapted for several platforms?", answer: "Yes. The source concept can be reframed for vertical, square and landscape formats, but each version should be edited for the platform rather than cropped blindly." },
      { question: "Can Media87 create an AI avatar?", answer: "An avatar workflow is possible when identity consent, disclosure, approved scripts and usage boundaries are clear." },
    ],
    related: [
      { label: "Explore all services", href: "/services/" },
      { label: "Discuss a video brief", href: "/contact-us/" },
      { label: "Read Media87 articles", href: "/blog/" },
    ],
  },
  {
    slug: "about-us",
    title: "About Media87",
    eyebrow: "Company and direction",
    h1: "Creative solutions, connected to practical business growth.",
    description:
      "Media87 combines strategy, content, local discovery, paid media and AI-enabled customer journeys from its Dubai market context.",
    intro:
      "The rebuilt Media87 story separates what the agency does, how the work is reviewed and which claims still require evidence. Creativity has a job, technology has oversight and strategy stays connected to decisions a business can observe.",
    role: "trust",
    image: {
      src: "/images/live/marketing-meeting.jpg",
      alt: "Conceptual marketing planning workshop",
      caption: "Conceptual campaign photograph, not a portrait of the Media87 team.",
    },
    signals: ["Creative direction", "Technical execution", "Human oversight", "Dubai context"],
    sections: [
      { title: "Creativity with a job", body: "Ideas should clarify the offer, improve the customer journey or make the work easier to understand and use." },
      { title: "Technology with oversight", body: "Automation supports speed and consistency while people retain judgement, approval and responsibility." },
      { title: "Strategy with evidence", body: "Pages, campaigns and workflows should connect to a real customer need and an observable business decision." },
      { title: "Founder-led direction", body: "The live website identifies Muddaser Altaf as Media87’s founder. A fuller biography, credentials and verified channel metrics remain subject to factual approval." },
    ],
    limitations:
      "Team biographies, client relationships, awards, audience metrics, years of experience and performance claims will not be expanded beyond approved evidence.",
    faq: [
      { question: "Where is Media87 based?", answer: "Dubai is Media87’s visible operating context. International enquiries can be discussed when the service and delivery model fit." },
      { question: "Does Media87 use AI for every project?", answer: "No. AI is used where it improves the workflow. The method should follow the problem, risk and customer experience." },
    ],
    related: [
      { label: "Explore services", href: "/services/" },
      { label: "Meet the authors", href: "/authors-team/" },
      { label: "Contact Media87", href: "/contact-us/" },
    ],
  },
];

function contactPage() {
  const page = {
    slug: "contact-us",
    title: "Contact Media87",
    description:
      "Talk to Media87 about local SEO, paid media, content, AI conversations or practical automation.",
  };
  return `${head(page)}
<body class="content-page contact-page">
<div id="progress"></div>
${header()}
<main>
  <section class="contact-stage lab-grid">
    <div class="wrap contact-heading">
      <span class="tag reveal">CONTACT — Start with the problem</span>
      <h1 data-split>Tell us where growth is getting stuck.</h1>
      <p class="lead reveal d2">Share the outcome, the current situation and the handoff causing the most friction. Media87 can then recommend the smallest useful next step.</p>
    </div>
    <div class="wrap contact-grid">
      <div class="contact-form tally-form-card reveal" id="contact-form">
        <div class="form-heading">
          <span>PROJECT BRIEF</span><strong>A few useful details</strong>
          <p>Share your contact details and what you would like to improve. Media87 will review the enquiry and recommend a practical next step.</p>
        </div>
        <div class="tally-embed-wrap">
          <iframe
            class="tally-embed"
            data-tally-src="https://tally.so/embed/aQXBzB?alignLeft=1&amp;hideTitle=1&amp;transparentBackground=1&amp;dynamicHeight=1"
            src="https://tally.so/embed/aQXBzB?alignLeft=1&amp;hideTitle=1&amp;transparentBackground=1&amp;dynamicHeight=1"
            loading="eager"
            width="100%"
            height="620"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
            title="Contact Media87"
          ></iframe>
        </div>
        <p class="form-privacy tally-privacy">This form is provided by Tally. Your details are used to respond to your enquiry. See the <a href="/privacy-policy/">privacy policy</a>.</p>
        <noscript><p class="form-noscript">Open the <a href="https://tally.so/r/aQXBzB">Media87 contact form</a>, or email <a href="mailto:hello@media87.com">hello@media87.com</a>.</p></noscript>
      </div>
      <aside class="contact-panel reveal d2 hud">
        <span class="tag">DIRECT CONTACT</span>
        <h2>Choose the easiest route.</h2>
        <div class="contact-links">
          <a href="mailto:hello@media87.com"><span>Email</span><b>hello@media87.com</b></a>
          <a href="tel:+971503321743"><span>Call</span><b>+971 50 332 1743</b></a>
          <a href="${consultationUrl}"><span>Guided brief</span><b>Open consultation chat</b></a>
        </div>
        <p>Based in Dubai. International enquiries are welcome when the scope fits.</p>
        <a class="btn btn-ghost" href="/services/">Explore services first</a>
      </aside>
    </div>
  </section>
</main>
${footer()}
<script src="https://tally.so/widgets/embed.js" async></script>
<script src="/assets/main.js"></script>
</body>
</html>`;
}

function videoPortfolio() {
  const videos = [
    ["oUkmajfjjWw", "AI television advert concept"],
    ["JrQtqVrLDmc", "AI clothing mock-up"],
    ["XtKawsPWaqE", "Motivational short-form story"],
    ["VExavVNg1s4", "AI narrative concept"],
    ["Y8qq0MIVGRA", "Media87 AI content promo"],
    ["k9WLLAxQScQ", "Reputation management explainer"],
  ];
  return `<section class="portfolio-section">
  <div class="wrap">
    <span class="tag reveal">PORTFOLIO — Selected examples</span>
    <h2 class="h2" data-split>Formats already explored by Media87.</h2>
    <p class="lead reveal d2">Explore selected Media87 video concepts across advertising, product, narrative and short-form formats.</p>
    <div class="video-grid">${videos
      .map(
        ([id, title], index) => `<a class="video-card reveal" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noreferrer">
        <span>${String(index + 1).padStart(2, "0")}</span><b>${escapeHtml(title)}</b><i>Watch example ↗</i>
      </a>`,
      )
      .join("")}</div>
  </div>
</section>`;
}

function articleBlocks(post, clean) {
  if (clean) {
    const headings = new Set(clean.headings.map((heading) => heading.trim()));
    return clean.paragraphs
      .map((paragraph) =>
        paragraph
          .trim()
          .replaceAll("[your number]", "+971 50 332 1743")
          .replaceAll(" AI-Powered IMAP Email Auto-Resp…", ""),
      )
      .filter(Boolean)
      .map((paragraph) => {
        const heading =
          headings.has(paragraph) ||
          (paragraph.length < 72 &&
            !/[.!?]$/.test(paragraph) &&
            !paragraph.startsWith("http"));
        return heading
          ? `<h2>${escapeHtml(paragraph)}</h2>`
          : `<p>${escapeHtml(paragraph)}</p>`;
      })
      .join("");
  }

  const blocks = [];
  const html = post.content?.rendered || "";
  const pattern = /<(h2|h3|p|li)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  for (const match of html.matchAll(pattern)) {
    const text = stripHtml(match[2]);
    if (!text || text.length < 2) continue;
    const tag = match[1].toLowerCase();
    blocks.push(
      tag === "h2" || tag === "h3"
        ? `<${tag}>${escapeHtml(text)}</${tag}>`
        : `<p>${escapeHtml(text)}</p>`,
    );
  }
  return blocks.join("");
}

function categoryForPost(post, clean = cleanArticleMap.get(post.slug)) {
  if (clean?.category) return clean.category;
  if (post.slug.includes("seo")) return "SEO";
  if (post.slug.includes("ads")) return "Paid media";
  if (post.slug.includes("prompt")) return "AI workflows";
  if (post.slug.includes("reputation")) return "Reputation";
  return "Media87 guide";
}

function imageForPost(post, clean = cleanArticleMap.get(post.slug)) {
  return (
    localImage(clean?.image) ||
    (post.slug.includes("reputation")
      ? "/assets/img/site/recovered/reputation-management.jpg"
      : "/assets/img/site/live/ai-marketing.jpeg")
  );
}

function articleCommercialLink(category) {
  if (/paid media/i.test(category)) {
    return {
      href: "/ads-management/",
      label: "Review Media87 ads management",
    };
  }
  if (/SEO/i.test(category)) {
    return {
      href: "/local-seo-services/",
      label: "Review Media87 local SEO services",
    };
  }
  if (/reputation/i.test(category)) {
    return {
      href: "/localzen/",
      label: "Explore the LocalZen reputation workflow",
    };
  }
  if (/AI|automation|workflow/i.test(category)) {
    return {
      href: "/ai-powered-conversations/",
      label: "Explore Media87 AI conversation systems",
    };
  }
  return { href: "/services/", label: "Explore Media87 services" };
}

function articlePage(post) {
  const clean = cleanArticleMap.get(post.slug);
  const title = stripHtml(post.title?.rendered) || clean?.title || post.slug;
  const description =
    clean?.description ||
    `A practical Media87 guide to ${title.toLowerCase()}.`;
  const category = categoryForPost(post, clean);
  const image = imageForPost(post, clean);
  const commercialLink = articleCommercialLink(category);
  const relatedArticles = livePosts
    .filter(
      (candidate) =>
        candidate.slug !== post.slug &&
        categoryForPost(candidate) === category,
    )
    .slice(0, 3);
  const words = stripHtml(post.content?.rendered).split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(3, Math.ceil(words / 220));
  return `${head({ title, description, slug: post.slug, noindex: true })}
<body class="content-page article-page">
<div id="progress"></div>
${header()}
<main>
  <article>
    <header class="article-hero lab-grid">
      <div class="wrap">
        <nav class="crumbs reveal" aria-label="Breadcrumb"><a href="/">Home</a><a href="/blog/">Blog</a><span>${escapeHtml(category)}</span></nav>
        <span class="tag reveal d1">${escapeHtml(category)}</span>
        <h1 data-split>${escapeHtml(title)}</h1>
        <p class="lead reveal d2">${escapeHtml(description)}</p>
        <div class="article-meta reveal d3"><span>By <a href="/authors-team/">Media87 Editorial</a></span><span>${escapeHtml(category)}</span><span>${readingTime} min read</span><span>Updated ${escapeHtml(String(post.modified).slice(0, 10))}</span></div>
        <figure class="article-lead-image reveal d3"><img src="${escapeHtml(image)}" alt="Conceptual illustration for ${escapeHtml(title)}" width="1600" height="900"></figure>
      </div>
    </header>
    <section class="article-section">
      <div class="wrap article-layout">
        <aside class="article-rail">
          <span>ABOUT THIS GUIDE</span>
          <strong>Practical context</strong>
          <p>Use this guide as a starting point, then confirm changing platform rules, prices, local requirements and implementation details before acting.</p>
          <a href="/editorial-guidelines/">Editorial guidelines →</a>
        </aside>
        <div class="article-body">
          ${articleBlocks(post, clean)}
          <aside class="article-trust-box">
            <span>USEFUL NEXT STEP</span>
            <h2>Apply the guidance to your actual situation.</h2>
            <p>Check the goal, available evidence, platform constraints and responsible owner before turning any recommendation into a live campaign or workflow.</p>
            <div>
              <a href="${commercialLink.href}">${escapeHtml(commercialLink.label)} →</a>
              <a href="/editorial-guidelines/">Read the editorial standard →</a>
              <a href="/contact-us/">Report a correction →</a>
            </div>
          </aside>
          ${
            relatedArticles.length
              ? `<section class="article-related" aria-labelledby="related-articles">
              <span>CONTINUE READING</span>
              <h2 id="related-articles">Related ${escapeHtml(category)} guides</h2>
              <div>${relatedArticles
                .map(
                  (candidate) =>
                    `<a href="/${candidate.slug}/">${escapeHtml(stripHtml(candidate.title?.rendered) || candidate.slug)} <i aria-hidden="true">→</i></a>`,
                )
                .join("")}</div>
            </section>`
              : ""
          }
        </div>
      </div>
    </section>
  </article>
  ${cta("Need help applying this to your business?", "Bring the current situation, target outcome and constraints. Media87 will help identify a practical next step.")}
</main>
${footer()}
<script src="/assets/main.js"></script>
</body>
</html>`;
}

function blogPage() {
  const cards = livePosts
    .map((post) => {
      const clean = cleanArticleMap.get(post.slug);
      return {
        slug: post.slug,
        title: stripHtml(post.title?.rendered) || clean?.title,
        description:
          clean?.description ||
          `A practical Media87 guide to ${(stripHtml(post.title?.rendered) || clean?.title).toLowerCase()}.`,
        category: categoryForPost(post, clean),
        date: post.date,
        image: imageForPost(post, clean),
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
  const featured = cards[0];
  return `${head({
    title: "Media87 Blog",
    description:
      "Media87 guides about SEO, paid media, AI workflows, content and practical digital growth.",
    slug: "blog",
  })}
<body class="content-page blog-page">
<div id="progress"></div>
${header()}
<main>
  <section class="page-hero blog-hero lab-grid">
    <div class="wrap">
      <span class="tag reveal">BLOG — Useful posts</span>
      <h1 data-split>Practical guides for clearer digital decisions.</h1>
      <p class="lead reveal d2">Browse practical guides about search visibility, paid media, content, reputation and responsible AI workflows.</p>
    </div>
  </section>
  <section class="blog-library">
    <div class="wrap">
      <a class="blog-feature reveal" href="/${featured.slug}/">
        <img src="${escapeHtml(featured.image)}" alt="Illustration for ${escapeHtml(featured.title)}" width="1200" height="800">
        <div><span>${escapeHtml(featured.category)} · Latest</span><h2>${escapeHtml(featured.title)}</h2><p>${escapeHtml(featured.description)}</p><b>Read the guide →</b></div>
      </a>
      <div class="blog-grid">${cards
        .map(
          (article) => `<a class="blog-card reveal" href="/${article.slug}/">
          <div class="blog-card-media"><img src="${escapeHtml(article.image)}" alt="Illustration for ${escapeHtml(article.title)}" width="800" height="500" loading="lazy"></div>
          <span>${escapeHtml(article.category)}</span>
          <h2>${escapeHtml(article.title)}</h2>
          <p>${escapeHtml(article.description)}</p>
          <b>Read article →</b>
        </a>`,
        )
        .join("")}</div>
    </div>
  </section>
</main>
${footer()}
<script src="/assets/main.js"></script>
</body>
</html>`;
}

function writeRoute(slug, html) {
  const dir = slug ? path.join(architectureDir, slug) : architectureDir;
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html);
}

function evidenceSafeStats(label, items) {
  return `<!-- ============ CAPABILITY SIGNALS ============ -->
<div class="stats">
  <p class="stats-head">// ${escapeHtml(label)}</p>
  <div class="wrap stats-grid">
    ${items
      .map(
        ([value, title], index) =>
          `<div class="stat reveal${index ? ` d${Math.min(index, 3)}` : ""}"><b>${escapeHtml(value)}</b><span>${escapeHtml(title)}</span></div>`,
      )
      .join("\n    ")}
  </div>
</div>`;
}

function consultativeScope(kicker, title, body) {
  return `<!-- ============ SCOPE ============ -->
<section class="section-muted">
  <div class="wrap">
    <div class="center">
      <span class="tag reveal">${escapeHtml(kicker)}</span>
      <h2 class="h2" data-split>${escapeHtml(title)}</h2>
      <p class="lead reveal d2">${escapeHtml(body)}</p>
    </div>
    <div class="grid-3" style="margin-top:56px">
      <article class="card reveal"><span class="idx">/01</span><h3>Current situation</h3><p>Review the locations, channels, content, tracking and customer journey already in place.</p></article>
      <article class="card reveal d1"><span class="idx">/02</span><h3>Useful scope</h3><p>Choose the smallest combination of work that can address the real bottleneck.</p></article>
      <article class="card reveal d2"><span class="idx">/03</span><h3>Approved proposal</h3><p>Confirm responsibilities, deliverables, review points and commercial terms before work begins.</p></article>
    </div>
  </div>
</section>

<!-- ============ CTA ============ -->`;
}

function improveExisting(route, input) {
  let html = input;

  const sharedReplacements = new Map([
    [
      "turn your traffic into qualified leads — faster than any traditional agency.",
      "help turn useful traffic into clearer enquiries and customer journeys.",
    ],
    [
      "Efficiency is the whole game. AI solutions are faster, more reliable, and scale further than traditional marketing ever could.",
      "Efficiency matters, but every workflow still needs clear ownership, human review and a useful customer outcome.",
    ],
    [
      "AI-driven pages & forms in minutes",
      "AI-assisted pages and forms",
    ],
    [
      "Landing pages launched fast — no coding required.",
      "Reusable systems can reduce production friction while keeping the final result reviewed.",
    ],
    [
      "Mobile-first & lightning-fast",
      "Mobile-first and performance-aware",
    ],
    [
      "SEO-friendly by default, on every device.",
      "Responsive foundations, followed by technical and editorial checks.",
    ],
    [
      "Memorable Ads, Measurable Results",
      "Memorable Ads, Measured Carefully",
    ],
    [
      "Proven Results & Optimization",
      "Reviewed Signals & Optimization",
    ],
    [
      "Watch your online reputation soar.",
      "Review reputation trends and respond with a consistent process.",
    ],
    [
      "Website review widgets (270% conversion boost)",
      "Website review widgets",
    ],
    [
      "Display live reviews on your site — a proven 270% conversion boost that turns visitors into loyal customers.",
      "Display approved live reviews on your site so visitors can evaluate recent customer feedback in context.",
    ],
    [
      ", a tech and AI creator with a combined following of 1.5 million.",
      ", who leads the agency’s technology, AI and content direction.",
    ],
    [
      "Packages range from a few thousand dirhams per month upward depending on platforms and campaign complexity. We evaluate your goals and budget, then propose a customized package.",
      "Pricing depends on the channels, content, locations, integrations and level of ongoing management. Media87 reviews the scope first and then proposes clear commercial terms.",
    ],
    [
      "Response within 24h · Dubai, UAE · GMT+4",
      "Dubai, UAE · GMT+4 · Scope confirmed before work begins",
    ],
  ]);
  for (const [from, to] of sharedReplacements) {
    html = html.replaceAll(from, to);
  }

  if (route === "") {
    html = html
      .replace(
        "<b>24/7 lead capture</b><small>never miss a visitor</small>",
        "<b>Always-available enquiry path</b><small>route visitors at any time</small>",
      )
      .replace(
        "Everything you need to grow, in one place.",
        "Connected services for clearer digital delivery.",
      )
      .replace(
        "From SEO to AI video — one team, one strategy, measurable results. No juggling multiple vendors.",
        "From SEO to AI video — one connected delivery plan with visible review points.",
      )
      .replace(
        "Dominate Google Maps and local search. GEO, SEO and AIO handled end-to-end so nearby customers find you first.",
        "Improve visibility across Google Maps and local search with connected local, technical and content work.",
      )
      .replace(
        "The AI chatbot that sells while you sleep.",
        "An AI chatbot designed to support enquiries and handoff.",
      )
      .replace(
        '<div><span class="dot v"></span><span><b>5.0 client rating</b><small>verified reviews</small></span></div>',
        '<div><span class="dot v"></span><span><b>Human-reviewed delivery</b><small>quality checked before launch</small></span></div>',
      )
      .replace(
        '<div><span class="dot v"></span><span><b>1.5M followers</b><small>founder\'s audience</small></span></div>',
        '<div><span class="dot v"></span><span><b>Founder-led direction</b><small>hands-on strategy</small></span></div>',
      )
      .replace(
        /<!-- ============ STATS ============ -->[\s\S]*?<!-- ============ WHY US ============ -->/,
        `${evidenceSafeStats("A practical growth system", [
          ["01", "Discovery and scope"],
          ["02", "Connected delivery"],
          ["03", "Human review"],
          ["04", "Measured iteration"],
        ])}\n\n<!-- ============ WHY US ============ -->`,
      )
      .replace(
        /<!-- ============ TESTIMONIALS ============ -->[\s\S]*?<!-- ============ FAQ ============ -->/,
        `<!-- ============ DELIVERY PRINCIPLES ============ -->
<section id="results" class="testis lab-grid">
  <div class="wrap">
    <div class="center">
      <span class="tag reveal">LOG.03 — Delivery principles</span>
      <h2 class="h2" data-split>What clients should expect.</h2>
      <p class="lead reveal d2">Clear scope, visible assumptions and review points before anything becomes public.</p>
    </div>
    <div class="testi-grid">
      <article class="testi reveal"><span class="idx">/01</span><h3>Start with the constraint</h3><p>Identify the customer, business and workflow problem before choosing a channel or tool.</p></article>
      <article class="testi reveal d1"><span class="idx">/02</span><h3>Use evidence carefully</h3><p>Do not publish rankings, performance figures or relationships that cannot be verified.</p></article>
      <article class="testi reveal d2"><span class="idx">/03</span><h3>Keep human ownership</h3><p>Automation supports the work; people retain judgement, approval and responsibility.</p></article>
      <article class="testi reveal"><span class="idx">/04</span><h3>Make handoffs visible</h3><p>Content, forms, campaigns and conversations should lead to a clear next action.</p></article>
      <article class="testi reveal d1"><span class="idx">/05</span><h3>Design for real devices</h3><p>Pages should remain readable, responsive and useful with motion reduced or disabled.</p></article>
      <article class="testi reveal d2"><span class="idx">/06</span><h3>Improve from observation</h3><p>Measure what matters, record the baseline and revise only after there is enough signal.</p></article>
    </div>
  </div>
</section>

<!-- ============ FAQ ============ -->`,
      );
  }

  if (route === "ai-powered-conversations") {
    html = html
      .replace(
        /<!-- ============ STATS ============ -->[\s\S]*?<!-- ============ HOW IT WORKS ============ -->/,
        `${evidenceSafeStats("Conversation workflow", [
          ["01", "Approved knowledge"],
          ["02", "Visitor response"],
          ["03", "Qualification rules"],
          ["04", "Human handoff"],
        ])}\n\n<!-- ============ HOW IT WORKS ============ -->`,
      )
      .replace(
        "Start converting visitors into qualified leads and booked meetings today — join thousands of businesses already seeing incredible results.",
        "Plan a conversation flow that answers useful questions, qualifies enquiries and hands the right context to your team.",
      )
      .replace(
        "No commitment · Live in days · Works 24/7",
        "Clear scope · Human review · Monitored handoff",
      )
      .replace("Get Started Free", "Discuss the workflow");
  }

  if (route === "ads-management") {
    html = html
      .replace(
        "ROAS 4.8× · cost per lead down 37% after the creative refresh.",
        "Illustrative campaign view — connect verified account data before reporting.",
      )
      .replace(
        "Search campaign — position 1, CTR 9.2%",
        "Search campaign view — results depend on live targeting, budget and competition.",
      )
      .replace(
        "100+ campaigns managed.",
        "Campaign work with visible controls.",
      )
      .replace(
        "6+ years of digital advertising experience, working around the clock for you.",
        "Strategy, creative, targeting, tracking and review should remain connected.",
      )
      .replace(
        /<!-- ============ PRICING ============ -->[\s\S]*?<!-- ============ CTA ============ -->/,
        consultativeScope(
          "SCOPE — Before media spend",
          "Build the plan around the account, not a placeholder price.",
          "Platform mix, creative volume, geography, tracking maturity and approval requirements change the work. Media87 will confirm a tailored scope before launch.",
        ),
      );
  }

  if (route === "local-seo-services") {
    html = html
      .replace(
        "Your business — pinned at the top of Google Maps with a 4.9★ rating.",
        "Illustrative map result — placement and rating must come from verified live data.",
      )
      .replace(
        "100+ local businesses ranked.",
        "Local signals, reviewed together.",
      )
      .replace(
        "6+ years of digital automation experience, applied to your neighborhood.",
        "Profile, website, reputation and citation work should support one consistent local entity.",
      )
      .replace(
        "We monitor every ranking signal and refine continuously, so your business stays seen, trusted and chosen.",
        "We review the signals available to us and refine the work around visibility, accuracy and the customer journey.",
      )
      .replace(
        /<!-- ============ PRICING ============ -->[\s\S]*?<!-- ============ CTA ============ -->/,
        consultativeScope(
          "SCOPE — Local search work",
          "Match the scope to the locations and the baseline.",
          "Location count, profile condition, website access, citation cleanup and content needs determine the useful scope. Pricing follows an approved review.",
        ),
      );
  }

  if (route === "localzen") {
    html = html
      .replace(
        "LocalZen helps local businesses collect more Google reviews, filter negative feedback before it goes public, and showcase a 5-star reputation everywhere — from $49/month.",
        "LocalZen helps local businesses request feedback, monitor reviews and respond through a clearer reputation workflow.",
      )
      .replaceAll("Five-star", "Customer")
      .replaceAll("5-Star", "Review")
      .replaceAll("5-star", "positive")
      .replace(
        /<!-- ============ PRICING ============ -->[\s\S]*?<!-- ============ CTA ============ -->/,
        consultativeScope(
          "SCOPE — Reputation workflow",
          "Choose the workflow before the plan.",
          "Request volume, locations, channels, integrations and management responsibility determine the useful setup. Product availability and pricing require confirmation.",
        ),
      );
  }

  if (route === "chatzen") {
    html = html
      .replace(
        "6+ years of automation experience.",
        "A conversation system with human ownership.",
      )
      .replace(
        "100+ successful AI chatbot integrations delivered by Media87 across industries.",
        "Knowledge, guardrails, escalation and review are treated as one connected workflow.",
      );
  }

  if (route === "digital-marketing-services-in-dubai") {
    html = html.replace(
      'Search "best [service] dubai" → your page, position 1.',
      'Search "[service] dubai" → a relevant page designed to compete for qualified discovery.',
    );
  }

  return html;
}

const seoOverrides = new Map(
  Object.entries({
    "": {
      title: "Media87 | Digital Marketing, Local SEO & Practical AI Systems",
      description:
        "Media87 connects digital marketing, local discovery, paid media, content and practical AI systems around clearer customer journeys.",
    },
    services: {
      title: "Digital Marketing, Local SEO & AI Services",
      description:
        "Explore Media87 services for local SEO, paid media, AI conversations, content, reputation workflows and connected digital delivery.",
    },
    "ads-management": {
      title: "Google, Meta & TikTok Ads Management",
      description:
        "Media87 plans and manages paid campaigns across Google, Meta and TikTok with clear scope, tracking, creative review and human oversight.",
    },
    "ai-powered-conversations": {
      title: "AI Conversation Systems for Lead Qualification",
      description:
        "Plan AI-assisted conversation flows that answer approved questions, qualify enquiries, support booking and hand useful context to people.",
    },
    chatzen: {
      title: "ChatZen AI Chatbot and Lead Qualification",
      description:
        "Explore ChatZen as a Media87 conversation workflow for answering questions, capturing lead context and supporting a clear human handoff.",
    },
    localzen: {
      title: "LocalZen Review Management & Local Visibility Platform",
      description:
        "Collect honest reviews, prepare consistent replies, publish local content, display customer proof and monitor visibility with LocalZen. Book a guided demo.",
    },
    "local-seo-services": {
      title: "Local SEO Services for Business Discovery",
      description:
        "Media87 reviews business profiles, local landing pages, citations, reputation signals and customer journeys as one connected local SEO system.",
    },
    "digital-marketing-services-in-dubai": {
      title: "Digital Marketing Services in Dubai",
      description:
        "Media87 provides digital marketing services from its Dubai market context, connecting strategy, content, paid media, SEO and practical automation.",
    },
    "seo-for-dubai-businesses": {
      title: "SEO for Dubai Businesses: Practical Guide",
      description:
        "A practical guide to technical, on-page, local and content SEO considerations for businesses serving customers in Dubai.",
    },
    "human-like-ai-calling-bots": {
      title: "Human-Like AI Calling Bots: Workflow & Safeguards",
      description:
        "Understand the workflow, handoff rules, consent, quality controls and limitations involved in business AI calling systems.",
    },
    "geo-tagging-images-for-seo": {
      title: "Geo-Tag Images for SEO: Browser Tool",
      description:
        "Add GPS and descriptive metadata to supported image files in your browser, with visible privacy notes and downloadable output.",
    },
    "ai-video-creation-service": {
      title: "AI Video Creation Service",
      description:
        "Media87 plans AI-assisted video concepts, scripts, generation, editing and channel adaptations with human review and clear usage boundaries.",
    },
    "contact-us": {
      title: "Contact Media87",
      description:
        "Contact Media87 about local SEO, paid media, content, AI conversations, reputation workflows or a connected digital project.",
    },
    "about-us": {
      title: "About Media87",
      description:
        "Learn how Media87 approaches creative direction, technical execution, practical AI systems and human-reviewed digital delivery.",
    },
    faqs: {
      title: "Media87 Frequently Asked Questions",
      description:
        "Clear answers about Media87 services, working methods, project scope, practical AI use, review points and next steps.",
    },
    "seo-and-ads-management-for-restaurants": {
      title: "SEO & Ads Management for Restaurants",
      description:
        "Media87 connects restaurant search visibility, paid campaigns, reputation signals, local pages and enquiry or booking journeys.",
    },
    "llm-package": {
      title: "LLM Visibility Package",
      description:
        "A Media87 package framework for reviewing crawl access, entity clarity, source content, citations and visibility across AI-assisted discovery.",
    },
    prompts: {
      title: "Media87 Prompt Library",
      description:
        "A practical prompt library for structured content, research, automation and review workflows, with human judgement kept in the process.",
    },
    "authors-team": {
      title: "Media87 Authors and Team",
      description:
        "Review Media87 authorship, editorial responsibilities and the evidence boundaries applied to company and article content.",
    },
    "editorial-guidelines": {
      title: "Media87 Editorial Guidelines",
      description:
        "How Media87 researches, reviews, humanises, sources, corrects and approves commercial and editorial content.",
    },
    "privacy-policy": {
      title: "Media87 Privacy Policy",
      description:
        "How Media87 handles contact enquiries, website measurement, advertising technology, processors, retention and privacy requests.",
    },
    "terms-of-services": {
      title: "Media87 Terms of Services",
      description:
        "Terms governing use of the Media87 website and the relationship between public information, accepted proposals and third-party platforms.",
    },
    blog: {
      title: "Media87 Blog",
      description:
        "Media87 guides about SEO, paid media, practical AI workflows, content, local discovery and digital decision-making.",
    },
  }),
);

const serviceRoutes = new Set([
  "services",
  "ads-management",
  "ai-powered-conversations",
  "local-seo-services",
  "digital-marketing-services-in-dubai",
  "ai-video-creation-service",
  "seo-and-ads-management-for-restaurants",
  "llm-package",
]);
const softwareRoutes = new Set(["chatzen", "localzen"]);
const articleRouteMap = new Map(livePosts.map((post) => [post.slug, post]));

function extractAttribute(html, pattern) {
  const match = html.match(pattern);
  return match ? decodeHtml(match[1]) : "";
}

function visibleHeading(html) {
  return stripHtml(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || "");
}

function routeUrl(route) {
  return `${siteUrl}/${route ? `${route}/` : ""}`;
}

function pageImageUrl(html) {
  const body = html.split("</head>")[1] || html;
  const candidates = [
    body.match(/article-lead-image[\s\S]*?<img\b[^>]*src="([^"]+)"/i)?.[1],
    body.match(/content-hero-image[\s\S]*?<img\b[^>]*src="([^"]+)"/i)?.[1],
  ].filter(Boolean);
  const src = candidates[0];
  if (!src) return socialImageUrl;
  if (/^https?:/i.test(src)) return src;
  return `${siteUrl}${src.startsWith("/") ? src : `/${src}`}`;
}

function breadcrumbNode(route, html, pageName, pageUrl) {
  if (!route || !/class="crumbs\b/i.test(html)) return null;
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${siteUrl}/`,
    },
  ];
  if (articleRouteMap.has(route)) {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: `${siteUrl}/blog/`,
    });
  }
  items.push({
    "@type": "ListItem",
    position: items.length + 1,
    name: pageName,
    item: pageUrl,
  });
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: items,
  };
}

function schemaGraphFor({
  route,
  html,
  title,
  description,
  canonicalUrl,
  imageUrl,
}) {
  const pageUrl = routeUrl(route);
  const pageName = visibleHeading(html) || title;
  const graph = [];
  if (route === "" || route === "about-us") {
    graph.push({
      "@type": "Organization",
      "@id": organizationId,
      name: "Media87",
      url: `${siteUrl}/`,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/assets/logo.png`,
      },
      email: "hello@media87.com",
      telephone: "+971503321743",
      sameAs: [
        "https://facebook.com/media87hq",
        "https://www.instagram.com/media87hq/",
        "https://www.youtube.com/@media87hq",
      ],
    });
  }
  if (route === "") {
    graph.push({
      "@type": "WebSite",
      "@id": websiteId,
      url: `${siteUrl}/`,
      name: "Media87",
      inLanguage: "en",
      publisher: { "@id": organizationId },
    });
  }
  const breadcrumb = breadcrumbNode(route, html, pageName, pageUrl);
  if (breadcrumb) graph.push(breadcrumb);
  const webpage = {
    "@type":
      route === "about-us"
        ? "AboutPage"
        : route === "contact-us"
          ? "ContactPage"
          : route === "blog" || route === "prompts"
            ? "CollectionPage"
            : "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: title,
    description,
    inLanguage: "en",
    isPartOf: { "@id": websiteId },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: imageUrl,
    },
  };
  if (canonicalUrl !== pageUrl) webpage.sameAs = canonicalUrl;
  if (breadcrumb) webpage.breadcrumb = { "@id": breadcrumb["@id"] };
  graph.push(webpage);

  if (serviceRoutes.has(route)) {
    graph.push({
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: pageName,
      description,
      url: pageUrl,
      provider: { "@id": organizationId },
      mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
    });
  } else if (softwareRoutes.has(route)) {
    const software = {
      "@type": "SoftwareApplication",
      "@id": `${pageUrl}#software`,
      name: route === "localzen" ? "LocalZen" : pageName,
      description,
      url: pageUrl,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      publisher: { "@id": organizationId },
      mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
    };
    if (route === "localzen") {
      software.offers = [
        {
          "@type": "Offer",
          name: "LocalZen AI Plan",
          price: "49",
          priceCurrency: "USD",
          url: `${pageUrl}#plans`,
          description:
            "Monthly self-managed LocalZen subscription for one location.",
        },
        {
          "@type": "Offer",
          name: "LocalZen Managed Plan",
          price: "249",
          priceCurrency: "USD",
          url: `${pageUrl}#plans`,
          description:
            "Monthly LocalZen subscription with Media87 management support.",
        },
      ];
    }
    graph.push(software);
  } else if (route === "geo-tagging-images-for-seo") {
    graph.push({
      "@type": "WebApplication",
      "@id": `${pageUrl}#application`,
      name: pageName,
      description,
      url: pageUrl,
      applicationCategory: "MultimediaApplication",
      creator: { "@id": organizationId },
      mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
    });
  } else if (articleRouteMap.has(route)) {
    const post = articleRouteMap.get(route);
    const articlePublisher = {
      "@type": "Organization",
      "@id": organizationId,
      name: "Media87",
      url: `${siteUrl}/`,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/assets/logo.png`,
      },
    };
    graph.push({
      "@type": "Article",
      "@id": `${pageUrl}#article`,
      headline: pageName,
      description,
      url: pageUrl,
      image: imageUrl,
      datePublished: String(post.date).slice(0, 10),
      dateModified: String(post.modified).slice(0, 10),
      author: {
        "@type": "Organization",
        name: "Media87 Editorial",
        url: `${siteUrl}/authors-team/`,
      },
      publisher: articlePublisher,
      mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
    });
  }
  return graph;
}

function enhanceRouteSeo(route, input) {
  const override = seoOverrides.get(route) || {};
  const currentTitle = extractAttribute(input, /<title>([\s\S]*?)<\/title>/i);
  const currentDescription = extractAttribute(
    input,
    /<meta\s+name="description"\s+content="([^"]*)"/i,
  );
  const currentCanonical = extractAttribute(
    input,
    /<link\s+rel="canonical"\s+href="([^"]+)"/i,
  );
  const currentRobots = extractAttribute(
    input,
    /<meta\s+name="robots"\s+content="([^"]+)"/i,
  );
  const title = override.title || currentTitle || visibleHeading(input);
  const description = override.description || currentDescription;
  const canonicalUrl = currentCanonical || routeUrl(route);
  const noindex = /\bnoindex\b/i.test(currentRobots);
  const imageUrl = pageImageUrl(input);
  const headHtml = input.match(/<head>([\s\S]*?)<\/head>/i)?.[1] || "";
  const headWithoutJsonLd = headHtml.replace(
    /<script\b[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi,
    "",
  );
  const preservedScripts = [
    ...headWithoutJsonLd.matchAll(/<script\b[^>]*>[\s\S]*?<\/script>/gi),
  ]
    .map((match) => match[0])
    .filter((script) => !/\/assets\/(?:consent-tags|site-tags)\.js/i.test(script))
    .join("\n");
  const structuredData = schemaGraphFor({
    route,
    html: input,
    title: brandedTitle(title),
    description,
    canonicalUrl,
    imageUrl,
  });
  let html = input.replace(
    /<head>[\s\S]*?<\/head>/i,
    renderSeoHead({
      title,
      description,
      canonicalUrl,
      noindex,
      ogType: articleRouteMap.has(route) ? "article" : "website",
      imageUrl,
      imageAlt:
        imageUrl === socialImageUrl
          ? "Media87 digital growth systems"
          : `Representative image for ${visibleHeading(input) || title}`,
      structuredData,
      preservedScripts,
    }),
  );
  html = html.replace(
    /<script src="\/assets\/main\.js(?:\?[^"]*)?"><\/script>/g,
    `<script src="/assets/main.js?v=${assetVersion}"></script>`,
  );
  return html;
}

function writeSearchFiles() {
  const entries = [];
  for (const file of listHtmlFiles(architectureDir)) {
    if (path.basename(file) !== "index.html") continue;
    const relativeDir = path.relative(architectureDir, path.dirname(file));
    const route = relativeDir === "" ? "" : relativeDir;
    const html = fs.readFileSync(file, "utf8");
    const robots = extractAttribute(
      html,
      /<meta\s+name="robots"\s+content="([^"]+)"/i,
    );
    const canonical = extractAttribute(
      html,
      /<link\s+rel="canonical"\s+href="([^"]+)"/i,
    );
    if (!/\bnoindex\b/i.test(robots) && canonical === routeUrl(route)) {
      entries.push(canonical);
    }
  }
  entries.sort();
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (url) => `  <url>
    <loc>${escapeHtml(url)}</loc>
    <lastmod>${url.endsWith("/ads-management/") ? "2026-07-28" : "2026-07-26"}</lastmod>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
  fs.writeFileSync(path.join(architectureDir, "sitemap.xml"), sitemap);
  fs.writeFileSync(
    path.join(architectureDir, "robots.txt"),
    `User-agent: *
Allow: /

User-agent: OAI-SearchBot
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`,
  );
  fs.writeFileSync(
    path.join(architectureDir, "_redirects"),
    `/ads-managment /ads-management/ 301
/ads-managment/ /ads-management/ 301
/prompt-database/ /prompts/ 301
`,
  );
  fs.writeFileSync(
    path.join(architectureDir, "llms.txt"),
    `# Media87

> Media87 is a Dubai-based digital marketing and practical AI systems company. Its website covers SEO, paid media, AI-assisted customer conversations, reputation management, content, and related services and products.

## Primary pages

- [Home](${siteUrl}/)
- [Services](${siteUrl}/services/)
- [Ads Management](${siteUrl}/ads-management/)
- [Local SEO Services](${siteUrl}/local-seo-services/)
- [ChatZen](${siteUrl}/chatzen/)
- [LocalZen](${siteUrl}/localzen/)
- [AI Conversation Systems](${siteUrl}/ai-powered-conversations/)
- [AI Video Creation](${siteUrl}/ai-video-creation-service/)

## Editorial and trust

- [Blog](${siteUrl}/blog/)
- [About Media87](${siteUrl}/about-us/)
- [Authors](${siteUrl}/authors-team/)
- [Editorial Guidelines](${siteUrl}/editorial-guidelines/)
- [Contact](${siteUrl}/contact-us/)

Use the canonical page linked above for current service scope, availability, pricing logic, and claims. Rankings, traffic, leads, or AI citations are not guaranteed.
`,
  );
  fs.writeFileSync(
    path.join(architectureDir, "llms-full.txt"),
    `# Media87 website guide

## Organisation

Media87 is a Dubai-based digital marketing and practical AI systems company. The site presents agency services, product pages, editorial guides, and contact information. The canonical website is ${siteUrl}/.

## Services and products

- [Digital marketing services](${siteUrl}/services/) explains the main service categories.
- [Ads Management](${siteUrl}/ads-management/) covers paid campaigns across Google, Meta, and TikTok, including targeting, creative, landing-page alignment, tracking, and review.
- [Local SEO Services](${siteUrl}/local-seo-services/) covers business discovery, website and profile alignment, local proof, and reporting.
- [AI Conversation Systems](${siteUrl}/ai-powered-conversations/) covers approved-answer flows, enquiry qualification, booking support, and human handoff.
- [ChatZen](${siteUrl}/chatzen/) is Media87's customer-conversation and lead-qualification product page.
- [LocalZen](${siteUrl}/localzen/) presents review collection, response, reputation, local-content, and visibility workflows.
- [AI Video Creation](${siteUrl}/ai-video-creation-service/) explains Media87's AI-assisted video service.
- [Restaurant SEO and Ads](${siteUrl}/seo-and-ads-management-for-restaurants/) covers an industry-specific search, paid-media, reputation, and enquiry journey.
- [LLM Package](${siteUrl}/llm-package/) and [LLM Indexing Package](${siteUrl}/llm-indexing-package-cp/) describe services related to clear entity information and machine-readable site content.

## Useful guides and resources

- [Blog](${siteUrl}/blog/) is the main editorial index.
- [Prompts](${siteUrl}/prompts/) contains practical prompt resources.
- [SEO for Dubai Businesses](${siteUrl}/seo-for-dubai-businesses/) explains the Dubai business context for search visibility.
- [Digital Marketing Services in Dubai](${siteUrl}/digital-marketing-services-in-dubai/) explains the connected service approach for Dubai organisations.
- [Human-like AI Calling Bots](${siteUrl}/human-like-ai-calling-bots/) explains voice-conversation workflow considerations.
- [Geo-tagging Images for SEO](${siteUrl}/geo-tagging-images-for-seo/) explains the image-location tool and its limits.

## Trust, policy, and contact

- [About Media87](${siteUrl}/about-us/)
- [Authors](${siteUrl}/authors-team/)
- [Editorial Guidelines](${siteUrl}/editorial-guidelines/)
- [FAQs](${siteUrl}/faqs/)
- [Privacy Policy](${siteUrl}/privacy-policy/)
- [Terms of Services](${siteUrl}/terms-of-services/)
- [Contact Media87](${siteUrl}/contact-us/)

## Interpretation

Treat each linked canonical page as the current source for its own subject. Service availability, prices, integrations, platform behavior, and third-party features can change. Media87 does not guarantee rankings, traffic, leads, advertising returns, rich results, or citation by an AI system.
`,
  );
  fs.writeFileSync(
    path.join(architectureDir, "_headers"),
    `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  X-Frame-Options: SAMEORIGIN
`,
  );
  fs.writeFileSync(
    path.join(architectureDir, "ads.txt"),
    `google.com, pub-6396157876082473, DIRECT, f08c47fec0942fa0200
`,
  );
  const notFound = `${head({
    title: "Page Not Found",
    description:
      "The requested Media87 page could not be found. Use the site navigation to continue.",
    slug: "404",
    noindex: true,
    canonical: "/404.html",
  })}
<body class="content-page">
<div id="progress"></div>
${header()}
<main>
  <section class="contact-stage lab-grid">
    <div class="wrap contact-heading">
      <span class="tag">ERROR 404 — Page not found</span>
      <h1>The page has moved, changed or never existed.</h1>
      <p class="lead">Return to the Media87 homepage, browse services or use the contact page if a working link brought you here.</p>
      <div class="page-hero-cta">
        <a class="btn btn-primary" href="/">Go to the homepage →</a>
        <a class="btn btn-ghost" href="/services/">Browse services</a>
      </div>
    </div>
  </section>
</main>
${footer()}
<script src="/assets/main.js?v=${assetVersion}"></script>
</body>
</html>`;
  fs.writeFileSync(path.join(architectureDir, "404.html"), notFound);
  return entries.length;
}

function listHtmlFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const target = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...listHtmlFiles(target));
    else if (entry.name.endsWith(".html")) files.push(target);
  }
  return files;
}

const selectedRecoveredSlugs = new Set([
  "seo-and-ads-management-for-restaurants",
  "llm-package",
  "prompts",
  "authors-team",
  "editorial-guidelines",
  "privacy-policy",
  "terms-of-services",
  "faqs",
  "llm-indexing-package-cp",
  "thankyou-for-the-subscription",
]);

for (const page of recoveredRootPages) {
  if (!selectedRecoveredSlugs.has(page.slug)) continue;
  let html = pageTemplate(page);
  if (page.slug === "privacy-policy") {
    html = html
      .replace(
        "Analytics, Vimeo, YouTube, chatbot, social and other embeds need accurate disclosure. Click-to-load media reduces unnecessary third-party requests but does not replace disclosure.",
        "Media87 uses Google measurement, Meta advertising measurement and Google AdSense technology. These services may process website usage, browser, device, approximate-location and cookie or similar identifier data. The current public identifiers are Google tag GT-KVFLZP7K, Meta Pixel 942291175461032 and AdSense publisher ca-pub-6396157876082473.",
      )
      .replace(
        "Name relevant processor categories, safeguards and retention logic without promising absolute security. Data should be kept only for an approved purpose and period.",
        "Processors may include Cloudflare for website hosting, Tally for contact-form delivery and submission handling, Google for measurement, advertising and AdSense, and Meta for advertising measurement. Media87 retains enquiry and measurement data only for a relevant business, legal or security purpose and does not promise absolute security.",
      )
      .replace(
        "The final policy should explain applicable access, correction, deletion, objection or complaint routes and identify the responsible contact.",
        "Requests concerning access, correction, deletion, objection or privacy can be sent to hello@media87.com. Visitors can also use browser controls and the relevant provider settings to manage cookies or advertising preferences. Applicable rights and complaint routes depend on the visitor’s location and require final legal confirmation.",
      );
  }
  writeRoute(page.slug, html);
}

for (const page of customPages) {
  const extra = page.slug === "ai-video-creation-service" ? videoPortfolio() : "";
  writeRoute(page.slug, pageTemplate(page, extra));
}

writeRoute("contact-us", contactPage());
writeRoute("blog", blogPage());

for (const post of livePosts) {
  writeRoute(post.slug, articlePage(post));
}

const existingRoutes = [
  "",
  "services",
  "ads-management",
  "ai-powered-conversations",
  "chatzen",
  "localzen",
  "local-seo-services",
  "digital-marketing-services-in-dubai",
  "seo-for-dubai-businesses",
  "human-like-ai-calling-bots",
  "geo-tagging-images-for-seo",
];

for (const route of existingRoutes) {
  const file = path.join(
    route ? path.join(architectureDir, route) : architectureDir,
    "index.html",
  );
  let html = fs.readFileSync(file, "utf8");
  html = html.replace(/<header id="header">[\s\S]*?<\/header>/, header());
  html = html.replace(/<footer>[\s\S]*?<\/footer>/, footer());
  html = improveExisting(route, html);
  fs.writeFileSync(file, html);
}

for (const file of listHtmlFiles(architectureDir)) {
  if (path.basename(file) !== "index.html") continue;
  const relativeDir = path.relative(architectureDir, path.dirname(file));
  const route = relativeDir === "" ? "" : relativeDir;
  const html = fs.readFileSync(file, "utf8");
  fs.writeFileSync(file, enhanceRouteSeo(route, html));
}

const sitemapRoutes = writeSearchFiles();

console.log(
  JSON.stringify(
    {
      existingRoutesUpdated: existingRoutes.length,
      generatedPrimaryRoutes:
        selectedRecoveredSlugs.size + customPages.length + 2,
      generatedArticleRoutes: livePosts.length,
      sitemapRoutes,
      totalHtmlFiles: countHtml(architectureDir),
    },
    null,
    2,
  ),
);

function countHtml(dir) {
  let count = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const target = path.join(dir, entry.name);
    if (entry.isDirectory()) count += countHtml(target);
    else if (entry.name === "index.html") count++;
  }
  return count;
}
