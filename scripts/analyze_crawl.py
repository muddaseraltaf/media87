#!/usr/bin/env python3
"""Derive content, metadata, internal-link, and image findings from the crawl."""

from __future__ import annotations

import csv
import json
import re
from collections import Counter, defaultdict
from pathlib import Path
from urllib.parse import urljoin, urlsplit, urlunsplit


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "audit" / "data"


def read_csv(path: Path) -> list[dict[str, str]]:
    with path.open(newline="", encoding="utf-8") as handle:
        return list(csv.DictReader(handle))


def write_csv(path: Path, rows: list[dict[str, object]], fields: list[str]) -> None:
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields)
        writer.writeheader()
        writer.writerows(rows)


def canonicalize(url: str, base: str = "https://media87.com/") -> str:
    absolute = urljoin(base, url.strip())
    parts = urlsplit(absolute)
    host = parts.netloc.lower().removeprefix("www.")
    path = re.sub(r"/+", "/", parts.path or "/")
    if not path.endswith("/") and "." not in path.rsplit("/", 1)[-1]:
        path += "/"
    return urlunsplit(("https", host, path, "", ""))


inventory = read_csv(DATA / "url-inventory.csv")
links = read_csv(DATA / "link-graph.csv")
images = read_csv(DATA / "images.csv")

pages_by_url = {canonicalize(row["final_url"]): row for row in inventory}
sitemap_urls = set(pages_by_url)

inbound_sources: dict[str, set[str]] = defaultdict(set)
outbound_targets: dict[str, set[str]] = defaultdict(set)
external_domains: Counter[str] = Counter()
discovered_internal: dict[str, dict[str, object]] = {}

for row in links:
    source = canonicalize(row["source_url"])
    target_raw = row["destination_url"]
    try:
        target = canonicalize(target_raw, source)
    except ValueError:
        continue
    target_parts = urlsplit(target)
    if target_parts.netloc == "media87.com":
        if target != source:
            inbound_sources[target].add(source)
            outbound_targets[source].add(target)
        if target not in sitemap_urls:
            item = discovered_internal.setdefault(
                target,
                {
                    "url": target,
                    "source_pages": set(),
                    "link_occurrences": 0,
                    "anchor_texts": set(),
                },
            )
            item["source_pages"].add(source)
            item["link_occurrences"] += 1
            anchor = row.get("anchor_text", "").strip()
            if anchor:
                item["anchor_texts"].add(anchor)
    elif target_parts.netloc:
        external_domains[target_parts.netloc] += 1

inbound_rows: list[dict[str, object]] = []
for url, page in sorted(pages_by_url.items()):
    sources = inbound_sources.get(url, set())
    inbound_rows.append(
        {
            "url": url,
            "role": page["role"],
            "inbound_sitemap_pages": len(sources),
            "outbound_unique_internal_pages": len(outbound_targets.get(url, set())),
            "source_urls": " | ".join(sorted(sources)),
        }
    )

discovered_rows: list[dict[str, object]] = []
for item in sorted(discovered_internal.values(), key=lambda value: str(value["url"])):
    discovered_rows.append(
        {
            "url": item["url"],
            "source_pages": len(item["source_pages"]),
            "link_occurrences": item["link_occurrences"],
            "anchor_texts": " | ".join(sorted(item["anchor_texts"])),
            "source_urls": " | ".join(sorted(item["source_pages"])),
        }
    )

write_csv(
    DATA / "inbound-links.csv",
    inbound_rows,
    [
        "url",
        "role",
        "inbound_sitemap_pages",
        "outbound_unique_internal_pages",
        "source_urls",
    ],
)
write_csv(
    DATA / "internal-discovered.csv",
    discovered_rows,
    ["url", "source_pages", "link_occurrences", "anchor_texts", "source_urls"],
)


def duplicate_groups(field: str) -> list[dict[str, object]]:
    groups: dict[str, list[str]] = defaultdict(list)
    for page in inventory:
        value = page[field].strip()
        if value:
            groups[value].append(page["final_url"])
    return [
        {"value": value, "count": len(urls), "urls": sorted(urls)}
        for value, urls in groups.items()
        if len(urls) > 1
    ]


def count_where(predicate) -> int:
    return sum(1 for page in inventory if predicate(page))


image_pages: dict[str, list[dict[str, str]]] = defaultdict(list)
for image_row in images:
    image_pages[canonicalize(image_row["page_url"])].append(image_row)

image_summary = {
    "total_occurrences": len(images),
    "missing_alt_attribute": sum(
        1 for row in images if row["alt_attribute_present"].lower() != "true"
    ),
    "blank_or_weak_alt": sum(
        1
        for row in images
        if not row["alt"].strip()
        or row["alt"].strip().lower() in {"image", "img", "1", "2", "3", "4", "5"}
    ),
    "missing_width_or_height": sum(
        1 for row in images if not row["width"].strip() or not row["height"].strip()
    ),
}

orphaned = [
    url
    for url in sorted(sitemap_urls)
    if url != "https://media87.com/" and not inbound_sources.get(url)
]

findings = {
    "page_count": len(inventory),
    "status_counts": Counter(page["status"] for page in inventory),
    "role_counts": Counter(page["role"] for page in inventory),
    "metadata": {
        "missing_titles": count_where(lambda page: not page["title"].strip()),
        "missing_descriptions": count_where(
            lambda page: not page["meta_description"].strip()
        ),
        "missing_canonicals": count_where(lambda page: not page["canonical"].strip()),
        "missing_og_title": count_where(lambda page: not page["og_title"].strip()),
        "missing_og_description": count_where(
            lambda page: not page["og_description"].strip()
        ),
        "missing_og_image": count_where(lambda page: not page["og_image"].strip()),
        "multiple_h1": count_where(lambda page: int(page["h1_count"] or 0) > 1),
        "no_h1": count_where(lambda page: int(page["h1_count"] or 0) == 0),
        "no_json_ld": count_where(lambda page: int(page["json_ld_blocks"] or 0) == 0),
        "duplicate_titles": duplicate_groups("title"),
        "duplicate_descriptions": duplicate_groups("meta_description"),
        "duplicate_h1": duplicate_groups("h1"),
    },
    "content": {
        "under_100_total_words": count_where(
            lambda page: int(page["total_word_count"] or 0) < 100
        ),
        "under_300_total_words": count_where(
            lambda page: int(page["total_word_count"] or 0) < 300
        ),
        "under_600_total_words": count_where(
            lambda page: int(page["total_word_count"] or 0) < 600
        ),
        "under_100_main_words": count_where(
            lambda page: int(page["main_word_count"] or 0) < 100
        ),
        "thin_urls_under_100_total": sorted(
            page["final_url"]
            for page in inventory
            if int(page["total_word_count"] or 0) < 100
        ),
    },
    "linking": {
        "sitemap_urls_with_zero_inbound_links": orphaned,
        "zero_inbound_count": len(orphaned),
        "internal_discovered_not_in_sitemap": len(discovered_rows),
        "top_external_domains": external_domains.most_common(20),
    },
    "images": image_summary,
    "templates": {
        "script_count_median": sorted(int(page["script_count"]) for page in inventory)[
            len(inventory) // 2
        ],
        "stylesheet_count_median": sorted(
            int(page["stylesheet_count"]) for page in inventory
        )[len(inventory) // 2],
        "pages_with_25_or_more_scripts": count_where(
            lambda page: int(page["script_count"] or 0) >= 25
        ),
    },
}

with (DATA / "derived-findings.json").open("w", encoding="utf-8") as handle:
    json.dump(findings, handle, indent=2, ensure_ascii=False, default=dict)

print(json.dumps(findings, indent=2, ensure_ascii=False, default=dict))
