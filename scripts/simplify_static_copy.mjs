import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(scriptDir, "..");
const architectureDir = path.join(projectDir, "main architecture");

const sharedReplacements = new Map([
  ["Qualification, booking and handoff", "Questions, enquiries and bookings"],
  ["The connected Media87 system", "SEO, ads, content and AI support"],
  [
    "Dubai-based digital marketing, local discovery and practical AI systems designed around clearer customer journeys.",
    "Dubai-based digital marketing agency providing SEO, paid advertising, content creation and practical AI automation.",
  ],
  ["START — Useful next step", "Talk to Media87"],
  ["What should the next useful change be?", "What would you like to improve?"],
  [
    "Bring the current situation, the target outcome and the constraint. We will help identify the smallest useful next step.",
    "Tell us what you want to improve. We will review your needs and recommend a practical next step.",
  ],
  [
    "Clear scope · Human review · Approval before publishing",
    "Scope and costs agreed before work begins",
  ],
  ["SYS.PROCESS — Working sequence", "Our process"],
  ["A clear sequence, with review points.", "How the work is planned and reviewed."],
  ["NEXT — Continue exploring", "Related pages"],
  ["Discuss this page →", "Talk to Media87 →"],
  ["Read the details", "See what is included"],
  ["PAGE FOCUS", "ON THIS PAGE"],
  ["Discuss your situation →", "Talk to us about this →"],
  ["BOUNDARIES", "IMPORTANT TO KNOW"],
  ["FAQ — Direct answers", "Common questions"],
  ["Questions, answered clearly.", "Questions about this page."],
  ["ABOUT THIS GUIDE", "ABOUT THIS GUIDE"],
  ["Practical context", "Before you act"],
  [
    "Use this guide as a starting point, then confirm changing platform rules, prices, local requirements and implementation details before acting.",
    "Use this guide as a starting point. Check current platform rules, prices and local requirements before making a decision.",
  ],
  ["USEFUL NEXT STEP", "BEFORE YOU CONTINUE"],
  ["Apply the guidance to your actual situation.", "Check how this applies to your business."],
  [
    "Check the goal, available evidence, platform constraints and responsible owner before turning any recommendation into a live campaign or workflow.",
    "Confirm the goal, available evidence, platform limits and person responsible before putting the recommendation into practice.",
  ],
  ["CONTINUE READING", "RELATED GUIDES"],
  [
    "Need help applying this to your business?",
    "Need help applying this to your business?",
  ],
  [
    "Bring the current situation, target outcome and constraints. Media87 will help identify a practical next step.",
    "Tell us what you want to improve. Media87 will review the situation and recommend a practical next step.",
  ],
  ["Practical guides for clearer digital decisions.", "Guides for better marketing decisions."],
  [
    "Browse practical guides about search visibility, paid media, content, reputation and responsible AI workflows.",
    "Read guides about SEO, paid advertising, content, customer reviews and practical AI automation.",
  ],
  ["Media87 guides about SEO, paid media, AI workflows, content and practical digital growth.", "Media87 guides about SEO, paid advertising, content and practical AI automation."],
  ["A practical growth system", "How we work"],
  ["Discovery and scope", "Understand the situation"],
  ["Connected delivery", "Agree and complete the work"],
  ["Measured iteration", "Measure and improve"],
  ["Current situation", "What is happening now"],
  ["Useful scope", "Recommended work"],
  ["Approved proposal", "Agreed plan and costs"],
  [
    "Review the locations, channels, content, tracking and customer journey already in place.",
    "Review the locations, channels, content, tracking and ways customers currently contact the business.",
  ],
  [
    "Choose the smallest combination of work that can address the real bottleneck.",
    "Choose the work most likely to address the main problem.",
  ],
  [
    "Confirm responsibilities, deliverables, review points and commercial terms before work begins.",
    "Agree responsibilities, deliverables, review points and costs before work begins.",
  ],
  ["human handoff", "transfer to a person"],
  ["Human handoff", "Transfer to a person"],
  ["human-reviewed delivery", "work checked by people"],
  ["Human-reviewed delivery", "Work checked by people"],
  ["customer journey", "customer experience"],
  ["Customer journey", "Customer experience"],
  ["full stack", "complete service mix"],
  ["Full stack", "Complete service mix"],
  ["growth engine", "campaign process"],
  ["Growth engine", "Campaign process"],
  ["leverage", "use"],
  ["Leverage", "Use"],
  ["leveraging", "using"],
  ["Leveraging", "Using"],
  ["utilize", "use"],
  ["Utilize", "Use"],
  ["utilizing", "using"],
  ["Utilizing", "Using"],
  ["seamlessly", "directly"],
  ["Seamlessly", "Directly"],
  ["seamless", "connected"],
  ["Seamless", "Connected"],
  ["cutting-edge", "current"],
  ["Cutting-edge", "Current"],
  ["robust", "reliable"],
  ["Robust", "Reliable"],
  ["game-changing", "useful"],
  ["Game-changing", "Useful"],
  ["skyrocket", "increase"],
  ["Skyrocket", "Increase"],
  ["Watch your online reputation soar.", "Track customer feedback and respond consistently."],
  ["elevate your", "improve your"],
  ["Elevate your", "Improve your"],
  ["viral-worthy", "useful"],
  ["Viral-worthy", "Useful"],
  ["Furthermore,", "Also,"],
  ["furthermore,", "also,"],
  ["pivotal role", "important role"],
  ["Pivotal role", "Important role"],
  ["empowered", "trained"],
  ["Empowered", "Trained"],
  ["what extra work is unlocked", "what extra work is included"],
  ["Ready to transform", "Ready to improve"],
  ["transforms boring text into performance-level speech", "can make plain text sound more natural and expressive"],
  ["It transforms boring text into performance-level speech", "It can make plain text sound more natural and expressive"],
  ["dominate local search results", "improve visibility in local search results"],
  ["Dominate local search results", "Improve visibility in local search results"],
  ["dominate Google Maps", "improve visibility in Google Maps"],
  ["Dominate Google Maps", "Improve visibility in Google Maps"],
  ["local dominance", "local visibility"],
  ["Local dominance", "Local visibility"],
  [
    "As we step into 2026, the landscape of Local SEO is constantly evolving.",
    "Local SEO continues to change in 2026.",
  ],
  [
    "In today’s interconnected world, establishing a strong online presence is crucial for business success, especially in a vibrant market like Dubai.",
    "Businesses in Dubai need a clear website, strong search visibility and simple ways for customers to make contact.",
  ],
  [
    "In today’s digital landscape, your personal website is more than just a URL—it’s your digital handshake, your portfolio, and your brand story all rolled into one.",
    "A personal website should quickly show who you are, what you do and how someone can contact you.",
  ],
  [
    "In today’s digital landscape, your personal website is more than just a URL—it’s your digital handshake, your portfolio, and your brand story all rolled into ",
    "A personal website should quickly show who you are, what you do and how someone can contact you.",
  ],
  ["unlock the full potential of", "get more value from"],
  ["Unlock the full potential of", "Get more value from"],
  ["Local SEO Guide 2025: How to Dominate Local Search Rankings", "Local SEO Guide: How to Improve Local Search Visibility"],
  ["How to create ultra realistic human sound voice with prompting", "How to Make an AI Voice Sound More Natural"],
  ["How to make Ai ultra realistic ads", "How to Create More Realistic AI Ads"],
  ["How to make linkedin Post assistant with n8n", "How to Build a LinkedIn Post Assistant with n8n"],
  ["Email Automated replies for your customer service or agency", "How to Automate Customer-Service Email Replies"],
  ["Useful prompts for nano banana part 1", "Useful Image Prompts for Nano Banana"],
  ["Water mark remover", "How to Remove a Watermark from an Image You Own"],
  ["How to create cinematic style personal portfolio website landing page", "How to Create a Cinematic Personal Portfolio Website"],
  ["Top Digital Marketers in Pakistan (2026) | Ranked Experts", "Digital Marketers in Pakistan: A Review Guide"],
  ["Media87 digital marketing services at Media87", "Media87 services"],
  [
    "Treat this article as a starting point, then connect the advice to your business model, customer experience, and current marketing stack. A useful implementation plan should identify the outcome, the first action, the owner, the metric, and the point where the work needs expert review. For broader support, compare the recommendation with Media87 services.",
    "Use the advice that fits your situation. Define the result, first action, responsible person and measure before starting. Review Media87 services if you need broader support.",
  ],
  [
    "Treat this article as a starting point, then connect the advice to your business model, customer experience, and current marketing stack. A useful implementation",
    "Use each guide as a starting point and check current information before acting.",
  ],
  [
    "Start with the highest-friction step in the current workflow, then improve one measurable outcome before adding complexity.",
    "Start with the step causing the most problems. Improve one measurable result before adding more work.",
  ],
  ["At media87.com/,", "At Media87,"],
  ["Try it once, and you’ll never go back.", "Test the result carefully before using it in published work."],
  ["vanity traffic", "irrelevant traffic"],
  ["Intent clusters", "Related search topics"],
  ["intent clusters", "related search topics"],
  ["Intent cluster", "Related search topic"],
  ["intent cluster", "related search topic"],
  ["intent cannibalization", "competition between similar pages"],
  ["Intent cannibalization", "Competition between similar pages"],
  ["cannibalization problems", "problems caused by competing pages"],
  ["pre-publish gate", "pre-publish check"],
  ["quality gate", "quality check"],
  ["proof signals", "evidence"],
  ["entity information", "business information"],
  ["wider growth system rather than a standalone tool", "wider marketing and customer-service plan"],
  ["treated as an operating system rather than a one-time profile setup", "managed as an ongoing process rather than a one-time profile update"],
  ["an ongoing operating system rather than a short suppression campaign", "an ongoing customer-service process rather than a short campaign to hide criticism"],
  ["This is where the magic happens.", "This is where the site is assembled."],
  ["high-converting content systems", "content processes designed to support enquiries and sales"],
  ["Effortless positive review collection", "Simple review collection"],
  ["AI-Powered Digital Agency — Dubai, UAE", "Digital marketing and AI support — Dubai, UAE"],
  ["CONTACT — Start with the problem", "Contact Media87"],
  ["ERROR 404 — Page not found", "Page not found"],
  ["MEDIA87 / SYSTEM", "Media87"],
  ["Productised authority offer", "LLM visibility package"],
  ["Package route", "Main package page"],
  ["Plan My Growth System", "Discuss Your Marketing"],
  ["Growth system", "Marketing plan"],
  ["growth system", "marketing plan"],
  ["All systems connected", "Services work together"],
  ["NO BLACK BOX", "Clear process"],
  ["Workflow map · example", "Example workflow"],
  ["AI Avatar v2", "AI avatar example"],
  ["\"Hi, I'm the founder's AI twin…\"", "\"Example approved avatar script\""],
  ["Lead flow · live", "Enquiry process"],
  ["Meta Ads · this week", "Meta campaign overview"],
  ["GBP insights · 30 days", "Google Business Profile activity"],
  ["Local pack · \"plumber near me\"", "Local search example"],
  ["ChatZen · 24/7 support AI", "ChatZen customer support"],
  ["LocalZen · live dashboard", "LocalZen dashboard"],
  ["AI Video · rendering complete", "AI-assisted video"],
  ["AI Voice, 2026", "AI calling guide"],
  ["High Fit", "Good fit"],
  ["Hybrid Fit", "May be suitable"],
  ["Human-Led", "Best handled by people"],
  ["Find the Blockers", "Find the problems"],
  ["Use Both", "Use SEO and Google Ads"],
  ["Example cluster", "Example page group"],
  ["Content creative", "Content and creative"],
  ["GEOTAGGED ✓", "Location metadata added"],
  ["DIRECT CONTACT", "Contact details"],
  ["Local First", "Start with local information"],
  ["Auto-reply sent ✓", "Reply draft ready"],
  ["AI Auto-Replies", "Assisted reply drafts"],
  ["GMB Control", "Google Business Profile"],
  ["Website Widgets", "Website review display"],
  ["AI Voice", "AI calling"],
  ["Watch out", "Common mistake"],
  ["Media87 digital growth systems", "Media87 digital marketing services"],
  [
    "Geo-tagged images are step one.<br>Local SEO is the system.",
    "Geo-tagging is one small step.<br>Local SEO also needs accurate profiles, pages and content.",
  ],
  ["Media87 was founded by Muddaser Altaf ,", "Media87 was founded by Muddaser Altaf,"],
  ["privacy policy .", "privacy policy."],
  ["hello@media87.com .", "hello@media87.com."],
  ["local visibility support .", "local visibility support."],
  ["reviews ,", "reviews,"],
  ["Local SEO services in Dubai .", "Local SEO services in Dubai."],
  ["secure.It", "secure. It"],
  ["video:You", "video: You"],
  ["size.You", "size. You"],
  ["hackers.They", "hackers. They"],
  ["voice.We", "voice. We"],
  ["scripting.Because", "scripting. Because"],
  ["unchanged.Result", "unchanged. Result"],
  ["assistant.Classify", "assistant. Classify"],
  ["media87.com/ can help", "Media87 can help"],
  [
    "<p>https://drive.google.com/file/d/1XYt_Ub0q21v6CLvx0F_IRpz_AKDzV5e8/view?usp=sharing</p>",
    "<p><a href=\"https://drive.google.com/file/d/1XYt_Ub0q21v6CLvx0F_IRpz_AKDzV5e8/view?usp=sharing\" rel=\"noopener noreferrer\">Download the email automation workflow →</a></p>",
  ],
  [
    "<p>https://drive.google.com/file/d/1GSj9Y_GwsACvjFaAWEQ4H-T4bytgiSma/view?usp=sharing</p>",
    "<p><a href=\"https://drive.google.com/file/d/1GSj9Y_GwsACvjFaAWEQ4H-T4bytgiSma/view?usp=sharing\" rel=\"noopener noreferrer\">Download the LinkedIn workflow →</a></p>",
  ],
  [
    "Your Gmail profile photo is often the first thing people see when you land in their inbox. Whether you’re setting up a new account or finally replacing that g",
    "Learn how to prepare a clear Gmail profile picture, upload it safely and check how it appears across Google services.",
  ],
]);

const routeReplacements = {
  services: new Map([
    ["SVC.ALL — Connected growth system", "Media87 services"],
    ["Six connected services. One practical growth system.", "Digital marketing services for finding and converting customers."],
    [
      "Choose one service or connect the full stack. We plan SEO, ads, conversations, reputation, automation and content around the same customer journey — so each part supports the next.",
      "Choose the services you need. Media87 provides SEO, advertising, content, chatbots, review management and automation.",
    ],
    [
      "Choose one service or connect the complete service mix. We plan SEO, ads, conversations, reputation, automation and content around the same customer experience — so each part supports the next.",
      "Choose the services you need. Media87 provides SEO, advertising, content, chatbots, review management and automation.",
    ],
    ["SVC.01 — AI-Powered Conversations", "AI chatbots"],
    ["Chatbots that turn chats into customers.", "Answer questions and collect customer enquiries."],
    ["SVC.02 — Reputation Management", "Customer reviews"],
    ["Build trust that ranks and converts.", "Request, manage and display customer reviews."],
    ["SVC.03 — Local SEO", "SEO and local search"],
    ["Get found by customers near you.", "Help nearby customers find your business."],
    ["SVC.04 — AI Automation", "AI automation"],
    ["Workflows that work while you don't.", "Automate repetitive marketing and follow-up."],
    ["SVC.05 — Content & AI Video", "Content and AI video"],
    ["Content that stops the scroll.", "Create content for websites, ads and social media."],
    ["SVC.06 — Ads Management", "Paid advertising"],
    ["Maximize ROI with data-driven ads.", "Manage ads across Google, Meta and TikTok."],
    ["SYS.WHY — The Media87 difference", "Why Media87"],
    ["We don't guess — we use AI and experience to win.", "A clear plan, useful tools and people responsible for the work."],
    [
      "Every strategy, campaign and tool is carefully planned to drive measurable growth, increase engagement and maximize your return on investment.",
      "Each service is planned around your goals, available evidence and the actions you want customers to take.",
    ],
    ["Insight-Driven Strategies", "Decisions based on useful evidence"],
    ["Expert Team Support", "Support from the Media87 team"],
    ["All-in-One Marketing", "One plan across your channels"],
    ["Creative + Technical Excellence", "Creative and technical work together"],
    ["SYS.04 — How the work moves", "How we work"],
    ["One clear path from problem to progress.", "A clear process from first review to improvement."],
    [
      "The service may change, but the working rhythm stays consistent. We diagnose the bottleneck, build the right layer, launch with checks in place, then improve it using real signals.",
      "We review the problem, agree the work, check it before launch and use performance data to decide what should improve next.",
    ],
    ["INITIATE — Growth Protocol", "Talk to Media87"],
    [
      "We design and train AI systems that understand, respond and convert — giving your business human-like communication across WhatsApp, Messenger and your website. 24/7 engagement, lead qualification and instant support, all synced to your CRM.",
      "We set up AI chatbots to answer approved questions, collect enquiry details and connect with supported website, messaging and CRM tools.",
    ],
    ["Learns and improves from every conversation", "Improve responses after conversation review"],
    [
      "We monitor, manage and enhance your online reputation through reviews, ratings and strategic feedback collection — turning happy customers into your strongest marketing tool across Google, Facebook, Yelp and TripAdvisor.",
      "Request honest customer reviews, monitor feedback, reply consistently and display approved reviews across supported platforms.",
    ],
    ["Negative feedback filtered before it goes public", "Positive and negative feedback handled consistently"],
    [
      "Dominate local search with optimized Google Business Profiles, citations and content strategies that drive real foot traffic and local leads. Our end-to-end process covers GEO, SEO and AIO — so you rank on Google, Maps and AI search alike.",
      "Improve visibility in Google Search and Maps with accurate business profiles, relevant service pages, local listings and useful content.",
    ],
    [
      "Custom AI automations that free your team for high-impact work. We build n8n workflows, lead management systems and email funnels that reply, route, follow up and report — automatically, around the clock.",
      "Connect forms, email, spreadsheets and CRM tools so routine replies, lead routing, follow-up and reporting require less manual work.",
    ],
    ["New lead → enrich → score → route to sales → WhatsApp follow-up. 0 manual steps.", "New lead → collect details → route to sales → prepare follow-up."],
    [
      "AI UGC that looks real, professional video editing that matches your brand, AI avatars that speak like you, and translation that reads native in any language. We produce content for advertising, education and everything in between.",
      "Create and edit campaign videos, AI-assisted visuals, avatars and translated content for websites, advertising, education and social media.",
    ],
    ["AI avatars that look and speak like you", "AI avatars based on approved identity and scripts"],
    ["AI video creation — no footage required", "AI-assisted video concepts and production"],
    ["Professional photo shoots from a normal photo", "AI-assisted image concepts from approved source photos"],
    [
      "Google, Facebook, Instagram and TikTok campaigns managed with precision targeting, compelling creatives and continuous optimization. From discovery to scaling, every dirham is tracked and accounted for.",
      "Plan and manage campaigns across Google, Meta and TikTok with agreed targeting, creative work, tracking and reporting.",
    ],
    ["Ad creative development that converts", "Ad creative development and testing"],
    ["Scaling & growth once the numbers prove out", "Budget changes based on agreed performance data"],
    ["Every campaign is built on data, analytics and proven marketing techniques for maximum impact.", "Campaign decisions use available account data, audience information and agreed goals."],
    ["Specialists across SEO, AI, chatbots and ads handle every project — no generalists guessing.", "Media87 brings together SEO, advertising, content and automation support when the project requires it."],
    ["Campaigns that are visually engaging and technically optimized to maximize conversions.", "Creative work and technical setup are reviewed together before launch."],
  ]),
  "ads-managment": new Map([
    ["SVC.02 — Ads Management", "Paid advertising"],
    ["Maximize ROI with expert ads management.", "Paid advertising managed around your goals."],
    [
      "From strategy to execution, we handle your ads across Google, Facebook, TikTok and Instagram — so you can focus on growing your business while every dirham gets tracked.",
      "Media87 plans and manages campaigns across Google, Meta, TikTok and Instagram, with agreed budgets, tracking and regular performance review.",
    ],
    ["SYS.PIPE — Clicks → Customers", "Campaign process"],
    ["Our process, your growth engine.", "How we plan and manage your campaigns."],
    ["Our process, your campaign process.", "How we plan and manage your campaigns."],
    ["Six stages from first audit to scaled, profitable campaigns.", "Six stages from account review to ongoing improvement."],
    ["SYS.VALUE — Why it works", "What the service includes"],
    ["Campaigns that turn every click into a customer.", "Campaigns designed to reach suitable customers and generate measurable enquiries."],
    ["Strategy, creativity and analytics combined — so your ads perform, measurably.", "Planning, creative work and measurement are managed together."],
    ["ROI That Speaks for Itself", "Track spending and useful results"],
    ["We Handle Ads, You Handle Business", "Ongoing campaign management"],
    ["Connect with Ideal Customers", "Reach relevant audiences"],
    ["Performance Powered by Data", "Decisions based on campaign data"],
    ["Your Ads, Everywhere They Matter", "Choose the right advertising platforms"],
    ["SYS.WHY — Built for performance", "How campaigns are reviewed"],
    ["Your business, maximized.", "Your budget, goals and account guide the work."],
    [
      "We monitor every campaign and fix every issue before it affects your results — efficient, measurable, results-driven.",
      "We monitor campaign performance, flag problems and agree changes using the data available.",
    ],
    ["SCOPE — Before media spend", "Before media spend"],
    ["Build the plan around the account, not a placeholder price.", "Review the account before setting the plan and management fee."],
    ["We analyze your business, target audience and competitors to craft a winning ad strategy before a single dirham is spent.", "We review your business, audience, competitors and existing account before any budget is spent."],
    ["A tailored campaign plan — the best platforms, ad formats and budgets selected for maximum ROI.", "Agree the platforms, ad formats, audience, budget and tracking plan."],
    ["High-performing visuals, copy and creatives designed to attract attention and drive clicks.", "Create and test ad visuals and copy for the selected platforms."],
    ["Continuous tracking and transparent reporting of campaign performance to keep growth on track.", "Track spending, enquiries and other agreed campaign results in regular reports."],
    ["We scale the campaigns that work, fix the ones that don't, and consistently improve ROI over time.", "Increase budgets only when the evidence supports it, and repair or stop weak campaigns."],
    ["Every penny of ad spend is maximized through expert strategy, audience insights and continuous optimization — more revenue out than you put in.", "Track where the advertising budget goes and compare spending with agreed business results."],
    ["Full-service management — creatives, targeting, monitoring, optimization. Less time worrying about ads, more time doing what you do best.", "Media87 can manage creative work, targeting, monitoring and campaign changes within the agreed scope."],
    ["Current targeting by demographics, interests and behavior puts your ads in front of the people most likely to take action.", "Use the targeting options available on each platform to reach relevant audiences."],
    ["Real-time analytics on clicks, interactions and conversions — campaigns adjust immediately and get smarter over time. Data, not guesswork.", "Review clicks, enquiries and other agreed conversions before changing targeting, creative or budget."],
    ["Google, Facebook, TikTok, Instagram — each platform gets its own strategy, creative and targeting for a powerful, unified presence.", "Choose Google, Meta, TikTok or another platform only when it fits the audience and campaign goal."],
    ["Innovative design plus compelling messaging — ads that capture attention, spark interest and convert prospects into loyal customers.", "Develop and test clear ad messages and creative suited to each platform."],
    ["Ongoing refinement means campaigns adapt, scale and improve — sustained growth and long-term success, not short-term spikes.", "Review campaign performance regularly and change budgets, targeting and creative when the evidence supports it."],
    ["Every campaign designed for your objectives, audience and brand voice — ads that capture attention and drive meaningful action.", "Campaigns are planned around your objectives, audience, offer and approved brand voice."],
    ["SCALE — Paid Growth", "Discuss paid advertising"],
    ["We craft campaigns that turn<br>every click into a customer.", "Plan campaigns around<br>relevant customers and measurable enquiries."],
    ["Data-driven, results-focused campaigns that reach the right audience, drive conversions and grow revenue.", "Discuss your audience, offer, budget and the enquiries or sales you need to measure."],
    ["Boost Your Ads Now", "Discuss Your Advertising"],
    ["Start free · Results in weeks · Transparent reporting", "Scope, fees and reporting agreed before work begins"],
  ]),
  "ai-powered-conversations": new Map([
    ["SVC.03 — AI-Powered Conversations", "AI chatbots and conversations"],
    ["Turn conversations into booked meetings.", "Answer questions, collect leads and support bookings."],
    [
      "Transform visitors into qualified leads and booked meetings through intelligent conversations. Our AI handles lead capture and scheduling automatically — with natural, human-like interactions.",
      "AI chatbots can answer common questions, collect enquiry details and help suitable visitors book or reach your team.",
    ],
    ["SYS.CORE — What the AI does", "What the chatbot can do"],
    ["Three jobs, fully automated.", "Three useful jobs, with clear rules and human support."],
    [
      "Every conversation moves a visitor closer to becoming your customer — no forms, no friction, no missed leads.",
      "The chatbot can answer approved questions, collect details and guide visitors to the right next step.",
    ],
    ["Smart Lead Capture", "Collect enquiry details"],
    ["Instant Booking", "Support appointment booking"],
    ["Conversation Intelligence", "Review conversation patterns"],
    ["SYS.PIPE — Visitor → Meeting", "From visitor to meeting"],
    ["How a chat becomes a customer.", "How a chat can become a qualified enquiry."],
    ["Four steps, all automatic, all in your brand's voice.", "Four steps based on approved information and rules."],
    ["We Train the AI on Your Business", "Add approved business information"],
    ["It Engages Every Visitor Instantly", "Answer common visitor questions"],
    ["It Qualifies the Lead Naturally", "Collect useful enquiry details"],
    ["It Books the Meeting", "Offer a booking or transfer option"],
    ["ENGAGE — Every Visitor", "Talk to Media87"],
    ["Ready to improve<br>your business?", "Want to improve<br>customer enquiries?"],
    ["Discuss the workflow", "Discuss the chatbot"],
    ["Clear scope · Human review · Monitored handoff", "Approved information · Human support · Agreed integrations"],
    ["Your services, pricing, FAQs and tone of voice become the AI's knowledge base — so every answer sounds like you.", "Add approved service, pricing and FAQ information, together with rules for tone and restricted topics."],
    ["On your website and social channels, the AI greets visitors the moment they arrive — no wait, no bounce.", "Offer visitors an immediate way to ask common questions on supported website and social channels."],
    ["Through friendly back-and-forth, the AI learns what the visitor needs and scores their intent — qualified leads surface automatically.", "Ask agreed questions, collect relevant details and route suitable enquiries to the correct person."],
    ["Real-time calendar integration confirms a slot on the spot — you wake up to a calendar full of qualified appointments.", "Connect an approved calendar so suitable visitors can view available times and request a meeting."],
  ]),
  chatzen: new Map([
    ["PRD.01 — ChatZen AI", "ChatZen"],
    ["An AI chatbot that talks like you — and sells like you.", "Answer customer questions and collect enquiries with ChatZen."],
    [
      "Transform visitors into qualified leads and booked meetings through intelligent conversations. One knowledge base powers your website, WhatsApp, Instagram and Messenger — so every channel answers instantly, in your voice.",
      "ChatZen uses approved business information to answer common questions, collect enquiry details and help visitors book or reach your team across supported channels.",
    ],
    ["SYS.PIPE — Conversations → Conversions", "How ChatZen works"],
    ["Our AI-powered process.", "Set up, review and improve the chatbot."],
    ["Six stages, one outcome: every chat moves a visitor closer to becoming your customer.", "Six stages from business information and conversation rules to launch and review."],
    ["SYS.CORE — Feature set", "ChatZen features"],
    ["Smarter conversations. Better conversions.", "Useful conversations and clearer next steps."],
    [
      "All the tools your business needs to engage visitors, qualify leads and convert them into customers with AI-driven conversations.",
      "Tools for answering questions, collecting lead details, supporting bookings and reviewing conversations.",
    ],
    ["Boost Sales & Conversions", "Support more enquiries and bookings"],
    ["Human-like Conversations", "Natural, approved responses"],
    ["Always Learning", "Improve from reviewed conversations"],
    ["SYS.WHY — Built by Media87", "Why ChatZen"],
    ["We build intelligent systems that turn every conversation into a customer.", "ChatZen is designed to make useful customer conversations easier to manage."],
    [
      "We don't just build chatbots — we create conversation systems that help your business connect, convert and grow, blending strategy, automation and design.",
      "Media87 plans the information, conversation rules, integrations and review process around your business needs.",
    ],
    ["Results That Grow", "Review and improve results"],
    ["DEPLOY — ChatZen", "Discuss ChatZen"],
    ["Automatically captures visitor information through natural conversations and intelligently qualifies leads — no forms, no friction.", "Collect contact and enquiry details through a guided conversation."],
    ["Directly books meetings by checking real-time availability and integrating directly with your calendar.", "Show approved calendar availability and let suitable visitors request a meeting."],
    ["The AI adapts and learns from every interaction to improve qualification and personalize responses.", "Review conversation patterns and update information or rules when answers need improvement."],
    ["We analyze performance and refine conversations for maximum engagement and conversions.", "Review conversations, failed answers and enquiry activity, then improve the content and rules."],
    ["Your chatbot goes live — then we monitor, improve and update it regularly so it keeps getting smarter over time.", "After launch, monitor answers and update the chatbot when services, policies or common questions change."],
    ["Your customers reach you anytime — day or night. Instant responses to every inquiry, no wait times, no missed opportunities.", "Visitors can ask approved questions at any time, while complex or sensitive enquiries can be transferred to a person."],
    ["Engages visitors at the moment their interest is highest — guiding them through buying, recommending, and closing.", "Guide interested visitors to a suitable service, booking option or contact method."],
    ["Automates FAQs, bookings, lead collection and basic support — your team focuses on growth, not repetitive replies.", "Handle common questions, basic lead collection and booking steps so staff spend less time on repetitive replies."],
    ["Understands context, responds naturally and matches your brand's tone — personal, friendly and engaging.", "Use approved information and tone guidance to produce clear, natural responses."],
    ["Every interaction tracked into easy-to-read analytics — improve marketing, service and sales with real user data.", "Review conversation topics, enquiry activity and failed answers without placing personal data in marketing reports."],
    ["Evolves with every conversation — the longer it runs, the smarter it gets, continually delivering better results.", "Improve the chatbot through reviewed conversations, updated information and tested rule changes."],
    ["Current NLP that understands, responds and improves with every interaction — smarter, faster, more accurate over time.", "Language tools produce responses from approved information, while people review accuracy and update the rules."],
    ["From setup to continuous optimization, we monitor performance and refine strategies so your results scale with you.", "After setup, review conversation quality and enquiry activity to decide what should change."],
    ["Get Started Free", "Discuss ChatZen"],
    ["Your business,<br>always engaged.", "Answer questions.<br>Collect enquiries."],
    ["Engage visitors before they leave your site. Get a custom quote and see ChatZen in action on your own channels.", "Discuss your channels, common customer questions and booking or lead-handling needs."],
    ["Free starter options available · No commitment", "Features, integrations and costs confirmed before setup"],
  ]),
  localzen: new Map([
    ["PRD.02 — LocalZen", "LocalZen"],
    ["Reputation management, made effortless.", "Manage customer reviews in one place."],
    [
      "Easily gather more Google reviews, catch negative feedback before it goes public, and highlight your stellar reputation everywhere — all from a single, powerful platform built for local businesses.",
      "LocalZen helps you request honest reviews, respond to customer feedback and display customer reviews from one dashboard.",
    ],
    ["KIOSK MODE — Instant feedback", "In-person review requests"],
    ["Customer reviews, right at your counter.", "Give customers a simple way to leave honest feedback."],
    ["SYS.PIPE — Reputation, perfected", "How LocalZen works"],
    ["Our process, your reputation.", "Set up, manage and review customer feedback."],
    ["Six steps from scattered reviews to a reputation engine that grows your local visibility.", "Six steps from connecting review profiles to requesting, monitoring and responding to feedback."],
    ["SYS.CORE — Feature set", "LocalZen features"],
    ["All the tools your local business needs to safeguard your reputation and drive growth.", "Tools for requesting reviews, monitoring feedback, replying and displaying approved reviews."],
    ["Effortless Review Collection", "Simple review requests"],
    ["Reputation Protection", "Monitor positive and negative feedback"],
    ["Website Widgets That Convert", "Review widgets for your website"],
    ["Complete GMB Control", "Google Business Profile support"],
    ["Your reputation, protected 24/7.", "Customer feedback in one dashboard."],
    ["SCOPE — Reputation workflow", "Before setup"],
    ["Choose the workflow before the plan.", "Confirm the locations, channels and responsibilities first."],
    ["Smart Filtering", "Customer Feedback"],
    ["Keep LocalZen on your premises so customers can scan and leave a review on the spot — or send them the QR code to do it later. Three simple steps to a positive reputation.", "Display a QR code so customers can choose to leave honest feedback during or after their visit."],
    ["Smart filter sends 5★ to Google, concerns to you privately", "Customer chooses where to leave feedback"],
    ["Smart tools request reviews from happy customers automatically via email, SMS or QR codes — a consistent stream of authentic positive feedback.", "Send neutral review requests to eligible customers through email, SMS or QR code."],
    ["Every mention, comment and rating tracked in real time. You're notified instantly, and AI-assisted replies let you respond professionally within seconds.", "Monitor supported review profiles and prepare replies for human approval."],
    ["As ratings improve, local SEO strengthens. We use positive reviews to boost rankings, attract more customers and turn reputation into a campaign process.", "Use accurate review information and consistent responses to support customer trust and local search work."],
    ["Gather positive feedback from Google, Yelp, TripAdvisor and more — all in one place. Review reputation trends and respond with a consistent process.", "Request and monitor honest feedback across supported review platforms."],
    ["Monitor mentions, respond instantly and prevent harmful feedback from impacting your brand — directly and effectively.", "Monitor positive and negative feedback, then respond through an agreed process."],
    ["Personalized SMS review requests sent automatically — every satisfied customer becomes a glowing online review.", "Send approved SMS review requests after eligible customer interactions."],
    ["Share your best reviews across Facebook and Instagram in seconds — stay active, visible and trustworthy.", "Turn approved reviews into social posts for Facebook and Instagram."],
    ["Manage reviews, update business info, post updates and monitor performance — your Google profile, fully in hand.", "Manage reviews, business information, updates and available performance data for your Google Business Profile."],
    ["A connected, branded flow that guides customers to leave reviews effortlessly — happy clients become advocates.", "Use a branded page that gives eligible customers a clear, neutral review request."],
    ["See every review, stop every problem before it hurts your business — all from one platform.", "See supported reviews, assign responses and track recurring customer concerns."],
    ["Crystal-Clear Insights", "Review trends and alerts"],
    ["PROTECT — Your Reputation", "Discuss LocalZen"],
    ["See every review. Stop every problem<br>before it hurts your business.", "Manage customer reviews<br>with a clear response process."],
    ["Complete visibility into your reviews, instant responses, and a reputation that compounds into growth — from one platform.", "Monitor supported review profiles, assign responses and track recurring customer feedback from one dashboard."],
    ["Book Your Onboarding Meeting", "Discuss LocalZen"],
    ["Free to try · Setup in days, not weeks", "Features, setup time and costs confirmed before work begins"],
  ]),
  "local-seo-services": new Map([
    ["SVC.01 — Local SEO", "Local SEO"],
    ["Dominate local search & grow your business.", "Help nearby customers find your business."],
    [
      "Increase your visibility, attract nearby customers and get more leads with expert Local SEO services tailored for your business — Google Maps, local pack and AI search included.",
      "Improve visibility in Google Search and Maps through accurate business information, useful service pages, local content and ongoing measurement.",
    ],
    ["SYS.PIPE — Rank, found, chosen", "How local SEO works"],
    ["Our process, your local dominance.", "A practical process for improving local visibility."],
    ["Six steps that take your business from invisible to the top of local search.", "Six steps for reviewing, improving and measuring local search visibility."],
    ["SYS.VALUE — Why it works", "What local SEO can improve"],
    ["Every search becomes a loyal customer.", "Help suitable local customers find and evaluate your business."],
    ["Local SEO is the highest-intent traffic a local business can get — here's what it unlocks.", "Local SEO can connect a business with people actively searching for nearby products or services."],
    ["More Free Traffic & Calls", "More organic visits and calls"],
    ["Targeted Leads", "Relevant local enquiries"],
    ["Trust & Authority", "Accurate information and customer trust"],
    ["Higher Conversion Rates", "Clearer paths to contact or book"],
    ["SYS.WHY — Built around you", "How we review local visibility"],
    ["Your local reputation, protected.", "Your search presence, reviewed as a whole."],
    [
      "We review the signals available to us and refine the work around visibility, accuracy and the customer journey.",
      "We review the website, Google Business Profile, local listings, content and customer feedback together.",
    ],
    ["AI-Driven Local Insights", "Local search and website insights"],
    ["SCOPE — Local search work", "Before local SEO work begins"],
    ["Calls +182% · Directions +96%", "Connect verified performance data"],
    ["We evaluate your current online presence and analyze your competitors to identify the biggest growth opportunities in your area.", "Review your current website, business profiles, local listings and relevant competitors."],
    ["We optimize your Google Business Profile so your business appears in local searches and on Google Maps — complete, accurate and keyword-rich.", "Complete and update the approved fields in your Google Business Profile using accurate business information."],
    ["We target high-intent local keywords that bring nearby customers directly to your business — \"near me\" and \"[service] in [city]\" searches.", "Research the local searches people use for your services and map relevant terms to suitable pages."],
    ["Your pages, content and metadata get optimized for local search relevance and improved rankings.", "Improve page structure, content and metadata so each page clearly describes its service and location context."],
    ["We build high-quality citations and backlinks from trusted local sources to strengthen your local authority.", "Correct important local listings and identify relevant, legitimate opportunities for local mentions and links."],
    ["Rankings, traffic and leads tracked with detailed reports — so results keep improving month after month.", "Track visibility, visits and enquiries, then use the data to choose the next improvement."],
    ["Appear at the top of local results whenever nearby customers search for what you offer — Google Maps visibility and localized keywords make you the first choice in your community.", "Improve the chance that nearby customers can find accurate information about your business in Google Search and Maps."],
    ["Real-world results, not just clicks: more foot traffic to your store and more calls from customers actively searching in your area.", "Local search visibility can support website visits, calls, direction requests and in-person visits."],
    ["Connect with high-intent users — people ready to buy or book now, not casual browsers. Local intent converts.", "Reach people searching for a nearby service, product, appointment or location."],
    ["Unlike ads that stop when you stop paying, Local SEO keeps generating leads and visits over time — organic traffic with no ongoing ad spend.", "SEO can continue producing organic visibility after individual tasks are complete, but it still requires monitoring and maintenance."],
    ["Local searchers take immediate action — visit, call, buy. High-intent geographic traffic out-converts general search traffic.", "Make calls, directions, bookings and other useful actions easy to find from local search pages."],
    ["A sustainable strategy, not a short-term spike — ongoing visibility builds lasting credibility and a steady flow of local customers.", "Maintain accurate profiles, useful pages and customer feedback over time rather than relying on a one-off change."],
    ["Every Local SEO strategy is customized to your goals, audience and brand identity — built around how your local customers actually search.", "Priorities are based on your locations, services, audience and current search visibility."],
    ["Advanced AI tools monitor local search performance, track customer interactions and spot opportunities before competitors see them.", "Use available search, profile and website data to identify accuracy problems and improvement opportunities."],
    ["Rankings, reviews, citations and local traffic tracked and refined continuously — measurable growth, month after month.", "Review rankings, customer feedback, local listings, visits and enquiries together."],
    ["Boost local visibility that turns<br>every search into a customer.", "Want more local customers to<br>find and contact you?"],
    ["Years of Local SEO experience helping businesses rank higher, get discovered and increase revenue — starting with a free audit.", "Request a review of your website, Google Business Profile and important local listings."],
    ["No commitment · Results in 2–3 months · Dubai, UAE", "Scope, timing and costs confirmed after review · Dubai, UAE"],
  ]),
  "digital-marketing-services-in-dubai": new Map([
    ["SVC.06 — Dubai, UAE", "Dubai, UAE"],
    ["SYS.FOCUS — What we improve", "What we improve"],
    ["Not more activity. A clearer system.", "Focus the work on visibility, enquiries and customer response."],
    [
      "Most businesses don't need \"more marketing.\" They need the right pages, the right search terms, the right offers, and a follow-up process that doesn't lose leads.",
      "Most businesses need clearer service pages, relevant search visibility, useful offers and a reliable follow-up process.",
    ],
    ["SYS.STACK — The services", "Digital marketing services"],
    ["Each service works alone — but they're designed to compound as one integrated system.", "Each service can work alone or support the others in one marketing plan."],
    ["SYS.PIPE — How Media87 works", "How Media87 works"],
    ["Audit to improvement, in five moves.", "Five steps from review to improvement."],
    ["AI-powered, human-reviewed", "AI-assisted, checked by people"],
    ["START HERE — Recommended plan", "Recommended starting point"],
    ["Not sure where to start? Begin here.", "Not sure where to start?"],
    ["A practical audit first — then fix the highest-intent page, then build the cluster around it.", "Start with a practical review, improve the most important service page, then create useful supporting content."],
    ["Foundation Audit", "Website and marketing review"],
    ["Website, SEO, content, conversion path and structure — a full picture of what's blocking growth.", "Review the website, SEO, content, enquiry process and tracking to find the main problems."],
    ["Service Page Upgrade", "Improve an important service page"],
    ["Improve one high-intent page first and use it as the quality template for everything after.", "Improve one important service page first, then use its structure as a guide for related pages."],
    ["Content Cluster Buildout", "Supporting content"],
    ["Pillar and support articles built around the questions your buyers actually ask.", "Create useful articles around the questions customers ask before choosing a service."],
    ["Lead capture, chat, follow-up and reporting workflows — so no enquiry goes cold.", "Connect lead capture, chat, follow-up and reporting so enquiries receive consistent attention."],
    ["FAQ — Digital Marketing Dubai", "Common questions"],
    ["Questions, answered.", "Questions about digital marketing services."],
    ["GROW — Dubai, UAE", "Discuss digital marketing"],
    ["Free audit · Approval-based workflow · Dubai, UAE", "Initial review · Agreed scope and approval process · Dubai, UAE"],
  ]),
  "about-us": new Map([
    ["Creative solutions, connected to practical business growth.", "Digital marketing and AI support with a clear business purpose."],
    [
      "Media87 combines strategy, content, local discovery, paid media and AI-enabled customer journeys from its Dubai market context.",
      "Media87 provides SEO, paid advertising, content creation, websites and practical AI automation from Dubai.",
    ],
    [
      "Media87 combines strategy, content, local discovery, paid media and AI-enabled customer experiences from its Dubai market context.",
      "Media87 provides SEO, paid advertising, content creation, websites and practical AI automation from Dubai.",
    ],
    ["Company and direction", "About Media87"],
    ["Creativity with a job", "Creative work with a clear purpose"],
    ["Technology with oversight", "Technology checked by people"],
    ["Strategy with evidence", "Decisions based on available evidence"],
    ["Founder-led direction", "Clear responsibility for the work"],
  ]),
  "contact-us": new Map([
    ["Tell us where growth is getting stuck.", "Tell us what you would like to improve."],
    [
      "Share the outcome, the current situation and the handoff causing the most friction. Media87 can then recommend the smallest useful next step.",
      "Tell us about your business, what you need help with and the result you want. Media87 will review the enquiry and recommend a practical next step.",
    ],
    ["Choose the easiest route.", "Choose how you would like to contact us."],
  ]),
  "llm-package": new Map([
    ["Build verifiable authority signals machines and people can inspect.", "Help search engines and AI tools understand your business."],
    [
      "A Media87 package concept for authoritative publication, entity clarity and discoverable brand evidence.",
      "A Media87 package for publishing clear business information, strengthening important website pages and making brand evidence easier to find.",
    ],
  ]),
  "llm-indexing-package-cp": new Map([
    ["One package, one canonical page.", "This package has one main page."],
    ["This legacy package URL directs visitors to the primary Media87 LLM Visibility Package.", "This older URL points visitors to the main Media87 LLM Visibility Package."],
  ]),
  prompts: new Map([
    ["Start with a useful prompt—then apply judgement.", "Use practical prompts, then review the result."],
    [
      "A growing Media87 library of visual and workflow prompts with context, examples and responsible-use notes.",
      "A Media87 library of prompts for images, content and automation, with examples and notes on safe use.",
    ],
  ]),
  "seo-and-ads-management-for-restaurants": new Map([
    ["Connect local discovery, paid demand and the path to booking.", "Help restaurant customers find, choose and contact you."],
    ["SEO, ads, websites, reputation and automation for restaurant and hospitality customer journeys.", "SEO, advertising, websites, customer reviews and automation for restaurants and hospitality businesses."],
    ["SEO, ads, websites, reputation and automation for restaurant and hospitality customer experiences.", "SEO, advertising, websites, customer reviews and automation for restaurants and hospitality businesses."],
  ]),
  blog: new Map([
    ["BLOG — Useful posts", "Useful guides"],
  ]),
  portfolio: new Map([
    ["<title>Digital portfolio | Media87</title>", "<title>Digital Portfolio: What to Include and Why | Media87</title>"],
    ["<h1 data-split>Digital portfolio</h1>", "<h1 data-split>Digital Portfolio: What to Include and Why</h1>"],
    [
      "Treat this article as a starting point, then connect the advice to your business model, customer experience, and current marketing stack. A useful implementation",
      "Learn what a useful digital portfolio should show, how to organise the work and how to make the next contact step clear.",
    ],
  ]),
  "online-reputation-management-dubai-review-recovery-playbook": new Map([
    ["A practical Media87 guide to online reputation management dubai: a review recovery playbook.", "A practical guide to responding to reviews, recovering customer trust and improving review management in Dubai."],
  ]),
  "digital-marketing-agency-jlt-dubai": new Map([
    ["Digital Marketing Agency JLT Dubai, UAE | Media87", "Digital Marketing Services for Businesses in JLT, Dubai"],
    [
      "Businesses in Dubai need a clear website, strong search visibility and simple ways for customers to make contact. As a leadin",
      "A guide to SEO, paid advertising, content and website support for businesses serving customers in and around JLT, Dubai.",
    ],
  ]),
  "email-automated-replies-for-your-customer-service-or-agency": new Map([
    [
      "This n8n workflow automatically reads new incoming emails using IMAP, uses AI to decide whether the email needs a reply, and if yes — generates and sends a pr",
      "Learn how to use n8n and AI to classify incoming emails, prepare draft replies and keep a person responsible for approval and exceptions.",
    ],
  ]),
  "how-to-add-a-cinematic-profile-photo-to-your-gmail-step-by-step-guide": new Map([
    ["How to add a cinematic profile photo to your Gmail – Step by Step Guide", "How to Add a Cinematic Profile Photo to Gmail"],
    [
      "Your Gmail profile photo is often the first thing people see when you land in their inbox. Whether you’re setting up a new account or finally replacing that g",
      "Follow these steps to prepare a clear profile photo and add it to your Google account for Gmail and other Google services.",
    ],
  ]),
  "how-to-automatically-read-classify-and-reply-to-emails-using-ai-step-by-step-n8n-guide": new Map([
    [
      "Managing emails can quickly become overwhelming — especially when your inbox is full of repetitive questions, promotional emails, and messages that don’t need",
      "Learn how an n8n automation can classify incoming emails, prepare replies for suitable messages and route uncertain cases to a person.",
    ],
  ]),
  "how-to-make-ai-ultra-realistic-ads": new Map([
    [
      "Let’s get started with create, creation of ultra-realistic AI ads. You will need to have Nano Banana Pro, and you can do that by various methods like using Go",
      "Learn how to plan more realistic AI advertising images using a clear brief, approved source material and careful visual review.",
    ],
  ]),
  "local-seo-in-2026-practical-playbook-for-dubai-businesses": new Map([
    [
      "Local SEO continues to change in 2026. Businesses in Dubai must stay ahead to use local search visibility and drive cus",
      "A practical guide to improving local visibility in Dubai through Google Business Profile, service pages, customer reviews and measurement.",
    ],
  ]),
  "ai-seo-dubai-smes-30-day-checklist": new Map([
    ["AI SEO for Dubai SMEs: 30-Day Implementation Checklist", "AI SEO Checklist for Dubai Businesses"],
    ["A practical 30-day AI SEO plan for Dubai SMEs: intent mapping, service-page fixes, content workflow, local SEO, KPIs, and weekly optimization.", "A 30-day checklist for improving important service pages, local search information, content and measurement for a Dubai business."],
  ]),
  "arabic-vs-english-seo-uae-businesses": new Map([
    ["Arabic vs English SEO Strategy for UAE Businesses", "Arabic or English SEO for UAE Businesses?"],
    ["A practical UAE guide to choosing Arabic, English, or bilingual SEO based on audience, intent, budget, and conversion goals.", "Choose Arabic, English or bilingual SEO based on the customers you serve, what they search for and the budget available."],
  ]),
  "google-ads-management-cost-dubai-2026": new Map([
    ["Google Ads Management Cost in Dubai (2026): What You Should Actually Pay", "Google Ads Management Costs in Dubai: Buyer Guide"],
    ["A practical Dubai buyer guide to Google Ads management pricing models, fee ranges, and how to choose the right agency setup in 2026.", "Understand common Google Ads management fees in Dubai and what to check before choosing an agency or freelancer."],
  ]),
  "how-to-make-linkedin-post-assistant-with-n8n": new Map([
    ["In this article I’ll show you how I built a LinkedIn Post Assistant using n8n (your automation tool). This assistant can be triggered:", "Learn how to use n8n to collect an idea, prepare a LinkedIn draft and keep a person responsible for review before publishing."],
  ]),
  "how-to-save-token-cost-and-make-openclaw-secure-with-one-prompt": new Map([
    ["How to save token cost and make OpenClaw secure with one prompt", "How to Reduce OpenClaw Token Use and Improve Safety"],
    ["Most people think token optimization is just about saving money. It’s not.", "A practical guide to reducing unnecessary token use, limiting permissions and reviewing an OpenClaw setup before use."],
  ]),
  "useful-prompts-for-nano-banana-part-1": new Map([
    [
      "Prompt :Apply a cinematic Teal and Orange color grade. Push the deep shadows and mid-tones towards a cool, cyan-blue hue, while warming the highlights and ski",
      "A practical collection of image-editing prompts for colour, lighting and atmosphere, with reminders to review the result before use.",
    ],
  ]),
  "whatsapp-automation-for-restaurants-complete-2025-guide": new Map([
    ["WhatsApp Automation for Restaurants: Complete 2025 Guide", "WhatsApp Automation for Restaurants: Practical Guide"],
    [
      "Every year, restaurants across the world lose over $100,000 in potential revenue. Not because of bad food. Not because of poor location. But because they miss",
      "Learn how restaurants can use WhatsApp automation for common questions, booking requests, order updates and transfer to staff when needed.",
    ],
  ]),
  "local-seo-guide-2025-how-to-dominate-local-search-rankings": new Map([
    ["Local SEO helps businesses appear in local search results when customers search for services near them. In 2025, ranking locally is more competitive than ever", "A practical guide to Google Business Profile, local service pages, customer reviews, listings and measurement."],
    ["A practical guide to Google Business Profile, local service pages, customer reviews, listings and measurement..", "A practical guide to Google Business Profile, local service pages, customer reviews, listings and measurement."],
    ["Your GBP is your most important local SEO asset. Choose accurate categories, write a compelling description with local keywords, and maintain a regular posting schedule.", "Start with accurate Google Business Profile categories, contact details, opening hours, services and website links. Add useful updates only when there is something relevant to share."],
    ["Consistency is key. Use tools like Moz Local or BrightLocal to audit and fix your listings across the web.", "Check important business listings and correct inconsistent names, addresses, phone numbers and website links."],
    ["Reviews impact rankings and click-through rates. Create a simple process to request reviews after every positive customer interaction.", "Customer reviews can support trust and local visibility. Use a neutral process to request honest feedback from eligible customers."],
    ["Geotagging adds GPS coordinates to your image files. Benefits include:", "Use accurate, useful business photos"],
    ["Local SEO is an ongoing process. Focus on these fundamentals and you will see improved visibility in local search results within 3-6 months.", "Local SEO requires ongoing work. Timing varies with competition, the starting condition of the website and profile, and how quickly improvements are completed."],
    ["This section expands the guide with a practical execution plan for local businesses that want better visibility in Google Maps, organic search, and AI-assisted discovery without changing the original title, slug, or core topic.", "The following plan shows how a local business can organise the work over four weeks."],
  ]),
  "local-seo-dubai-how-to-rank-for-near-me-searches-in-2026": new Map([
    ["Dubai near-me SEO in 2026: use one local service page, stronger Google Business Profile signals, and supporting content to win qualified leads.", "Learn how service pages, Google Business Profile information and useful local content can improve visibility for relevant near-me searches in Dubai."],
    ["Direct answer: To rank for near me searches in 2026, Dubai service businesses should combine one conversion-focused local service page, a verified Google Business Profile, and supporting intent-matched content with strong internal links. This framework works best for SMEs that want qualified leads, not just vanity traffic.", "To improve visibility for relevant near-me searches, use a clear local service page, an accurate Google Business Profile and useful supporting content with sensible internal links."],
    ["Google evaluates local visibility using relevance, local fit, and trust. For Dubai-focused businesses, a single generic homepage is usually not enough. You need page-level intent matching plus local proof signals to compete consistently.", "A general homepage may not explain a specific service well enough. Create clear pages that match the service, location and questions a customer is searching for."],
    ["Map each intent cluster to one URL only. If two pages target the same intent, they often cannibalize each other.", "Give each main search need one clear page. Avoid publishing several pages that compete for the same topic."],
    ["Don’t publish generic AI-first text. Add practical proof: mini case examples, real process snapshots, and outcomes tied to client goals. On Media87-style workflows, this means documenting what changed, why it changed, and what impact was observed.", "Do not publish an unreviewed AI draft. Add relevant examples, accurate business details and evidence that a customer can understand."],
    ["Most SMEs see early directional movement in 6-12 weeks, with stronger compounding impact over 3-6 months when service pages, GBP optimization, and supporting content are executed together.", "Timing varies with competition, the starting condition of the website and profile, and how quickly the work is completed."],
    ["For local SEO Dubai campaigns, the winning pattern is simple: one strong intent-matched service page, real GBP quality, credible proof, and supporting internal-link content. Execute this consistently, and near-me visibility tends to improve with lead quality—not just traffic volume.", "A useful local SEO plan connects a clear service page, accurate Google Business Profile information, credible evidence and related content. Measure qualified calls and enquiries as well as visibility."],
  ]),
  "seo-cost-dubai-buyer-guide": new Map([
    ["Learn what drives SEO pricing in Dubai, common package models, realistic AED budget ranges, and how to choose the right SEO partner for measurable growth.", "Understand common SEO pricing models in Dubai, what changes the cost and what to check before accepting a proposal."],
  ]),
  "seo-vs-google-ads-dubai-businesses": new Map([
    ["Compare SEO vs Google Ads for Dubai businesses: cost, speed, ROI, timeline, and when to combine both for stronger lead generation and long-term growth.", "Compare SEO and Google Ads by cost, speed, control, measurement and the situations where using both may be useful."],
  ]),
  "human-like-ai-calling-bots": new Map([
    ["Human-Like AI Calling Bots: Complete Business Guide for 2026.", "AI Calling Bots: Business Guide for 2026"],
    ["AI calling bots are moving from scripted robocalls to voice agents that hold natural conversations, qualify leads, answer questions and route calls to humans when needed. The real value isn't \"replacing people\" — it's handling repetitive call volume faster while your team focuses on high-value conversations.", "AI calling bots can answer approved questions, collect basic information and transfer suitable calls to a person. This guide explains useful cases, limits and review requirements."],
  ]),
  "local-seo-what-it-is-how-to-do-it-complete-2026-guide": new Map([
    ["Local SEO: What It Is &amp; How to Do It (Complete 2026 Guide)", "Local SEO: A Practical Guide for 2026"],
    ["Local SEO is the process of optimizing your online presence so your business appears when people search in a specific location on Google Search, Google Maps, ", "Local SEO helps nearby customers find accurate information about your services, locations and ways to contact your business in Google Search and Maps."],
  ]),
  "top-digital-marketers-in-pakistan": new Map([
    ["Last Reviewed: April 3, 2026", "A review of selected digital marketing professionals in Pakistan and the evidence buyers should check before choosing one."],
  ]),
  "how-to-create-ultra-realistic-human-sound-voice-with-prompting": new Map([
    ["AI voices have improved massively — but most people still use them the wrong way.", "Learn how pacing, pronunciation, emotion and direction can make an AI voice sound more natural."],
  ]),
  "water-mark-remover": new Map([
    ["Watermark-removal software uses selection, healing, cloning, or AI inpainting to estimate the pixels behind a marked area. The result is a reconstructed edit,", "Learn how selection, healing, cloning and AI-assisted tools can remove a watermark from an image you own or have permission to edit."],
  ]),
  "why-chatbots-are-important-for-local-businesses-in-the-uae": new Map([
    ["Why Chatbots Are Important for Local Businesses in the UAE", "Chatbots for Local Businesses in the UAE"],
    ["Customers in the UAE are online all day, moving quickly between WhatsApp, Instagram, Google, and your website. They expect fast answers, in Arabic and English", "Learn how a chatbot can answer common questions, collect enquiry details and transfer complex requests to staff across supported customer channels."],
  ]),
  "ai-video-creation-service": new Map([
    ["Create video with a clear idea, a usable workflow and human review.", "Plan and produce AI-assisted video with human review."],
    ["Media87 plans and produces AI-assisted video concepts, short-form creative, explainers, avatars and campaign adaptations without treating generation as the strategy.", "Media87 plans AI-assisted video concepts, scripts, visuals, editing and platform versions around an approved message and audience."],
    ["AI-assisted production", "AI-assisted video"],
  ]),
  "geo-tagging-images-for-seo": new Map([
    ["WHY — Geo-tagging & local SEO", "Geo-tagging and local SEO"],
    ["Why geo-tag your business images?", "What image geo-tagging can and cannot do"],
    ["Image metadata won't rank a weak page on its own — but it's one of the clearest location signals you can add to a local SEO system.", "GPS metadata can help organise image files, but it is not a substitute for accurate page content, business profiles and local listings."],
    ["Location Relevance", "Organise images by location"],
    ["GPS metadata reinforces where your business operates — supporting the same location signals as your Google Business Profile, citations and local pages.", "GPS metadata records where an image was created or assigned. Use it only when the location is accurate and relevant."],
  ]),
  "authors-team": new Map([
    ["Put real people and review responsibility behind the work.", "Meet the people responsible for Media87 content."],
    ["Media87 author, reviewer and team information with an editorial responsibility model.", "See who writes, reviews and takes responsibility for Media87 website content."],
  ]),
  "editorial-guidelines": new Map([
    ["Useful, attributable and correctable content.", "How Media87 researches, reviews and corrects content."],
    ["Media87 editorial standards for research, authorship, AI assistance, review, sources, corrections and commercial disclosure.", "Our standards for research, authorship, AI assistance, sources, review, corrections and commercial disclosure."],
  ]),
};

function applyMap(value, replacements) {
  let output = value;
  for (const [from, to] of replacements) output = output.replaceAll(from, to);
  return output;
}

function simplifyLabels(html) {
  return html
    .replace(
      />(?:SYS|SVC|PRD|LOG|FAQ)\s*\.?\s*[A-Z0-9_-]+\s+—\s+([^<]+)</gi,
      ">$1<",
    )
    .replace(
      />(?:SYS\.[A-Z0-9]+|SVC\.[A-Z0-9]+|PRD\.[A-Z0-9]+|LOG\.[A-Z0-9]+|FAQ\.[A-Z0-9]+)\s+—\s+([^<]+)</g,
      ">$1<",
    )
    .replace(
      />(?:START|NEXT|SCOPE|PORTFOLIO|BLOG|GUIDE|TOOL|WHO|WHY US|ENGAGE|DEPLOY|RANK|AUDIT|INITIATE|KIOSK MODE)\s+—\s+([^<]+)</g,
      ">$1<",
    )
    .replace(
      /(<span\b[^>]*class="[^"]*\b(?:idx|q-idx)\b[^"]*"[^>]*>)\/?(?:Q\.)?0*(\d+)(<\/span>)/gi,
      "$1$2$3",
    );
}

const articleIntroByRoute = {
  "create-cinematic-style-personal-portfolio":
    "Learn how to plan a personal portfolio homepage with clear content, suitable visuals and restrained motion.",
  "digital-marketing-agency-jlt-dubai":
    "This guide explains the main digital marketing services available to businesses in JLT, Dubai, and what to check before choosing an agency.",
  "email-automated-replies-for-your-customer-service-or-agency":
    "Learn how to use n8n and AI to classify incoming emails, prepare draft replies and keep a person responsible for approval and exceptions.",
  "how-to-add-a-cinematic-profile-photo-to-your-gmail-step-by-step-guide":
    "Follow these steps to prepare a clear profile photo and add it to your Google account for Gmail and other Google services.",
  "how-to-make-ai-ultra-realistic-ads":
    "Learn how to plan more realistic AI advertising images using a clear brief, approved source material and careful visual review.",
  "how-to-automatically-read-classify-and-reply-to-emails-using-ai-step-by-step-n8n-guide":
    "Learn how an n8n automation can classify incoming emails, prepare replies for suitable messages and route uncertain cases to a person.",
  "local-seo-in-2026-practical-playbook-for-dubai-businesses":
    "A practical guide to improving local visibility in Dubai through Google Business Profile, service pages, customer reviews and measurement.",
  "local-seo-what-it-is-how-to-do-it-complete-2026-guide":
    "Local SEO helps nearby customers find accurate information about your services, locations and ways to contact your business in Google Search and Maps.",
  portfolio:
    "Learn what a useful digital portfolio should show, how to organise the work and how to make the next contact step clear.",
  "useful-prompts-for-nano-banana-part-1":
    "A practical collection of image-editing prompts for colour, lighting and atmosphere, with reminders to review the result before use.",
  "water-mark-remover":
    "Learn how selection, healing, cloning and AI-assisted tools can remove a watermark from an image you own or have permission to edit. The software estimates replacement pixels; it does not recover hidden original detail.",
  "why-chatbots-are-important-for-local-businesses-in-the-uae":
    "Learn how a chatbot can answer common questions, collect enquiry details and transfer complex requests to staff across supported customer channels.",
};

const replacementArticleBodyByRoute = {
  "how-to-create-ultra-realistic-human-sound-voice-with-prompting": `
          <p>Learn how pacing, pronunciation, emotion and direction can make an AI voice sound more natural.</p>
          <h2>Start with spoken language</h2>
          <p>A script written for a web page often sounds stiff when read aloud. Use shorter sentences, natural contractions and one clear idea at a time. Read the script yourself before generating the voice; any line that is difficult for you to say will probably sound awkward in the final recording.</p>
          <h2>Give useful performance direction</h2>
          <p>Add only the cues the selected voice tool supports, such as a brief pause, a calmer tone or emphasis on an important word. Keep these directions limited. Too many pauses, emotions or capitalised words can make the result sound theatrical.</p>
          <h2>Check names and pronunciation</h2>
          <p>Test company names, locations, abbreviations and technical terms separately. Use the pronunciation controls available in the tool, or rewrite a difficult word phonetically when the platform allows it.</p>
          <h2>Use a simple production process</h2>
          <p>Prepare the script, generate a short sample, listen on headphones and a phone speaker, correct the weak lines, then generate the final version. Check pace, clarity, unwanted noise, factual accuracy and whether the tone suits the audience.</p>
          <h2>Keep people responsible for the result</h2>
          <p>Use only voices you have permission to use. Do not imitate a real person without consent. A person should approve the script and final recording before it is published in an advertisement, customer message or public campaign.</p>
          <p>Media87 can help plan scripts, AI-assisted voice production, editing and review for approved marketing content.</p>
        `,
  "how-to-make-ai-ultra-realistic-ads": `
          <p>Learn how to plan more realistic AI advertising images using a clear brief, approved source material and careful visual review.</p>
          <h2>Write the advertising brief first</h2>
          <p>Define the product, audience, message, format and action you want the viewer to take. A realistic image is useful only when it supports a clear campaign idea.</p>
          <h2>Use source material you are allowed to use</h2>
          <p>Choose product images, logos, locations and people that your business owns or has permission to edit. Do not place a real person in a false endorsement or misleading situation.</p>
          <h2>Describe the scene clearly</h2>
          <p>Specify the subject, setting, camera angle, lighting, composition, mood and empty space needed for advertising copy. Keep brand colours and required product details separate from optional visual ideas.</p>
          <h2>Generate one controlled variation at a time</h2>
          <p>Change one factor between versions, such as the camera angle or background. This makes it easier to identify which instruction improved the result and avoids a collection of unrelated images.</p>
          <h2>Review the image before publishing</h2>
          <p>Check faces, hands, products, logos, labels, reflections and background details at full size. Confirm that the image does not imply a feature, result or endorsement that the business cannot support. Add any disclosure required by the platform or local rules.</p>
          <p>Media87 can help turn an approved campaign brief into AI-assisted concepts, edited advertising assets and platform-ready versions.</p>
        `,
  "how-to-save-token-cost-and-make-openclaw-secure-with-one-prompt": `
          <p>A practical guide to reducing unnecessary token use, limiting permissions and reviewing an OpenClaw setup before use.</p>
          <h2>Do not rely on one prompt for security</h2>
          <p>A prompt can describe rules, but it cannot replace access controls. Limit the files, credentials, tools and network destinations the agent can reach. Use separate accounts, minimum permissions and approval for important actions.</p>
          <h2>Keep context focused</h2>
          <p>Send only the information required for the current task. Summarise completed work, remove repeated logs and keep durable decisions separate from temporary conversation history. Review summaries before deleting information that may be needed later.</p>
          <h2>Choose models by task</h2>
          <p>Use a smaller or less expensive model for narrow, low-risk work when testing shows that it meets the required quality. Use a more capable model for complex reasoning or high-impact decisions. Actual savings depend on the workload, model prices and retry rate.</p>
          <h2>Protect secrets and sensitive data</h2>
          <p>Store API keys in a secrets manager or protected environment setting, not in prompts, memory files or logs. Redact personal and confidential information before sending context to a model whenever possible.</p>
          <h2>Plan for failure and recovery</h2>
          <p>Keep versioned configuration, backups and tested recovery instructions. Record important actions and stop repeated failures automatically. Review logs for unusual access, permission changes and unexpected tool use.</p>
          <h2>Test before granting more access</h2>
          <p>Begin with a narrow task and read-only permissions. Test expected work, incorrect instructions and failure cases. Add new tools or write access only when the benefit is clear and a person remains responsible for the outcome.</p>
        `,
};

function trimArticleAfterIntro(html, marker, insertion = "") {
  const bodyStart = html.indexOf('<div class="article-body">');
  if (bodyStart < 0) return html;
  const introEnd = html.indexOf("</p>", bodyStart);
  if (introEnd < 0) return html;
  const contentStart = introEnd + 4;
  const markerStart = html.indexOf(marker, contentStart);
  if (markerStart < 0) return html;
  if (html.slice(contentStart, markerStart) === insertion) return html;
  return html.slice(0, contentStart) + insertion + html.slice(markerStart);
}

function applyRouteTransforms(html, route) {
  if (articleIntroByRoute[route]) {
    html = html.replace(
      /(<div class="article-body">\s*)<p>[\s\S]*?<\/p>/,
      `$1<p>${articleIntroByRoute[route]}</p>`,
    );
  }
  if (replacementArticleBodyByRoute[route]) {
    const bodyStartTag = '<div class="article-body">';
    const bodyStart = html.indexOf(bodyStartTag);
    const contentStart = bodyStart + bodyStartTag.length;
    const trustBoxStart = html.indexOf(
      '<aside class="article-trust-box">',
      contentStart,
    );
    const replacement =
      replacementArticleBodyByRoute[route].trimEnd() + "\n          ";
    if (
      bodyStart >= 0 &&
      trustBoxStart > contentStart &&
      html.slice(contentStart, trustBoxStart) !== replacement
    ) {
      html =
        html.slice(0, contentStart) +
        replacement +
        html.slice(trustBoxStart);
    }
  }
  if (route === "email-automated-replies-for-your-customer-service-or-agency") {
    html = trimArticleAfterIntro(
      html,
      "<h2>This n8n workflow turns your inbox into a smart assistant:</h2>",
    );
  }
  if (
    route ===
    "how-to-add-a-cinematic-profile-photo-to-your-gmail-step-by-step-guide"
  ) {
    html = trimArticleAfterIntro(
      html,
      "<p>The word “cinematic” should describe",
    );
  }
  if (route === "how-to-make-linkedin-post-assistant-with-n8n") {
    html = trimArticleAfterIntro(
      html,
      "<p>A LinkedIn post assistant is more useful",
      '<p><a href="https://drive.google.com/file/d/1GSj9Y_GwsACvjFaAWEQ4H-T4bytgiSma/view?usp=sharing" rel="noopener noreferrer">Download the LinkedIn workflow →</a></p>',
    );
  }
  if (
    route ===
    "how-to-automatically-read-classify-and-reply-to-emails-using-ai-step-by-step-n8n-guide"
  ) {
    html = trimArticleAfterIntro(
      html,
      "<p>Before connecting an AI email workflow to a live inbox",
    );
  }
  if (route === "whatsapp-automation-for-restaurants-complete-2025-guide") {
    html = html.replace(
      /<p>Learn how restaurants can use WhatsApp automation for common questions, booking requests, order updates and transfer to staff when needed\.[\s\S]*?(?=<p>For restaurants, the biggest automation wins usually happen before and after the dining experience\.)/,
      "<p>WhatsApp automation can answer common questions, collect booking requests, send order updates and transfer unusual or sensitive cases to staff.</p>",
    );
  }
  return html
    .replace(/<\/a>\s+\./g, "</a>.")
    .replace(/Altaf\s*<\/a>\s*,/g, "Altaf</a>,");
}

function listHtmlFiles(directory) {
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...listHtmlFiles(target));
    else if (entry.name.endsWith(".html")) files.push(target);
  }
  return files;
}

const performanceAssetVersion = "20260728-performance5";

function applyPerformanceAndAccessibilityMarkup(html) {
  html = html
    .replace(
      /<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">\s*/g,
      "",
    )
    .replace(
      /<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin>\s*/g,
      "",
    )
    .replace(
      /<link href="https:\/\/fonts\.googleapis\.com\/css2\?[^"]+" rel="stylesheet">\s*/g,
      '<link rel="preload" href="/assets/fonts/sora-latin.woff2" as="font" type="font/woff2" crossorigin>\n',
    )
    .replace(
      /\/assets\/style\.css(?:\?[^"]*)?/g,
      `/assets/style.css?v=${performanceAssetVersion}`,
    )
    .replace(
      /\/assets\/site-tags\.js(?:\?[^"]*)?/g,
      `/assets/site-tags.js?v=${performanceAssetVersion}`,
    )
    .replace(
      /\/+assets\/main\.js(?:\?[^"]*)?|assets\/main\.js(?:\?[^"]*)?/g,
      `/assets/main.js?v=${performanceAssetVersion}`,
    )
    .replaceAll("/assets/logo-color.png", "/assets/logo-color-405.png")
    .replaceAll("/assets/logo-white.png", "/assets/logo-white-405.png")
    .replaceAll("/assets/logo-color-405.png", "/assets/logo-color-405.webp")
    .replaceAll("/assets/logo-white-405.png", "/assets/logo-white-405.webp")
    .replace(
      /<img class="logo-img" src="\/assets\/logo-color-405\.webp" alt="Media87"(?![^>]*\bwidth=)>/g,
      '<img class="logo-img" src="/assets/logo-color-405.webp" alt="Media87" width="405" height="80">',
    )
    .replace(
      /<img class="logo-img" src="\/assets\/logo-white-405\.webp" alt="Media87"(?![^>]*\bwidth=)>/g,
      '<img class="logo-img" src="/assets/logo-white-405.webp" alt="Media87" width="405" height="80">',
    )
    .replace(
      /<img src="assets\/img\/cz-support\.jpg" alt="([^"]+)" loading="lazy">/g,
      '<img src="assets/img/cz-support.jpg" alt="$1" width="1024" height="1024" loading="lazy">',
    )
    .replace(
      /<img src="assets\/img\/lz-dashboard\.png" alt="([^"]+)" loading="lazy">/g,
      '<img src="assets/img/lz-dashboard.png" alt="$1" width="1024" height="576" loading="lazy">',
    );

  html = html.replace(/<footer>[\s\S]*?<\/footer>/g, (footer) =>
    footer.replaceAll("<h4>", "<h2>").replaceAll("</h4>", "</h2>"),
  );

  if (!/<main(?:\s|>)/i.test(html)) {
    html = html
      .replace(/<\/header>/i, "</header>\n<main>")
      .replace(/<footer>/i, "</main>\n\n<footer>");
  }
  return html;
}

const changedRoutes = [];
for (const file of listHtmlFiles(architectureDir)) {
  const relative = path.relative(architectureDir, file);
  const route =
    relative === "index.html"
      ? ""
      : relative === "404.html"
        ? "404"
        : relative.split(path.sep)[0];
  const original = fs.readFileSync(file, "utf8");
  let revised = applyMap(original, sharedReplacements);
  if (routeReplacements[route]) {
    revised = applyMap(revised, routeReplacements[route]);
  }
  revised = applyRouteTransforms(revised, route);
  revised = simplifyLabels(revised);
  revised = applyPerformanceAndAccessibilityMarkup(revised);
  if (route === "localzen") {
    revised = revised.replace(
      `/assets/main.js?v=${performanceAssetVersion}`,
      "/assets/main.js?v=20260728-localzen3",
    );
  }
  if (revised !== original) {
    fs.writeFileSync(file, revised);
    changedRoutes.push(route || "home");
  }
}

console.log(
  JSON.stringify(
    {
      status: "complete",
      changedPages: changedRoutes.length,
      routes: changedRoutes,
    },
    null,
    2,
  ),
);
