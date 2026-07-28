# Ads Management URL Migration

Date: 28 July 2026  
Owner: Media87  
Status: approved for release

## Decision

Change the canonical Ads Management URL from the misspelled
`/ads-managment/` path to `/ads-management/`.

The old URL receives a one-to-one permanent redirect. Internal links,
canonical metadata, Open Graph metadata, structured data, and the XML sitemap
must use the corrected URL.

## Evidence and scope

- The live misspelled URL returned a valid Ads Management page.
- The correctly spelled URL returned 404 before this release.
- The spelling error was reported after the new site went live.
- No service scope, claim, pricing, or page-design change is part of this URL
  migration.

## Acceptance tests

- `/ads-management/` returns 200 and self-canonicalises.
- `/ads-managment/` redirects permanently to `/ads-management/` in one hop.
- Internal links do not use the retired URL.
- The sitemap contains the corrected URL and excludes the retired URL.
- Page metadata and structured data identify the corrected canonical URL.

## Monitoring and rollback

Review crawl errors, traffic, enquiries, campaign destinations, and the
redirect after release. Keep the redirect indefinitely while the old URL may
receive visits or links.

Rollback is required only if the corrected page fails to serve or the redirect
causes a material journey failure. Restoring the typo as the canonical URL is
not the preferred rollback; fix the target or redirect first.
