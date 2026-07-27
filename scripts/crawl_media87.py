from __future__ import annotations

import csv
import json
import re
import time
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import dataclass
from pathlib import Path
from typing import Any

from lxml import html


ROOT = "https://media87.com/"
SITEMAP_INDEX = "https://media87.com/wp-sitemap.xml"
OUT_DIR = Path("audit/data")
EVIDENCE_DIR = Path("audit/evidence")
USER_AGENT = "Mozilla/5.0 (compatible; Media87SiteAudit/1.0; +https://media87.com/)"
TIMEOUT = 30
MAX_WORKERS = 4


@dataclass
class FetchResult:
    requested_url: str
    final_url: str
    status: int
    content_type: str
    headers: dict[str, str]
    body: bytes
    elapsed_ms: int
    error: str


def fetch(url: str, attempts: int = 2) -> FetchResult:
    last_error = ""
    for attempt in range(attempts):
        started = time.perf_counter()
        request = urllib.request.Request(
            url,
            headers={
                "User-Agent": USER_AGENT,
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            },
        )
        try:
            with urllib.request.urlopen(request, timeout=TIMEOUT) as response:
                body = response.read()
                elapsed_ms = round((time.perf_counter() - started) * 1000)
                return FetchResult(
                    requested_url=url,
                    final_url=response.geturl(),
                    status=response.status,
                    content_type=response.headers.get("Content-Type", ""),
                    headers={k.lower(): v for k, v in response.headers.items()},
                    body=body,
                    elapsed_ms=elapsed_ms,
                    error="",
                )
        except urllib.error.HTTPError as exc:
            body = exc.read()
            elapsed_ms = round((time.perf_counter() - started) * 1000)
            return FetchResult(
                requested_url=url,
                final_url=exc.geturl(),
                status=exc.code,
                content_type=exc.headers.get("Content-Type", ""),
                headers={k.lower(): v for k, v in exc.headers.items()},
                body=body,
                elapsed_ms=elapsed_ms,
                error=f"HTTP {exc.code}",
            )
        except Exception as exc:  # public crawl: retain the exact fetch failure
            last_error = f"{type(exc).__name__}: {exc}"
            if attempt + 1 < attempts:
                time.sleep(0.5 * (attempt + 1))

    return FetchResult(
        requested_url=url,
        final_url=url,
        status=0,
        content_type="",
        headers={},
        body=b"",
        elapsed_ms=0,
        error=last_error,
    )


def decode(body: bytes, content_type: str) -> str:
    match = re.search(r"charset=([^\s;]+)", content_type, flags=re.I)
    encodings = [match.group(1).strip("\"'")] if match else []
    encodings += ["utf-8", "windows-1252"]
    for encoding in encodings:
        try:
            return body.decode(encoding)
        except (LookupError, UnicodeDecodeError):
            continue
    return body.decode("utf-8", errors="replace")


def sitemap_locations(xml_bytes: bytes) -> tuple[str, list[str]]:
    root = ET.fromstring(xml_bytes)
    local_name = root.tag.rsplit("}", 1)[-1]
    locations = []
    for element in root.iter():
        if element.tag.rsplit("}", 1)[-1] == "loc" and element.text:
            locations.append(element.text.strip())
    return local_name, locations


def crawl_sitemaps(index_url: str) -> tuple[list[str], list[dict[str, Any]]]:
    queue = [index_url]
    seen = set()
    page_urls: list[str] = []
    sitemap_records: list[dict[str, Any]] = []

    while queue:
        sitemap_url = queue.pop(0)
        if sitemap_url in seen:
            continue
        seen.add(sitemap_url)
        result = fetch(sitemap_url)
        record: dict[str, Any] = {
            "sitemap_url": sitemap_url,
            "status": result.status,
            "final_url": result.final_url,
            "content_type": result.content_type,
            "bytes": len(result.body),
            "error": result.error,
            "kind": "",
            "locations": 0,
        }
        if result.status == 200 and result.body:
            try:
                kind, locations = sitemap_locations(result.body)
                record["kind"] = kind
                record["locations"] = len(locations)
                if kind == "sitemapindex":
                    queue.extend(locations)
                elif kind == "urlset":
                    page_urls.extend(locations)
            except Exception as exc:
                record["error"] = f"XML parse: {type(exc).__name__}: {exc}"
        sitemap_records.append(record)

    return list(dict.fromkeys(page_urls)), sitemap_records


def clean_space(value: str | None) -> str:
    return re.sub(r"\s+", " ", value or "").strip()


def attr_first(tree: html.HtmlElement, xpath: str, attr: str | None = None) -> str:
    values = tree.xpath(xpath)
    if not values:
        return ""
    value = values[0]
    if attr and hasattr(value, "get"):
        return clean_space(value.get(attr))
    if isinstance(value, str):
        return clean_space(value)
    return clean_space(value.text_content())


def all_text(tree: html.HtmlElement, xpath: str) -> list[str]:
    values = []
    for node in tree.xpath(xpath):
        text = node if isinstance(node, str) else node.text_content()
        text = clean_space(text)
        if text:
            values.append(text)
    return values


def collect_schema_types(value: Any, output: set[str]) -> None:
    if isinstance(value, dict):
        schema_type = value.get("@type")
        if isinstance(schema_type, str):
            output.add(schema_type)
        elif isinstance(schema_type, list):
            output.update(str(item) for item in schema_type)
        for child in value.values():
            collect_schema_types(child, output)
    elif isinstance(value, list):
        for child in value:
            collect_schema_types(child, output)


def normalize_url(base_url: str, value: str) -> str:
    value = clean_space(value)
    if not value:
        return ""
    return urllib.parse.urljoin(base_url, value)


def classify_url(url: str) -> str:
    path = urllib.parse.urlparse(url).path.strip("/")
    if not path:
        return "homepage"
    if path == "services":
        return "service-hub"
    if path in {"about-us", "contact-us"}:
        return "trust-conversion"
    if path == "ai-video-creation-service":
        return "service"
    if path == "portfolio":
        return "proof-portfolio"
    if path.startswith("category/"):
        return "taxonomy"
    if path.startswith("author/"):
        return "author"
    if re.search(r"(agency|consultant).*(dubai|jlt)|digital-marketing-agency-jlt", path):
        return "commercial-location"
    return "article"


def parse_page(result: FetchResult) -> tuple[dict[str, Any], list[dict[str, Any]], list[dict[str, Any]], list[dict[str, Any]], dict[str, Any]]:
    record: dict[str, Any] = {
        "requested_url": result.requested_url,
        "final_url": result.final_url,
        "status": result.status,
        "content_type": result.content_type,
        "response_bytes": len(result.body),
        "response_ms": result.elapsed_ms,
        "redirected": result.requested_url.rstrip("/") != result.final_url.rstrip("/"),
        "x_robots_tag": result.headers.get("x-robots-tag", ""),
        "error": result.error,
        "role": classify_url(result.requested_url),
    }
    links: list[dict[str, Any]] = []
    images: list[dict[str, Any]] = []
    schema_rows: list[dict[str, Any]] = []
    content_record: dict[str, Any] = {"url": result.requested_url, "text": "", "paragraphs": [], "headings": []}

    if not result.body or "html" not in result.content_type.lower():
        return record, links, images, schema_rows, content_record

    markup = decode(result.body, result.content_type)
    try:
        tree = html.fromstring(markup)
    except Exception as exc:
        record["error"] = f"{record['error']} HTML parse: {type(exc).__name__}: {exc}".strip()
        return record, links, images, schema_rows, content_record

    for node in tree.xpath("//script|//style|//noscript|//svg|//template"):
        parent = node.getparent()
        if parent is not None:
            parent.remove(node)

    title = attr_first(tree, "//title")
    description = attr_first(
        tree,
        "//meta[translate(@name,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='description']",
        "content",
    )
    canonical = attr_first(tree, "//link[contains(concat(' ', normalize-space(@rel), ' '), ' canonical ')]", "href")
    robots = attr_first(
        tree,
        "//meta[translate(@name,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='robots']",
        "content",
    )
    og_title = attr_first(tree, "//meta[@property='og:title']", "content")
    og_description = attr_first(tree, "//meta[@property='og:description']", "content")
    og_image = attr_first(tree, "//meta[@property='og:image']", "content")
    published = attr_first(tree, "//meta[@property='article:published_time']", "content")
    modified = attr_first(tree, "//meta[@property='article:modified_time']", "content")
    lang = attr_first(tree, "/html", "lang")
    body_class = attr_first(tree, "//body", "class")
    h1s = all_text(tree, "//h1")
    h2s = all_text(tree, "//h2")
    h3s = all_text(tree, "//h3")
    paragraphs = all_text(tree, "//main//p | //article//p")
    if not paragraphs:
        paragraphs = all_text(tree, "//body//p")
    main_nodes = tree.xpath("//main | //article")
    text_root = main_nodes[0] if main_nodes else (tree.xpath("//body")[0] if tree.xpath("//body") else tree)
    visible_text = clean_space(text_root.text_content())
    total_text = clean_space((tree.xpath("//body")[0] if tree.xpath("//body") else tree).text_content())
    words = re.findall(r"\b[\w’'-]+\b", visible_text, flags=re.UNICODE)
    total_words = re.findall(r"\b[\w’'-]+\b", total_text, flags=re.UNICODE)
    post_content_nodes = tree.xpath(
        "//*[contains(concat(' ', normalize-space(@class), ' '), ' elementor-widget-theme-post-content ')]"
        " | //*[contains(concat(' ', normalize-space(@class), ' '), ' entry-content ')]"
    )
    post_content_text = clean_space(post_content_nodes[0].text_content()) if post_content_nodes else ""
    post_content_words = re.findall(r"\b[\w’'-]+\b", post_content_text, flags=re.UNICODE)

    local_host = urllib.parse.urlparse(ROOT).netloc
    internal_unique = set()
    external_unique = set()
    for anchor in tree.xpath("//a[@href]"):
        href_raw = anchor.get("href") or ""
        if href_raw.startswith(("#", "mailto:", "tel:", "javascript:")):
            continue
        href = normalize_url(result.final_url, href_raw)
        parsed = urllib.parse.urlparse(href)
        if parsed.scheme not in {"http", "https"}:
            continue
        normalized = urllib.parse.urlunparse((parsed.scheme, parsed.netloc, parsed.path, parsed.params, parsed.query, ""))
        is_internal = parsed.netloc.lower() == local_host
        if is_internal:
            internal_unique.add(normalized)
        else:
            external_unique.add(normalized)
        links.append(
            {
                "source_url": result.requested_url,
                "destination_url": normalized,
                "anchor_text": clean_space(anchor.text_content()),
                "rel": clean_space(anchor.get("rel")),
                "is_internal": is_internal,
            }
        )

    missing_alt = 0
    lazy_images = 0
    for image in tree.xpath("//img"):
        src = image.get("src") or image.get("data-src") or ""
        src = normalize_url(result.final_url, src)
        alt = image.get("alt")
        if alt is None:
            missing_alt += 1
        if clean_space(image.get("loading")).lower() == "lazy":
            lazy_images += 1
        images.append(
            {
                "page_url": result.requested_url,
                "image_url": src,
                "alt": clean_space(alt),
                "alt_attribute_present": alt is not None,
                "width": clean_space(image.get("width")),
                "height": clean_space(image.get("height")),
                "loading": clean_space(image.get("loading")),
                "fetchpriority": clean_space(image.get("fetchpriority")),
            }
        )

    schema_types: set[str] = set()
    json_ld_blocks = tree.xpath("//script[@type='application/ld+json']")
    # Script elements were removed above, so parse JSON-LD from original markup separately.
    try:
        raw_tree = html.fromstring(markup)
        json_ld_blocks = raw_tree.xpath("//script[@type='application/ld+json']")
    except Exception:
        json_ld_blocks = []
    for index, script in enumerate(json_ld_blocks, start=1):
        raw = script.text or ""
        try:
            payload = json.loads(raw)
            block_types: set[str] = set()
            collect_schema_types(payload, block_types)
            schema_types.update(block_types)
            schema_rows.append(
                {
                    "page_url": result.requested_url,
                    "block": index,
                    "types": "|".join(sorted(block_types)),
                    "valid_json": True,
                    "error": "",
                }
            )
        except Exception as exc:
            schema_rows.append(
                {
                    "page_url": result.requested_url,
                    "block": index,
                    "types": "",
                    "valid_json": False,
                    "error": f"{type(exc).__name__}: {exc}",
                }
            )

    forms = tree.xpath("//form")
    scripts = re.findall(r"<script\b", markup, flags=re.I)
    stylesheets = tree.xpath("//link[contains(concat(' ', normalize-space(@rel), ' '), ' stylesheet ')]")
    record.update(
        {
            "title": title,
            "title_chars": len(title),
            "meta_description": description,
            "meta_description_chars": len(description),
            "canonical": canonical,
            "meta_robots": robots,
            "lang": lang,
            "og_title": og_title,
            "og_description": og_description,
            "og_image": og_image,
            "published_time": published,
            "modified_time": modified,
            "h1_count": len(h1s),
            "h1": " | ".join(h1s),
            "h2_count": len(h2s),
            "h2": " | ".join(h2s[:20]),
            "h3_count": len(h3s),
            "main_word_count": len(words),
            "article_word_count": len(post_content_words),
            "total_word_count": len(total_words),
            "internal_unique_links": len(internal_unique),
            "external_unique_links": len(external_unique),
            "image_count": len(images),
            "images_without_alt_attribute": missing_alt,
            "lazy_image_count": lazy_images,
            "json_ld_blocks": len(json_ld_blocks),
            "schema_types": "|".join(sorted(schema_types)),
            "form_count": len(forms),
            "script_count": len(scripts),
            "stylesheet_count": len(stylesheets),
            "php_warning_count": len(re.findall(r"\bWarning:\s", markup)),
            "placeholder_href_count": len(tree.xpath("//a[normalize-space(@href)='#']")),
            "has_invalid_http_phone_link": bool(
                tree.xpath("//a[starts-with(@href,'http://+') or starts-with(@href,'https://+')]")
            ),
            "has_comment_form": bool(
                tree.xpath(
                    "//form[contains(concat(' ', normalize-space(@class), ' '), ' comment-form ')]"
                )
            ),
            "has_tel_link": bool(tree.xpath("//a[starts-with(@href,'tel:')]")),
            "has_mailto_link": bool(tree.xpath("//a[starts-with(@href,'mailto:')]")),
            "has_whatsapp_link": bool(tree.xpath("//a[contains(@href,'wa.me') or contains(@href,'whatsapp')]")),
            "body_class": body_class,
        }
    )
    content_record = {
        "url": result.requested_url,
        "title": title,
        "description": description,
        "headings": [{"level": 1, "text": value} for value in h1s]
        + [{"level": 2, "text": value} for value in h2s]
        + [{"level": 3, "text": value} for value in h3s],
        "paragraphs": paragraphs,
        "text": visible_text[:100000],
    }
    return record, links, images, schema_rows, content_record


def write_csv(path: Path, rows: list[dict[str, Any]]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    if not rows:
        path.write_text("", encoding="utf-8")
        return
    fieldnames: list[str] = []
    for row in rows:
        for key in row:
            if key not in fieldnames:
                fieldnames.append(key)
    with path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    EVIDENCE_DIR.mkdir(parents=True, exist_ok=True)

    page_urls, sitemap_records = crawl_sitemaps(SITEMAP_INDEX)
    (EVIDENCE_DIR / "sitemap-urls.txt").write_text("\n".join(page_urls) + "\n", encoding="utf-8")
    write_csv(OUT_DIR / "sitemaps.csv", sitemap_records)

    page_records: list[dict[str, Any]] = []
    link_records: list[dict[str, Any]] = []
    image_records: list[dict[str, Any]] = []
    schema_records: list[dict[str, Any]] = []
    content_records: list[dict[str, Any]] = []

    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        future_to_url = {executor.submit(fetch, url): url for url in page_urls}
        for future in as_completed(future_to_url):
            result = future.result()
            page, links, images, schema, content = parse_page(result)
            page_records.append(page)
            link_records.extend(links)
            image_records.extend(images)
            schema_records.extend(schema)
            content_records.append(content)
            print(f"{page['status']}\t{page['role']}\t{page['requested_url']}")

    page_records.sort(key=lambda row: row["requested_url"])
    link_records.sort(key=lambda row: (row["source_url"], row["destination_url"], row["anchor_text"]))
    image_records.sort(key=lambda row: (row["page_url"], row["image_url"]))
    schema_records.sort(key=lambda row: (row["page_url"], row["block"]))
    content_records.sort(key=lambda row: row["url"])

    write_csv(OUT_DIR / "url-inventory.csv", page_records)
    write_csv(OUT_DIR / "link-graph.csv", link_records)
    write_csv(OUT_DIR / "images.csv", image_records)
    write_csv(OUT_DIR / "schema.csv", schema_records)
    with (OUT_DIR / "page-content.jsonl").open("w", encoding="utf-8") as handle:
        for row in content_records:
            handle.write(json.dumps(row, ensure_ascii=False) + "\n")

    summary = {
        "crawl_date": "2026-07-24",
        "sitemap_index": SITEMAP_INDEX,
        "sitemap_files": len(sitemap_records),
        "listed_urls": len(page_urls),
        "successful_200": sum(1 for row in page_records if row["status"] == 200),
        "non_200": sum(1 for row in page_records if row["status"] != 200),
        "roles": {},
    }
    for row in page_records:
        summary["roles"][row["role"]] = summary["roles"].get(row["role"], 0) + 1
    (OUT_DIR / "crawl-summary.json").write_text(
        json.dumps(summary, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
