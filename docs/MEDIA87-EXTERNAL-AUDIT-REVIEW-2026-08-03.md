# Media87 External Audit Review

Date: 3 August 2026  
Status: implementation batch 1 prepared for owner review

## Summary

The external audit has a sound central thesis: Media87 needs clearer entity facts, stronger human authorship, more specific conversion paths and real proof close to commercial claims. It is also partly outdated because the deployed replacement site already has canonical metadata, a clean sitemap, JSON-LD, `llms.txt`, a working contact route and static HTML content.

The correct approach is to strengthen the existing system rather than replace it or publish unsupported proof.

## Agreed and implemented in batch 1

| Recommendation | Decision | Implementation |
|---|---|---|
| Consistent entity information | Agree | Added the same linked Organization and WebSite entities to every indexable page, with the existing email, phone, Dubai location, founder reference and verified social links. |
| Clear founder identity | Agree | Added a visible Muddaser Altaf profile using the existing real portrait and a linked Person entity on the Authors page. |
| FAQ structured data | Agree with limits | Added FAQPage data only where visible questions and answers exist. This improves machine clarity but is not presented as a promise of Google FAQ rich results. |
| Service hub as a decision router | Agree | Added a “which service first?” guide, descriptive internal links and an explanation of project versus ongoing pricing logic. |
| Answer-first, specific CTA copy | Agree | Improved the homepage reach statement, Services hero, Contact journey and LLM Visibility page. |
| Concrete LLM/GEO deliverables | Agree | The LLM page now names technical access, entity consistency, structured data, source pages, authorship, internal links, `llms.txt` and monitoring as possible scoped deliverables. |
| Stronger `llms.txt` | Agree | Added founder, location, contact facts and links to the main Dubai, SEO and LLM pages. |
| Google Business Profile linkage | Agree | Added the owner-supplied Google Maps profile to the Contact journey, the organisation location entity and the machine-readable site guides. A map iframe was intentionally avoided to protect page speed and load Google only after a visitor chooses to open Maps. |
| Article and publisher linkage | Agree | Added Article data to the SEO pillar and linked article publisher entities consistently to Media87. Existing collaborative articles remain attributed to Media87 Editorial until a named author is confirmed. |

## Agreed but blocked by real evidence

These should be implemented as soon as the owner supplies approved source material:

1. Two or three case studies with client permission, baseline, work completed, timeframe, result and limitations.
2. Three genuine testimonials with the person’s name, role, company and publication permission.
3. Full Dubai NAP: a genuine street or office address, district and business hours. The Google Business Profile URL and map pin are now linked.
4. Confirmed certifications, partner status, years of experience and specialist team members.
5. Named authorship or review responsibility for existing articles.
6. Approved managed-service price ranges or starting prices.
7. A verified LinkedIn company URL and founder LinkedIn URL for `sameAs` entity links.

No placeholder component containing invented numbers or claims should be published.

## Recommendations modified or rejected

| Audit statement | Review |
|---|---|
| “The site has no structured data.” | Incorrect. The deployed site already had Organization, WebSite, WebPage, Breadcrumb, Service, SoftwareApplication and Article data. The real gap was consistency and coverage. |
| Add LocalBusiness/ProfessionalService everywhere | Not yet. LocalBusiness should wait for a qualifying real business location and approved full address. Organization is accurate today. |
| Add FAQPage to win FAQ rich results | Modified. FAQ data can describe visible content, but Google normally limits FAQ rich results to authoritative government and health sites. |
| Allow GPTBot for ChatGPT search | Modified. OpenAI uses OAI-SearchBot for ChatGPT search. GPTBot relates to possible model training and is a separate owner choice. |
| Add district names throughout Dubai pages | Not automatic. Districts should appear only where Media87 genuinely serves them and can maintain distinct, useful local context. |
| Add a virtual office for local SEO | Rejected unless it is a genuine, policy-compliant business location. No address should be created only for schema or rankings. |
| Schema is the largest ranking or AI-citation lever | Overstated. Schema improves entity clarity; it does not replace useful content, links, corroboration, proof or crawl access. |

## Important live technical finding

Cloudflare is currently prepending managed `robots.txt` rules that disallow ClaudeBot, Google-Extended and GPTBot. The site’s own file allows OAI-SearchBot, so ChatGPT search discovery has the correct local rule. If the owner wants broader AI grounding or crawler access, review Cloudflare **AI Crawl Control / Managed robots.txt** and choose the intended policy there. This edge setting cannot be reliably corrected by editing the repository file alone.

Recommended policy decision:

- Keep `OAI-SearchBot` allowed for ChatGPT search.
- Keep normal Googlebot access allowed for Google Search and its AI search features.
- Decide separately whether to allow Google-Extended, ClaudeBot and training crawlers.
- Keep AI training permission separate from search/grounding permission.

## Next evidence-led batch

After owner approval of batch 1:

1. Add real case-study and testimonial components to the homepage and relevant service pages.
2. Add full NAP and Google Business Profile linkage to Contact and Organization schema.
3. Confirm article authors and add Person-linked bylines page by page.
4. Improve the Dubai commercial and SEO pillar pages with sourced statistics, real local examples and approved pricing information.
5. Validate the live rendered schema, crawl controls, mobile journeys and conversion events after deployment.
