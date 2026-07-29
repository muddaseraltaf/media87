# Legacy Media Recovery — 29 July 2026

## Decision

Restore useful first-party context from the former Media87 WordPress site without
keeping a runtime dependency on `/wp-content/` URLs.

## Evidence and ownership

- Source evidence: the pre-migration Media87 image inventory and archived page
  HTML in the project audit.
- Recovered files: downloaded from Media87's previous hosting origin and stored
  as local WebP assets in `site/public/images/articles/`.
- Page owner and maintenance owner: Media87 Editorial.
- Rights guardrail: keep only media previously published by Media87 that has a
  clear editorial or explanatory job. Remove an asset if Media87 cannot confirm
  permission or receives a valid correction or removal request.

## Kept

### Top digital marketers in Pakistan

- Ten portraits whose identity-to-file mapping is confirmed by the headings and
  image order in the former article.
- Job: help readers connect each name with the corresponding profile.
- Treatment: responsive portrait gallery, accurate names, useful alt text and a
  disclosure that the gallery is not a performance ranking.

### AI email classification guide

- Original n8n workflow screenshot.
- Job: show the workflow architecture described in the article.
- Treatment: responsive inline figure with a caption advising readers to verify
  current node settings.

### LinkedIn post assistant guide

- Original n8n workflow screenshot.
- Job: show the earlier automation flow before the article's newer governance
  and human-approval safeguards.
- Treatment: responsive inline figure with an explanatory caption.

## Not restored

- Old AI-ad examples containing recognisable sports likenesses, team marks or
  product branding. They are not necessary to explain the workflow and create
  avoidable identity, endorsement and usage-rights risk.
- Generic decorative images that do not add evidence or explanation.
- Later WordPress image URLs that were no longer present on the previous origin.

## Acceptance tests

- Images are served from Media87's own static asset paths.
- Every image has intrinsic dimensions and responsive CSS.
- Below-fold images use lazy loading and asynchronous decoding.
- Portraits remain readable at approximately 390 px viewport width.
- Captions explain what screenshots show and do not present an old workflow as
  current platform documentation.
- The build validator passes and no `/wp-content/` dependency appears in the
  generated page HTML.

## Review and rollback

- Review after any identity correction, rights request, or material article
  update.
- Roll back by removing the relevant `media` block from
  `site/app/lib/restored-content.ts`; the article copy remains intact.
