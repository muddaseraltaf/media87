export type RecoveredSection = {
  title: string;
  body: string;
  items?: string[];
};

export type RecoveredFaq = {
  question: string;
  answer: string;
};

export type RecoveredPage = {
  slug: string;
  title: string;
  eyebrow: string;
  h1: string;
  description: string;
  intro: string;
  role:
    | "service"
    | "market"
    | "guide"
    | "industry"
    | "innovation"
    | "workshop"
    | "tool"
    | "resource"
    | "product"
    | "trust"
    | "legal"
    | "system";
  canonicalPath?: string;
  noindex?: boolean;
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
  media?: {
    title: string;
    src: string;
    label?: string;
    poster?: string;
    aspect?: "video" | "tall";
  };
  signals: string[];
  sections: RecoveredSection[];
  process?: string[];
  limitations: string;
  faq?: RecoveredFaq[];
  related: {
    label: string;
    href: string;
  }[];
  ctaTitle?: string;
  ctaBody?: string;
};

export const recoveredRootPages: RecoveredPage[] = [
  {
    slug: "local-seo-services",
    title: "Local SEO Services",
    eyebrow: "Local discovery",
    h1: "Be easier to find when nearby customers are ready to act.",
    description:
      "Local SEO services connecting Google Business Profile, website quality, reputation workflows, local relevance and measurement.",
    intro:
      "Media87 helps genuine location and service-area businesses connect accurate business information, useful local pages, reputation activity and conversion paths. Dubai is an important operating context, but the method is built around the real footprint of each business.",
    role: "service",
    image: {
      src: "/images/recovered/local-seo.jpg",
      alt: "Media87 local SEO service artwork showing location and search signals",
      caption: "Original artwork recovered from the live Local SEO page.",
    },
    signals: [
      "Google Business Profile",
      "Local page quality",
      "Citations and consistency",
      "Reviews and responses",
    ],
    sections: [
      {
        title: "Start with the real business footprint",
        body:
          "The first step is to confirm locations, service areas, categories, contact details, ownership and the actions customers can actually take. Local relevance should be supported by reality rather than city-name substitutions.",
        items: [
          "Business and competitor analysis",
          "Business-profile and category review",
          "Location-data consistency",
          "Local conversion-path review",
        ],
      },
      {
        title: "Connect profile work to the website",
        body:
          "A profile cannot compensate for a weak website. Service ownership, indexation, internal links, useful local context and clear calls to action should support the same business entity and customer need.",
      },
      {
        title: "Build an honest reputation workflow",
        body:
          "Review requests should go to eligible customers without filtering unhappy people or coaching anyone to use target keywords. Response ownership and feedback learning are part of the operating system.",
      },
    ],
    process: [
      "Business and competitor analysis",
      "Google Business Profile optimisation",
      "Local keyword and page mapping",
      "On-page and internal-link improvement",
      "Citation and local-authority work",
      "Monitoring, reporting and iteration",
    ],
    limitations:
      "Media87 will not create fake locations, fabricate local proof, promise map-pack positions or mass-produce doorway pages. Verification, suspensions and search visibility remain subject to platform decisions and competition.",
    faq: [
      {
        question: "Do we need a page for every city?",
        answer:
          "No. A location page needs a genuinely distinct local decision, truthful service coverage and maintainable local value. Otherwise the core service page should own the need.",
      },
      {
        question: "Can local SEO work for a service-area business?",
        answer:
          "Yes, when the service area is truthful and the website, profile and contact journey accurately describe how the business operates without implying a fake branch.",
      },
      {
        question: "How does LocalZen fit?",
        answer:
          "LocalZen can organise review requests, monitoring, responses and reputation insight. It supports a wider local-search programme; it does not replace website, profile or service-delivery quality.",
      },
    ],
    related: [
      { label: "Explore LocalZen", href: "/localzen/" },
      { label: "Read the Dubai local SEO guide", href: "/local-seo-dubai-how-to-rank-for-near-me-searches-in-2026/" },
      { label: "Discuss local SEO", href: "/contact-us/" },
    ],
  },
  {
    slug: "ads-managment",
    title: "Ads Management",
    eyebrow: "Paid acquisition",
    h1: "Make paid media accountable to a real business outcome.",
    description:
      "Ads management across Google, Meta and TikTok with measurement, targeting, creative, landing pages and lead quality connected.",
    intro:
      "The recovered live offer covers Google, Facebook and TikTok advertising. The rebuilt page keeps that breadth while making the measurement foundation, platform spend, management scope and optimisation decisions clearer.",
    role: "service",
    image: {
      src: "/images/recovered/ads-management.jpg",
      alt: "Media87 ads management artwork showing campaign performance elements",
      caption: "Original artwork recovered from the live Ads Management page.",
    },
    signals: [
      "Google Ads",
      "Meta advertising",
      "TikTok advertising",
      "Landing-page alignment",
    ],
    sections: [
      {
        title: "Measurement before scale",
        body:
          "Define the useful conversion, check tracking and connect platform activity to qualified enquiries, bookings, purchases or downstream sales stages where data allows.",
      },
      {
        title: "Campaign architecture around intent",
        body:
          "Budgets, audiences, search terms, creative and landing pages should reflect the offer economics and customer decision—not a generic traffic target.",
        items: [
          "Discovery and market research",
          "Channel and campaign planning",
          "Ad creative development",
          "Audience and query targeting",
        ],
      },
      {
        title: "Optimisation with commercial feedback",
        body:
          "Platform conversions are a starting signal. Search terms, lead quality, sales feedback, cost constraints and landing-page behaviour decide what should be repaired, stopped or expanded.",
      },
    ],
    process: [
      "Discovery and research",
      "Strategy and measurement plan",
      "Creative and landing preparation",
      "Targeting and controlled launch",
      "Monitoring and reporting",
      "Scale what earns the right",
    ],
    limitations:
      "Media87 cannot guarantee lead volume or return. Results depend on demand, offer quality, tracking, budget, creative, landing experience, sales response and platform conditions. Media spend is separate from management unless an approved proposal states otherwise.",
    faq: [
      {
        question: "Is advertising spend included?",
        answer:
          "It should be separated from the management fee. The proposal should show platform spend, management scope and any creative or landing-page work clearly.",
      },
      {
        question: "Can Media87 repair an existing account?",
        answer:
          "An audit can identify measurement gaps, weak search terms, structural issues and landing-page mismatches before deciding whether to repair or rebuild.",
      },
      {
        question: "Which platform should we use?",
        answer:
          "The choice follows buyer intent, creative requirements, audience reach, economics and measurement maturity. The answer is not automatically every platform.",
      },
    ],
    related: [
      { label: "Compare SEO and Google Ads", href: "/seo-vs-google-ads-dubai-businesses/" },
      { label: "Read the Dubai Ads cost guide", href: "/google-ads-management-cost-dubai-2026/" },
      { label: "Start a campaign discussion", href: "/contact-us/" },
    ],
  },
  {
    slug: "ai-powered-conversations",
    title: "AI-Powered Conversations",
    eyebrow: "Conversational growth",
    h1: "Make the first customer conversation more useful.",
    description:
      "Conversational journeys for websites and messaging channels with approved knowledge, qualification, booking and human handoff.",
    intro:
      "The service layer covers conversation research, knowledge design, channel implementation, qualification and operational handoff. ChatZen is the productised system that can support the experience where it fits.",
    role: "service",
    image: {
      src: "/images/recovered/ai-powered-conversations.jpg",
      alt: "Media87 conversational AI artwork with chat and automation elements",
      caption: "Original artwork recovered from the live conversations page family.",
    },
    signals: [
      "Approved answers",
      "Lead qualification",
      "Booking and routing",
      "Human escalation",
    ],
    sections: [
      {
        title: "Answer the questions customers actually ask",
        body:
          "Start with sales, support and on-site conversation evidence. Define what the assistant can answer, what information it can collect and when it must hand the conversation to a person.",
      },
      {
        title: "Design the handoff, not only the chat",
        body:
          "A useful conversation preserves context as it moves into a calendar, inbox, CRM or support queue. Ownership, response expectations and failure states should be visible.",
      },
      {
        title: "Improve with controlled review",
        body:
          "Conversation logs can reveal gaps, but changes to knowledge and behaviour should be approved, tested and monitored rather than allowed to drift automatically.",
      },
    ],
    process: [
      "Map real customer questions",
      "Design conversation and permissions",
      "Build approved knowledge",
      "Connect booking, CRM or inbox handoff",
      "Test representative and failure cases",
      "Launch with monitoring",
    ],
    limitations:
      "An AI assistant should not pretend to be a human or provide unapproved professional advice. Accuracy depends on the supplied knowledge, integrations, safeguards and ongoing ownership.",
    faq: [
      {
        question: "Is this the same as ChatZen?",
        answer:
          "This page describes the managed conversation-design and implementation service. ChatZen is the Media87 product page that documents a specific system and workflow.",
      },
      {
        question: "Can it book meetings or capture leads?",
        answer:
          "Those journeys can be scoped when the required calendar, form, CRM or messaging access is available and the consent/data-handling path is approved.",
      },
      {
        question: "What happens when it does not know?",
        answer:
          "The intended answer is an honest fallback and a clear human handoff. Guessing should not be treated as a feature.",
      },
    ],
    related: [
      { label: "Explore ChatZen", href: "/chatzen/" },
      { label: "Open the live salesbot demo", href: "/salesbot/" },
      { label: "Discuss a conversation journey", href: "/contact-us/" },
    ],
  },
  {
    slug: "digital-marketing-services-in-dubai",
    title: "Digital Marketing Services in Dubai",
    eyebrow: "Dubai market",
    h1: "Turn visibility into enquiries, bookings and sales.",
    description:
      "A connected digital marketing system for Dubai businesses across SEO, paid media, social, websites, content and automation.",
    intro:
      "Dubai buyers move between search, reviews, social content, ads, websites and direct messaging. This page connects those touchpoints around a commercial outcome instead of selling each channel as an isolated activity.",
    role: "market",
    image: {
      src: "/images/recovered/digital-marketing-dubai.jpg",
      alt: "Media87 digital marketing system illustration showing connected growth signals",
      caption: "Original hero artwork from the recovered Dubai services page.",
    },
    signals: [
      "SEO and local SEO",
      "Google Ads",
      "Social media",
      "Web and landing pages",
      "Content and AI",
      "Automation and chatbots",
    ],
    sections: [
      {
        title: "What the system should improve",
        body:
          "The priority is not activity volume. It is whether the right people can discover the offer, understand it, trust it, take action and receive a useful response.",
      },
      {
        title: "Choose channels around the buying journey",
        body:
          "Search captures existing demand, paid media tests and scales reachable demand, content clarifies the decision, and automation improves the handoffs between interest and response.",
      },
      {
        title: "Dubai context without a template footprint",
        body:
          "The work can reflect Dubai audience mix, language choices, local search behaviour, competition and response expectations. It does not justify creating a page for every neighbourhood or city-name variation.",
      },
    ],
    process: [
      "Clarify the commercial outcome",
      "Audit the current acquisition journey",
      "Prioritise the weakest handoff",
      "Build a measurable channel plan",
      "Launch controlled work",
      "Review lead quality and improve",
    ],
    limitations:
      "This is a truthful Dubai service-area page, not evidence of a staffed branch or guaranteed local result. Address, service coverage, response times and proof must be approved before production.",
    faq: [
      {
        question: "Do we need every digital marketing channel?",
        answer:
          "No. The mix should follow the customer journey, budget, evidence and the team’s ability to respond. A smaller connected system is often stronger than scattered activity.",
      },
      {
        question: "Can Media87 work outside Dubai?",
        answer:
          "The core capabilities are designed for international delivery. Market-specific claims, languages, availability and legal requirements still need to be confirmed for each engagement.",
      },
      {
        question: "Should we start with SEO or ads?",
        answer:
          "Ads can test and capture demand quickly, while SEO builds an owned foundation over time. The right sequence depends on urgency, budget, competition, site quality and measurement readiness.",
      },
    ],
    related: [
      { label: "Explore all services", href: "/services/" },
      { label: "Read SEO for Dubai businesses", href: "/seo-for-dubai-businesses/" },
      { label: "Start a Dubai growth discussion", href: "/contact-us/" },
    ],
  },
  {
    slug: "seo-for-dubai-businesses",
    title: "SEO for Dubai Businesses",
    eyebrow: "Search strategy",
    h1: "Build a search foundation that compounds.",
    description:
      "A practical SEO pillar for Dubai businesses covering technical foundations, service pages, local SEO, content clusters, measurement and channel decisions.",
    intro:
      "This recovered pillar page is a decision guide for Dubai businesses, not another generic service page. It explains how technical quality, clear page ownership, local relevance, useful content and internal links work together.",
    role: "guide",
    image: {
      src: "/images/recovered/seo-dubai-businesses.jpg",
      alt: "Media87 illustration for a connected SEO system in Dubai",
      caption: "Original hero artwork from the recovered SEO pillar page.",
    },
    signals: [
      "Technical foundations",
      "Commercial service pages",
      "Local search",
      "Topic clusters",
      "Measurement",
    ],
    sections: [
      {
        title: "Technical quality protects everything above it",
        body:
          "Crawlability, rendering, canonicalisation, internal links, indexation, structured data and performance determine whether useful pages can be discovered and understood reliably.",
      },
      {
        title: "One clear owner for every commercial need",
        body:
          "Service pages, market pages and articles should not compete for the same decision. A keyword-to-page map clarifies which URL owns the intent and how supporting content links back.",
      },
      {
        title: "Local SEO is an overlay, not the whole strategy",
        body:
          "Google Business Profile, business information, reviews and real local context matter for nearby demand. They still depend on truthful business operations and strong service pages.",
      },
      {
        title: "Content clusters should help a buyer decide",
        body:
          "Pricing guides, comparisons, implementation playbooks and real questions can support commercial pages when each article adds evidence, judgement or a useful next step.",
      },
    ],
    process: [
      "Audit the current search footprint",
      "Map queries and decisions to pages",
      "Fix technical and indexation blockers",
      "Improve commercial owners",
      "Publish only useful supporting content",
      "Measure qualified organic actions",
    ],
    limitations:
      "No agency controls rankings or a fixed result date. Competition, starting condition, implementation, content quality, authority and search-system changes all affect the outcome.",
    faq: [
      {
        question: "How long does SEO take in Dubai?",
        answer:
          "There is no universal timeline. Technical fixes can be visible quickly, while competitive commercial growth usually requires sustained implementation and measurement.",
      },
      {
        question: "Is local SEO enough?",
        answer:
          "It can be central for nearby demand, but most businesses still need technically sound pages, clear service ownership, useful proof and a conversion path.",
      },
      {
        question: "Should content be written for AI search?",
        answer:
          "Content should be accurate, attributable, well structured and useful to people first. Clear entities and evidence can also help machines understand it; no format guarantees citation.",
      },
    ],
    related: [
      { label: "Explore SEO services", href: "/services/seo/" },
      { label: "Explore local SEO", href: "/local-seo-services/" },
      { label: "Read the SEO cost guide", href: "/seo-cost-dubai-buyer-guide/" },
    ],
  },
  {
    slug: "human-like-ai-calling-bots",
    title: "Human-Like AI Calling Bots",
    eyebrow: "Business guide",
    h1: "Decide where AI calling helps—and where a person should stay in control.",
    description:
      "A business guide to AI calling bots covering use cases, quality, implementation, safeguards, platform selection and human handoff.",
    intro:
      "The recovered guide focuses on the operating decision behind AI calling: which conversations are structured enough to automate, how quality is reviewed and what must happen when the system reaches a limit.",
    role: "guide",
    image: {
      src: "/images/recovered/ai-calling-workflow.png",
      alt: "Media87 diagram of an AI calling workflow from trigger through human handoff",
      caption: "Original workflow diagram from the recovered AI calling guide.",
    },
    signals: [
      "Inbound and outbound calls",
      "Consent and disclosure",
      "Conversation quality",
      "Human handoff",
    ],
    sections: [
      {
        title: "Use a bot for a defined conversation",
        body:
          "Appointment confirmation, structured qualification, follow-up and information collection can be candidates when permissions, scripts, exceptions and ownership are clear.",
      },
      {
        title: "Quality is a loop, not a voice effect",
        body:
          "A natural voice does not make an unreliable workflow safe. Sample review, transcript analysis, failure tagging, knowledge updates and escalation rules determine operational quality.",
      },
      {
        title: "Evaluate the whole platform",
        body:
          "Voice quality, latency, telephony, data handling, integrations, observability, language support, fallback behaviour and pricing all affect fit.",
      },
    ],
    process: [
      "Choose one bounded use case",
      "Confirm consent, disclosure and data rules",
      "Design the script and exception paths",
      "Connect approved systems",
      "Test real and adversarial calls",
      "Monitor, review and escalate",
    ],
    limitations:
      "AI calling can create legal, privacy, reputational and customer-experience risk. Consent, recording, disclosure, do-not-call requirements and professional-advice boundaries must be reviewed for the relevant market.",
    faq: [
      {
        question: "Should an AI caller sound exactly like a human?",
        answer:
          "Natural interaction can reduce friction, but the system should not deceive people about what it is. Disclosure and local rules need explicit review.",
      },
      {
        question: "Can it replace a sales team?",
        answer:
          "It may handle bounded repetitive stages. Complex objections, sensitive situations, negotiation and relationship-building often need a person.",
      },
      {
        question: "What should be measured?",
        answer:
          "Measure successful task completion, qualified handoffs, opt-outs, failure types, complaint rate, response latency and downstream business quality—not call volume alone.",
      },
    ],
    related: [
      { label: "Explore AI automation", href: "/services/ai-automation/" },
      { label: "Explore AI conversations", href: "/ai-powered-conversations/" },
      { label: "Discuss a controlled pilot", href: "/contact-us/" },
    ],
  },
  {
    slug: "seo-and-ads-management-for-restaurants",
    title: "Marketing for Restaurants",
    eyebrow: "Restaurant and hospitality",
    h1: "Connect local discovery, paid demand and the path to booking.",
    description:
      "SEO, ads, websites, reputation and automation for restaurant and hospitality customer journeys.",
    intro:
      "The recovered page names local presence, ads management, website creation and automation. The rebuild gives those capabilities a restaurant-specific decision path without inventing client results or a one-size-fits-all package.",
    role: "industry",
    signals: [
      "Local discovery",
      "Menu and venue pages",
      "Paid campaigns",
      "Bookings and enquiries",
      "Reputation",
    ],
    sections: [
      {
        title: "Help guests find and evaluate the venue",
        body:
          "Search visibility, business-profile accuracy, menus, photographs, reviews, location details and a clear booking route should support the same guest decision.",
      },
      {
        title: "Use paid media for a defined occasion",
        body:
          "Campaigns can support launches, events, seasonal menus, delivery or bookings when targeting, creative, availability and measurement are aligned.",
      },
      {
        title: "Reduce friction after interest",
        body:
          "Web, WhatsApp, chatbot and reservation handoffs can answer common questions and preserve context, while a person remains available for exceptions.",
      },
    ],
    process: [
      "Map the guest journey",
      "Verify location, menu and booking information",
      "Prioritise organic and paid demand",
      "Improve the landing and response path",
      "Launch a controlled campaign",
      "Measure bookings, visits and lead quality",
    ],
    limitations:
      "Restaurant-specific proof, platform access, booking integrations, delivery coverage, offers and creative rights must be verified before publishing performance claims.",
    related: [
      { label: "Explore the hospitality solution", href: "/industries/restaurants-hospitality/" },
      { label: "Read the WhatsApp automation guide", href: "/whatsapp-automation-for-restaurants-complete-2025-guide/" },
      { label: "Discuss restaurant marketing", href: "/contact-us/" },
    ],
  },
  {
    slug: "future-growth-lab",
    title: "Future Growth Lab",
    eyebrow: "Media87 innovation",
    h1: "Design an AI-native growth system around speed, quality and control.",
    description:
      "Media87 Future Growth Lab connects ChatZen, LocalZen, AI automation, content, video, search and conversational workflows.",
    intro:
      "This recovered concept page is the clearest map of how Media87 sees its future offer: products and automation connected to agency strategy, creative production and measurable customer journeys.",
    role: "innovation",
    signals: [
      "ChatZen",
      "LocalZen",
      "AI automation",
      "AI content",
      "SEO, AIO and GEO",
      "Creative production",
    ],
    sections: [
      {
        title: "Products provide reusable operating systems",
        body:
          "ChatZen focuses on the first conversation. LocalZen focuses on reputation activity. Each product should be documented as a real workflow with supported integrations, ownership and limits.",
      },
      {
        title: "Automation connects the handoffs",
        body:
          "Forms, inboxes, CRM records, calendars, content systems and reporting become more useful when information can move with validation and a visible exception path.",
      },
      {
        title: "Creative and search create demand",
        body:
          "AI avatars, photo enhancement, translation, social automation, video, SEO and emerging discovery formats can share one approved source strategy instead of operating as disconnected production tasks.",
      },
    ],
    process: [
      "Choose the business bottleneck",
      "Map the existing journey",
      "Select the smallest useful capability",
      "Prototype with safeguards",
      "Measure quality and speed",
      "Scale only after evidence",
    ],
    limitations:
      "Future-facing concepts are not automatically active product features. Availability, integrations, data handling, pricing and support must be confirmed before a proposal or publication.",
    related: [
      { label: "Explore products", href: "/products/" },
      { label: "Explore AI automation", href: "/services/ai-automation/" },
      { label: "See AI video work", href: "/ai-video-creation-service/" },
    ],
  },
  {
    slug: "workshop",
    title: "OpenClaw Workshop",
    eyebrow: "Live learning",
    h1: "Build a safer, more efficient OpenClaw workflow.",
    description:
      "A practical Media87 OpenClaw workshop covering setup, security, useful automation and token-cost control.",
    intro:
      "The recovered offer is a practical two-hour workshop covering setup, a lower-cost operating method, security, useful automations and token savings. Schedule, price and access remain approval-dependent in the local rebuild.",
    role: "workshop",
    image: {
      src: "/images/recovered/openclaw-workshop.jpg",
      alt: "Original Media87 OpenClaw workshop visual",
      caption: "Original image recovered from the live workshop page.",
    },
    media: {
      title: "OpenClaw workshop introduction",
      src: "https://www.youtube-nocookie.com/embed/b4CKMW4N0Bw?autoplay=1&rel=0",
      label: "Play the original workshop video",
      poster: "/images/recovered/openclaw-workshop.jpg",
    },
    signals: [
      "Secure setup",
      "Token efficiency",
      "Practical automation",
      "Recovery planning",
    ],
    sections: [
      {
        title: "Set up with security in the architecture",
        body:
          "Permissions, secrets, tool access, external content, failure states and recovery should be considered before adding more capabilities.",
      },
      {
        title: "Spend context where it helps",
        body:
          "Model routing, compact operating instructions, deliberate memory and task-specific context can reduce waste without removing the information an agent needs.",
      },
      {
        title: "Leave with a working use case",
        body:
          "The useful outcome is a bounded automation the attendee understands, can inspect and can recover—not only a list of tools.",
      },
    ],
    process: [
      "Environment and safety check",
      "Core setup",
      "One practical automation",
      "Token and context review",
      "Security hardening",
      "Recovery and next steps",
    ],
    limitations:
      "The current workshop schedule, attendance limit, price, recording access and support terms require approval. Tool behaviour and security guidance can change and must be reviewed before each session.",
    related: [
      { label: "Read the OpenClaw token guide", href: "/how-to-save-token-cost-and-make-openclaw-secure-with-one-prompt/" },
      { label: "Explore AI automation", href: "/services/ai-automation/" },
      { label: "Ask about the next workshop", href: "/contact-us/" },
    ],
  },
  {
    slug: "geo-tagging-images-for-seo",
    title: "Image Geo-Tagging Tool",
    eyebrow: "Media87 tool",
    h1: "Prepare image location metadata with the privacy trade-offs visible.",
    description:
      "A browser-based Media87 tool concept for applying GPS and title metadata to images and downloading the results.",
    intro:
      "The recovered tool accepts images, lets a user select a location and writes GPS/title metadata before download. The local redesign preserves the URL and explains the workflow while the original processing code receives a privacy, browser and output-quality review.",
    role: "tool",
    signals: [
      "Multi-image upload",
      "Location search",
      "GPS and title metadata",
      "JPEG and ZIP output",
    ],
    sections: [
      {
        title: "What the recovered tool does",
        body:
          "Users can upload one or more images, choose a location, apply metadata and download individual JPEGs or a ZIP. Non-JPEG inputs are converted in the current implementation.",
      },
      {
        title: "What metadata cannot do",
        body:
          "Geo-tagging is not a local-ranking shortcut and should not misrepresent where a photograph was taken. Image usefulness, rights, subject matter, page context and real business information matter more than a hidden coordinate alone.",
      },
      {
        title: "Migration requirements",
        body:
          "The final tool needs a clear local-processing or upload disclosure, EXIF verification, predictable filenames, mobile testing, output-quality checks and an accessible non-drag-and-drop path.",
      },
    ],
    limitations:
      "The interactive processor is intentionally not marked production-ready in this design pass. Users should not attach false location metadata or upload sensitive images without understanding where processing occurs.",
    related: [
      { label: "Explore local SEO", href: "/local-seo-services/" },
      { label: "Read the local SEO guide", href: "/local-seo-what-it-is-how-to-do-it-complete-2026-guide/" },
      { label: "Request tool access", href: "/contact-us/" },
    ],
  },
  {
    slug: "salesbot",
    title: "Salesbot Demo",
    eyebrow: "Live conversation",
    h1: "Try the Media87 conversation flow.",
    description:
      "A click-to-load demonstration of the Media87 sales chatbot and lead-routing experience.",
    intro:
      "The original page is an embedded chatbot. The rebuild keeps the demonstration isolated behind an explicit click so the external application does not affect every visitor’s initial page load.",
    role: "tool",
    media: {
      title: "Media87 sales chatbot",
      src: "https://chat.media87.com/chatbot-iframe/bfa81d9bba3647f9907117b422fca4cf",
      label: "Load the live chatbot",
      aspect: "tall",
    },
    signals: [
      "Question routing",
      "Lead context",
      "Service discovery",
      "Human follow-up",
    ],
    sections: [
      {
        title: "A demo should make the handoff visible",
        body:
          "Use the chatbot to explore how questions are answered, what information is requested and how the next step is presented. Do not submit sensitive or confidential information in a demonstration.",
      },
      {
        title: "The working system is larger than the widget",
        body:
          "Conversation design, approved knowledge, privacy, integrations, fallback behaviour, monitoring and response ownership determine whether a chatbot helps the business.",
      },
    ],
    limitations:
      "This is an external live demonstration. Availability and responses depend on the connected chatbot system; visitors should not treat demo output as professional advice.",
    related: [
      { label: "Explore ChatZen", href: "/chatzen/" },
      { label: "Explore AI conversations", href: "/ai-powered-conversations/" },
      { label: "Discuss your own chatbot", href: "/contact-us/" },
    ],
  },
  {
    slug: "prompts",
    title: "Media87 Prompt Library",
    eyebrow: "Creative resource",
    h1: "Start with a useful prompt—then apply judgement.",
    description:
      "A growing Media87 library of visual and workflow prompts with context, examples and responsible-use notes.",
    intro:
      "The recovered page contains a large visual prompt collection, particularly Nano Banana examples. The rebuild turns it into a scannable resource where every prompt can explain its use, inputs, limits and example output.",
    role: "resource",
    signals: [
      "Image prompts",
      "Creative direction",
      "Workflow prompts",
      "Examples and constraints",
    ],
    sections: [
      {
        title: "Prompts need a job",
        body:
          "A useful entry should state the intended output, required source material, variables to replace, model assumptions and what a person still needs to review.",
      },
      {
        title: "Examples should remain accessible",
        body:
          "The old page relies heavily on images. The rebuild should expose prompt text as selectable HTML, provide meaningful image alternatives and preserve the connection between the prompt and output.",
      },
      {
        title: "Rights and representation still matter",
        body:
          "Users remain responsible for likeness, trademark, copyright, disclosure and platform policy. A high-quality output is not proof that it is appropriate to publish.",
      },
    ],
    limitations:
      "The first local design preserves the resource architecture, not all 38 visual entries. The prompt catalogue requires a structured migration and rights review before production.",
    related: [
      { label: "Read Nano Banana prompts part one", href: "/useful-prompts-for-nano-banana-part-1/" },
      { label: "Explore content creation", href: "/services/content-creation/" },
      { label: "See AI video work", href: "/ai-video-creation-service/" },
    ],
  },
  {
    slug: "prompt-database",
    title: "Prompt Database",
    eyebrow: "Resource consolidation",
    h1: "The prompt library has one clearer home.",
    description:
      "The recovered prompt-database page is an empty placeholder and is being consolidated into the Media87 prompt library.",
    intro:
      "The live page currently contains placeholder content, while `/prompts/` contains the useful visual library. This URL is retained locally for migration review but should not compete in search.",
    role: "system",
    canonicalPath: "/prompts/",
    noindex: true,
    signals: ["Duplicate reviewed", "Canonical selected", "Redirect pending"],
    sections: [
      {
        title: "Why this page is being consolidated",
        body:
          "Two URLs should not own the same prompt-library need. The populated page is the stronger current owner; Search Console and backlink evidence should be checked before approving a permanent redirect.",
      },
    ],
    limitations:
      "This page is intentionally excluded from the proposed index. A production redirect still requires migration approval and validation.",
    related: [
      { label: "Open the prompt library", href: "/prompts/" },
      { label: "Read useful prompts", href: "/useful-prompts-for-nano-banana-part-1/" },
    ],
  },
  {
    slug: "llm-package",
    title: "LLM Visibility Package",
    eyebrow: "Productised authority offer",
    h1: "Build verifiable authority signals machines and people can inspect.",
    description:
      "A Media87 package concept for authoritative publication, entity clarity and discoverable brand evidence.",
    intro:
      "The recovered sales page presents a publication and LLM-indexing package. The local rebuild preserves the offer category but does not repeat outlet, customer, price or guarantee claims until documentary proof and current commercial terms are approved.",
    role: "product",
    signals: [
      "Entity and message clarity",
      "Publication planning",
      "Crawlable evidence",
      "Measurement and monitoring",
    ],
    sections: [
      {
        title: "Clarify the entity and evidence first",
        body:
          "The business name, people, products, expertise, proof and authoritative references need a coherent public record. Distribution without accurate source material can amplify confusion.",
      },
      {
        title: "Publication is not a citation guarantee",
        body:
          "A published article may improve discoverability or authority signals, but no package controls how a search engine or language model retrieves, interprets or cites information.",
      },
      {
        title: "Make deliverables auditable",
        body:
          "Any approved offer should list the exact research, writing, review, publication, link, revision, reporting and support responsibilities together with exclusions.",
      },
    ],
    process: [
      "Verify the organisation and offer",
      "Audit existing public evidence",
      "Develop an approved source brief",
      "Prepare and review the content",
      "Publish only through confirmed channels",
      "Monitor discoverability and accuracy",
    ],
    limitations:
      "Named outlets, customer counts, refund guarantees, price and AI-indexing outcomes are not approved facts in this local draft. Publication and indexing are controlled by third parties.",
    faq: [
      {
        question: "Does publication guarantee an AI citation?",
        answer:
          "No. Publication can create a crawlable source, but retrieval, ranking, summarisation and citation are controlled by each system.",
      },
      {
        question: "Which outlets are included?",
        answer:
          "The final page should name only outlets with a current, documented distribution path and should distinguish guaranteed placement from possible syndication.",
      },
      {
        question: "What should be measured?",
        answer:
          "Track publication status, crawlability, accurate brand/entity representation, referral activity, branded discovery and observed citations—without promising a fixed outcome.",
      },
    ],
    related: [
      { label: "Read the editorial guidelines", href: "/editorial-guidelines/" },
      { label: "Explore SEO services", href: "/services/seo/" },
      { label: "Request the verified scope", href: "/contact-us/" },
    ],
  },
  {
    slug: "llm-indexing-package-cp",
    title: "LLM Package Consolidation",
    eyebrow: "Migration decision",
    h1: "One package, one canonical page.",
    description:
      "The duplicate LLM indexing package page is being consolidated into the primary Media87 package URL.",
    intro:
      "The recovered site contains two substantially overlapping package pages. This URL is retained for review, marked out of the proposed index and aligned to `/llm-package/` as the canonical owner.",
    role: "system",
    canonicalPath: "/llm-package/",
    noindex: true,
    signals: ["Duplicate reviewed", "Canonical selected", "Redirect pending"],
    sections: [
      {
        title: "Why consolidation is safer",
        body:
          "One maintained offer page reduces conflicting prices, guarantees, deliverables and internal links. Search and backlink evidence should still be checked before the production redirect is approved.",
      },
    ],
    limitations:
      "This local page is a migration holding state, not the final production redirect.",
    related: [
      { label: "Open the LLM package", href: "/llm-package/" },
      { label: "Contact Media87", href: "/contact-us/" },
    ],
  },
  {
    slug: "thankyou-for-the-subscription",
    title: "Subscription Received",
    eyebrow: "LocalZen onboarding",
    h1: "Thank you. The next step is account setup.",
    description:
      "A noindex LocalZen subscription confirmation and onboarding page.",
    intro:
      "This recovered system page confirms a LocalZen subscription and explains that access details will follow. It is preserved outside the sitemap so campaign or checkout links do not break during migration.",
    role: "system",
    noindex: true,
    signals: [
      "Subscription confirmation",
      "Access details",
      "Account activation",
      "Support route",
    ],
    sections: [
      {
        title: "Check the subscription email",
        body:
          "The production page should state the verified sender, expected delivery time, support contact and what to do when an email does not arrive.",
      },
      {
        title: "Do not publish purchase details",
        body:
          "No customer, payment or account data should appear in page HTML, URLs or analytics events.",
      },
    ],
    limitations:
      "Onboarding timing and support expectations need commercial approval. This page must remain noindex and excluded from public navigation.",
    related: [
      { label: "Return to LocalZen", href: "/localzen/" },
      { label: "Contact support", href: "/contact-us/" },
    ],
  },
  {
    slug: "authors-team",
    title: "Media87 Authors and Team",
    eyebrow: "Who is responsible",
    h1: "Put real people and review responsibility behind the work.",
    description:
      "Media87 author, reviewer and team information with an editorial responsibility model.",
    intro:
      "The recovered page identifies Muddaser Altaf as the founder and author direction behind Media87, but it also contains a name inconsistency. The rebuild preserves the trust-page role while holding biographies and credentials for factual approval.",
    role: "trust",
    signals: [
      "Named authors",
      "Relevant roles",
      "Expert review",
      "Corrections route",
    ],
    sections: [
      {
        title: "Muddaser Altaf",
        body:
          "Observed on the live site as Media87 founder and a named contributor. A final biography, experience timeline, qualifications, profile links and areas of responsibility require first-party approval.",
      },
      {
        title: "How authorship should work",
        body:
          "Every article should identify the real person responsible for its judgement, any specialist reviewer, publication and update dates, and a way to report a correction.",
      },
      {
        title: "What this page will not do",
        body:
          "It will not fabricate team members, credentials, awards, client experience or review activity to create a larger-looking organisation.",
      },
    ],
    limitations:
      "The live page’s inconsistent name references must be resolved before production. Author and reviewer profiles need explicit approval.",
    related: [
      { label: "About Media87", href: "/about-us/" },
      { label: "Editorial guidelines", href: "/editorial-guidelines/" },
      { label: "Browse the blog", href: "/blog/" },
    ],
  },
  {
    slug: "editorial-guidelines",
    title: "Editorial Guidelines",
    eyebrow: "Editorial trust",
    h1: "Useful, attributable and correctable content.",
    description:
      "Media87 editorial standards for research, authorship, AI assistance, review, sources, corrections and commercial disclosure.",
    intro:
      "The recovered page establishes an editorial commitment. The rebuild strengthens it with a visible evidence model, real authorship, update responsibility and an explicit corrections path.",
    role: "trust",
    signals: [
      "Research before drafting",
      "Real authorship",
      "Source quality",
      "Corrections",
      "AI disclosure where useful",
    ],
    sections: [
      {
        title: "Research and evidence",
        body:
          "Use current primary sources, first-party Media87 evidence and qualified expert review. Separate observed facts, approved claims, external evidence, inference and unknowns.",
      },
      {
        title: "Authorship and review",
        body:
          "Name the real author and reviewer when appropriate. Do not manufacture delivery experience, tests, dates, quotations or credentials.",
      },
      {
        title: "AI assistance",
        body:
          "AI can support research, structure and production, but people remain responsible for facts, originality, sources, permissions and publication judgement.",
      },
      {
        title: "Corrections and material updates",
        body:
          "Provide a contact route for corrections and show a meaningful updated date when the substance changes. The placeholder date on the live page must be replaced before launch.",
      },
    ],
    limitations:
      "This page describes an operating standard. Publication should wait until Media87 can follow the process consistently and identify the responsible people.",
    related: [
      { label: "Authors and team", href: "/authors-team/" },
      { label: "Browse the blog", href: "/blog/" },
      { label: "Report a correction", href: "/contact-us/" },
    ],
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    eyebrow: "Privacy",
    h1: "How Media87 handles website and enquiry information.",
    description:
      "Media87 privacy-policy migration draft covering information collection, use, cookies, sharing, security, retention, rights and contact.",
    intro:
      "This local page preserves the structure of the recovered privacy notice while removing template leakage. It requires legal review and a verified inventory of analytics, forms, embeds, processors and retention practices before production.",
    role: "legal",
    signals: [
      "Information collected",
      "Purpose and use",
      "Cookies and embeds",
      "Sharing and processors",
      "Retention and rights",
    ],
    sections: [
      {
        title: "Information and purpose",
        body:
          "The final notice should describe information submitted through contact, product, workshop or subscription journeys and the specific business purposes for using it.",
      },
      {
        title: "Cookies, analytics and external media",
        body:
          "Analytics, Vimeo, YouTube, chatbot, social and other embeds need accurate disclosure. Click-to-load media reduces unnecessary third-party requests but does not replace disclosure.",
      },
      {
        title: "Sharing, security and retention",
        body:
          "Name relevant processor categories, safeguards and retention logic without promising absolute security. Data should be kept only for an approved purpose and period.",
      },
      {
        title: "Rights and contact",
        body:
          "The final policy should explain applicable access, correction, deletion, objection or complaint routes and identify the responsible contact.",
      },
    ],
    limitations:
      "This is a design and migration draft, not legal advice. The actual data flow, jurisdiction, processors and business details must be verified by Media87 and legal counsel.",
    related: [
      { label: "Terms of service", href: "/terms-of-services/" },
      { label: "Contact Media87", href: "/contact-us/" },
    ],
  },
  {
    slug: "terms-of-services",
    title: "Terms of Services",
    eyebrow: "Terms",
    h1: "The rules for using Media87 websites, services and products.",
    description:
      "Media87 terms-of-services migration draft covering site use, services, payment, intellectual property, third parties, liability and contact.",
    intro:
      "The recovered terms provide a useful structure but contain a placeholder date. The final version must distinguish general website terms from service proposals, product subscriptions, workshop conditions and package-specific commitments.",
    role: "legal",
    signals: [
      "Website use",
      "Service agreements",
      "Payment and cancellation",
      "Intellectual property",
      "Third-party platforms",
    ],
    sections: [
      {
        title: "Website and acceptable use",
        body:
          "Explain permitted use, prohibited behaviour, availability and the relationship between public information and a binding service agreement.",
      },
      {
        title: "Services, products and payment",
        body:
          "Approved proposals or subscription terms should control scope, price, billing, cancellation, deliverables, dependencies and support rather than relying on generic website copy.",
      },
      {
        title: "Intellectual property and client material",
        body:
          "Clarify ownership and licences for Media87 material, client inputs, generated outputs, third-party assets, software, prompts and portfolio use.",
      },
      {
        title: "Platforms, warranties and liability",
        body:
          "Search engines, advertising networks, social platforms, AI systems and distribution partners remain third parties. Terms should not imply Media87 controls their availability or decisions.",
      },
    ],
    limitations:
      "This is a design and migration draft, not legal advice. Governing law, entity details, dates, cancellation, refunds and liability language require legal and commercial approval.",
    related: [
      { label: "Privacy policy", href: "/privacy-policy/" },
      { label: "Contact Media87", href: "/contact-us/" },
    ],
  },
  {
    slug: "faqs",
    title: "Media87 FAQs",
    eyebrow: "Before we start",
    h1: "Clear answers before a sales conversation.",
    description:
      "Practical Media87 questions about services, products, fit, process, pricing, evidence, AI use and international delivery.",
    intro:
      "The recovered FAQ page contains internal prompt leakage and cannot be migrated as written. This replacement starts with questions supported by the current service and product architecture; sales and support evidence should refine it before production.",
    role: "trust",
    signals: [
      "Service fit",
      "Product fit",
      "Process and scope",
      "Evidence and limits",
    ],
    sections: [
      {
        title: "How does an engagement start?",
        body:
          "Begin with the commercial outcome, current situation, available evidence and the weakest handoff. The first useful result may be a scoped service, a product workflow, a diagnostic or a decision not to add another channel.",
      },
      {
        title: "Does Media87 work only in Dubai?",
        body:
          "Dubai is the visible operating context. Many core capabilities can be delivered internationally, while local claims, languages, availability and legal requirements are confirmed for each market.",
      },
      {
        title: "Are prices published?",
        body:
          "Only approved, maintainable product or package prices should be public. Managed-service pricing depends on scope, inputs, volume, access, risk and the responsible delivery team.",
      },
      {
        title: "How is AI used?",
        body:
          "AI can support research, production, conversation and workflow automation. People remain responsible for strategy, facts, permissions, quality, safeguards and final decisions.",
      },
      {
        title: "Does Media87 guarantee rankings, leads or ROI?",
        body:
          "No agency controls search results, platform decisions, market demand or a customer’s sales process. A proposal should define controllable work, assumptions, leading indicators and outcome measurement.",
      },
      {
        title: "What proof is available?",
        body:
          "The rebuild uses original product videos, first-party media and visible evidence gates. Client results, testimonials, logos and metrics will appear only with documented approval and appropriate context.",
      },
    ],
    limitations:
      "These are architecture-stage answers. Product features, pricing, response times, service areas and commercial terms require approval before production.",
    related: [
      { label: "Explore services", href: "/services/" },
      { label: "Explore products", href: "/products/" },
      { label: "Ask a specific question", href: "/contact-us/" },
    ],
  },
];

export function getRecoveredRootPage(slug: string) {
  return recoveredRootPages.find((page) => page.slug === slug);
}
