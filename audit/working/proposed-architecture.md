# Proposed Media87 site architecture

Status: location-neutral commercial architecture approved; final proof and implementation details remain under review  
Migration principle: keep existing high-value URLs stable during the hosting/design move; introduce the new architecture around them; perform consolidations only after Search Console and backlink review.

## Positioning

Primary:

> An international digital growth agency combining search, paid media, content, and practical AI automation.

Supporting business context, where verified:

> Based in Dubai, Media87 helps businesses in the UAE, the GCC, and international markets build measurable growth systems.

Primary audience:

- Service businesses
- Multi-location local businesses
- Professional services and training companies
- Restaurants/hospitality
- Ecommerce brands
- International teams that need an accountable growth partner

Primary outcomes:

- Qualified enquiries
- Consultation bookings
- Local visibility
- Lower lead-response time
- Better lead capture and follow-up
- Demonstrable campaign efficiency

## Recommended top-level navigation

- Services
- Solutions
- Industries
- Case Studies
- Insights
- About
- Contact

The navigation should not include every page. It should expose the major decision paths and use a structured mega-menu or compact grouped menu.

## URL model

```text
/
├── services/
│   ├── seo/
│   ├── local-seo/
│   ├── google-ads/
│   ├── social-media-marketing/
│   ├── content-creation/
│   ├── ai-automation/
│   ├── chatbot-development/
│   └── reputation-management/
├── ai-video-creation-service/            # preserve current root URL
├── solutions/
│   ├── lead-generation/
│   ├── multi-location-marketing/
│   ├── marketing-automation/
│   └── arabic-digital-marketing/
├── industries/
│   ├── real-estate/
│   ├── restaurants-hospitality/
│   ├── ecommerce/
│   └── professional-services/
├── products/                              # only for active products
│   ├── chatzen/
│   └── localzen/
├── case-studies/
│   └── {approved-client-or-project}/
├── insights/
│   ├── seo/
│   ├── paid-media/
│   ├── social-media/
│   ├── ai-automation/
│   └── {new-article-slug}/
├── tools/
│   ├── marketing-budget-calculator/
│   ├── roas-break-even-calculator/
│   └── local-seo-checklist/
├── team/
│   └── muddaser-altaf/
├── about-us/
├── contact-us/
├── privacy-policy/
├── cookie-policy/
└── terms/
```

The suggested industry, product, and tool pages are gated. They should not be published until the required proof, functionality, expertise, or distinct buyer value exists. Market pages are not part of the launch architecture.

## Query-to-page ownership

| Search intent | Owning page |
|---|---|
| AI-powered digital marketing agency | `/` |
| digital marketing services | `/services/` |
| SEO agency/services | `/services/seo/` |
| local SEO services | `/services/local-seo/` |
| Google Ads agency/management | `/services/google-ads/` |
| social media marketing agency | `/services/social-media-marketing/` |
| content creation agency | `/services/content-creation/` |
| AI automation agency | `/services/ai-automation/` |
| chatbot development | `/services/chatbot-development/` |
| reputation management | `/services/reputation-management/` |
| AI video creation | `/ai-video-creation-service/` |

The homepage, service hub, and individual service pages need clearly different intent and copy. A second "digital marketing agency Dubai" landing page would likely compete with the homepage and is not recommended.

## Titles, H1s, and geographic signals

Core commercial titles, H1s, navigation labels, and new service URLs should describe the offer without a location modifier. This keeps the brand relevant to buyers in Dubai, the GCC, North America, Pakistan, and other markets without creating separate copies of the same service page.

Recommended examples:

- Homepage title: `AI-Powered Digital Marketing & Automation Agency | Media87`
- Homepage H1: `Turn your marketing into a measurable growth system`
- SEO title: `SEO Services for Sustainable Organic Growth | Media87`
- SEO H1: `Build compounding organic visibility`
- Visible supporting line: `Based in Dubai, Media87 helps businesses across the UAE, the GCC, and international markets.` Use only markets that can be verified.

Dubai should remain visible and useful in:

- Supporting homepage copy
- About, Contact, footer, and team information
- Real office/service-area details, UAE phone, hours, map, and Google Business Profile
- Case studies and client examples where Dubai or another market is genuinely relevant
- Service-page proof and FAQs when local experience changes the answer
- Metadata descriptions when natural, but not as a repeated template
- Accurate `Organization` and, only when justified, `LocalBusiness` structured data

Location must not be hidden in visually suppressed text, repeated in keyword-stuffed footers, or inserted into every paragraph. Do not use IP redirects to change the canonical page experience.

Editorial guides and case studies may use a location in the title, H1, or URL when geography is the real subject of the page. For example, a researched guide to advertising costs in Dubai should say Dubai. This exception does not turn location into the commercial-site page-generation model.

### Future market-page gate

A market or location page may be reconsidered later only when it serves a buyer need that the core service page cannot. It must contain at least four of the following:

- Real office, branch, or team presence
- Verifiable client or project from that market
- Market-specific service or offer
- Original local imagery
- Local process, pricing, regulation, language, or platform detail
- Distinct FAQs based on real sales conversations
- Market-specific proof or data
- A unique conversion path

If it cannot pass the gate, the page should not be published. There will be no generic Dubai, UAE, GCC, country, city, or district page set at launch.

## Service-page template

Every core service page should contain:

1. Outcome-led hero and one clear CTA
2. Who the service is for and not for
3. Problems and buying triggers
4. Deliverables and exclusions
5. Process and expected client inputs
6. Timeline and measurement model
7. Real examples, screenshots, or samples
8. Relevant case study
9. Pricing factors or a transparent quotation framework
10. Service-specific FAQs
11. Related guides and tools
12. Final consultation/brief CTA

The pages must not use unsupported awards, guaranteed rankings, invented case results, or generic testimonials.

## Case-study template

Each case study should document:

- Approved client/project identity or an explicitly approved anonymized description
- Market and industry
- Initial situation
- Objective and measurement period
- Work completed
- Constraints and dependencies
- Before/after evidence
- Results with source and denominator
- What Media87 learned
- Related service
- CTA

Case studies are the most important missing layer in the current site.

## Insights architecture

Existing article URLs should remain at their current root paths during the initial platform/design migration. This avoids combining a CMS/hosting change, design change, content rewrite, and mass URL change in one event.

New articles can be published under `/insights/{slug}/`. Topic hubs organize both legacy and new URLs without forcing immediate redirects.

### Existing clusters to preserve and improve

- Dubai digital-marketing costs and agency selection
- SEO costs, timelines, consultant selection, and mistakes
- SEO versus Google Ads
- Google Ads costs and agency selection
- Social-media agency costs and hiring
- Arabic versus English SEO
- Dubai ecommerce SEO
- AI automation and n8n implementation guides
- AI content and video production

### Consolidation candidates

- Four overlapping local-SEO guides
- The duplicate SEO-versus-Google-Ads URL
- The JLT generic location article
- The current portfolio post
- Older articles containing repeated generic automation blocks

No consolidation should be executed until the GSC queries, links, and conversions for each source URL are reviewed.

## Content production standard

Automation may create briefs, outlines, internal-link suggestions, structured-data drafts, asset specifications, and first drafts. Publication requires:

- Search-intent and page-role check
- Original business input
- First-hand examples or demonstrations
- Claim/source verification
- Editor review
- Image QA
- Metadata, canonical, schema, and internal-link QA
- Human approval

Articles should not be generated to fill every keyword variation. Priority should go to content that helps a real buyer make a decision or use Media87's expertise.

## Technical architecture

Recommended implementation:

- Astro static-first site
- Content stored as typed Markdown/MDX or data collections in Git
- React islands only for meaningful interactions:
  - motion and animated demonstrations
  - calculators
  - filters
  - chatbot or automation demos
- Static rendered HTML for headings, service copy, proof, FAQs, and internal links
- Cloudflare Pages for builds, previews, deployment, caching, and redirects
- Cloudflare Pages Function/Worker for the contact form, with Turnstile and CRM/email integration

### Suggested source structure

```text
src/
├── components/
├── layouts/
├── pages/
├── content/
│   ├── services/
│   ├── solutions/
│   ├── industries/
│   ├── case-studies/
│   ├── insights/
│   └── team/
├── data/
│   ├── redirects/
│   ├── navigation/
│   └── proof/
└── styles/
public/
├── images/
├── robots.txt
├── _redirects
└── _headers
```

### Required automated checks

- Duplicate title, H1, description, and canonical detection
- Broken internal-link detection
- Orphan-page detection
- Required frontmatter validation
- Image width/height and alt-text validation
- Structured-data validation
- Sitemap/robots consistency
- Redirect-loop and redirect-target validation
- HTML and accessibility checks
- Lighthouse/performance budgets
- Prohibited placeholder text and `href="#"` detection
- Proof/claim reference checks

## Schema model

- `Organization` sitewide
- `LocalBusiness` only when the physical business evidence is confirmed
- `Service` on service pages
- `BlogPosting` or `Article` on insights
- `Person` on approved team/author pages
- `BreadcrumbList` on hierarchical pages
- `VideoObject` when a real accessible video exists
- `FAQPage` only for visible, genuine FAQs and without assuming a rich-result benefit

## Image plan

Create images after the page model and copy are approved:

- Real founder/team photography
- Real office or on-location imagery
- Approved client work and campaign artifacts
- Editorial market-specific business scenes when geography is relevant
- Service process diagrams
- Automation workflow diagrams
- Before/after case-study charts
- Video stills and demos

AI-generated images may support editorial concepts, but must not simulate clients, staff, offices, awards, testimonials, or performance proof.

## Concept HTML: what to retain and what to change

The supplied `media87-light.html` is a useful visual direction, not a complete site model.

Retain:

- Clear orange/ink/lime visual identity
- Strong typography and whitespace
- The compact service cards
- The interactive WebGL hero as an optional enhancement
- Scroll reveals and motion, with reduced-motion support
- The simple, direct CTA treatment

Change before reuse:

- Convert the one-page anchors into real internal page links.
- Keep a real text H1 visible even if the WebGL animation fails.
- Load the WebGL/animation code only on pages where it adds value.
- Replace generic testimonials and claims with approved proof.
- Verify the founder-following claim and link to approved profiles.
- Do not restore ChatZen/LocalZen links until the product pages exist.
- Remove any promise to "filter negative feedback before it goes public." Review collection must invite honest feedback without discouraging negative reviews or selectively sending only positive customers to Google.
- Replace the broad service list with the approved service taxonomy and page ownership model in this document.

## Recommended implementation order

### Phase 1: foundation

- Astro project and design system
- Global metadata/schema/navigation/footer
- robots, sitemap, redirects, error pages
- contact form and analytics
- homepage, Services, About, Contact

### Phase 2: commercial pages

- SEO services
- Local SEO
- Google Ads
- Social media marketing
- AI automation
- Content creation
- AI video rebuild

### Phase 3: proof

- Case-study hub
- Three to five approved case studies
- Team/founder page
- Proof library and claim register

### Phase 4: content migration

- Preserve all useful legacy article URLs
- Repair metadata, author, schema, media, and internal links
- Consolidate only after GSC/backlink review
- Create topic hubs

### Phase 5: evidence-led international expansion

- Selected Arabic high-value pages
- Market, language, or industry pages only when a distinct buyer need and the evidence gates are met
- Original tools, reports, and benchmarks

## Launch rule

Do not point the domain at Cloudflare until:

- Every current valuable URL has a preserve, redirect, or intentional removal decision
- All planned redirects are tested
- Search Console and analytics verification are retained
- Forms and conversion tracking work
- The working sitemap is declared in `robots.txt`
- The production domain is canonical
- The Pages preview domain is redirected or blocked from duplicate indexation
- Desktop/mobile visual QA and performance checks pass
