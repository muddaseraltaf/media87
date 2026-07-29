(() => {
  "use strict";

  const CHATBOT_ID = "bfa81d9bba3647f9907117b422fca4cf";
  const CHATBOT_DOMAIN = "https://chat.media87.com";
  const EMBED_SCRIPT = `${CHATBOT_DOMAIN}/embed.min.js`;

  function loadChatbot() {
    if (document.getElementById("media87-chatbot-embed")) return;

    window.chatpilotConfig = {
      chatbotId: CHATBOT_ID,
      domain: CHATBOT_DOMAIN,
    };

    const script = document.createElement("script");
    script.id = "media87-chatbot-embed";
    script.src = EMBED_SCRIPT;
    script.charset = "utf-8";
    script.async = true;
    document.body.append(script);
  }

  function scheduleChatbot() {
    let started = false;
    const interactionEvents = ["pointerdown", "keydown", "touchstart", "scroll"];
    const start = () => {
      if (started) return;
      started = true;
      interactionEvents.forEach((eventName) => {
        window.removeEventListener(eventName, start);
      });
      loadChatbot();
    };

    interactionEvents.forEach((eventName) => {
      window.addEventListener(eventName, start, { once: true, passive: true });
    });

    const startWhenIdle = () => {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(start, { timeout: 4000 });
      } else {
        window.setTimeout(start, 2000);
      }
    };

    if (document.readyState === "complete") {
      startWhenIdle();
    } else {
      window.addEventListener("load", startWhenIdle, { once: true });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleChatbot, {
      once: true,
    });
  } else {
    scheduleChatbot();
  }
})();
