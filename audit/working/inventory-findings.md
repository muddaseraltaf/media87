# Media87 discovery findings

Audit date: 2026-07-24  
Scope: public live site, native WordPress sitemap, internally discovered URLs, current search results, and representative desktop/mobile renders.

## Executive finding

The current site should be rebuilt, but the migration must preserve useful URLs and content. The main problem is not only WordPress performance. Media87 currently has an incomplete commercial architecture, inconsistent indexation, weak proof, broken conversion links, and a large amount of template output that makes it difficult for search engines and visitors to understand the business.

The recent long-form Dubai/UAE articles are the strongest reusable asset. Several are detailed, commercially relevant, and contain useful frameworks, tables, FAQs, and external references. They should be edited and connected to real service pages rather than discarded.

## URL and indexation inventory

- The native WordPress sitemap contains 40 URLs:
  - 33 posts
  - 5 pages
  - 1 category archive
  - 1 author archive
- All 40 sitemap URLs returned HTTP 200 during the audit.
- `robots.txt` declares `https://media87.com/sitemap_index.xml`, but that URL returns a branded HTTP 404 page.
- WordPress's native `https://media87.com/wp-sitemap.xml` works and exposes the 40 URLs.
- A further 45 internally or search-discovered URLs were checked:
  - 30 return HTTP 200 but are absent from the native sitemap.
  - 28 of those 30 are thin, indexable daily date archives.
  - `/contact/` duplicates `/contact-us/` with a canonical but no redirect.
  - `/seo-vs-google-ads-dubai-businesses-2026/` duplicates the canonical article with no redirect.
  - 15 return HTTP 404, including URLs still appearing in recent search results or linked from articles.
- Examples of currently missing but recently indexed or internally linked URLs include:
  - `/chatzen/`
  - `/localzen/`
  - `/local-seo-services/`
  - `/seo-services-dubai/`
  - `/google-ads-management-dubai/`
  - `/digital-marketing-services-in-dubai/`
  - `/faqs/`
  - `/authors-team/`

This creates a mixed signal: search engines retain old content and service URLs while the current sitemap describes a much smaller site.

## Commercial architecture

- The main navigation exposes only Home, Services, AI Video Creation Service, About Us, and Contact Us.
- Only one dedicated service page exists in the sitemap.
- The Services page presents several services, but most "Learn more" links use `href="#"`.
- The crawl found 787 `#` placeholder-link occurrences across the 40 sitemap pages. Much of this comes from the repeated header, cards, footer, and legal/navigation template.
- There is no proper commercial landing page for SEO, local SEO, Google Ads, social media marketing, content creation, AI automation, chatbot development, or reputation management.
- The JLT URL is a generic blog post in the blog template, not a genuine local landing page. It contains no distinct JLT delivery proof, office information, local team, local case study, or area-specific offer.
- The AI video service page contains no rendered video or iframe example despite selling video creation.
- The portfolio is a blog post rather than a proof hub. It has broken/missing visual content and a generic automated editorial block visible to visitors.

## Conversion and trust

- The contact form exists and contains useful lead fields.
- The contact-page "Call Now" link is malformed as `http://+971...` instead of a `tel:` link.
- "Chat Sales" and several "Get Started" actions point to `#`.
- Many footer navigation, company, support, and legal links point to `#`.
- The homepage and service templates contain generic testimonials, stock-style identities, numerical counters, and performance claims that were not verified during this audit.
- The About page contains experience and client-count claims that require an evidence check before migration.
- The AI video page needs real samples, production process proof, permitted client examples, and clear deliverables.
- The public author archive exposes an email-derived slug: `/author/muddaser321gmail-com/`.
- Thirty-three post-like URLs include open WordPress comment forms even though comments do not support the current agency conversion model.

No testimonial, client logo, result, award, office, team, pricing, or performance claim should be migrated unless its source is approved and documented.

## On-page and technical signals

- 25 of 40 sitemap pages have no meta description.
- The author and category archives have no canonical.
- No Open Graph title, description, or image was detected on any sitemap URL.
- No JSON-LD structured data was detected on any sitemap URL.
- One article has two H1 elements.
- Every sitemap page loads at least 25 script tags.
- Median template load:
  - 27 scripts
  - 26 stylesheets
- Browser testing repeatedly logged Elementor/Elementor Pro JavaScript compatibility errors.
- In the browser session, four PHP warning blocks appeared above a recent commercial article. The anonymous HTML fetch did not reproduce them, so this must be rechecked in a clean logged-out browser before treating it as universal.
- The mobile layout has no horizontal overflow at 375px and the main navigation collapses correctly.
- Hero animations delay the appearance of important text for roughly one second; the static replacement should not hide primary content on initial render.

## Internal linking and crawl quality

- Twenty-three sitemap URLs receive no internal link from another sitemap URL in the extracted link graph.
- Articles often link to commercial service URLs that now return 404.
- Date links create 28 thin, indexable archive pages with no canonical.
- Global navigation and footer links are largely non-functional.
- The sitemap-declared URL is broken, while the working sitemap is not the one declared to crawlers.

## Images and media

- 260 image occurrences were found across the sitemap pages.
- 83 have blank or weak alt text such as a number or generic label.
- 182 are missing explicit width or height attributes, increasing layout-shift risk.
- The current visuals rely heavily on generic stock images and do not consistently demonstrate Media87's actual work.

## Content quality and reusable assets

The newer high-intent articles are substantially better than the surrounding site and should be preserved pending Search Console and backlink data. Examples include:

- Digital marketing pricing in Dubai
- SEO cost in Dubai
- SEO versus Google Ads
- Arabic versus English SEO
- SEO timelines in the UAE
- Dubai ecommerce SEO
- Social media agency services/costs/hiring checklist
- Google Ads agency selection questions

The main editorial risks are:

- Four overlapping local-SEO guides competing for similar intent.
- A duplicate SEO-versus-Google-Ads URL.
- A generic JLT page that resembles a location-keyword page rather than first-hand local content.
- Seven older posts with a repeated automated "How to use this guide in practice" block.
- Off-focus topics that may attract traffic but do not naturally support the Dubai/GCC agency model.
- Published editing/process language on the portfolio page.

## Evidence limitations

The audit does not yet include:

- Google Search Console query, click, impression, or indexation exports
- GA4 engagement and conversion data
- Backlink exports
- CRM lead quality by landing page
- Verified Google Business Profile and office evidence
- An approved client/result/proof library

Redirect, consolidation, and deletion decisions remain provisional until those data sources are checked.
