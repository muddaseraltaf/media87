# Media87 Live Route and Local Architecture Audit

Audit date: 26 July 2026  
Live sources checked:

- `https://media87.com/sitemap_index.xml`
- `https://media87.com/page-sitemap.xml`
- `https://media87.com/post-sitemap.xml`
- public WordPress REST page and post collections;
- public Yoast index, robots and canonical metadata.

Local design reference: `main architecture/`

## 1. Architecture confirmed

The approved reference is the light Media87 “growth lab” system in
`main architecture/index.html`.

Its visual language includes:

- warm off-white surfaces;
- black display typography with lime and violet accents;
- dotted laboratory grids, HUD corners and soft gradient fields;
- marquees, reveal motion, floating UI cards, tilt interactions and magnetic
  buttons;
- responsive HTML rendered without depending on client-side JavaScript for the
  main copy.

This reference is plain HTML, CSS and JavaScript. It is not an Astro project.
The separate `site/` implementation uses Next.js/React through the current
Vinext/Vite setup.

The Media87 design is project-specific. Other Site Auto System projects may use
their own visual system while retaining the broader requirements for speed,
responsive behavior and purposeful interaction.

## 2. Current live inventory summary

WordPress currently exposes:

- 29 published page records;
- 27 indexed page records, including `/blog/`;
- 26 URLs in the page sitemap;
- `/blog/` in the post sitemap rather than the page sitemap;
- 25 published posts/articles;
- two published but noindex pages.

The two noindex records are:

- `/llm-indexing-package-cp/` — overlapping LLM package copy;
- `/thankyou-for-the-subscription/` — transaction/system confirmation page.

## 3. Build completion status

The approved local architecture now contains 50 rendered HTML routes:

- 11 improved original architecture routes;
- 12 requested visitor-facing pages, including the blog index;
- two noindex system pages;
- 25 migrated article routes.

All requested visitor-facing routes now exist:

- `/ai-video-creation-service/`
- `/contact-us/`
- `/about-us/`
- `/faqs/`
- `/seo-and-ads-management-for-restaurants/`
- `/llm-package/`
- `/prompts/`
- `/authors-team/`
- `/editorial-guidelines/`
- `/privacy-policy/`
- `/terms-of-services/`
- `/blog/`

The two system routes also exist:

- `/llm-indexing-package-cp/` is noindex and canonicalised to `/llm-package/`;
- `/thankyou-for-the-subscription/` is noindex and retained as a minimal
  transaction page.

The following routes are deliberately absent:

- `/prompt-database/`;
- `/future-growth-lab/`;
- `/workshop/`;
- `/salesbot/`.

The first two were removed by decision. The latter two were not part of the
approved creation list and remain available for a later keep/redirect/retire
decision.

## 4. Existing-page improvement pass

All 11 original architecture pages now use the shared absolute navigation and
footer, including the smaller 32 px mobile header logo.

The pass also:

- removed invented homepage testimonials;
- removed unsupported audience, lead, revenue, conversion and ranking counters;
- replaced placeholder advertising and local-search results with explicitly
  illustrative dashboard language;
- replaced unapproved product and service prices with a scope-first proposal
  process;
- softened guarantees and absolute outcome language;
- retained the approved light lab aesthetic, interactive service map, motion,
  responsive behavior and local media.

## 5. Shared page system

The new pages use a reusable content architecture with:

- purpose-led hero copy and breadcrumbs;
- an optional local image or visual system panel;
- four page-focus signals;
- readable long-form content with a sticky focus rail;
- process steps, boundary statements, FAQs and related-page links;
- shared calls to action, navigation and footer;
- responsive two-column, card-grid and single-column mobile states;
- reduced-motion support.

The contact form intentionally uses a `mailto:` handoff until a production form
endpoint and data-processing flow are approved.

The legal pages are structured working drafts. They still require a legal review
of the actual entity, services, processors, retention rules and jurisdiction
before production.

## 6. Blog and article migration

The blog index and one reusable article template now cover all 25 live article
URLs. The source copy, dates and available local images are retained.

The migrated articles are intentionally marked `noindex,follow` and visibly
labelled “Migration draft”. This prevents the architecture from treating legacy
claims, dates, examples or source gaps as approved content. The later editorial
and SEO pass must review:

1. evidence and source quality;
2. dated facts and product behavior;
3. unsupported statistics and commercial claims;
4. authorship and reviewer identity;
5. overlapping search intent and cannibalisation;
6. internal links, citations, media and final indexability.

The blog index itself is indexable, but it tells readers that the migrated
articles are pending editorial and evidence review.

## 7. Validation result

The reusable build and validation scripts are:

- `scripts/build_static_architecture.mjs`
- `scripts/validate_static_architecture.mjs`

The final local validation passed with:

- 50 HTML routes;
- all 25 required primary/system routes present;
- 25 article migration drafts;
- zero broken local HTML or media references;
- one title, description, canonical, H1, header and footer on every route;
- no excluded route directories;
- no unsupported placeholder claims matched on indexable pages;
- no visible placeholder-copy warnings.

No deployment, Git push, Cloudflare Pages change, live WordPress change or
schema rollout was performed.

## 8. Next phase

The architecture and page set are ready for the next review phase. Recommended
order:

1. inspect the improved primary pages and choose any design/content revisions;
2. approve factual company, product, offer and legal details;
3. run the article-by-article editorial, evidence and search-intent review;
4. implement technical SEO, schema, sitemap, robots, redirects and social
   metadata;
5. perform full browser, mobile, accessibility and performance QA;
6. prepare the approved GitHub and Cloudflare Pages deployment.
