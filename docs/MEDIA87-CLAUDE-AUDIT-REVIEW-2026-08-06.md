# Media87 SEO audit review — 2026-08-06

## Purpose

This document records which recommendations from the external Claude audit were accepted, changed or deferred. The objective is not to maximise the number of indexed pages or schema blocks. It is to improve crawl paths, page clarity, trust and search eligibility without publishing unfinished content or unsupported proof.

## Implemented

### Contextual internal links

- Added the restaurant SEO and advertising service to the service-selection journey.
- Linked the restaurant WhatsApp automation guide to the restaurant service using descriptive anchor text.
- Replaced the restaurant service page's self-link with a useful link to the complete services hub.
- Added the restaurant and AI/LLM visibility services to the services `ItemList` schema so structured data matches the visible service choices.
- Updated validation so a page cannot create its own “inlink” by linking to itself.

Expected outcome: clearer discovery paths for customers and crawlers. Review Search Console crawl and impression changes after four to eight weeks; do not attribute changes to internal links alone.

### Metadata clarity

Updated selected titles and descriptions where the wording was vague, repetitive or difficult to scan:

- home description;
- blog hub title;
- prompt library title;
- founder and editorial team title;
- Pakistan digital marketers description;
- Dubai social media guide title;
- restaurant WhatsApp guide title.

The audit's fixed title and description character ranges were not adopted as ranking rules. Google may create title links and snippets from several page signals and truncates them according to the result context and device. The standard here is accurate, distinct and useful wording.

### Transport security

Added a one-year `Strict-Transport-Security` header for the HTTPS site. `includeSubDomains` and preload were intentionally omitted because every subdomain has not been verified as HTTPS-only.

## Kept noindex pending substantial work

The audit found six noindexed URLs, but the repository contains nineteen noindexed article drafts. Word count and a live URL do not make a page ready for search. Bulk promotion was rejected.

- `google-ads-management-cost-dubai-2026`: retain `noindex`; rewrite into a coherent cost-planning guide, verify current Google Ads mechanics and remove unsupported timing claims before review.
- `why-chatbots-are-important-for-local-businesses-in-the-uae`: retain `noindex`; remove generic AI-style copy, unsupported scenarios and outcome/timeline claims, then rebuild around real customer questions and current platform/privacy sources.
- `how-to-save-token-cost-and-make-openclaw-secure-with-one-prompt`: retain `noindex`; security-sensitive advice requires current primary-source verification and qualified review.
- `how-to-add-a-cinematic-profile-photo-to-your-gmail-step-by-step-guide`: retain `noindex`; weak relevance to Media87's commercial topic clusters.
- `useful-prompts-for-nano-banana-part-1`: retain `noindex`; consolidate into the prompt library if useful instead of creating a competing thin page.
- `portfolio`: retain `noindex`; publish only when it contains permissioned work, accurate role descriptions and verifiable context.

Other draft pages remain noindexed until they pass the page brief, editorial and evidence requirements. Several overlap the main SEO service/guide cluster and should be consolidated or differentiated before indexing.

## Deferred or rejected

### First-party proof

The audit correctly identifies a proof gap, but results, client names, testimonials and case studies cannot be invented. This work is blocked until Media87 has permissioned examples with:

- the client's approval and permitted name/logo use;
- the starting situation and Media87's actual role;
- dated evidence and measurement method;
- clear limitations and no implied guarantee.

### Content Security Policy

An enforced CSP was deferred. The site currently uses inline scripts and third-party services including forms, analytics, maps, video, payments and a chatbot. Enforcing a guessed policy could break customer journeys. The safe next phase is an origin inventory, a report-only policy with a monitored reporting endpoint, remediation of violations and only then enforcement.

### FAQ schema

Visible FAQs and matching `FAQPage` schema are retained for content clarity and machine-readable meaning. They are not treated as a rich-result shortcut; Google no longer shows FAQ rich results in its search results.

### AI crawler policy

The current policy is intentional: normal search crawling and OAI Search are allowed, while selected model-training crawlers are blocked. This does not prevent Google AI search features from using pages that are otherwise eligible for Search. No crawler policy was changed without an explicit business decision.

### `llms.txt`

The files remain available as optional machine-readable navigation aids, but they are not treated as an indexing or ranking control. Search eligibility still depends on crawlable, indexable pages with useful content and normal search fundamentals.

## Release acceptance

- static architecture validation passes;
- production build succeeds twice from a clean generated output;
- every sitemap URL has at least one crawlable link from another page;
- the nineteen unfinished article drafts remain noindexed and absent from the sitemap;
- `_headers`, `robots.txt`, `sitemap.xml`, `llms.txt` and `llms-full.txt` are included in the built output;
- no invented proof or outcome claim is added.

## Measurement plan

Record the deployment date, then compare Search Console after four and eight weeks:

- indexed page count and exclusions;
- impressions and clicks for the restaurant, blog, prompt and guide clusters;
- query/page pairs with impressions but weak click-through rate;
- crawl errors and canonical selections;
- conversions or qualified contacts by landing page, when tracking is available.

Treat these changes as hypotheses. Keep changes that improve relevance and customer journeys; revise or roll back wording that reduces qualified engagement.
