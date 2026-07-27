#!/usr/bin/env python3
"""Check internal and search-discovered URLs that are absent from the native sitemap."""

from __future__ import annotations

import csv
import json
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

from crawl_media87 import OUT_DIR, fetch, parse_page, write_csv


ROOT = Path(__file__).resolve().parents[1]
EXTRA_URLS = {
    "https://media87.com/authors-team/",
    "https://media87.com/chatzen/",
    "https://media87.com/faqs/",
    "https://media87.com/future-growth-lab/",
    "https://media87.com/local-seo-services/",
    "https://media87.com/localzen/",
}


def main() -> None:
    with (OUT_DIR / "internal-discovered.csv").open(
        newline="", encoding="utf-8"
    ) as handle:
        discovered = {row["url"] for row in csv.DictReader(handle)}

    with (OUT_DIR / "url-inventory.csv").open(newline="", encoding="utf-8") as handle:
        sitemap_urls = {row["final_url"].rstrip("/") + "/" for row in csv.DictReader(handle)}

    urls = sorted((discovered | EXTRA_URLS) - sitemap_urls)
    page_rows = []
    content_rows = []
    with ThreadPoolExecutor(max_workers=4) as executor:
        future_urls = {executor.submit(fetch, url): url for url in urls}
        for future in as_completed(future_urls):
            result = future.result()
            page, _, _, _, content = parse_page(result)
            page_rows.append(page)
            content_rows.append(content)
            print(f"{page['status']}\t{page['requested_url']}\t{page.get('title', '')}")

    page_rows.sort(key=lambda row: row["requested_url"])
    content_rows.sort(key=lambda row: row["url"])
    write_csv(OUT_DIR / "discovered-url-status.csv", page_rows)
    with (OUT_DIR / "discovered-page-content.jsonl").open(
        "w", encoding="utf-8"
    ) as handle:
        for row in content_rows:
            handle.write(json.dumps(row, ensure_ascii=False) + "\n")

    summary = {
        "checked": len(page_rows),
        "status_counts": {},
        "indexable_200": sum(
            1
            for row in page_rows
            if row["status"] == 200
            and "noindex" not in row.get("meta_robots", "").lower()
            and "noindex" not in row.get("x_robots_tag", "").lower()
        ),
        "http_200_absent_from_sitemap": [
            row["requested_url"] for row in page_rows if row["status"] == 200
        ],
    }
    for row in page_rows:
        status = str(row["status"])
        summary["status_counts"][status] = summary["status_counts"].get(status, 0) + 1
    (OUT_DIR / "discovered-url-summary.json").write_text(
        json.dumps(summary, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )
    print(json.dumps(summary, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
