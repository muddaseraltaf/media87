# Media87 Recovered Live-Site Context Map

Audited: 24 July 2026  
Source: the recovered public Media87 XML sitemaps, rendered homepage, and WordPress REST page/post content  
Status: `researched` — design and migration decisions are local drafts, not publication approval

## What the recovered site changes

The recovered website is not only a digital-marketing brochure. It currently operates as five connected models:

1. An agency with five prominent live service families: reputation management, AI-powered conversations, chatbot development, ads management, and local SEO.
2. A product business with ChatZen and LocalZen as the strongest documented products.
3. A creative and automation studio covering AI video, AI content, social automation, localisation, photo enhancement, and workflow automation.
4. A resource and tool publisher with articles, prompts, a geo-tagging tool, a chatbot demo, and an OpenClaw workshop.
5. A Dubai/UAE-relevant provider with dedicated Dubai buyer pages, while several capabilities remain useful internationally.

The rebuild should preserve that breadth but make the hierarchy clearer. The current WordPress implementation mixes products, tools, legal pages, thank-you pages, location pages, and long guides into the mobile menu. It also serves a different desktop menu. That implementation detail should not be copied.

## Observed live inventory

- 29 published WordPress pages.
- 24 published posts plus the `/blog/` index in the post sitemap.
- 26 page-sitemap URLs including the homepage.
- Original Vimeo product videos for the homepage, ChatZen, and LocalZen.
- A substantial AI-video portfolio using YouTube.
- First-party service artwork, product interface imagery, guide diagrams, and workshop media.

## Recommended navigation

The primary navigation should describe the buyer journey rather than reproduce the WordPress menu database:

- Services
- Products
- AI video
- Resources
- About
- Start a conversation

Tools, workshops, market guides, editorial policies, and legal pages remain crawlable through contextual links, resource hubs, and the footer.

## Page-family architecture

### 1. Agency core

| Live URL | Observed role | Local action |
|---|---|---|
| `/` | Agency, product, and creative-studio overview | Preserve and redesign around the five live service families, ChatZen, LocalZen, AI automation, AI video, and the recovered resource ecosystem |
| `/services/` | Five-service hub | Preserve; feature the five live service families first and supporting capabilities second |
| `/local-seo-services/` | Commercial local SEO page | Preserve the established root URL; strengthen scope, process, limitations, and LocalZen relationship |
| `/ads-managment/` | Commercial ads-management page; live slug contains a typo | Preserve until search/backlink evidence supports a redirect; remove template leakage and unsupported performance promises |
| `/ai-powered-conversations/` | Conversational-growth service | Preserve; distinguish the managed service from ChatZen as the underlying product/workflow |
| `/ai-video-creation-service/` | Original video portfolio and production service | Preserve; use click-to-load players and a clearer production/rights/approval process |
| `/contact-us/` | Conversion page | Preserve; retain email, phone, and consultation routes once business details are approved |
| `/about-us/` | Company/trust page | Preserve; add only verified founder/team history and proof |
| `/faqs/` | General FAQ page | Rewrite from real buyer questions; do not migrate the current internal/prompt leakage |

Supporting local service pages may remain under `/services/`, but they must not compete with an established live root URL. Internal links and canonical tags need one owner for each intent.

### 2. Products and productised offers

| Live URL | Observed role | Local action |
|---|---|---|
| `/chatzen/` | Conversational AI product | Preserve; retain original Vimeo tour and document onboarding, integrations, human handoff, and limits |
| `/localzen/` | Reputation workflow product | Preserve; retain original Vimeo tour and product media; remove review-gating language |
| `/llm-package/` | LLM/news-distribution package | Preserve as the sole proposed canonical; all publication, customer, guarantee, and price claims require approval |
| `/llm-indexing-package-cp/` | Duplicate LLM package page | Consolidate into `/llm-package/`; keep out of the index until a redirect is approved |
| `/salesbot/` | Embedded sales-chatbot demonstration | Preserve as a demo page linked from ChatZen and conversational services |
| `/thankyou-for-the-subscription/` | LocalZen post-purchase system page | Preserve as `noindex`; never include in navigation or sitemap |

### 3. Market, industry, and decision pages

| Live URL | Observed role | Local action |
|---|---|---|
| `/digital-marketing-services-in-dubai/` | Dubai commercial landing page | Preserve as a dedicated market page; do not use it as a template for city fan-out |
| `/seo-for-dubai-businesses/` | Dubai SEO pillar and buyer guide | Preserve; connect to local SEO, technical SEO, relevant articles, and consultation |
| `/seo-and-ads-management-for-restaurants/` | Thin restaurant landing page | Preserve and expand only with approved restaurant-specific scope or proof |
| `/human-like-ai-calling-bots/` | Detailed decision guide | Preserve as an editorial/commercial bridge; retain the two original workflow diagrams |
| `/future-growth-lab/` | AI-native agency/product concept page | Preserve as an innovation and capability hub, not a replacement homepage |

Core service titles and H1s remain location-neutral. Dedicated existing Dubai pages may be explicitly local because their established user need and URL are local.

### 4. Tools, learning, and editorial

| Live URL | Observed role | Local action |
|---|---|---|
| `/blog/` | Current article index | Preserve as the canonical article hub |
| `/prompts/` | Large visual prompt library | Preserve and rebuild as a searchable/scannable resource with text alternatives |
| `/prompt-database/` | Empty placeholder | Consolidate into `/prompts/` or keep `noindex` until it has a distinct job |
| `/geo-tagging-images-for-seo/` | Functional image metadata tool | Preserve; migrate the actual client-side processing only after a privacy, EXIF, output-quality, and browser test |
| `/workshop/` | OpenClaw workshop offer | Preserve; retain the original video and clearly mark schedule, access, price, and availability as approval-dependent |
| `/editorial-guidelines/` | Editorial trust policy | Preserve and repair the placeholder date |
| `/authors-team/` | Author/team trust page | Preserve; resolve the observed name inconsistencies and add only verified biographies |

### 5. Legal and system pages

| Live URL | Observed role | Local action |
|---|---|---|
| `/privacy-policy/` | Privacy notice | Preserve; remove filename/template leakage and obtain legal review |
| `/terms-of-services/` | Terms | Preserve; replace the placeholder date and verify governing-law language |
| `/thankyou-for-the-subscription/` | Transaction completion | Preserve as `noindex` and exclude from sitemap |

## Current article library

The recovered post sitemap contains 24 articles. The local migration data contains those 24 plus nine older draft/legacy URLs. The launch sitemap should include the 24 currently published posts unless Search Console, analytics, backlinks, or editorial review justifies restoring one of the nine older URLs.

The current library clusters naturally into:

- Local SEO and SEO buying decisions in Dubai/UAE.
- Google Ads and agency-buying decisions.
- AI automation and n8n workflows.
- Chatbots, WhatsApp automation, and AI calling.
- AI content, prompts, voice, video, and creative experiments.
- People/portfolio comparison content that needs especially careful evidence and disclosure.

Thin posts, outdated year labels, unsupported “real results,” and utility pages published as posts need individual editorial decisions rather than automatic migration.

## Media decisions

Keep:

- ChatZen Vimeo video `1136806021`.
- LocalZen Vimeo video `1135612271`.
- Homepage Vimeo video `1136349054` if it still represents the current agency.
- Original AI-video YouTube portfolio, loaded only after interaction.
- LocalZen and ChatZen interface/product imagery where it documents a real capability.
- Dubai marketing and SEO guide hero images.
- AI-calling workflow and quality-loop diagrams.
- OpenClaw workshop media while the offer remains active.

Use carefully:

- Old square service artwork. It is first-party but uses a green palette that does not match the current Media87 identity; it can be cropped, colour-treated, or used as supporting media.
- AI/stock-like visuals. They must not imply a real client, office, team, event, or result.

Remove or replace:

- Elementor placeholders.
- Repeated generic testimonial imagery.
- Media that supports an unverified claim.
- Heavy third-party players loaded in the initial viewport.

## Claim and quality risks requiring approval

- “5.0” rating, “trusted by thousands,” “24K,” “1M,” “98%,” “100+ businesses,” and “6+ years.”
- LocalZen and LLM-package prices.
- LLM-package publication outlets, guarantee, and customer count.
- Client testimonials and logos.
- Response times, satisfaction guarantees, workshop schedule/access, and service availability.
- Any language suggesting guaranteed leads, rankings, ROI, or review gating.
- Founder/team biographies and credentials.

Until approved, the local design should use transparent evidence gates or neutral descriptions instead of publishing the claims.

## Design direction derived from the recovered context

- Keep the supplied Media87 logo and graphite/red/orange brand system.
- Use the interactive mesh only for the homepage and a few high-value service/product moments.
- Keep the lightweight flow field isolated to the AI-automation page.
- Treat first-party videos as proof objects, but use click-to-load embeds to protect speed.
- Use a modular editorial grid rather than identical template cards across every page.
- Make products and tools visually distinct from managed services.
- Surface Dubai as real market context, while keeping the core agency proposition understandable to international buyers.
- Build every important URL as statically rendered HTML; reserve client React for the mesh, flow field, media playback, tools, and other genuine interactions.

## Evidence still needed before production

- Search Console page/query exports.
- Analytics and conversion landing-page data.
- Backlink inventory.
- Approved business address, service area, hours, phone, and response expectations.
- Approved prices and offer availability.
- Rights/permission register for client work, testimonials, people, screenshots, and logos.
- Current product feature and integration register.
- Case studies with baseline, work, timeframe, attribution, caveats, and permission.
- Legal approval for privacy, terms, workshop/package conditions, and product claims.

