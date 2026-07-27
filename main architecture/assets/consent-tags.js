(() => {
  "use strict";

  const STORAGE_KEY = "media87-consent-v1";
  const GOOGLE_TAG_ID = "GT-KVFLZP7K";
  const META_PIXEL_ID = "942291175461032";
  const ADSENSE_CLIENT = "ca-pub-6396157876082473";
  const validChoices = new Set(["necessary", "analytics", "all"]);

  function readChoice() {
    try {
      const choice = window.localStorage.getItem(STORAGE_KEY);
      return validChoices.has(choice) ? choice : "";
    } catch {
      return "";
    }
  }

  function writeChoice(choice) {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // The page still works when browser storage is unavailable.
    }
  }

  function loadScript(id, src, attributes = {}) {
    if (document.getElementById(id)) return;
    const script = document.createElement("script");
    script.id = id;
    script.src = src;
    script.async = true;
    for (const [name, value] of Object.entries(attributes)) {
      script.setAttribute(name, value);
    }
    document.head.append(script);
  }

  function loadGoogleTag(marketingAllowed) {
    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function gtag() {
        window.dataLayer.push(arguments);
      };
    window.gtag("consent", "default", {
      analytics_storage: "granted",
      ad_storage: marketingAllowed ? "granted" : "denied",
      ad_user_data: marketingAllowed ? "granted" : "denied",
      ad_personalization: marketingAllowed ? "granted" : "denied",
    });
    window.gtag("js", new Date());
    window.gtag("config", GOOGLE_TAG_ID);
    loadScript(
      "media87-google-tag",
      `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GOOGLE_TAG_ID)}`,
    );
  }

  function loadMetaPixel() {
    if (window.fbq) return;
    const fbq = function () {
      fbq.callMethod
        ? fbq.callMethod.apply(fbq, arguments)
        : fbq.queue.push(arguments);
    };
    window.fbq = fbq;
    if (!window._fbq) window._fbq = fbq;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    loadScript(
      "media87-meta-pixel",
      "https://connect.facebook.net/en_US/fbevents.js",
    );
    fbq("init", META_PIXEL_ID);
    fbq("track", "PageView");
  }

  function loadAdSense() {
    const body = document.body;
    const isEditorialPage =
      body.classList.contains("blog-page") ||
      body.classList.contains("article-page");
    if (!isEditorialPage) return;
    loadScript(
      "media87-adsense",
      `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(ADSENSE_CLIENT)}`,
      { crossorigin: "anonymous" },
    );
  }

  function applyChoice(choice) {
    if (choice === "analytics" || choice === "all") {
      loadGoogleTag(choice === "all");
    }
    if (choice === "all") {
      loadMetaPixel();
      loadAdSense();
    }
  }

  function createConsentPanel() {
    const panel = document.createElement("section");
    panel.className = "consent-panel";
    panel.hidden = true;
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "false");
    panel.setAttribute("aria-labelledby", "consent-title");
    panel.innerHTML = `
      <div class="consent-panel__copy">
        <span>PRIVACY CONTROL</span>
        <h2 id="consent-title">Choose optional website technology.</h2>
        <p>Necessary functions always remain available. Analytics helps Media87 understand site use. “Accept all” also permits Meta measurement and AdSense on editorial pages.</p>
        <a href="/privacy-policy/">Read the privacy policy</a>
      </div>
      <div class="consent-panel__actions">
        <button type="button" data-consent-choice="all">Accept all</button>
        <button type="button" data-consent-choice="analytics">Analytics only</button>
        <button type="button" data-consent-choice="necessary">Necessary only</button>
      </div>
    `;
    document.body.append(panel);

    panel.addEventListener("click", (event) => {
      const button = event.target.closest("[data-consent-choice]");
      if (!button) return;
      const choice = button.dataset.consentChoice;
      if (!validChoices.has(choice)) return;
      writeChoice(choice);
      window.location.reload();
    });
    return panel;
  }

  function initialise() {
    const choice = readChoice();
    if (choice) applyChoice(choice);

    const panel = createConsentPanel();
    if (!choice) panel.hidden = false;

    document.addEventListener("click", (event) => {
      const settingsButton = event.target.closest("[data-cookie-settings]");
      if (!settingsButton) return;
      panel.hidden = false;
      panel.querySelector("button")?.focus();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialise, { once: true });
  } else {
    initialise();
  }
})();
