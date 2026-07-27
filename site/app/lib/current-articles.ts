import { liveArticles } from "./live-content.generated";

export const currentArticleSlugs = [
  "arabic-vs-english-seo-uae-businesses",
  "google-ads-management-cost-dubai-2026",
  "ai-seo-dubai-smes-30-day-checklist",
  "local-seo-dubai-how-to-rank-for-near-me-searches-in-2026",
  "seo-vs-google-ads-dubai-businesses",
  "seo-cost-dubai-buyer-guide",
  "top-digital-marketers-in-pakistan",
  "how-to-save-token-cost-and-make-openclaw-secure-with-one-prompt",
  "local-seo-in-2026-practical-playbook-for-dubai-businesses",
  "whatsapp-automation-for-restaurants-complete-2025-guide",
  "local-seo-guide-2025-how-to-dominate-local-search-rankings",
  "portfolio",
  "how-to-automatically-read-classify-and-reply-to-emails-using-ai-step-by-step-n8n-guide",
  "useful-prompts-for-nano-banana-part-1",
  "why-chatbots-are-important-for-local-businesses-in-the-uae",
  "local-seo-what-it-is-how-to-do-it-complete-2026-guide",
  "digital-marketing-agency-jlt-dubai",
  "how-to-create-ultra-realistic-human-sound-voice-with-prompting",
  "email-automated-replies-for-your-customer-service-or-agency",
  "how-to-add-a-cinematic-profile-photo-to-your-gmail-step-by-step-guide",
  "water-mark-remover",
  "how-to-make-linkedin-post-assistant-with-n8n",
  "create-cinematic-style-personal-portfolio",
  "how-to-make-ai-ultra-realistic-ads",
] as const;

const currentArticleSet = new Set<string>(currentArticleSlugs);

export const currentArticles = liveArticles.filter((article) =>
  currentArticleSet.has(article.slug),
);
