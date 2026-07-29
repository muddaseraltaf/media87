export type RestoredArticle = {
  slug: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  media?: {
    afterHeading?: string;
    afterTextStartsWith?: string;
    layout: "wide" | "profiles";
    src?: string;
    alt?: string;
    width?: number;
    height?: number;
    caption?: string;
    items?: {
      src: string;
      alt: string;
      label: string;
      detail?: string;
      width: number;
      height: number;
      fit?: "cover" | "contain";
    }[];
  }[];
  headings?: string[];
  paragraphs?: string[];
  sources?: { label: string; url: string }[];
};

export const restoredArticles: RestoredArticle[] = [
  {
    slug: "whatsapp-automation-for-restaurants-complete-2025-guide",
    title: "WhatsApp Automation for Restaurants: Practical 2026 Guide",
    description:
      "A practical guide to restaurant WhatsApp automation for enquiries, reservations, reminders, feedback and human handoff.",
    category: "AI automation",
    image: "/images/products/chatzen/insights.jpg",
    sources: [
      {
        label: "Meta — WhatsApp Business Platform documentation",
        url: "https://developers.facebook.com/docs/whatsapp/",
      },
    ],
    headings: [
      "What WhatsApp automation can do for a restaurant",
      "Start with the customer journey",
      "Useful restaurant workflows",
      "A safe implementation plan",
      "What should stay human",
      "How to measure the workflow",
      "Questions to ask a provider",
      "Frequently asked questions",
    ],
    paragraphs: [
      "WhatsApp automation can help a restaurant respond consistently when customers ask common questions, request a table, need directions or want to follow up after a visit. The useful goal is not to remove people from hospitality. It is to handle predictable steps quickly and pass unusual or sensitive conversations to a person with enough context.",
      "This guide explains the practical decisions behind a restaurant WhatsApp workflow. Features, message rules and charges can change, so confirm the current requirements of the official WhatsApp Business Platform and any provider before launch.",
      "What WhatsApp automation can do for a restaurant",
      "A well-designed flow can answer approved questions about opening hours, branches, menus, dietary options, parking and reservation policy. It can collect the date, time, party size and contact details for a booking request, but it should not claim that a table is confirmed unless it is connected to an authoritative reservation system.",
      "Automation can also send approved reminders, share order or reservation updates, request feedback after service and route complaints privately to a manager. Each message needs a clear purpose, appropriate consent and an obvious route to human help.",
      "Start with the customer journey",
      "Map the moments where customers currently wait, repeat information or abandon an enquiry. Review website forms, calls, direct messages and front-of-house questions. Choose one high-volume problem first instead of building a long menu of features that nobody owns.",
      "Define the source of truth for hours, menus, locations, availability and promotions. Assign a person to update that information. The assistant should say when it does not know, avoid guessing and hand the conversation over when a request falls outside its approved knowledge.",
      "Useful restaurant workflows",
      "Enquiry triage: identify the branch and the customer’s goal, answer approved questions and route event, catering or group-booking enquiries to the right team.",
      "Reservation support: collect the required details, check availability only when an integration supports it, and show a clear pending or confirmed status.",
      "Pre-visit reminders: send relevant directions, parking information or cancellation instructions using an approved message process.",
      "Post-visit feedback: ask whether the guest would like to share feedback, make it easy to contact the restaurant directly and never pressure customers to leave only positive public reviews.",
      "Complaint escalation: recognise urgent language, capture the order or visit details and alert a responsible person. A bot should not debate a complaint or promise compensation it cannot authorise.",
      "A safe implementation plan",
      "First, document the selected workflow, owners, approved answers, consent basis and escalation rules. Second, build a small test with internal staff. Third, test missing information, spelling errors, multiple languages and requests the system should refuse. Fourth, launch to a limited audience and review conversations before expanding.",
      "Keep access role-based, retain only the information needed for the stated purpose and document how contacts can opt out. If the workflow connects to a booking, CRM or ordering system, test duplicate records, failed requests and delayed responses.",
      "What should stay human",
      "People should handle allergies and other safety-sensitive questions, complex complaints, refunds, exceptional bookings, ambiguous requests and any decision that requires judgement or authority. The customer should never have to fight the automation to reach a person.",
      "How to measure the workflow",
      "Track response time, completed enquiry paths, handoff rate, unresolved conversations, booking requests that reach the reservation team and customer opt-outs. Review conversation samples as well as dashboard totals. A fast automated answer is not useful when it is wrong or sends the guest in circles.",
      "Questions to ask a provider",
      "Ask who owns the WhatsApp account and data, how consent and approved templates are handled, which systems can be integrated, what happens when an integration fails, how human handoff works, which languages are reviewed and how pricing changes with conversation volume.",
      "Frequently asked questions",
      "Can WhatsApp confirm reservations automatically? Only when the workflow is connected to a reliable availability source and the confirmation status is explicit. Otherwise, it should collect a request for staff review.",
      "Should every restaurant automate WhatsApp? No. It is most useful when the restaurant already receives enough repeat enquiries to justify a maintained workflow and has a person responsible for exceptions.",
      "Can it support more than one branch? Yes, but branch selection, hours, menus, routing and reporting must be structured carefully so customers receive the correct local information.",
    ],
  },
  {
    slug: "how-to-make-ai-ultra-realistic-ads",
    title: "How to Create Realistic AI Ads Without Losing Brand Control",
    description:
      "A practical workflow for creating realistic AI-assisted ads with stronger briefs, consistent scenes, human review and responsible disclosure.",
    category: "Paid media",
    image: "/images/services/social-media.jpg",
    sources: [
      {
        label: "Google Ads policies",
        url: "https://support.google.com/adspolicy/answer/6008942",
      },
      {
        label: "Google Ads — unacceptable business practices",
        url: "https://support.google.com/adspolicy/answer/15938071",
      },
    ],
    headings: [
      "Start with the advertising idea",
      "Build a production brief",
      "Create a consistent visual system",
      "Write prompts that describe evidence",
      "Move from still image to motion",
      "Review brand, rights and disclosure",
      "Prepare variants for testing",
      "Pre-launch checklist",
    ],
    paragraphs: [
      "Realistic AI-assisted advertising starts with a credible idea, not a long camera prompt. The work still needs an audience, an offer, a reason to believe and a clear next action. Generative tools can speed up concept exploration and production, but they do not replace brand judgement, legal review or performance testing.",
      "Start with the advertising idea",
      "Write one sentence that explains who the ad is for, what problem it addresses and what the viewer should understand. Then choose the proof: a product detail, a real customer situation, a demonstration, a founder explanation or an approved claim. If the concept has no useful proof, visual polish will not make it persuasive.",
      "Build a production brief",
      "Define the format, placement, duration, aspect ratio, language, setting, subject, wardrobe, product details, brand colours, required copy and call to action. List anything that must not change. A clear brief prevents the model from inventing packaging, logos, people or product behaviour.",
      "Create a consistent visual system",
      "Generate a small set of approved reference frames before making motion. Keep the subject, product, lighting direction, colour treatment and environment consistent. Use real product photography when accuracy matters, and treat generated backgrounds or extensions as supporting material rather than evidence of a product feature.",
      "Write prompts that describe evidence",
      "Describe what the camera can see: subject, action, environment, framing, light, material and movement. Avoid filling prompts with camera names merely to sound technical. Use precise constraints such as keeping label text unchanged, maintaining the same garment and preserving the product’s real proportions.",
      "Move from still image to motion",
      "Use short, controlled actions. Specify the starting frame, one main movement, camera behaviour and ending frame. Generate multiple short clips instead of asking one prompt to deliver an entire advert. Editing, sound, pacing and typography are usually what turn separate generations into a coherent piece.",
      "Review brand, rights and disclosure",
      "Confirm that you have permission to use supplied faces, voices, music, logos and reference material. Do not imitate a real person or imply an endorsement without permission. Check the current rules of the advertising platform and the markets where the campaign will run, including any disclosure requirements for synthetic or materially altered media.",
      "Prepare variants for testing",
      "Change one meaningful element at a time: opening hook, proof, offer framing, visual setting or call to action. Keep naming and tracking consistent so the team can compare outcomes. A realistic image is a creative input; qualified attention and conversion behaviour determine whether the ad works.",
      "Pre-launch checklist",
      "Check factual claims, product accuracy, spelling, logo use, usage rights, subtitles, contrast, safe areas, destination page, tracking and mobile playback. Watch the final export without sound and then listen without watching. Ask a reviewer who did not create it to explain what the advert promises.",
      "Media87 can help plan AI-assisted concepts, generate and edit approved assets, adapt formats and connect creative testing with paid-media measurement. Final scope depends on the channels, asset rights, production needs and review process.",
    ],
  },
  {
    slug: "how-to-create-ultra-realistic-human-sound-voice-with-prompting",
    title: "How to Make AI Voiceovers Sound More Natural",
    description:
      "Improve AI voiceovers with spoken-language scripts, performance direction, pacing, pronunciation checks and responsible human review.",
    category: "Content & creative",
    sources: [
      {
        label: "Media87 editorial guidelines",
        url: "/editorial-guidelines/",
      },
    ],
  },
  {
    slug: "how-to-automatically-read-classify-and-reply-to-emails-using-ai-step-by-step-n8n-guide",
    title: "How to Classify and Draft Email Replies with AI in n8n",
    description:
      "Build an n8n workflow that reads email, classifies intent, prepares a grounded draft and sends uncertain or sensitive messages to human review.",
    category: "AI automation",
    media: [
      {
        afterTextStartsWith:
          "Before connecting an AI email workflow to a live inbox",
        layout: "wide",
        src: "/images/articles/email-ai/n8n-email-classification-workflow.webp",
        alt: "n8n workflow connecting Gmail, email classification, a knowledge base and rule-based email actions",
        width: 1024,
        height: 490,
        caption:
          "The workflow shown in the earlier Media87 guide. Treat it as an architecture example and confirm current n8n node settings before implementation.",
      },
    ],
    sources: [
      {
        label: "n8n Gmail node documentation",
        url: "https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/",
      },
    ],
  },
  {
    slug: "how-to-make-linkedin-post-assistant-with-n8n",
    title: "How to Build a LinkedIn Post Assistant with n8n",
    description:
      "A practical n8n workflow for turning approved ideas into LinkedIn drafts while protecting facts, brand voice and human approval.",
    category: "AI automation",
    media: [
      {
        afterTextStartsWith: "A LinkedIn post assistant is more useful",
        layout: "wide",
        src: "/images/articles/linkedin-n8n/n8n-linkedin-post-workflow.webp",
        alt: "n8n workflow connecting Telegram triggers, content generation, image generation and a LinkedIn post action",
        width: 1024,
        height: 534,
        caption:
          "The workflow screenshot from the original Media87 article. The rebuilt guide adds approval, fact-checking and duplicate-protection safeguards around this basic flow.",
      },
    ],
    sources: [
      {
        label: "LinkedIn — automated activity policy",
        url: "https://www.linkedin.com/help/linkedin/answer/a1340567/automated-activity-on-linkedin",
      },
    ],
  },
  {
    slug: "social-media-marketing-agency-dubai-services-costs-hiring-checklist",
    title: "Social Media Marketing Agency Dubai: Services, Costs and Hiring Checklist",
    description:
      "Compare Dubai social media agency services, cost drivers, red flags, KPIs and the questions to ask before signing.",
    category: "Digital marketing",
    sources: [
      {
        label: "Media87 digital marketing services in Dubai",
        url: "/digital-marketing-services-in-dubai/",
      },
    ],
  },
  {
    slug: "top-digital-marketers-in-pakistan",
    title: "Top Digital Marketers in Pakistan: 2026 Shortlist Guide",
    description:
      "A transparent 2026 shortlist of notable Pakistan-connected digital marketers, organised by specialism with selection criteria and a practical hiring checklist.",
    category: "Digital marketing",
    image: "/images/services/digital-marketing.jpg",
    media: [
      {
        afterHeading: "Pakistan-connected marketers to consider",
        layout: "profiles",
        caption:
          "Portraits restored from the earlier Media87 version of this article. The order below is editorial, not a performance ranking.",
        items: [
          {
            src: "/images/articles/top-digital-marketers/muddaser-altaf.webp",
            alt: "Portrait of Muddaser Altaf",
            label: "Muddaser Altaf",
            detail: "AI-assisted marketing and automation",
            width: 225,
            height: 225,
          },
          {
            src: "/images/articles/top-digital-marketers/badar-khushnood.webp",
            alt: "Portrait of Badar Khushnood",
            label: "Badar Khushnood",
            detail: "Digital transformation and ecommerce",
            width: 300,
            height: 300,
          },
          {
            src: "/images/articles/top-digital-marketers/salman-baig.webp",
            alt: "Portrait of Salman Baig",
            label: "Salman Baig",
            detail: "Technical and enterprise SEO",
            width: 300,
            height: 300,
          },
          {
            src: "/images/articles/top-digital-marketers/tanveer-nandla.webp",
            alt: "Portrait of Tanveer Nandla",
            label: "Tanveer Nandla",
            detail: "SEO education and digital entrepreneurship",
            width: 300,
            height: 300,
          },
          {
            src: "/images/articles/top-digital-marketers/hisham-sarwar.webp",
            alt: "Portrait of Hisham Sarwar",
            label: "Hisham Sarwar",
            detail: "Freelancing, personal brand and digital education",
            width: 300,
            height: 300,
          },
          {
            src: "/images/articles/top-digital-marketers/mehboob-shar.webp",
            alt: "Portrait of Mehboob Shar",
            label: "Mehboob Shar",
            detail: "SEO consulting and agency delivery",
            width: 300,
            height: 300,
          },
          {
            src: "/images/articles/top-digital-marketers/shahzeena-khan.webp",
            alt: "Portrait of Shahzeena Khan",
            label: "Shahzeena Khan",
            detail: "SEO consulting and training",
            width: 300,
            height: 300,
          },
          {
            src: "/images/articles/top-digital-marketers/abdul-wahab-ahmad.webp",
            alt: "Portrait of Abdul Wahab Ahmad",
            label: "Abdul Wahab Ahmad",
            detail: "Performance marketing and training",
            width: 300,
            height: 300,
          },
          {
            src: "/images/articles/top-digital-marketers/m-rameez-ul-haq.webp",
            alt: "Portrait of M. Rameez Ul Haq",
            label: "M. Rameez Ul Haq",
            detail: "SEO consulting and education",
            width: 300,
            height: 300,
          },
          {
            src: "/images/articles/top-digital-marketers/shan-mehar.webp",
            alt: "Portrait of Shan Mehar",
            label: "Shan Mehar",
            detail: "Creator monetisation and social video",
            width: 541,
            height: 461,
            fit: "contain",
          },
        ],
      },
    ],
    headings: [
      "Direct answer",
      "How this shortlist was prepared",
      "Important disclosure",
      "Pakistan-connected marketers to consider",
      "Muddaser Altaf — AI-assisted marketing and automation",
      "Badar Khushnood — digital transformation and ecommerce",
      "Salman Baig — technical and enterprise SEO",
      "Tanveer Nandla — SEO education and digital entrepreneurship",
      "Hisham Sarwar — freelancing, personal brand and digital education",
      "Mehboob Shar — SEO consulting and agency delivery",
      "Shahzeena Khan — hands-on SEO consulting and training",
      "Abdul Wahab Ahmad — performance marketing and training",
      "M. Rameez Ul Haq — SEO consulting and education",
      "Shan Mehar — creator monetisation and social video",
      "Choose by business problem, not list position",
      "Questions to ask before hiring",
      "Evidence checklist",
      "Frequently asked questions",
      "Methodology and update policy",
    ],
    paragraphs: [
      "Direct answer",
      "There is no objective single “best” digital marketer for every business in Pakistan. The useful shortlist depends on whether the work needs technical SEO, paid acquisition, ecommerce strategy, creator growth, training, marketing automation or a broader operating plan. The profiles below represent different strengths and should be treated as a starting point for due diligence, not as a universal league table.",
      "How this shortlist was prepared",
      "Media87 reviewed public professional profiles, official websites, company or institutional pages, visible areas of specialisation and the clarity of each person’s current positioning. Inclusion does not mean that Media87 has audited private campaign results, client retention, fees or availability. Public claims can change and should be verified directly before a hiring decision.",
      "The shortlist favours people with a visible Pakistan connection and a substantial public footprint in digital marketing, search, ecommerce, content, education or related growth work. It deliberately avoids scoring follower counts as proof of business performance. A large audience can demonstrate reach, but it does not prove that a person is the right operator for a specific commercial problem.",
      "Important disclosure",
      "Muddaser Altaf founded Media87, which publishes this guide. That relationship creates a clear conflict of interest, so his profile is not presented as an independent number-one ranking. Readers should evaluate him using the same evidence checklist applied to every other person: relevant work, scope clarity, references, ownership, reporting and fit for the brief.",
      "Pakistan-connected marketers to consider",
      "The profiles are organised as an editorial shortlist rather than a strict first-to-tenth ranking. Names and specialisms should be rechecked when the article is updated because roles, businesses and service availability change.",
      "Muddaser Altaf — AI-assisted marketing and automation",
      "Muddaser’s public positioning connects digital marketing with AI-assisted content, customer-conversation workflows, SEO and automation through Media87. He may be relevant to founders or service businesses that want these areas planned together rather than bought as unrelated tasks.",
      "Before hiring, ask for a scope tied to the actual business bottleneck and for evidence relevant to that scope. Media87’s public pages explain its services and products, but a buyer should still confirm responsibilities, approvals, measurement and the people who will perform the work.",
      "Badar Khushnood — digital transformation and ecommerce",
      "LUMS describes Badar Khushnood as an entrepreneur and technology leader with experience in digital transformation, ecommerce and digital marketing strategy. His profile includes co-founding Bramerz and Fishry and contributing to executive education and Pakistan’s technology ecosystem.",
      "He may fit organisations that need senior strategic direction, ecommerce context or digital transformation thinking. A buyer looking for day-to-day campaign execution should confirm the delivery model, team and availability rather than assuming that a public leadership profile includes hands-on channel management.",
      "Salman Baig — technical and enterprise SEO",
      "Salman Baig’s current public profile centres on SEO, including technical foundations, enterprise search and newer questions around AI-assisted discovery. This makes him a relevant profile to investigate when a large website, marketplace or complex search programme needs specialist thinking.",
      "For any enterprise SEO engagement, ask for examples that show the problem, scale, actions, constraints and outcome. Confirm whether the work includes strategy only, implementation support, team training or ongoing ownership.",
      "Tanveer Nandla — SEO education and digital entrepreneurship",
      "Tanveer Nandla is publicly associated with iSkills and education in SEO, blogging and digital entrepreneurship. He may be useful to learners, founders or teams that want structured capability building alongside practical search and web-business context.",
      "Training popularity is not the same as consulting fit. Businesses should check whether the proposed work is a course, advisory engagement, implementation programme or access to a wider team.",
      "Hisham Sarwar — freelancing, personal brand and digital education",
      "Hisham Sarwar is widely associated with freelancing education, personal branding and digital skills. His public content may be particularly relevant to freelancers, creators and early-stage professionals building market visibility and commercial independence.",
      "A company seeking technical SEO or paid-media management should verify whether that exact service is available. Educational reach and campaign delivery are different forms of expertise.",
      "Mehboob Shar — SEO consulting and agency delivery",
      "Mehboob Shar’s public positioning focuses on SEO consulting and agency-supported delivery. He may be relevant to organisations seeking search strategy with access to a broader execution team.",
      "Ask who will work on the account, which technical and content tasks are included, how recommendations reach production and how reporting connects rankings with qualified enquiries or sales.",
      "Shahzeena Khan — hands-on SEO consulting and training",
      "Shahzeena Khan presents a focused profile around SEO consulting and training. This can suit smaller organisations or teams that want direct specialist involvement and practical guidance rather than a wide multi-channel programme.",
      "Confirm industry experience, time commitment, implementation responsibilities and how local, technical and content SEO are divided within the scope.",
      "Abdul Wahab Ahmad — performance marketing and training",
      "Abdul Wahab Ahmad’s public profiles cover multiple performance-marketing areas, including search, paid channels, ecommerce and professional training. That breadth may help businesses that need channel comparison before choosing where to invest.",
      "Broad capability should still be translated into a narrow first objective. Ask which channel deserves priority, what will be measured and what the marketer recommends stopping.",
      "M. Rameez Ul Haq — SEO consulting and education",
      "M. Rameez Ul Haq is publicly positioned around SEO consulting and training. He may be relevant for organisations that need search-focused advice or teams building their internal SEO knowledge.",
      "Verify current services, examples and delivery ownership. Years of experience are useful context, but recent relevant work and a clear diagnostic process are more important for a hiring decision.",
      "Shan Mehar — creator monetisation and social video",
      "Shan Mehar’s public positioning is connected with creator education, social video and monetisation. That is a distinct requirement from general digital marketing and may suit creators or publishers developing platform-based revenue.",
      "Platform monetisation rules change frequently. Confirm that training and recommendations reflect current official policies and do not rely on shortcuts that could put an account at risk.",
      "Choose by business problem, not list position",
      "For technical SEO, prioritise demonstrated experience with websites of similar scale and complexity. For paid acquisition, look for measurement, creative testing and lead-quality controls. For ecommerce, check merchandising, feed, retention and margin awareness. For content or personal brand work, examine editorial judgement and the ability to turn attention into a useful customer journey.",
      "For an integrated engagement, confirm that one person is not presented as doing every specialist task. Ask which work is performed personally, which is delegated and who is accountable for the final decision.",
      "Questions to ask before hiring",
      "What would you diagnose before recommending a channel? Which outcome will the first 90 days target? What access and input are required from our team? Who owns the accounts, data, audiences and creative files? Which claims or case studies can be verified? How are weak results diagnosed? What is excluded from the fee? What happens at handover?",
      "Evidence checklist",
      "Request two or three relevant examples with context rather than isolated screenshots. Look for a starting problem, work completed, timeframe, result, attribution limits and client permission. Check references where the engagement is material. Keep business accounts under company ownership and grant role-based access.",
      "A useful proposal should connect deliverables to the customer journey. Reports should state what changed, what was learned and what decision follows. Avoid guaranteed rankings, guaranteed virality and certainty before diagnosis.",
      "Frequently asked questions",
      "Who is the best digital marketer in Pakistan? There is no reliable universal answer. The best fit depends on the problem, sector, budget, internal team and required level of implementation.",
      "Is this a paid ranking? No paid placement was used for this version. Media87’s relationship with Muddaser Altaf is disclosed because he founded the publisher.",
      "Should follower counts decide the shortlist? No. Audience size may show distribution, but businesses should prioritise relevant work, process, evidence, communication and commercial fit.",
      "Should I hire an individual or an agency? An individual may offer direct specialist access. An agency may provide broader execution capacity. Confirm who actually performs the work in either model.",
      "Methodology and update policy",
      "This article is an editorial discovery guide based on public information reviewed in July 2026. It is not an award, certification or audited performance ranking. Media87 should review the profiles, links, disclosures and availability at least twice a year and correct material errors when reported through the contact page.",
    ],
    sources: [
      {
        label: "LUMS profile — Badar Khushnood",
        url: "https://soe.lums.edu.pk/lums_employee/6996",
      },
      {
        label: "iSkills profile — Tanveer Nandla",
        url: "https://iskills.com/team/tanveer-nandla/",
      },
      {
        label: "LinkedIn public profile — Salman Baig",
        url: "https://www.linkedin.com/in/salmanb",
      },
      {
        label: "Media87 authors and editorial team",
        url: "/authors-team/",
      },
      {
        label: "Media87 editorial guidelines",
        url: "/editorial-guidelines/",
      },
    ],
  },
];
