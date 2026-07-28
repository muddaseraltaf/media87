export const siteUrl = "https://media87.com";

export const consultationUrl =
  "https://chat.media87.com/share/bfa81d9bba3647f9907117b422fca4cf";

export type PageRecord = {
  slug: string;
  canonicalPath?: string;
  title: string;
  navTitle?: string;
  eyebrow: string;
  summary: string;
  h1: string;
  intro: string;
  focus: string[];
  process: string[];
  evidence: string;
};

export const services: PageRecord[] = [
  {
    slug: "seo",
    title: "SEO Services",
    navTitle: "SEO",
    eyebrow: "Organic visibility",
    summary:
      "Technical foundations, useful content and clear page ownership built into one search programme.",
    h1: "Build compounding organic visibility.",
    intro:
      "Media87 brings technical SEO, search-led content planning and on-page improvement into one accountable workflow.",
    focus: [
      "Technical and indexation review",
      "Search intent and page ownership",
      "Content briefs and on-page improvement",
      "Internal linking and measurement",
    ],
    process: [
      "Diagnose the current search footprint",
      "Prioritise opportunities by business value",
      "Implement, measure and improve",
    ],
    evidence:
      "Search Console baselines, approved examples and attributable outcomes will be added before publication.",
  },
  {
    slug: "local-seo",
    canonicalPath: "/local-seo-services/",
    title: "Local SEO Services",
    navTitle: "Local SEO",
    eyebrow: "Local discovery",
    summary:
      "A practical system for improving location relevance, business information and conversion paths.",
    h1: "Be easier to find when nearby customers are ready to act.",
    intro:
      "The service architecture connects website quality, local business information, useful location context and honest reputation practices.",
    focus: [
      "Local search and business-profile review",
      "Website and location-signal alignment",
      "Review and reputation workflows",
      "Local conversion and reporting",
    ],
    process: [
      "Verify the real-world business footprint",
      "Fix inconsistent or missing signals",
      "Build useful local proof and monitor demand",
    ],
    evidence:
      "Verified business details, local examples and approved reporting screenshots are required before publication.",
  },
  {
    slug: "google-ads",
    canonicalPath: "/ads-management/",
    title: "Ads Management",
    navTitle: "Ads Management",
    eyebrow: "Paid growth",
    summary:
      "Campaign structure, landing-page alignment and measurement designed around qualified demand.",
    h1: "Turn paid search into a measurable acquisition channel.",
    intro:
      "Media87 connects targeting, creative, landing pages and conversion measurement so paid activity can be evaluated as one system.",
    focus: [
      "Account and tracking review",
      "Campaign and query structure",
      "Creative and landing-page alignment",
      "Budget, lead quality and iteration",
    ],
    process: [
      "Define the commercial outcome",
      "Build or repair the measurement path",
      "Launch controlled tests and optimise",
    ],
    evidence:
      "Approved account examples, measurement methodology and client outcomes will be added before publication.",
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    navTitle: "Social Media",
    eyebrow: "Demand creation",
    summary:
      "Channel strategy, production and distribution with a defined role in the wider customer journey.",
    h1: "Build a social presence with a clear commercial role.",
    intro:
      "The service brings planning, creative production, publishing and performance review into a repeatable operating rhythm.",
    focus: [
      "Audience and channel strategy",
      "Content system and production",
      "Publishing and campaign support",
      "Learning loops and reporting",
    ],
    process: [
      "Clarify the role of each channel",
      "Design the production workflow",
      "Publish, learn and refine",
    ],
    evidence:
      "Approved creative samples, channel links and attributable campaign examples will be added before publication.",
  },
  {
    slug: "content-creation",
    title: "Content Creation",
    navTitle: "Content Creation",
    eyebrow: "Useful content systems",
    summary:
      "Search, social and sales content planned around real audience questions and business decisions.",
    h1: "Create content with a job to do.",
    intro:
      "Media87 structures research, production, review and distribution so every asset has an audience, purpose and next action.",
    focus: [
      "Research and content planning",
      "Editorial and campaign production",
      "Expert review and approval",
      "Reuse across useful formats",
    ],
    process: [
      "Define the audience decision",
      "Build the evidence-led brief",
      "Produce, approve and distribute",
    ],
    evidence:
      "A rights-cleared portfolio and approved production examples will be added before publication.",
  },
  {
    slug: "ai-automation",
    title: "AI Automation",
    navTitle: "AI Automation",
    eyebrow: "Practical automation",
    summary:
      "Workflow automation for lead capture, routing, follow-up and reporting—with human oversight.",
    h1: "Remove repeat work from your growth operations.",
    intro:
      "Media87 maps the process first, then applies automation where it can improve speed, consistency or visibility without hiding operational risk.",
    focus: [
      "Workflow and integration mapping",
      "Lead routing and follow-up",
      "Reporting and operational alerts",
      "Human review, safeguards and handoff",
    ],
    process: [
      "Map the current process and failure points",
      "Prototype the smallest useful workflow",
      "Test, document and monitor",
    ],
    evidence:
      "Working demonstrations, integration details and approved operational outcomes are required before publication.",
  },
  {
    slug: "chatbot-development",
    title: "Chatbot Development",
    navTitle: "Chatbots",
    eyebrow: "Useful first response",
    summary:
      "Conversational experiences that answer, qualify and route enquiries without pretending to replace people.",
    h1: "Give prospects a better first response.",
    intro:
      "The architecture combines approved knowledge, clear escalation rules and measurable handoff into the client’s existing lead process.",
    focus: [
      "Conversation and knowledge design",
      "Qualification and routing",
      "CRM and channel integration",
      "Fallbacks, monitoring and human handoff",
    ],
    process: [
      "Define what the assistant may and may not do",
      "Build and test representative conversations",
      "Launch with monitoring and escalation",
    ],
    evidence:
      "A working demo, supported integrations and documented safeguards will be added before publication.",
  },
  {
    slug: "reputation-management",
    title: "Reputation Management",
    navTitle: "Reputation",
    eyebrow: "Reputation integrity",
    summary:
      "Honest review collection, response workflows and customer-feedback visibility without review gating.",
    h1: "Build an honest, repeatable reputation system.",
    intro:
      "Media87 can help make review requests, response responsibilities and customer feedback easier to manage while preserving platform and customer trust.",
    focus: [
      "Review-request workflow",
      "Response ownership and templates",
      "Feedback analysis",
      "Website and profile presentation",
    ],
    process: [
      "Audit the current customer journey",
      "Design a policy-compliant request process",
      "Monitor feedback and improve operations",
    ],
    evidence:
      "The active offer, platform workflow and approved examples must be verified before publication.",
  },
  {
    slug: "ai-powered-conversations",
    canonicalPath: "/ai-powered-conversations/",
    title: "AI-Powered Conversations",
    navTitle: "AI Conversations",
    eyebrow: "Conversational growth",
    summary:
      "Human-approved conversational journeys for websites, WhatsApp, Messenger and other customer touchpoints.",
    h1: "Make every first conversation more useful.",
    intro:
      "Media87 designs approved knowledge, qualification, routing and human handoff into conversational experiences across the channels customers already use.",
    focus: [
      "Customer-question and intent mapping",
      "Channel-specific conversation design",
      "Qualification and lead routing",
      "Human escalation and monitoring",
    ],
    process: [
      "Map representative customer conversations",
      "Build with clear permissions and fallbacks",
      "Test, monitor and improve the handoff",
    ],
    evidence:
      "Supported channels, working demonstrations and approved response safeguards will be documented before publication.",
  },
  {
    slug: "website-development",
    title: "Website Development",
    navTitle: "Web Development",
    eyebrow: "Fast digital foundations",
    summary:
      "Fast, maintainable websites that connect positioning, search visibility and lead journeys.",
    h1: "Build a website that can keep getting better.",
    intro:
      "The service connects information architecture, content, performance and measurement so the website can grow without returning to plugin-heavy maintenance.",
    focus: [
      "Information architecture and content modelling",
      "Accessible responsive design",
      "Static-first performance",
      "Analytics, forms and technical SEO",
    ],
    process: [
      "Map the real content and page inventory",
      "Design and build reusable page systems",
      "Test, migrate and improve continuously",
    ],
    evidence:
      "Approved live examples, performance results and a documented maintenance model will be added before publication.",
  },
  {
    slug: "translation-localization",
    title: "Translation & Localisation",
    navTitle: "Localisation",
    eyebrow: "Multi-market content",
    summary:
      "Content adaptation for different languages and markets with qualified human review.",
    h1: "Carry the idea across markets—not just the words.",
    intro:
      "Media87 combines content workflows and AI assistance with appropriate language review so international content remains clear, useful and culturally aware.",
    focus: [
      "Market and language requirements",
      "Terminology and brand voice",
      "AI-assisted adaptation",
      "Qualified review and approval",
    ],
    process: [
      "Define the audience and context",
      "Adapt the content and creative system",
      "Review, approve and learn from response",
    ],
    evidence:
      "Available languages, qualified reviewers and approved localisation examples must be confirmed before publication.",
  },
  {
    slug: "photo-enhancement",
    title: "AI Photo Enhancement",
    navTitle: "Photo Enhancement",
    eyebrow: "Creative AI",
    summary:
      "AI-assisted image improvement and campaign-ready transformations with human art direction.",
    h1: "Turn ordinary source material into stronger campaign imagery.",
    intro:
      "The live Media87 offer includes professional-style visual enhancement from existing photos. The rebuilt page will make source requirements, editing boundaries and usage rights explicit.",
    focus: [
      "Source-image assessment",
      "Creative direction and prompt development",
      "Human review and retouching",
      "Format delivery and usage guidance",
    ],
    process: [
      "Review the source and intended use",
      "Create controlled visual directions",
      "Refine, approve and export",
    ],
    evidence:
      "Before-and-after examples, model consent and clear image-rights guidance are required before publication.",
  },
  {
    slug: "video-editing",
    title: "Video Editing",
    navTitle: "Video Editing",
    eyebrow: "Creative production",
    summary:
      "Editing and format adaptation for social, advertising, education and sales content.",
    h1: "Shape raw material into video people can follow.",
    intro:
      "Media87 combines editing, voice, captions, motion and format adaptation around the audience and role of each video.",
    focus: [
      "Narrative and edit planning",
      "Human or AI-assisted voice workflows",
      "Captions, motion and brand treatment",
      "Channel-ready format adaptation",
    ],
    process: [
      "Define audience, channel and action",
      "Edit and review the first cut",
      "Approve and deliver channel formats",
    ],
    evidence:
      "Rights-cleared samples, format specifications and an approved production workflow are required before publication.",
  },
];

export const aiVideoService: PageRecord = {
  slug: "ai-video-creation-service",
  title: "AI Video Creation Service",
  navTitle: "AI Video",
  eyebrow: "Video production",
  summary:
    "A controlled AI-assisted workflow for producing useful video formats more efficiently.",
  h1: "Produce more useful video with a controlled workflow.",
  intro:
    "The rebuilt service page will show the production process, available formats, approval stages and real samples before making performance claims.",
  focus: [
    "Concept and script development",
    "AI-assisted production",
    "Human review and brand control",
    "Format adaptation and delivery",
  ],
  process: [
    "Define the audience and use case",
    "Create and review the production plan",
    "Produce, approve and deliver",
  ],
  evidence:
    "Accessible video samples, rights information and approved client outcomes are required before publication.",
};

export const solutions: PageRecord[] = [
  {
    slug: "lead-generation",
    title: "Lead Generation",
    eyebrow: "Connected acquisition",
    summary:
      "A joined-up path from audience demand to qualified enquiry and accountable follow-up.",
    h1: "Turn attention into a usable lead system.",
    intro:
      "This solution connects the right acquisition channels, landing experience, qualification and response workflow.",
    focus: [
      "Demand and offer alignment",
      "Conversion journey",
      "Qualification and routing",
      "Measurement and improvement",
    ],
    process: ["Map the journey", "Fix the weakest handoff", "Test and improve"],
    evidence:
      "The page needs approved examples that connect marketing activity to qualified enquiries.",
  },
  {
    slug: "multi-location-marketing",
    title: "Multi-Location Marketing",
    eyebrow: "Distributed growth",
    summary:
      "Shared governance with enough local flexibility for real locations, teams and customers.",
    h1: "Create consistency without erasing local relevance.",
    intro:
      "The architecture supports shared brand systems, location-level accuracy and useful reporting without mass-producing thin pages.",
    focus: [
      "Location data governance",
      "Shared and local content roles",
      "Business-profile operations",
      "Location-level measurement",
    ],
    process: [
      "Verify the location footprint",
      "Define shared and local ownership",
      "Roll out with quality gates",
    ],
    evidence:
      "Real multi-location experience and maintainable local inputs are required before publication.",
  },
  {
    slug: "marketing-automation",
    title: "Marketing Automation",
    eyebrow: "Connected operations",
    summary:
      "Practical workflows that connect campaigns, forms, CRM activity and follow-up.",
    h1: "Connect the work between marketing and sales.",
    intro:
      "This solution focuses on the handoffs where leads are delayed, context is lost or reporting becomes manual.",
    focus: [
      "Form and CRM handoff",
      "Lead notifications and routing",
      "Follow-up sequences",
      "Operational reporting",
    ],
    process: ["Map the handoffs", "Prototype the workflow", "Test and document"],
    evidence:
      "Working integrations and approved operational examples are required before publication.",
  },
  {
    slug: "arabic-digital-marketing",
    title: "Arabic Digital Marketing",
    eyebrow: "Language and market fit",
    summary:
      "Research, localisation and campaign delivery designed for Arabic-speaking audiences.",
    h1: "Make the strategy work in Arabic—not just the words.",
    intro:
      "This page will distinguish qualified Arabic research and review from mechanical translation before the offer is published.",
    focus: [
      "Audience and language research",
      "Arabic search and campaign planning",
      "Qualified writing or localisation",
      "Cultural and conversion review",
    ],
    process: [
      "Define audience and market context",
      "Create with qualified language review",
      "Measure the local response",
    ],
    evidence:
      "Qualified Arabic delivery, reviewers and approved campaign examples must be confirmed before publication.",
  },
];

export const industries: PageRecord[] = [
  {
    slug: "real-estate",
    title: "Real Estate Marketing",
    eyebrow: "Industry system",
    summary:
      "Search, content, paid media and lead operations shaped around real property buyer journeys.",
    h1: "Build a clearer path from property interest to qualified enquiry.",
    intro:
      "The page will be published only when Media87 can show approved industry experience, workflow detail and useful proof.",
    focus: [
      "Audience and inventory journeys",
      "Search and campaign structure",
      "Lead qualification",
      "Response and reporting",
    ],
    process: ["Map the buyer journey", "Connect media and response", "Measure lead quality"],
    evidence:
      "An approved real-estate case study and delivery example are required before publication.",
  },
  {
    slug: "restaurants-hospitality",
    title: "Restaurant & Hospitality Marketing",
    eyebrow: "Industry system",
    summary:
      "Local discovery, content, reputation and campaign support designed around guest decisions.",
    h1: "Connect discovery, reputation and guest demand.",
    intro:
      "The page will focus on the moments that move a guest from discovery to booking, visit or repeat engagement.",
    focus: [
      "Local discovery",
      "Content and campaign production",
      "Reputation workflows",
      "Booking and enquiry measurement",
    ],
    process: ["Map guest decisions", "Prioritise demand channels", "Measure useful actions"],
    evidence:
      "Approved hospitality experience and representative creative are required before publication.",
  },
  {
    slug: "ecommerce",
    title: "Ecommerce Marketing",
    eyebrow: "Industry system",
    summary:
      "Search, paid media and content connected to product discovery, conversion and repeat purchase.",
    h1: "Make product discovery and acquisition work together.",
    intro:
      "The page will connect channel work to merchandising, landing experience and commercial measurement.",
    focus: [
      "Product and category discovery",
      "Paid acquisition",
      "Content and creative",
      "Conversion and retention signals",
    ],
    process: ["Audit the buying journey", "Prioritise channel opportunities", "Test against margin"],
    evidence:
      "Approved ecommerce work and commercially meaningful outcomes are required before publication.",
  },
  {
    slug: "professional-services",
    title: "Professional Services Marketing",
    eyebrow: "Industry system",
    summary:
      "Authority-building and demand capture for considered, trust-heavy buying decisions.",
    h1: "Turn expertise into a credible route to enquiry.",
    intro:
      "The page will show how useful content, search visibility, paid demand and lead follow-up support a longer sales journey.",
    focus: [
      "Positioning and decision content",
      "Search and paid demand capture",
      "Expert proof",
      "Qualified enquiry pathways",
    ],
    process: ["Clarify the buyer decision", "Build proof into the journey", "Measure qualified demand"],
    evidence:
      "Approved professional-services examples and expert proof are required before publication.",
  },
];

export const products: PageRecord[] = [
  {
    slug: "chatzen",
    canonicalPath: "/chatzen/",
    title: "ChatZen",
    eyebrow: "Conversation system",
    summary:
      "Approved answers, lead qualification, booking and human handoff across supported customer channels.",
    h1: "Make the first customer conversation more useful.",
    intro:
      "ChatZen connects an approved knowledge base, conversation design, qualification and human routing into one customer journey.",
    focus: [
      "Website and messaging journeys",
      "Lead capture and qualification",
      "Calendar and CRM handoff",
      "Monitoring and human escalation",
    ],
    process: ["Map real conversations", "Build approved knowledge and handoffs", "Launch with monitoring"],
    evidence:
      "Supported connections, data handling and the final implementation scope are confirmed during onboarding.",
  },
  {
    slug: "localzen",
    canonicalPath: "/localzen/",
    title: "LocalZen",
    eyebrow: "Reputation workflow",
    summary:
      "Review requests, monitoring, response workflows, feedback insight and local-profile operations in one system.",
    h1: "Organise honest customer feedback more consistently.",
    intro:
      "LocalZen connects permission-aware requests, review monitoring, response ownership and reputation insight without review gating.",
    focus: [
      "Email, SMS and QR request journeys",
      "Review monitoring and responses",
      "Google Business Profile workflows",
      "Website widgets and social proof",
    ],
    process: ["Map the customer journey", "Connect profiles and requests", "Monitor, respond and learn"],
    evidence:
      "Platform support, message allowances, compliance and the final commercial scope are confirmed during onboarding.",
  },
];

export function getPage(records: PageRecord[], slug: string) {
  return records.find((record) => record.slug === slug);
}

export const primaryNavigation = [
  { label: "Services", href: "/services/" },
  { label: "Products", href: "/products/" },
  { label: "AI Video", href: "/ai-video-creation-service/" },
  { label: "Resources", href: "/blog/" },
  { label: "About", href: "/about-us/" },
];
