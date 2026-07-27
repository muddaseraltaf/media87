export type ServiceDetailItem = {
  title: string;
  body: string;
};

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServicePageDetail = {
  fit: string[];
  deliverables: ServiceDetailItem[];
  outputs: string[];
  boundaries: string;
  faq: ServiceFaq[];
  related?: {
    eyebrow: string;
    title: string;
    body: string;
    href: string;
    label: string;
  };
  mesh?: {
    lineOne: string;
    lineTwoPrefix: string;
    highlight: string;
  };
  flowField?: {
    eyebrow: string;
    title: string;
    body: string;
    steps: string[];
  };
};

export const serviceDetails: Record<string, ServicePageDetail> = {
  seo: {
    fit: [
      "A site with unclear page ownership or declining organic visibility",
      "A business investing in content without a measurable search plan",
      "A redesign or migration that must preserve valuable URLs",
    ],
    deliverables: [
      {
        title: "Technical and indexation review",
        body:
          "Crawlability, canonicalisation, rendering, structured data, internal linking, page speed and index coverage reviewed in one prioritised backlog.",
      },
      {
        title: "Search architecture",
        body:
          "Map commercial topics, supporting questions and existing URLs so every important page has a clear purpose and competing pages are reduced.",
      },
      {
        title: "Page and content improvement",
        body:
          "Create evidence-led briefs, rewrite weak sections and connect useful pages through contextual internal links.",
      },
      {
        title: "Measurement and iteration",
        body:
          "Track indexation, relevant queries, qualified organic actions and page-level movement rather than reporting rankings without context.",
      },
    ],
    outputs: [
      "Prioritised technical backlog",
      "Keyword-to-page map",
      "Page briefs and on-page recommendations",
      "Internal-link plan",
      "Search Console reporting view",
    ],
    boundaries:
      "SEO cannot guarantee a ranking position or a fixed timeline. Results depend on competition, the starting site, implementation quality, evidence, authority and how search systems change.",
    faq: [
      {
        question: "Do you guarantee first-page rankings?",
        answer:
          "No. Media87 can control the quality of research, implementation and measurement, but no agency controls Google’s results. The engagement should define the commercial topics, leading indicators and realistic review period.",
      },
      {
        question: "Is content included?",
        answer:
          "Content planning and page improvement can be included. The production volume, expert input, fact-checking and approval workflow are scoped separately so quality does not disappear behind a word count.",
      },
      {
        question: "Can you protect traffic during a rebuild?",
        answer:
          "A migration plan can preserve important URLs, metadata, internal links and redirect rules, then monitor indexation after release. No migration is risk-free, so rollback and validation steps should be explicit.",
      },
    ],
  },
  "local-seo": {
    fit: [
      "A genuine location or service-area business that depends on nearby demand",
      "A brand with inconsistent profile, citation or website information",
      "A multi-location operator needing shared rules and local accountability",
    ],
    deliverables: [
      {
        title: "Local footprint audit",
        body:
          "Review the website, Google Business Profile, categories, service areas, location data, citations, reviews and local competitors.",
      },
      {
        title: "Profile and website alignment",
        body:
          "Connect accurate business information, service relevance, useful local context and conversion paths without stuffing a city into every heading.",
      },
      {
        title: "Local authority and reputation",
        body:
          "Build policy-compliant review workflows, relevant local proof, citation consistency and a responsible response rhythm.",
      },
      {
        title: "Map and local-search reporting",
        body:
          "Track profile actions, local landing-page performance, relevant queries and qualified enquiries by location where data allows.",
      },
    ],
    outputs: [
      "Verified business-information register",
      "Google Business Profile action plan",
      "Local page recommendations",
      "Citation and review workflow",
      "Location-level measurement plan",
    ],
    boundaries:
      "Local SEO is for real businesses and real service areas. Media87 will not create fake addresses, fabricate local proof or mass-publish thin doorway pages.",
    faq: [
      {
        question: "Do I need a page for every city?",
        answer:
          "Not automatically. A location page is useful when the business genuinely serves that market and can provide distinct, helpful information. Thin pages that only swap a city name are poor for users and risky for search quality.",
      },
      {
        question: "Can you manage Google Business Profile?",
        answer:
          "Profile review, optimisation, posting and response workflows can be scoped when the business can provide verified access. Suspensions, verification and platform decisions remain under Google’s control.",
      },
      {
        question: "How does Dubai fit without limiting international work?",
        answer:
          "Core service titles can remain location-neutral. Dubai can appear naturally in business context, proof, profile information and relevant examples, while international buyers still see a service that applies to them.",
      },
    ],
    related: {
      eyebrow: "Related product",
      title: "Connect local visibility with LocalZen.",
      body:
        "LocalZen organises review requests, monitoring, responses and reputation insight around the wider local SEO workflow.",
      href: "/localzen/",
      label: "Explore LocalZen",
    },
    mesh: {
      lineOne: "Local visibility",
      lineTwoPrefix: "built on ",
      highlight: "real signals.",
    },
  },
  "google-ads": {
    fit: [
      "A business with defined demand and a trackable conversion action",
      "An account spending without clear query, lead-quality or landing-page visibility",
      "A new offer that needs controlled market testing",
    ],
    deliverables: [
      {
        title: "Account and measurement audit",
        body:
          "Review conversion actions, consent, attribution, search terms, campaign structure, budgets and historical quality signals.",
      },
      {
        title: "Campaign architecture",
        body:
          "Organise campaigns around commercial intent, geography, offer economics and the landing experience instead of broad traffic volume.",
      },
      {
        title: "Creative and landing alignment",
        body:
          "Connect the query, advert, promise and page so the prospect sees a consistent decision path.",
      },
      {
        title: "Budget and lead-quality optimisation",
        body:
          "Use search terms, conversion quality, sales feedback and cost constraints to decide what to expand, repair or stop.",
      },
    ],
    outputs: [
      "Tracking and account findings",
      "Campaign and keyword structure",
      "Ad-copy test plan",
      "Landing-page recommendations",
      "Budget and lead-quality report",
    ],
    boundaries:
      "Media87 cannot guarantee lead volume or return without reliable tracking, commercial inputs and a working sales response. Platform spend is separate from management scope unless stated.",
    faq: [
      {
        question: "Is ad spend included in the fee?",
        answer:
          "It should be shown separately. The management scope covers the agreed research, setup, monitoring and optimisation; advertising spend is paid to the platform.",
      },
      {
        question: "Can you work with an existing account?",
        answer:
          "Yes. An audit can identify measurement gaps, wasted search terms, structural problems and landing-page mismatches before deciding whether to repair or rebuild campaigns.",
      },
      {
        question: "What should be tracked?",
        answer:
          "The useful event depends on the business: qualified forms, calls, bookings, purchases or downstream sales stages. Clicks and platform conversions alone may not describe lead quality.",
      },
    ],
  },
  "social-media-marketing": {
    fit: [
      "A brand publishing inconsistently without a clear channel role",
      "A team needing a repeatable content and approval rhythm",
      "Campaigns that require coordinated organic and paid creative",
    ],
    deliverables: [
      {
        title: "Channel and audience strategy",
        body:
          "Define who each channel serves, what decisions content should support and how social activity connects to the wider customer journey.",
      },
      {
        title: "Content system",
        body:
          "Build repeatable themes, formats, templates, source requirements and a realistic production calendar.",
      },
      {
        title: "Production and publishing",
        body:
          "Create approved captions, graphics, short video and campaign assets, then publish through the agreed workflow.",
      },
      {
        title: "Learning and reporting",
        body:
          "Review useful attention, saves, conversations, qualified actions and creative patterns instead of treating follower count as the only outcome.",
      },
    ],
    outputs: [
      "Channel role map",
      "Editorial calendar",
      "Approved creative set",
      "Publishing workflow",
      "Monthly learning report",
    ],
    boundaries:
      "Content volume, filming, community response, influencer work, paid media and after-hours moderation are separate responsibilities unless explicitly included.",
    faq: [
      {
        question: "Which platforms should we use?",
        answer:
          "The choice should follow the audience, available production capacity and commercial role. Being present on every platform is less useful than operating the right channels consistently.",
      },
      {
        question: "Do you create the content?",
        answer:
          "Media87 can scope planning, design, editing, captions and format adaptation. Original filming, talent, locations, product samples and approvals need clear ownership.",
      },
      {
        question: "Can social media generate leads?",
        answer:
          "It can create demand, support trust and capture enquiries, but the result depends on the offer, creative, audience, response speed and conversion path.",
      },
    ],
  },
  "content-creation": {
    fit: [
      "A brand needing search, social or sales content from one source strategy",
      "A team with expert knowledge but no production workflow",
      "A campaign that requires several formats without repeating the same copy",
    ],
    deliverables: [
      {
        title: "Research and brief",
        body:
          "Define the audience question, decision stage, source evidence, expert input, format and intended next action before production.",
      },
      {
        title: "Editorial production",
        body:
          "Create articles, landing copy, scripts, captions or campaign material with a visible fact-check and approval path.",
      },
      {
        title: "Creative adaptation",
        body:
          "Turn the approved idea into useful social, email, video or sales-support formats without stripping away context.",
      },
      {
        title: "Distribution and learning",
        body:
          "Publish through the appropriate channels, connect internal links and measure whether the content helped the intended decision.",
      },
    ],
    outputs: [
      "Evidence-led content brief",
      "Approved primary asset",
      "Channel adaptations",
      "Source and rights register",
      "Distribution checklist",
    ],
    boundaries:
      "AI may assist research and production, but fabricated quotes, unverified claims and anonymous expertise are not acceptable substitutes for real sources and approval.",
    faq: [
      {
        question: "Is AI used to write content?",
        answer:
          "AI can assist research, outlines, variations and production. The final work should still be checked for accuracy, originality, brand fit and whether a qualified person needs to review the subject.",
      },
      {
        question: "How much content do we need?",
        answer:
          "The right volume follows the opportunity and production capacity. A smaller set of well-owned pages is usually more useful than a large calendar of thin, overlapping material.",
      },
      {
        question: "Can one piece become several formats?",
        answer:
          "Yes, when the core idea is approved and each adaptation respects its channel. Reuse should change the framing and action, not simply crop the same asset repeatedly.",
      },
    ],
  },
  "ai-automation": {
    fit: [
      "A team copying information between forms, inboxes, CRM records and reports",
      "A lead process with delays, lost context or inconsistent follow-up",
      "A repeat task with clear rules and a visible human exception path",
    ],
    deliverables: [
      {
        title: "Workflow and risk map",
        body:
          "Document triggers, systems, data fields, decisions, failure states and the person responsible when automation should stop.",
      },
      {
        title: "Small working prototype",
        body:
          "Automate the narrowest high-value step first, using test data and explicit permissions before connecting production systems.",
      },
      {
        title: "Integration and safeguards",
        body:
          "Connect approved tools, validate inputs, log important actions and create human review for sensitive or uncertain outcomes.",
      },
      {
        title: "Documentation and monitoring",
        body:
          "Provide an operating guide, ownership, error alerts and a review rhythm so the workflow remains understandable after launch.",
      },
    ],
    outputs: [
      "Current-state workflow map",
      "Prototype and acceptance tests",
      "Integration register",
      "Failure and escalation rules",
      "Operating documentation",
    ],
    boundaries:
      "Automation is not appropriate for every decision. High-impact, legal, financial, medical or reputation-sensitive actions require stronger review and may need to remain human-led.",
    faq: [
      {
        question: "Which tools can you connect?",
        answer:
          "Common workflows can involve forms, email, calendars, CRM systems, spreadsheets, databases and messaging. Exact access depends on the tool’s API, account plan, permissions and data policy.",
      },
      {
        question: "Will automation replace our team?",
        answer:
          "The priority is repeat work, routing and visibility. Good automation gives people better context and more time for judgment; it should not hide responsibility or remove necessary review.",
      },
      {
        question: "How do you prevent failures?",
        answer:
          "Use validation, limited permissions, test environments, logs, alerts, retries where safe and explicit stop conditions. Every important workflow needs an owner.",
      },
    ],
    flowField: {
      eyebrow: "A visible automation path",
      title: "Let information move. Keep responsibility visible.",
      body:
        "The flow field represents a well-designed automation: many small events moving through a controlled system, with human ownership remaining above the process.",
      steps: [
        "Capture",
        "Validate",
        "Route",
        "Review",
        "Measure",
      ],
    },
  },
  "chatbot-development": {
    fit: [
      "A website receiving repeated pre-sales or support questions",
      "A business losing enquiries outside office hours",
      "A team that needs structured qualification and human handoff",
    ],
    deliverables: [
      {
        title: "Intent and conversation map",
        body:
          "Identify common questions, qualification needs, unsupported topics, escalation triggers and the useful next action for each journey.",
      },
      {
        title: "Knowledge and response design",
        body:
          "Build from approved sources, define brand voice and create clear fallbacks when the assistant cannot answer safely.",
      },
      {
        title: "Channel and system connection",
        body:
          "Connect the website or supported messaging channel to calendars, CRM, inboxes or notifications where the workflow requires it.",
      },
      {
        title: "Testing and ongoing improvement",
        body:
          "Test representative conversations, monitor unanswered intents and review changes before new knowledge goes live.",
      },
    ],
    outputs: [
      "Conversation and intent map",
      "Approved knowledge source",
      "Working chatbot experience",
      "Handoff and integration rules",
      "Monitoring dashboard",
    ],
    boundaries:
      "A chatbot should disclose its automated role appropriately, collect only necessary information and escalate uncertainty. It should not invent policies, prices or professional advice.",
    faq: [
      {
        question: "Can the chatbot use our existing website content?",
        answer:
          "Yes, after the content is reviewed for accuracy and ownership. Publishing everything automatically can reproduce outdated or contradictory information.",
      },
      {
        question: "Can it book meetings or create CRM leads?",
        answer:
          "Those connections can be scoped when the calendar or CRM supports the required access. The workflow should define duplicates, failed submissions, consent and what the sales team receives.",
      },
      {
        question: "What happens when it does not know the answer?",
        answer:
          "It should say so clearly, capture only useful context and offer a human handoff rather than generating a confident guess.",
      },
    ],
    related: {
      eyebrow: "Related product",
      title: "See the full ChatZen conversation system.",
      body:
        "ChatZen packages approved knowledge, qualification, booking, channel connections and human handoff into a productised journey.",
      href: "/chatzen/",
      label: "Explore ChatZen",
    },
    mesh: {
      lineOne: "Chat journeys",
      lineTwoPrefix: "built to ",
      highlight: "hand off.",
    },
  },
  "reputation-management": {
    fit: [
      "A business receiving reviews across several platforms",
      "A team without clear response ownership or escalation",
      "A local or multi-location brand needing consistent, honest requests",
    ],
    deliverables: [
      {
        title: "Reputation footprint audit",
        body:
          "Review active profiles, customer touchpoints, request timing, response patterns, ownership and recurring service themes.",
      },
      {
        title: "Policy-compliant request workflow",
        body:
          "Create consistent email, SMS or QR requests after genuine interactions without screening customers by expected rating.",
      },
      {
        title: "Response and escalation system",
        body:
          "Define response voice, time expectations, approval, service recovery and when legal, privacy or operational issues move to a person.",
      },
      {
        title: "Insight and presentation",
        body:
          "Track themes and responsibly reuse authentic reviews on profiles, the website and social channels.",
      },
    ],
    outputs: [
      "Profile and review audit",
      "Request templates and triggers",
      "Response playbook",
      "Escalation matrix",
      "Reputation insight report",
    ],
    boundaries:
      "Media87 will not promise to remove legitimate criticism, fabricate reviews or use review gating. Platform removals are limited to each platform’s policy and decision process.",
    faq: [
      {
        question: "Can you remove a negative review?",
        answer:
          "A review can be reported when it appears to violate platform policy, but the platform decides. A legitimate critical review should be addressed through a professional response and service recovery where appropriate.",
      },
      {
        question: "What is review gating?",
        answer:
          "Review gating selectively directs satisfied customers to public review sites while diverting dissatisfied customers elsewhere. The rebuilt workflow avoids that practice and offers public-review opportunities consistently.",
      },
      {
        question: "Can you respond on our behalf?",
        answer:
          "Managed responses can be scoped with approved voice, access and escalation rules. Sensitive, factual or customer-specific cases should retain human approval.",
      },
    ],
    related: {
      eyebrow: "Related product",
      title: "Put the workflow into LocalZen.",
      body:
        "LocalZen brings requests, monitoring, responses, widgets and local-profile operations into one productised reputation system.",
      href: "/localzen/",
      label: "Explore LocalZen",
    },
    mesh: {
      lineOne: "Honest feedback",
      lineTwoPrefix: "built into ",
      highlight: "trust.",
    },
  },
  "ai-powered-conversations": {
    fit: [
      "A business serving customers across website and messaging touchpoints",
      "A team needing one governed answer source with channel-specific journeys",
      "A lead or service process that benefits from immediate triage",
    ],
    deliverables: [
      {
        title: "Customer-question map",
        body:
          "Prioritise intents, decision points, qualification needs and topics that require human or specialist handling.",
      },
      {
        title: "Governed knowledge design",
        body:
          "Prepare approved answers, source ownership, expiry rules and fallbacks so the system knows both what to say and when to stop.",
      },
      {
        title: "Channel journey design",
        body:
          "Adapt the conversation to website, WhatsApp, Messenger, Instagram or other supported channels without assuming feature parity.",
      },
      {
        title: "Routing and measurement",
        body:
          "Pass useful context to people or systems and track unresolved questions, qualification, booking and downstream quality.",
      },
    ],
    outputs: [
      "Intent and channel map",
      "Approved knowledge register",
      "Conversation flows",
      "Routing and escalation rules",
      "Performance event plan",
    ],
    boundaries:
      "AI conversations should be transparent, minimise personal data and never present uncertain generated text as verified business policy or professional advice.",
    faq: [
      {
        question: "How is this different from chatbot development?",
        answer:
          "Chatbot development is the implementation capability. AI-powered conversations is the wider cross-channel operating model: knowledge governance, journey design, routing, measurement and ongoing review.",
      },
      {
        question: "Can one knowledge base power several channels?",
        answer:
          "A governed core can be shared, while responses, buttons, message length and handoff need adaptation to each platform and customer context.",
      },
      {
        question: "How is customer data handled?",
        answer:
          "The workflow should define the minimum required fields, purpose, consent, storage, access and deletion. Exact responsibilities depend on the connected platforms and client systems.",
      },
    ],
    related: {
      eyebrow: "Related product",
      title: "Explore ChatZen in detail.",
      body:
        "See how approved answers, qualification, booking, channel connections and human escalation fit into one product journey.",
      href: "/chatzen/",
      label: "Explore ChatZen",
    },
    mesh: {
      lineOne: "Every conversation",
      lineTwoPrefix: "earns its ",
      highlight: "next step.",
    },
  },
  "website-development": {
    fit: [
      "A business leaving slow or plugin-heavy WordPress maintenance",
      "A growing site that needs reusable services, articles and location structures",
      "A marketing team that needs fast publishing without fragile page builders",
    ],
    deliverables: [
      {
        title: "Information architecture",
        body:
          "Map the real offer, existing URLs, search ownership, navigation and future content types before designing individual screens.",
      },
      {
        title: "Reusable design system",
        body:
          "Create responsive components, typography, colour, states and page templates that can expand without looking mass-produced.",
      },
      {
        title: "Static-first implementation",
        body:
          "Build accessible pages with limited client-side JavaScript, optimised assets and a hosting model suited to global edge delivery.",
      },
      {
        title: "Migration and measurement",
        body:
          "Preserve valuable URLs, metadata and content, then validate forms, analytics, structured data and indexation before launch.",
      },
    ],
    outputs: [
      "Site and URL inventory",
      "Reusable component system",
      "Responsive page templates",
      "SEO migration map",
      "Performance and launch checklist",
    ],
    boundaries:
      "A fast framework does not fix weak content or unclear ownership by itself. Forms, CRM, analytics, CMS editing and hosting access must be included explicitly in the technical scope.",
    faq: [
      {
        question: "Will a custom site be faster than WordPress?",
        answer:
          "A static-first site can remove much plugin and database overhead, but performance still depends on images, fonts, third-party scripts and implementation. The advantage is tighter control and a smaller runtime.",
      },
      {
        question: "Can new pages be generated safely?",
        answer:
          "Yes, through structured data and reusable components, but every page still needs distinct purpose, facts, proof and editorial review. Automation should scale quality checks, not doorway pages.",
      },
      {
        question: "Can it be hosted on Cloudflare?",
        answer:
          "The current rebuild is being structured for Cloudflare’s platform. Deployment, environment variables, forms and domain cutover will be tested separately when the local site is approved.",
      },
    ],
  },
  "translation-localization": {
    fit: [
      "A brand moving approved pages or campaigns into another language",
      "A regional team needing consistent terminology and tone",
      "A website that must preserve SEO and usability across markets",
    ],
    deliverables: [
      {
        title: "Market and language brief",
        body:
          "Define audience, dialect, search behaviour, cultural context, regulated terms and the action the content should support.",
      },
      {
        title: "Terminology and voice system",
        body:
          "Create an approved glossary, product names, tone rules and phrases that should remain untranslated.",
      },
      {
        title: "AI-assisted adaptation",
        body:
          "Use automation for consistency and speed where appropriate, then reshape examples, references and structure for the target audience.",
      },
      {
        title: "Qualified review and release",
        body:
          "Apply native or subject-qualified review, layout checks, link validation and local metadata before publication.",
      },
    ],
    outputs: [
      "Language and market brief",
      "Terminology glossary",
      "Adapted page or campaign set",
      "Review and approval record",
      "Local SEO metadata",
    ],
    boundaries:
      "Machine output alone is not sufficient for high-stakes, legal, medical or culturally sensitive content. Qualified reviewers and client approval remain necessary.",
    faq: [
      {
        question: "Is this translation or transcreation?",
        answer:
          "The scope can range from accurate translation to deeper adaptation of tone, examples, calls to action and creative. The required level should be agreed per asset.",
      },
      {
        question: "Can you support Arabic?",
        answer:
          "Arabic work can be scoped with the relevant market, dialect, search intent, right-to-left layout and qualified language review made explicit.",
      },
      {
        question: "How is SEO preserved?",
        answer:
          "Each language version needs its own search research, URLs, metadata, internal links and hreflang plan. Directly translating English keywords may miss real local demand.",
      },
    ],
  },
  "photo-enhancement": {
    fit: [
      "A campaign needing stronger visuals from limited source material",
      "An ecommerce or service brand requiring consistent image treatment",
      "A team needing controlled AI concepts before final retouching",
    ],
    deliverables: [
      {
        title: "Source and rights review",
        body:
          "Check image quality, intended use, ownership, model consent, sensitive attributes and what must remain factually unchanged.",
      },
      {
        title: "Creative direction",
        body:
          "Define mood, environment, crop, format and acceptable transformation boundaries before generating variations.",
      },
      {
        title: "AI-assisted enhancement",
        body:
          "Improve or transform approved source material through controlled iterations rather than publishing the first generated result.",
      },
      {
        title: "Human retouch and export",
        body:
          "Correct artefacts, preserve brand detail and deliver the approved dimensions, colour space and file formats.",
      },
    ],
    outputs: [
      "Source suitability review",
      "Creative direction board",
      "Approved enhanced images",
      "Channel export set",
      "Usage and disclosure notes",
    ],
    boundaries:
      "Media87 should not use unlicensed source material, misrepresent a real product or person, or make sensitive transformations without appropriate consent and disclosure.",
    faq: [
      {
        question: "Can you improve a low-resolution image?",
        answer:
          "Some detail and presentation can be improved, but enhancement cannot recover factual information that was never captured. The intended size and use determine what is credible.",
      },
      {
        question: "Can backgrounds or clothing be changed?",
        answer:
          "They can be explored with appropriate ownership and consent, but product accuracy, identity and advertising disclosure may limit acceptable changes.",
      },
      {
        question: "What files do you deliver?",
        answer:
          "The scope can include web-ready JPG, PNG or WebP files and channel-specific crops. Layered source files or print specifications should be requested explicitly.",
      },
    ],
  },
  "video-editing": {
    fit: [
      "A team with raw footage but no clear narrative or channel format",
      "A campaign needing several cuts from one approved source",
      "A brand requiring captions, motion, voice and consistent delivery",
    ],
    deliverables: [
      {
        title: "Edit and narrative plan",
        body:
          "Review footage, audience, channel, required duration, story, call to action and any rights or disclosure requirements.",
      },
      {
        title: "First cut",
        body:
          "Shape pacing, selects, audio, captions, graphics and brand treatment into an agreed review version.",
      },
      {
        title: "Review and refinement",
        body:
          "Collect consolidated feedback, correct factual or visual issues and maintain a visible version-approval path.",
      },
      {
        title: "Channel delivery",
        body:
          "Export the approved aspect ratios, durations, caption files, thumbnails and compression settings for each destination.",
      },
    ],
    outputs: [
      "Edit plan and asset checklist",
      "Review cut",
      "Approved master",
      "Channel-specific versions",
      "Caption and thumbnail files",
    ],
    boundaries:
      "Filming, stock licensing, music licensing, talent, voiceover and unlimited revisions are separate unless included. AI-generated elements need appropriate rights and disclosure.",
    faq: [
      {
        question: "Can one video be adapted for several platforms?",
        answer:
          "Yes. Each version should be reframed for its duration, aspect ratio, caption behaviour and audience context rather than only cropped mechanically.",
      },
      {
        question: "Are captions included?",
        answer:
          "Captions can be included as burned-in text or separate subtitle files. Language review and accessibility requirements should be scoped.",
      },
      {
        question: "How many revisions are included?",
        answer:
          "The proposal should define review rounds, feedback ownership and what counts as a new direction. Consolidated feedback keeps production efficient.",
      },
    ],
  },
  "ai-video-creation-service": {
    fit: [
      "A campaign needing concept-led video without a full conventional shoot",
      "A brand exploring short-form, explainer or visual-story formats",
      "A team that can provide clear rights, facts and human approvals",
    ],
    deliverables: [
      {
        title: "Concept and script",
        body:
          "Define the audience, purpose, narrative, factual claims, visual references and disclosure requirements before generation.",
      },
      {
        title: "Controlled production",
        body:
          "Create scenes, avatars, voices or motion elements through approved tools and keep source decisions visible.",
      },
      {
        title: "Human edit and brand review",
        body:
          "Refine pacing, continuity, typography, captions, audio and brand accuracy rather than treating generation as the final cut.",
      },
      {
        title: "Format delivery",
        body:
          "Prepare the approved short-form, long-form, square, vertical or landscape outputs required by the campaign.",
      },
    ],
    outputs: [
      "Concept and script",
      "Storyboard or visual direction",
      "Review cut",
      "Approved video masters",
      "Caption and channel formats",
    ],
    boundaries:
      "AI video must respect identity, copyright, voice consent, product accuracy and platform disclosure. Media87 should not create deceptive impersonation or fabricate client results.",
    faq: [
      {
        question: "What kinds of AI video can you create?",
        answer:
          "The original page shows short-form adverts, mock-ups, motivational and story formats alongside explainers and longer educational videos. The feasible style depends on the brief and rights.",
      },
      {
        question: "Can you use an AI avatar or cloned voice?",
        answer:
          "Only with appropriate identity and voice permission. The agreement should define the model, usage, duration, markets and whether disclosure is required.",
      },
      {
        question: "Will it look fully realistic?",
        answer:
          "Quality varies by concept, movement and continuity. Some ideas work better as stylised visuals. A sample direction should be approved before producing a full set.",
      },
    ],
  },
};

export function getServiceDetail(slug: string) {
  return serviceDetails[slug];
}
