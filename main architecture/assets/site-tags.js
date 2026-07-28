(() => {
  "use strict";

  const GOOGLE_TAG_ID = "GT-KVFLZP7K";
  const META_PIXEL_ID = "942291175461032";
  const ADSENSE_CLIENT = "ca-pub-6396157876082473";

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

  function loadGoogleTag() {
    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function gtag() {
        window.dataLayer.push(arguments);
      };
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

  function initialise() {
    loadGoogleTag();
    loadMetaPixel();
    loadAdSense();
  }

  function scheduleInitialise() {
    let started = false;
    const interactionEvents = ["pointerdown", "keydown", "touchstart", "scroll"];
    const start = () => {
      if (started) return;
      started = true;
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, start);
      });
      initialise();
    };

    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, start, { once: true, passive: true });
    });
    window.setTimeout(start, 8000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleInitialise, {
      once: true,
    });
  } else {
    scheduleInitialise();
  }
})();
