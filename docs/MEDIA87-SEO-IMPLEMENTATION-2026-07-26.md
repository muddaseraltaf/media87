# Media87 SEO implementation record

**Status:** Implemented and validated locally  
**Date:** 2026-07-26  
**Scope:** Static site in `media87/main architecture`  
**Deployment status:** Not deployed and not submitted to search engines

## Outcome

The local Media87 build now has a consistent technical SEO layer, intentional indexability, evidence-safe structured data, crawl controls, a custom error page, a sitemap, improved internal linking, and a review gate for migrated articles.

The build and validation commands report:

- 50 HTML files checked
- 23 self-canonical, indexable routes in the XML sitemap
- 25 migrated article drafts kept `noindex,follow`
- 0 validator errors
- 0 validator warnings

The article at `/arabic-vs-english-seo-uae-businesses/` now scrolls correctly. The shared content-page rule uses `overflow: visible`, preventing the main content container from becoming a vertical overflow ancestor.

## Implemented controls

### Metadata and discovery

- A unique title and meta description are generated for every primary route.
- Every page has an intentional robots directive.
- Indexable pages use self-referencing HTTPS canonicals.
- Open Graph and Twitter metadata are generated consistently.
- A reusable Media87 social preview image is used when a page has no more specific lead image.
- The stylesheet and shared script use a version query to prevent stale local or production caches after releases.

### Structured data

One valid JSON-LD graph is generated per page, using only types supported by visible page content:

- `Organization`
- `WebSite`
- `WebPage`, `AboutPage`, `ContactPage`, or `CollectionPage`
- `BreadcrumbList` only where visible breadcrumbs exist
- `Service`
- `SoftwareApplication` or `WebApplication`
- `Article` for migrated article drafts

The implementation deliberately omits:

- fabricated reviews, ratings, prices, or offers
- `LocalBusiness` until a qualifying public business location and its details are approved
- `FAQPage` and `HowTo` markup without a clear eligibility reason
- special “AI SEO” schema, because no such general-purpose Google requirement exists
- `llms.txt`, because it is not used as a substitute for crawl access, indexability, or normal search controls

### Crawl and index controls

- `robots.txt` allows normal crawling and explicitly allows `OAI-SearchBot`.
- Crawlers are not blocked from `noindex` pages, so they can read the page-level directive.
- `sitemap.xml` contains only the 23 indexable, self-canonical routes.
- `404.html` is a custom, navigable, `noindex` error page.
- `/prompt-database/` redirects permanently to `/prompts/`.
- `/future-growth-lab/` is absent from the static build. A production-level `410 Gone` or approved redirect still needs to be selected when Cloudflare routing is configured.

### Article migration gate

All 25 migrated articles remain `noindex,follow`. This is intentional because several legacy drafts contain claims, dates, recommendations, or statistics that have not yet completed source and editorial review.

Each article now includes:

- a visible Media87 Editorial author link
- publication and modification dates
- an article trust notice
- a relevant commercial destination
- editorial-guidelines and correction links
- related article links

An article should become indexable only after:

1. the search intent and target query are approved;
2. material claims are verified against current primary sources;
3. dates, examples, screenshots, and recommendations are current;
4. author and reviewer accountability is visible;
5. the writing passes the humanisation and AI-language review;
6. its canonical, metadata, internal links, images, and structured data are rechecked.

## Current guidance used

Reviewed on 2026-07-26:

- Google, [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- Google, [Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization)
- Google, [Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)
- Google, [Breadcrumb structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- Google, [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- OpenAI, [Publishers and developers FAQ](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq)
- Bing, [AI Performance in Bing Webmaster Tools](https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview)

The practical GEO/AIEO position is therefore to make important content crawlable, indexable when approved, technically clear, well sourced, attributable, and easy to extract. It does not require invented markup or keyword stuffing.

## Evidence boundaries and pending inputs

Before stronger local-business, product, or commercial claims are added, collect and approve:

- legal business name and qualifying public address, if applicable
- named authors, reviewers, roles, and biography evidence
- verified product capabilities and public pricing
- approved client relationships, testimonials, and performance evidence
- Google Search Console, Bing Webmaster Tools, analytics, and Google Business Profile data
- the production retirement rule for `/future-growth-lab/`
- final legal review of the privacy policy and terms

No rankings, traffic gains, Core Web Vitals field results, AI citation gains, or conversion improvements are claimed by this implementation. Those require production measurement after deployment.

## Validation and release sequence

Run:

```bash
node scripts/build_static_architecture.mjs
node scripts/validate_static_architecture.mjs
```

Before production:

1. visually check representative desktop and mobile pages;
2. deploy the exact validated build;
3. confirm canonical and redirect behaviour on the production hostname;
4. test the sitemap and robots file over HTTPS;
5. validate representative schema with search-engine tools;
6. submit the sitemap to Google Search Console and Bing Webmaster Tools;
7. monitor indexing, crawl errors, queries, citations, conversions, and field performance;
8. enable article indexing only in reviewed batches.

