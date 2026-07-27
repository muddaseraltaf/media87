import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Media87 homepage architecture", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>Digital Marketing, Local SEO, Content &amp; AI Automation \| Media87<\/title>/i,
  );
  assert.match(html, /Digital marketing/);
  assert.match(html, /Dubai context/);
  assert.match(html, /href="\/local-seo-services\/"/);
  assert.match(html, /ChatZen/);
  assert.match(html, /LocalZen/);
  assert.doesNotMatch(html, /LeadGEN/);
  assert.match(html, /1136349054/);
  assert.doesNotMatch(
    html,
    /<iframe[^>]+player\.vimeo\.com\/video\/1136349054/i,
  );
  assert.match(html, /Recovered ecosystem/);
  assert.match(html, /Digital marketing services in Dubai/);
  assert.equal((html.match(/src="\/logo-media87\.png"/g) ?? []).length, 2);
  assert.match(html, /href="https:\/\/media87\.com\/icon\.png/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /InteractionEngine-[^"]+\.js/);
  assert.match(html, /data-marquee/);
  assert.match(html, /data-reveal-stagger/);
  assert.match(html, /data-tilt="3"/);
  assert.match(html, /data-float-speed="-0\.06"/);
  assert.match(html, /ambient-orbit-ring/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("server-renders a location-neutral service page", async () => {
  const response = await render("/services/seo/");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<title>SEO Services \| Media87<\/title>/i);
  assert.match(html, /Build compounding organic visibility/);
  assert.match(html, /Evidence gate/);
  assert.match(html, /Specific work, not a vague monthly label/);
  assert.match(html, /Do you guarantee first-page rankings/);
  assert.match(html, /InteractionEngine-[^"]+\.js/);
  assert.match(html, /data-reveal-stagger/);
  assert.doesNotMatch(html, /FlowField-[^"]+\.js/);
  assert.doesNotMatch(html, /<h1[^>]*>[^<]*Dubai/i);
});

test("server-renders the original LocalZen offer with the recovered video", async () => {
  const response = await render("/localzen/");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<title>LocalZen Reputation Management \| Media87<\/title>/i);
  assert.match(html, /Reputation made/);
  assert.match(html, /Kiosk and QR mode/);
  assert.match(html, /player\.vimeo\.com\/video\/1135612271/);
  assert.match(html, /no review gating/i);
  assert.doesNotMatch(
    html,
    /<iframe[^>]+player\.vimeo\.com\/video\/1135612271/i,
  );
  assert.doesNotMatch(html, /prevent harmful feedback|stop every problem/i);
});

test("server-renders the original ChatZen offer with its product journey", async () => {
  const response = await render("/chatzen/");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<title>ChatZen AI Conversation System \| Media87<\/title>/i);
  assert.match(html, /Smart lead capture/);
  assert.match(html, /Human escalation and monitoring/);
  assert.match(html, /player\.vimeo\.com\/video\/1136806021/);
  assert.match(html, /Controlled improvement/);
  assert.doesNotMatch(
    html,
    /<iframe[^>]+player\.vimeo\.com\/video\/1136806021/i,
  );
});

test("server-renders the recovered five-offer services architecture", async () => {
  const response = await render("/services/");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Five primary offers/);
  assert.match(html, /Reputation Management/);
  assert.match(html, /AI-Powered Conversations/);
  assert.match(html, /Chatbot Development/);
  assert.match(html, /Ads Management/);
  assert.match(html, /Local SEO Services/);
  assert.match(html, /\/images\/recovered\/reputation-management\.jpg/);
  assert.match(html, /Supporting capabilities/);
});

test("server-renders the preserved Local SEO root URL with full scope", async () => {
  const response = await render("/local-seo-services/");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<title>Local SEO Services \| Media87<\/title>/i);
  assert.match(html, /Google Business Profile optimisation/i);
  assert.match(html, /fake locations/i);
  assert.match(html, /Explore LocalZen/);
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/media87\.com\/local-seo-services\/"/i,
  );
});

test("server-renders the recovered Dubai commercial page with original media", async () => {
  const response = await render("/digital-marketing-services-in-dubai/");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Turn visibility into enquiries, bookings and sales/);
  assert.match(html, /\/images\/recovered\/digital-marketing-dubai\.jpg/);
  assert.match(html, /Dubai context without a template footprint/);
  assert.match(html, /SEO for Dubai businesses/);
});

test("server-renders the workshop without loading YouTube upfront", async () => {
  const response = await render("/workshop/");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /OpenClaw Workshop/);
  assert.match(html, /b4CKMW4N0Bw/);
  assert.match(html, /loaded only after this click/i);
  assert.doesNotMatch(
    html,
    /<iframe[^>]+youtube-nocookie\.com\/embed\/b4CKMW4N0Bw/i,
  );
});

test("keeps duplicate and system pages out of the proposed index", async () => {
  const promptResponse = await render("/prompt-database/");
  assert.equal(promptResponse.status, 200);
  const promptHtml = await promptResponse.text();
  assert.match(promptHtml, /<meta name="robots" content="noindex, follow"/i);
  assert.match(
    promptHtml,
    /<link rel="canonical" href="https:\/\/media87\.com\/prompts\/"/i,
  );

  const packageResponse = await render("/llm-indexing-package-cp/");
  assert.equal(packageResponse.status, 200);
  const packageHtml = await packageResponse.text();
  assert.match(packageHtml, /One package, one canonical page/);
  assert.match(packageHtml, /<meta name="robots" content="noindex, follow"/i);
  assert.match(
    packageHtml,
    /<link rel="canonical" href="https:\/\/media87\.com\/llm-package\/"/i,
  );
});

test("server-renders the recovered current blog inventory", async () => {
  const response = await render("/blog/");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(
    html,
    /24 current articles|24<!-- --> current articles/i,
  );
  assert.match(html, /Nine older local article drafts/i);
  assert.match(html, /Arabic vs English SEO Strategy for UAE Businesses/);
  assert.match(
    html,
    /href="\/google-ads-management-cost-dubai-2026\/"/i,
  );
});

test("serves a canonical-only XML sitemap and preview robots policy", async () => {
  const sitemapResponse = await render("/sitemap.xml");
  assert.equal(sitemapResponse.status, 200);
  assert.match(
    sitemapResponse.headers.get("content-type") ?? "",
    /^application\/xml\b/i,
  );
  const xml = await sitemapResponse.text();
  assert.match(xml, /https:\/\/media87\.com\/local-seo-services\//);
  assert.match(xml, /https:\/\/media87\.com\/workshop\//);
  assert.match(xml, /https:\/\/media87\.com\/blog\//);
  assert.doesNotMatch(xml, /prompt-database/);
  assert.doesNotMatch(xml, /llm-indexing-package-cp/);
  assert.doesNotMatch(xml, /thankyou-for-the-subscription/);
  assert.doesNotMatch(xml, /media87\.com\/\/+/);

  const robotsResponse = await render("/robots.txt");
  assert.equal(robotsResponse.status, 200);
  const robots = await robotsResponse.text();
  assert.match(robots, /User-agent: \*/);
  assert.match(robots, /Disallow: \//);
  assert.match(robots, /Sitemap: https:\/\/media87\.com\/sitemap\.xml/);
});

test("keeps the recovered root-page inventory renderable", async () => {
  const recoveredRoutes = [
    "/ads-managment/",
    "/ai-powered-conversations/",
    "/authors-team/",
    "/digital-marketing-services-in-dubai/",
    "/editorial-guidelines/",
    "/faqs/",
    "/future-growth-lab/",
    "/geo-tagging-images-for-seo/",
    "/human-like-ai-calling-bots/",
    "/llm-package/",
    "/local-seo-services/",
    "/privacy-policy/",
    "/prompts/",
    "/salesbot/",
    "/seo-and-ads-management-for-restaurants/",
    "/seo-for-dubai-businesses/",
    "/terms-of-services/",
    "/thankyou-for-the-subscription/",
    "/workshop/",
  ];

  for (const path of recoveredRoutes) {
    const response = await render(path);
    assert.equal(response.status, 200, `${path} should render`);
  }
});

test("server-renders an important service with the interactive mesh copy", async () => {
  const response = await render("/services/local-seo/");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Local visibility/);
  assert.match(html, /real signals/);
  assert.match(html, /Google Business Profile action plan/);
  assert.match(html, /thin doorway pages/);
});

test("server-renders the lightweight flow field only on AI automation", async () => {
  const response = await render("/services/ai-automation/");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /A visible automation path/);
  assert.match(html, /Let information move/);
  assert.match(html, /Capture/);
  assert.match(html, /Validate/);
  assert.match(html, /Measure/);
  assert.match(html, /FlowField-[^"]+\.js/);
});

test("server-renders the original AI video portfolio without loading players upfront", async () => {
  const response = await render("/ai-video-creation-service/");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Original Media87 portfolio/);
  assert.match(html, /i\.ytimg\.com\/vi\/oUkmajfjjWw\/hqdefault\.jpg/);
  assert.match(html, /Reputation management explainer/);
  assert.doesNotMatch(html, /youtube-nocookie\.com\/embed/);
});

test("server-renders a preserved live article URL", async () => {
  const response = await render(
    "/local-seo-dubai-how-to-rank-for-near-me-searches-in-2026/",
  );
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Local SEO Dubai/);
  assert.match(html, /Live URL preserved/);
  assert.match(html, /Editorial migration draft/);
});
