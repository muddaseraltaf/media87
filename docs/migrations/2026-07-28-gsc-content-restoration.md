# GSC Content Restoration — 2026-07-28

Status: local implementation ready for review; not approved for production.

Baseline: Google Search Console export for 2026-04-27 through 2026-07-26, representing the former WordPress site before the static-site migration.

## Restore at the established URL

| URL | Reason |
|---|---|
| `/whatsapp-automation-for-restaurants-complete-2025-guide/` | Relevant restaurant and conversation-automation demand; rewritten as an evergreen 2026 guide without unsupported revenue claims. |
| `/how-to-create-ultra-realistic-human-sound-voice-with-prompting/` | Relevant to Media87 content and AI voice work; title and description simplified. |
| `/how-to-automatically-read-classify-and-reply-to-emails-using-ai-step-by-step-n8n-guide/` | Relevant automation tutorial with existing impressions; repositioned around drafts, safeguards and human review. |
| `/how-to-make-linkedin-post-assistant-with-n8n/` | Relevant content-automation tutorial; retained with clearer positioning. |
| `/how-to-make-ai-ultra-realistic-ads/` | Relevant paid-media and creative topic; fully rewritten to remove celebrity imitation and unsupported tool claims. |
| `/social-media-marketing-agency-dubai-services-costs-hiring-checklist/` | Relevant Dubai commercial research page recovered from the full pre-migration archive. |
| `/top-digital-marketers-in-pakistan/` | Historically strong discovery URL; rebuilt as a disclosed editorial shortlist with fit-by-specialism, verification notes and no unsupported universal ranking. |

## Consolidate with a 301 redirect

| Old URL | Destination | Reason |
|---|---|---|
| Four overlapping local-SEO guide URLs | `/seo-for-dubai-businesses/` | One stronger informational owner avoids cannibalisation. |
| `/digital-marketing-agency-jlt-dubai/` | `/digital-marketing-services-in-dubai/` | No verified JLT-specific office/proof; broader Dubai page is the honest owner. |
| `/salesbot/` | `/chatzen/` | ChatZen is the current successor for the archived Salesbot concept. |
| `/category/blog/` | `/blog/` | Static blog hub replaces the WordPress taxonomy archive. |
| Old WordPress author URLs | `/authors-team/` | Current editorial attribution page is the correct successor. |

## Keep retired or out of the index

- `/future-growth-lab/` and `/workshop/`: retired by owner decision; no exact current successor.
- Prompt experiments, watermark-removal content and unrelated traffic pages: remain `noindex,follow` unless a later commercial and editorial review approves them.
- `/prompt-database/`: existing 301 to `/prompts/` remains.

## Acceptance and rollback

- Each restored URL must return a self-canonical indexable page, appear in `sitemap.xml`, and use reviewed title, description and internal links.
- Redirected URLs must not appear in the sitemap.
- Build validation must pass before any production deployment.
- Rollback is the previous production commit `cefae9f`.
