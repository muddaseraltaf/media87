export type ProductStep = {
  title: string;
  body: string;
};

export type ProductFeature = {
  title: string;
  body: string;
  note?: string;
  image?: {
    src: string;
    alt: string;
  };
};

export type ProductFaq = {
  question: string;
  answer: string;
};

export type ProductPageData = {
  slug: "localzen" | "chatzen";
  title: string;
  eyebrow: string;
  description: string;
  mesh: {
    lineOne: string;
    lineTwoPrefix: string;
    highlight: string;
  };
  intro: string;
  promise: string[];
  video: {
    id: string;
    title: string;
    caption: string;
  };
  processHeading: string;
  processIntro: string;
  process: ProductStep[];
  featuresHeading: string;
  featuresIntro: string;
  features: ProductFeature[];
  integrations: string[];
  useCases: ProductStep[];
  operatingNote: {
    eyebrow: string;
    title: string;
    body: string;
    points: string[];
  };
  faq: ProductFaq[];
};

export const productPages: Record<
  ProductPageData["slug"],
  ProductPageData
> = {
  localzen: {
    slug: "localzen",
    title: "LocalZen",
    eyebrow: "Reputation management platform",
    description:
      "LocalZen brings review requests, monitoring, response workflows, customer feedback and local visibility into one organised reputation system.",
    mesh: {
      lineOne: "Reputation made",
      lineTwoPrefix: "clear with ",
      highlight: "LocalZen.",
    },
    intro:
      "Bring review requests, profile monitoring, response workflows and reputation insights into one practical system. LocalZen is designed for local and multi-location businesses that need consistency without losing the human response.",
    promise: [
      "Email, SMS and QR request journeys",
      "Review monitoring and assisted responses",
      "Google Business Profile workflows",
      "Website widgets and social proof",
    ],
    video: {
      id: "1135612271",
      title: "LocalZen reputation workflow overview",
      caption:
        "The original Media87 product video is embedded from Media87’s Vimeo account and loaded only when this section approaches the viewport.",
    },
    processHeading: "From scattered reviews to a repeatable operating rhythm.",
    processIntro:
      "The original LocalZen offer is strongest when it is explained as a complete workflow—not just a request link. Each stage has an owner, an input and a useful next action.",
    process: [
      {
        title: "Understand the brand and customer journey",
        body:
          "Map the moments when customers complete a visit, purchase or service, then define the brand voice and response responsibilities.",
      },
      {
        title: "Connect the relevant profiles",
        body:
          "Bring supported profiles such as Google, Facebook, Yelp or TripAdvisor into the operating view. Exact connections are confirmed during onboarding.",
      },
      {
        title: "Build consistent review requests",
        body:
          "Create permission-aware email, SMS and QR journeys that make it easy for customers to share honest feedback after a real interaction.",
      },
      {
        title: "Monitor and respond",
        body:
          "Notify the right person when feedback arrives, prepare an appropriate response and keep a human approval path for sensitive situations.",
      },
      {
        title: "Turn feedback into insight",
        body:
          "Track themes, recurring service issues and positive signals so reviews inform operations as well as marketing.",
      },
      {
        title: "Strengthen local visibility",
        body:
          "Keep business information, review responses, profile updates and on-site proof aligned with the wider local SEO programme.",
      },
    ],
    featuresHeading: "The useful parts of the original LocalZen offer, explained clearly.",
    featuresIntro:
      "The live page grouped many capabilities together. The rebuilt page separates collection, management, presentation and local profile work so a buyer can understand what each part does.",
    features: [
      {
        title: "Review request workflows",
        body:
          "Send a clear request after a genuine customer interaction through supported email, SMS, WhatsApp or QR workflows. Requests should be sent consistently rather than only to customers expected to leave a high rating.",
        note: "Policy-aware: no review gating or selective suppression.",
      },
      {
        title: "Kiosk and QR mode",
        body:
          "Place a branded QR journey at a reception desk, counter, clinic or venue so customers can share feedback on their own device, or send the same link after the visit.",
      },
      {
        title: "Monitoring and response support",
        body:
          "See new reviews, assign responsibility and prepare on-brand replies. Critical, legal or sensitive feedback should always move to a person.",
      },
      {
        title: "Google Business Profile workflow",
        body:
          "Coordinate business information, posts, review responses and performance checks around the verified profile. Access and exact management scope are confirmed per location.",
      },
      {
        title: "Website review widgets",
        body:
          "Show selected, authentic customer feedback on the website with accessible layouts and a clear source. Published reviews still need the appropriate permission and attribution.",
      },
      {
        title: "Social proof publishing",
        body:
          "Turn approved reviews and profile updates into reusable social content while preserving context and avoiding edits that change what the customer meant.",
      },
      {
        title: "Branded feedback journeys",
        body:
          "Keep the request, thank-you and service-recovery experience visually consistent with the business while providing the same public-review opportunity fairly.",
      },
    ],
    integrations: [
      "Google Business Profile",
      "Facebook",
      "Instagram",
      "Yelp",
      "TripAdvisor",
      "Email",
      "SMS",
      "WhatsApp",
      "Website widgets",
    ],
    useCases: [
      {
        title: "Restaurants and hospitality",
        body:
          "Create a post-visit request rhythm, monitor fast-moving feedback and keep guest-facing profiles accurate.",
      },
      {
        title: "Clinics and wellness businesses",
        body:
          "Coordinate requests and responses with privacy-aware escalation for feedback that may contain sensitive information.",
      },
      {
        title: "Home and professional services",
        body:
          "Trigger a request after a completed job and give the operations team a clear path for follow-up when service issues appear.",
      },
      {
        title: "Multi-location operators",
        body:
          "Standardise brand rules and reporting while preserving profile ownership, response context and local accountability.",
      },
    ],
    operatingNote: {
      eyebrow: "Trust before ratings",
      title: "Reputation management cannot—and should not—erase criticism.",
      body:
        "LocalZen should help a business request honest feedback, notice issues earlier and respond better. It must not promise to block negative reviews or route only satisfied customers to public platforms.",
      points: [
        "Send review opportunities consistently",
        "Keep service recovery separate from rating selection",
        "Use human review for sensitive responses",
        "Confirm platform support and pricing during onboarding",
      ],
    },
    faq: [
      {
        question: "Can LocalZen stop negative reviews?",
        answer:
          "No. A credible reputation system cannot prevent a customer from sharing an honest experience. LocalZen is intended to improve monitoring, response speed, feedback learning and consistent review requests.",
      },
      {
        question: "Does LocalZen use review gating?",
        answer:
          "The rebuilt offer is designed around policy-compliant requests. Customers should not receive or lose a public-review opportunity based on a satisfaction score. Private service recovery can exist, but it should not be used to selectively suppress public feedback.",
      },
      {
        question: "Which review platforms can be connected?",
        answer:
          "The original page names Google, Facebook, Yelp and TripAdvisor, alongside messaging and website tools. The exact supported connection, permission level and automation available for each platform must be confirmed during onboarding.",
      },
      {
        question: "Can it support more than one location?",
        answer:
          "The workflow can be structured for multiple locations, but each profile, user role, message allowance and reporting view should be scoped before launch.",
      },
      {
        question: "What is Kiosk Mode?",
        answer:
          "It is a branded QR-based feedback journey placed at a physical venue. The customer scans with their own device, which keeps the interaction simple and avoids shared-device privacy problems.",
      },
      {
        question: "Is pricing shown online?",
        answer:
          "The former WordPress page displayed plan prices, but the current inclusions, message allowances and platform costs need confirmation. The rebuilt page therefore asks for a scoped onboarding discussion rather than publishing a potentially stale price.",
      },
    ],
  },
  chatzen: {
    slug: "chatzen",
    title: "ChatZen",
    eyebrow: "AI-powered conversation system",
    description:
      "ChatZen answers approved questions, captures and qualifies enquiries, books meetings and routes conversations across supported customer channels.",
    mesh: {
      lineOne: "Conversations that",
      lineTwoPrefix: "move with ",
      highlight: "purpose.",
    },
    intro:
      "Turn common questions into useful, on-brand conversations that can capture details, qualify intent, book a meeting and hand the right context to a person. ChatZen can be designed around one approved knowledge base across supported channels.",
    promise: [
      "Website and messaging journeys",
      "Lead capture and qualification",
      "Calendar and CRM handoff",
      "Human escalation and monitoring",
    ],
    video: {
      id: "1136806021",
      title: "ChatZen product overview",
      caption:
        "The original ChatZen video is embedded from Media87’s Vimeo account and loaded lazily below the first screen.",
    },
    processHeading: "A conversation system built around the customer journey.",
    processIntro:
      "ChatZen should not begin with a generic bot. It begins with the questions, decisions and handoffs that matter to the business, then turns those into a controlled conversation design.",
    process: [
      {
        title: "Smart lead capture",
        body:
          "Ask only for the details needed to understand the enquiry, explain why they are needed and pass useful context into the next step.",
      },
      {
        title: "Instant booking",
        body:
          "Offer available meeting times through a supported calendar connection and confirm what happens after a booking is made.",
      },
      {
        title: "Approved conversation intelligence",
        body:
          "Build from a reviewed knowledge source, brand voice and explicit answer boundaries instead of allowing the assistant to improvise unsupported facts.",
      },
      {
        title: "Omnichannel connection",
        body:
          "Adapt the same core knowledge for the website, WhatsApp, Facebook Messenger, Instagram or other supported touchpoints.",
      },
      {
        title: "Measured optimisation",
        body:
          "Review unanswered questions, handoff quality, lead usefulness and booking outcomes, then approve improvements before they go live.",
      },
      {
        title: "Launch and ongoing support",
        body:
          "Test representative conversations, launch with monitoring and maintain a visible process for content updates, failures and escalation.",
      },
    ],
    featuresHeading: "Seven capabilities, each tied to a real operating task.",
    featuresIntro:
      "The original ChatZen page listed strong product ideas but sometimes described the AI as if it improved by itself. The rebuilt explanation makes human review and controlled updates visible.",
    features: [
      {
        title: "Useful first response",
        body:
          "Answer approved routine questions at any time and show a clear next action. Uncertain, sensitive or unsupported questions should move to a person.",
      },
      {
        title: "Lead qualification",
        body:
          "Collect relevant context—such as service interest, location, timing or budget range—without turning the conversation into a long form.",
      },
      {
        title: "Booking and routing",
        body:
          "Connect qualified enquiries to a calendar, CRM, inbox or team queue with the conversation summary attached.",
      },
      {
        title: "On-brand conversation design",
        body:
          "Shape greetings, explanations, fallback language and escalation around the business voice while making it clear when the customer is interacting with AI.",
      },
      {
        title: "Conversation insights",
        body:
          "Review recurring questions, drop-off points and unresolved intents so marketing, sales and service teams can improve the underlying journey.",
        image: {
          src: "/images/products/chatzen/insights.jpg",
          alt: "Original Media87 illustration for ChatZen conversation insights",
        },
      },
      {
        title: "Supported channel connections",
        body:
          "Create a consistent experience across selected channels without assuming every channel exposes the same features or permissions.",
        image: {
          src: "/images/products/chatzen/integrations.jpg",
          alt: "Original Media87 illustration for ChatZen multi-platform integration",
        },
      },
      {
        title: "Controlled improvement",
        body:
          "Use real conversation gaps to propose updates, then review and approve those changes. The system should not silently retrain itself from every customer message.",
        note: "Human-reviewed updates protect accuracy and brand safety.",
      },
    ],
    integrations: [
      "Website",
      "WhatsApp",
      "Facebook Messenger",
      "Instagram",
      "Calendars",
      "CRM",
      "Email",
      "Lead notifications",
      "Analytics",
    ],
    useCases: [
      {
        title: "Lead-generation websites",
        body:
          "Answer decision questions, capture commercial intent and route a useful summary to the sales team.",
      },
      {
        title: "Appointments and consultations",
        body:
          "Handle common pre-booking questions, surface available times and confirm the next step.",
      },
      {
        title: "Customer support triage",
        body:
          "Resolve approved routine questions and escalate account-specific, sensitive or unresolved cases with context.",
      },
      {
        title: "Multi-channel campaigns",
        body:
          "Use one governed knowledge source while adapting entry points and calls to action to each supported channel.",
      },
    ],
    operatingNote: {
      eyebrow: "AI with a handoff",
      title: "A useful bot knows when the conversation belongs to a person.",
      body:
        "ChatZen should be transparent, permission-aware and constrained by approved knowledge. The goal is a faster, more useful customer journey—not an AI that pretends to know everything.",
      points: [
        "Disclose the automated assistant appropriately",
        "Collect only necessary customer information",
        "Escalate uncertainty and sensitive topics",
        "Review knowledge and conversation changes",
      ],
    },
    faq: [
      {
        question: "What can ChatZen handle?",
        answer:
          "It can be configured for approved FAQs, lead capture, qualification, meeting booking, basic routing and selected customer-support journeys. The final scope depends on the knowledge source and connected systems.",
      },
      {
        question: "Can it match our brand voice?",
        answer:
          "Yes. The conversation design can define tone, terminology, greeting style, answer length, fallback language and calls to action. Accuracy rules should take priority over tone when the assistant is uncertain.",
      },
      {
        question: "Which channels are supported?",
        answer:
          "The original offer names websites, WhatsApp, Facebook Messenger and Instagram. Calendar, CRM and analytics connections are also part of the proposed workflow. Exact platform access and functionality must be verified for the selected setup.",
      },
      {
        question: "Does ChatZen learn automatically from every conversation?",
        answer:
          "It should not silently treat every customer message as truth. Conversations can reveal gaps and suggest improvements, but knowledge and response changes should be reviewed before publication.",
      },
      {
        question: "How is performance measured?",
        answer:
          "Useful measures can include resolved intents, unanswered questions, qualified leads, bookings, handoff completion and downstream lead quality. The relevant events should be agreed before launch.",
      },
      {
        question: "Can it support multiple languages or locations?",
        answer:
          "It can be designed for multiple knowledge sets, locations or languages, but each source, routing rule and qualified language review needs an explicit scope.",
      },
    ],
  },
};

export function getProductPage(slug: string) {
  return productPages[slug as ProductPageData["slug"]];
}
