#!/usr/bin/env python3
"""Build a provisional URL decision map from crawl and discovery inventories."""

from __future__ import annotations

import csv
from pathlib import Path
from urllib.parse import urlsplit


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "audit" / "data"
DOMAIN = "https://media87.com"


def rows(path: Path) -> list[dict[str, str]]:
    with path.open(newline="", encoding="utf-8") as handle:
        return list(csv.DictReader(handle))


def path_of(url: str) -> str:
    return urlsplit(url).path or "/"


SITEMAP_DECISIONS = {
    "/": (
        "preserve-rebuild",
        "/",
        "Primary agency page; retain URL, rebuild around location-neutral commercial intent, and preserve verified Dubai business context.",
    ),
    "/services/": (
        "preserve-rebuild",
        "/services/",
        "Commercial service hub; retain URL and add complete service pathways.",
    ),
    "/about-us/": (
        "preserve-rebuild",
        "/about-us/",
        "Trust page; retain URL and replace unverified/template proof.",
    ),
    "/contact-us/": (
        "preserve-rebuild",
        "/contact-us/",
        "Canonical conversion page; repair phone/chat/form tracking.",
    ),
    "/ai-video-creation-service/": (
        "preserve-rebuild",
        "/ai-video-creation-service/",
        "Existing service URL; add actual samples, process, deliverables, and proof.",
    ),
    "/portfolio/": (
        "preserve-rebuild",
        "/portfolio/",
        "Retain provisionally; rebuild as proof hub and consider a later case-studies migration only after backlink/GSC review.",
    ),
    "/category/blog/": (
        "provisional-301",
        "/insights/",
        "Thin uncannonical archive; migrate to a curated insights hub after evidence review.",
    ),
    "/author/muddaser321gmail-com/": (
        "provisional-301",
        "/team/muddaser-altaf/",
        "Email-derived author URL; replace with a real Person/team page.",
    ),
    "/digital-marketing-agency-jlt-dubai/": (
        "consolidate-after-evidence",
        "/",
        "Generic blog-style location page; keep only if a genuine JLT evidence gate can be met.",
    ),
    "/local-seo-guide-2025-how-to-dominate-local-search-rankings/": (
        "consolidate-after-evidence",
        "/local-seo-what-it-is-how-to-do-it-complete-2026-guide/",
        "Overlaps the stronger local-SEO guide; verify queries/links before merging.",
    ),
    "/local-seo-in-2026-practical-playbook-for-dubai-businesses/": (
        "consolidate-after-evidence",
        "/local-seo-dubai-how-to-rank-for-near-me-searches-in-2026/",
        "Short overlapping Dubai local-SEO article; verify queries/links before merging.",
    ),
}

DISCOVERED_DECISIONS = {
    "/contact/": (
        "301",
        "/contact-us/",
        "Duplicate 200 URL already canonicalized to /contact-us/ but not redirected.",
    ),
    "/seo-vs-google-ads-dubai-businesses-2026/": (
        "301",
        "/seo-vs-google-ads-dubai-businesses/",
        "Duplicate 200 article already canonicalized to the shorter URL.",
    ),
    "/ads-managment/": (
        "301-when-target-live",
        "/services/google-ads/",
        "Misspelled broken historical service URL.",
    ),
    "/digital-marketing-services-dubai/": (
        "301-when-target-live",
        "/services/",
        "Broken service-intent URL; consolidate to the service hub.",
    ),
    "/digital-marketing-services-in-dubai/": (
        "301-when-target-live",
        "/services/",
        "Recently indexed broken service-intent URL; consolidate to the service hub.",
    ),
    "/google-ads-management-dubai/": (
        "301-when-target-live",
        "/services/google-ads/",
        "High-intent historical URL currently returning 404; redirect it to the location-neutral Google Ads service page.",
    ),
    "/seo-services-dubai/": (
        "301-when-target-live",
        "/services/seo/",
        "High-intent historical URL currently returning 404; redirect it to the location-neutral SEO service page.",
    ),
    "/local-seo-services/": (
        "301-when-target-live",
        "/services/local-seo/",
        "Recently indexed broken service URL; consolidate to the location-neutral local SEO service page.",
    ),
    "/seo-for-dubai-businesses/": (
        "301-after-evidence",
        "/services/seo/",
        "Broken historical SEO URL; verify prior content and links before redirecting to the location-neutral SEO service page.",
    ),
    "/authors-team/": (
        "301-when-target-live",
        "/team/muddaser-altaf/",
        "Broken indexed author/team URL.",
    ),
    "/faqs/": (
        "retire-or-301-after-evidence",
        "/about-us/#faqs",
        "Broken indexed page contains internal/editorial content that should not be restored unchanged.",
    ),
    "/chatzen/": (
        "conditional-restore",
        "/products/chatzen/",
        "Restore/redirect only if ChatZen is an active product with approved claims and support.",
    ),
    "/localzen/": (
        "conditional-restore",
        "/products/localzen/",
        "Restore/redirect only if LocalZen is an active product with approved claims and support.",
    ),
    "/future-growth-lab/": (
        "provisional-410",
        "",
        "Appears to be a former concept/staging page; check GSC/backlinks before removal.",
    ),
    "/geo-tagging-images-for-seo/": (
        "provisional-410",
        "",
        "Broken linked article; recover original only if it has traffic, links, or reusable value.",
    ),
    "/hosting/": (
        "provisional-410",
        "",
        "Broken commercial link; restore only if hosting remains an active offer.",
    ),
    "/wp-content/uploads/2026/01/muddaser-portfolio.pdf": (
        "conditional-restore-or-301",
        "/portfolio/",
        "Broken portfolio download; restore a real approved PDF or redirect after backlink review.",
    ),
}


def main() -> None:
    sitemap = rows(DATA / "url-inventory.csv")
    discovered = rows(DATA / "discovered-url-status.csv")
    output: list[dict[str, object]] = []

    for row in sitemap:
        url = row["requested_url"]
        path = path_of(url)
        action, target, reason = SITEMAP_DECISIONS.get(
            path,
            (
                "preserve-update",
                path,
                "Preserve the current URL for the initial platform migration; edit and consolidate only after GSC/backlink review.",
            ),
        )
        output.append(
            {
                "source_url": url,
                "source_set": "native-sitemap",
                "current_status": row["status"],
                "current_role": row["role"],
                "provisional_action": action,
                "target_url": f"{DOMAIN}{target}" if target else "",
                "evidence_required": "GSC queries; conversions; backlinks; approved proof",
                "reason": reason,
            }
        )

    sitemap_paths = {path_of(row["requested_url"]) for row in sitemap}
    for row in discovered:
        url = row["requested_url"]
        path = path_of(url)
        if path in sitemap_paths:
            continue
        if path.startswith("/20") and path.count("/") == 4:
            action, target, reason = (
                "retire-archive-after-evidence",
                "",
                "Thin indexable daily archive absent from sitemap; remove date links and do not recreate unless it has external value.",
            )
        else:
            action, target, reason = DISCOVERED_DECISIONS.get(
                path,
                (
                    "manual-review",
                    "",
                    "Discovered outside the native sitemap; inspect historical value before launch.",
                ),
            )
        output.append(
            {
                "source_url": url,
                "source_set": "internal-or-search-discovered",
                "current_status": row["status"],
                "current_role": row["role"],
                "provisional_action": action,
                "target_url": f"{DOMAIN}{target}" if target else "",
                "evidence_required": "GSC queries; conversions; backlinks; historical content",
                "reason": reason,
            }
        )

    output.sort(key=lambda item: str(item["source_url"]))
    path = DATA / "provisional-migration-map.csv"
    fields = [
        "source_url",
        "source_set",
        "current_status",
        "current_role",
        "provisional_action",
        "target_url",
        "evidence_required",
        "reason",
    ]
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields)
        writer.writeheader()
        writer.writerows(output)
    print(f"Wrote {len(output)} URL decisions to {path}")


if __name__ == "__main__":
    main()
