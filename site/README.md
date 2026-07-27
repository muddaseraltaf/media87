# Media87 Site

This directory contains the local Media87 website implementation.

## Current architecture

- Next.js-compatible App Router rendered through the Cloudflare-ready Sites runtime
- Shared header, footer, metadata, visual tokens, hub template, detail-page template, CTA, robots rules, and sitemap generator
- Interactive WebGL mesh headline ported from the supplied concept HTML, with a semantic H1 fallback, reduced-motion support, cleanup, and off-screen pausing
- Media87 brand system derived from the supplied logo: warm graphite (`#706262`), coral (`#FF4637`) and orange (`#FF7D47`)
- Full horizontal logo in the header and footer, a standalone 87 mark, application icon, Apple icon, and organization-schema logo
- Location-neutral commercial titles, H1s, and service URLs
- Visible Dubai context in supporting copy, About, Contact, and company-level information
- Route families for 13 services, 4 solutions, 4 industries, 3 products, case studies, insights, About, and Contact
- Local migration routes for all 33 article URLs found in the live sitemap
- Selected Media87-owned live assets and local campaign visuals stored under `public/images/`
- Evidence gates for claims, proof, products, and industry pages
- Sitewide `noindex` and robots blocking while the migration remains a local architecture preview

## Content source

Structured commercial-page records live in `app/lib/site-data.ts`. Shared page components live in `app/components/`.

The live sitemap content is read from `../audit/data/page-content.jsonl` and transformed by `scripts/generate-live-content.mjs` into `app/lib/live-content.generated.ts`. Run the generator whenever the source audit is refreshed.

The current copy and migrated article structure must move through factual review, SEO QA, design QA, and approval before production release. Stock or conceptual imagery is labelled so it is not presented as team, office, client, or performance proof.

Run `npm run prepare:logo` after replacing the root `1.png` source file to regenerate all web logo and icon assets.

## Quality checks

- `npm run build`
- `npm run lint`
- `./node_modules/.bin/tsc --noEmit`
- `node --test tests/rendered-html.test.mjs`

No deployment, custom domain, or live WordPress change is part of this local foundation.
