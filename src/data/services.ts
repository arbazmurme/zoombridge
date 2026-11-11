export interface ServiceProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ServiceDetail {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  summary: string;
  overview: string;
  iconName:
    | "Mail"
    | "Target"
    | "Share2"
    | "UserSearch"
    | "TrendingUp"
    | "DatabaseZap";
  accentColor: string;
  highlights: string[];
  deliverables: string[];
  benefits: Array<{ title: string; description: string }>;
  process: ServiceProcessStep[];
  useCases: Array<{ title: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
  relatedSlugs: string[];
  engagementNote: string;
}

export const SERVICES: ServiceDetail[] = [
  {
    slug: "email-marketing",
    title: "Email Marketing",
    shortTitle: "Email Marketing",
    tagline: "Precision outreach engineered for decision-maker engagement.",
    summary:
      "Drive meaningful conversations with targeted outreach powered by audience intelligence and human-verified data.",
    overview:
      "Drive meaningful conversations with targeted outreach powered by audience intelligence and human-verified data. We analyse ICP, buying signals, industry trends, and prospect behaviour to reach the right decision-maker at the right time.",
    iconName: "Mail",
    accentColor: "#1E5EFF",
    highlights: [
      "ICP development & persona identification",
      "Hyper-personalised multi-step sequences",
      "Human-verified contact data & deliverability optimization",
    ],
    deliverables: [
      "ICP development",
      "Persona identification",
      "Hyper-personalised email content",
      "Buying-intent analysis",
      "Email deliverability optimization",
      "Multi-step outreach sequences",
      "Human-verified contact data",
      "Performance analytics & optimization",
    ],
    benefits: [
      {
        title: "Protected Sender Reputation",
        description:
          "Email deliverability optimization and triple-verified contact checks minimize bounce risk and protect sender score.",
      },
      {
        title: "ICP-Aligned Segmentation",
        description:
          "Multi-step outreach sequences are structured around ICP development, persona identification, and buying-intent analysis.",
      },
      {
        title: "Human-Verified Contact Data",
        description:
          "Job-title and company checks confirm your outreach reaches active decision-makers and budget holders.",
      },
    ],
    process: [
      {
        step: "01",
        title: "ICP & Persona Development",
        description:
          "Define target industries, geographies, company sizes, and decision-maker personas.",
      },
      {
        step: "02",
        title: "Buying-Intent & Data Verification",
        description:
          "Pair buying-intent analysis with human-verified contact data and deliverability testing.",
      },
      {
        step: "03",
        title: "Hyper-Personalised Sequencing",
        description:
          "Deploy tailored, multi-step outreach sequences aligned to account context and industry trends.",
      },
      {
        step: "04",
        title: "Performance Analytics & Optimization",
        description:
          "Monitor prospect behaviour and optimize sequences to route qualified conversations to your sales team.",
      },
    ],
    useCases: [
      {
        title: "Executive Pipeline Activation",
        description:
          "Reach VPs, Directors, and C-suite stakeholders across priority enterprise territories.",
      },
      {
        title: "Product Launch & Expansion Campaigns",
        description:
          "Introduce new enterprise capabilities to segmented ICP cohorts across global regions.",
      },
    ],
    faqs: [
      {
        question: "How do you maintain high email deliverability?",
        answer:
          "Every contact list undergoes deduplication, job-title verification, and multi-layer deliverability testing prior to deployment.",
      },
      {
        question: "How is Email Marketing priced?",
        answer:
          "Contact for Pricing — scope depends on target segment size, regions, and campaign cadence.",
      },
    ],
    relatedSlugs: ["account-based-marketing", "contact-discovery", "data-enrichment"],
    engagementNote:
      "Every Email Marketing engagement is tailored to your ICP, target geographies, and buyer personas. Request sample data for your segment via our strategy call form.",
  },
  {
    slug: "account-based-marketing",
    title: "Account-Based Marketing",
    shortTitle: "ABM",
    tagline: "Orchestrate multi-touch demand across high-value target accounts.",
    summary:
      "Target the accounts most likely to convert with AI-powered account scoring and buying-committee intelligence.",
    overview:
      "Target the accounts most likely to convert with AI-powered account scoring and buying-committee intelligence. We score and rank Target Account Lists using intent and firmographic signals, then build personalised engagement that accelerates enterprise pipeline.",
    iconName: "Target",
    accentColor: "#22D3EE",
    highlights: [
      "AI-powered TAL scoring & account prioritization",
      "Buying-committee mapping & stakeholder identification",
      "Intent-signal analysis & personalised ABM campaigns",
    ],
    deliverables: [
      "AI-powered TAL scoring",
      "Account prioritization models",
      "Buying-committee mapping",
      "Stakeholder identification",
      "Intent-signal analysis",
      "Opportunity ranking",
      "Personalised ABM campaigns",
      "Pipeline acceleration strategy",
    ],
    benefits: [
      {
        title: "Budget Focused on Priority Accounts",
        description:
          "Concentrate sales and marketing spend on opportunity-ranked accounts showing both strong ICP fit and active intent.",
      },
      {
        title: "Multi-Stakeholder Coverage",
        description:
          "Engage Executive Leadership, Technical Buyers, and Procurement Teams across mapped buying committees.",
      },
      {
        title: "Sales & Marketing Alignment",
        description:
          "Shared account tiers and verified stakeholder intelligence accelerate pipeline execution.",
      },
    ],
    process: [
      {
        step: "01",
        title: "AI-Powered TAL Scoring",
        description:
          "Score and prioritize Target Account Lists against firmographic and ICP signals.",
      },
      {
        step: "02",
        title: "Intent-Signal & Opportunity Ranking",
        description:
          "Overlay intent signals and engagement patterns to rank Tier 1, Tier 2, and Tier 3 accounts.",
      },
      {
        step: "03",
        title: "Buying-Committee Mapping",
        description:
          "Identify and verify decision-makers, technical evaluators, and budget holders inside target accounts.",
      },
      {
        step: "04",
        title: "Personalised ABM Activation",
        description:
          "Execute multi-touch engagement strategies designed to accelerate enterprise pipeline.",
      },
    ],
    useCases: [
      {
        title: "Enterprise Named-Account Pursuit",
        description:
          "Penetrate strategic global accounts with coordinated messaging across multiple business units.",
      },
      {
        title: "ABM Scoring Activation",
        description:
          "Pair our ABM Scoring Engine methodology with verified stakeholder outreach.",
      },
    ],
    faqs: [
      {
        question: "Do you work with our existing target account list?",
        answer:
          "Yes. We can enrich, map, and score your existing Target Account List or build an ICP-aligned list from scratch.",
      },
      {
        question: "What is the pricing for ABM programs?",
        answer:
          "Contact for Pricing — customized to account tier volume, regions, and channel mix.",
      },
    ],
    relatedSlugs: ["lead-generation", "contact-discovery", "content-syndication"],
    engagementNote:
      "Explore our interactive Fit, Intent & Engagement methodology on /abm-scoring, or book a strategy call to score a sample of your Target Account List.",
  },
  {
    slug: "content-syndication",
    title: "Content Syndication",
    shortTitle: "Content Syndication",
    tagline: "Put your research and thought leadership in front of active buyers.",
    summary:
      "Extend the reach of your thought-leadership content through precise audience targeting and engagement analytics.",
    overview:
      "Extend the reach of your thought-leadership content through precise audience targeting and engagement analytics. We distribute your whitepapers, reports, and webinars to highly relevant audiences, maximising consumption and lead quality.",
    iconName: "Share2",
    accentColor: "#8B5CF6",
    highlights: [
      "Audience segmentation & intent-based targeting",
      "Whitepaper promotion & webinar registrations",
      "MQL generation with multi-channel attribution",
    ],
    deliverables: [
      "Audience segmentation",
      "Intent-based targeting",
      "Content performance analytics",
      "Whitepaper promotion",
      "Webinar registrations",
      "MQL generation",
      "Multi-channel distribution",
      "Campaign attribution tracking",
    ],
    benefits: [
      {
        title: "Qualified Asset Engagement",
        description:
          "Deliver whitepapers, reports, and webinars to Directors, VPs, and technical evaluators inside your ICP.",
      },
      {
        title: "Human-Validated MQLs",
        description:
          "Every syndicated lead passes job-title, industry, deduplication, and deliverability verification.",
      },
      {
        title: "Multi-Region Distribution",
        description:
          "Extend distribution across 120+ countries spanning AMER, EMEA, APAC, and LATAM.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Audience Segmentation",
        description:
          "Align your whitepapers, reports, and webinars to exact industry, seniority, and buyer personas.",
      },
      {
        step: "02",
        title: "Intent-Based Distribution",
        description:
          "Promote gated assets across multi-channel B2B touchpoints with GDPR and CCPA alignment.",
      },
      {
        step: "03",
        title: "Human Data Validation",
        description:
          "Verify contact accuracy, role relevance, and account fit before delivery.",
      },
      {
        step: "04",
        title: "Attribution & MQL Handoff",
        description:
          "Deliver deduplicated MQLs with content performance analytics and attribution tracking.",
      },
    ],
    useCases: [
      {
        title: "Whitepaper & Report Demand Scaling",
        description:
          "Build consistent, ICP-aligned demand around flagship research reports and buyer guides.",
      },
      {
        title: "Webinar & Virtual Event Registrations",
        description:
          "Drive verified executive and technical attendance across target industries and regions.",
      },
    ],
    faqs: [
      {
        question: "Are syndicated leads checked before delivery?",
        answer:
          "Yes. Every record undergoes job-title and industry checks, deduplication, and deliverability validation.",
      },
      {
        question: "How is Content Syndication priced?",
        answer:
          "Contact for Pricing — structured around target criteria, volume, and geographies.",
      },
    ],
    relatedSlugs: ["lead-generation", "account-based-marketing", "email-marketing"],
    engagementNote:
      "Distribution mixes, content formats, and regional MQL targets are scoped directly around your campaign goals during consultation.",
  },
  {
    slug: "contact-discovery",
    title: "Contact Discovery",
    shortTitle: "Contact Discovery",
    tagline: "Uncover verified decision-makers and full buying committees.",
    summary:
      "Identify hard-to-find decision-makers faster through structured research and human validation.",
    overview:
      "Identify hard-to-find decision-makers faster through structured research and human validation. We uncover organizational structures, buying committees, and key influencers across your target accounts.",
    iconName: "UserSearch",
    accentColor: "#3B7BFF",
    highlights: [
      "Executive contact research & organizational mapping",
      "Buying-committee discovery across target accounts",
      "Human quality validation for 95% accuracy goal",
    ],
    deliverables: [
      "Executive contact research",
      "Buying-committee discovery",
      "Organizational mapping",
      "Data intelligence research",
      "Decision-maker identification",
      "Contact verification",
      "Global market coverage",
      "Human quality validation",
    ],
    benefits: [
      {
        title: "Reach True Budget Holders",
        description:
          "Go beyond generic lists to pinpoint Executive Leadership, VPs, Directors, Technical Buyers, and Procurement Teams.",
      },
      {
        title: "Organizational Mapping",
        description:
          "Uncover buying committees, functional hierarchies, and regional business units accurately.",
      },
      {
        title: "Structured Human Validation",
        description:
          "Every contact is researched and validated specifically for your brief rather than pulled from stale exports.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Target Account & Role Blueprint",
        description:
          "Define target accounts and the decision-maker personas required per account.",
      },
      {
        step: "02",
        title: "Data Intelligence Research",
        description:
          "Identify candidate profiles and organizational structures across global business sources.",
      },
      {
        step: "03",
        title: "Human Quality Validation",
        description:
          "Verify current role, department relevance, and contact details against our multi-layer checks.",
      },
      {
        step: "04",
        title: "Sales-Ready Account Delivery",
        description:
          "Deliver clean, deduplicated buying-committee intelligence formatted for your CRM and ABM workflows.",
      },
    ],
    useCases: [
      {
        title: "Strategic Account Penetration",
        description:
          "Equip sales teams with verified buying committees for priority named accounts.",
      },
      {
        title: "Global Market Coverage",
        description:
          "Discover local decision-makers across AMER, EMEA, APAC, and LATAM.",
      },
    ],
    faqs: [
      {
        question: "Can we request sample data for our ICP?",
        answer:
          "Yes. Request sample data via our strategy call form so you can inspect data quality first-hand.",
      },
      {
        question: "How is Contact Discovery priced?",
        answer:
          "Contact for Pricing — scoped by account volume, persona depth, and regions.",
      },
    ],
    relatedSlugs: ["data-enrichment", "account-based-marketing", "lead-generation"],
    engagementNote:
      "Request a custom sample of verified decision-maker records matched to your exact target account and role criteria.",
  },
  {
    slug: "lead-generation",
    title: "Lead Generation",
    shortTitle: "Lead Generation",
    tagline: "Turn verified intent into predictable, sales-ready pipeline.",
    summary:
      "Generate high-quality pipeline through intelligent prospect discovery, qualification, and human research.",
    overview:
      "Generate high-quality pipeline through intelligent prospect discovery and qualification. We continuously analyse firmographic, demographic, and intent data to find prospects that match your ICP, validated by human research.",
    iconName: "TrendingUp",
    accentColor: "#1E5EFF",
    highlights: [
      "ICP-based prospect identification & intent monitoring",
      "Predictive lead scoring & sales-ready delivery",
      "Data-quality validation across multi-channel prospecting",
    ],
    deliverables: [
      "ICP-based prospect identification",
      "Intent-signal monitoring",
      "Predictive lead scoring",
      "Sales-ready lead delivery",
      "Multi-channel prospecting",
      "Pipeline building",
      "Data-quality validation",
      "Performance optimization",
    ],
    benefits: [
      {
        title: "Higher Sales Acceptance",
        description:
          "Deliver prospects matched to your ICP and validated by human researchers, reducing SDR qualification overhead.",
      },
      {
        title: "Intent-Driven Timing",
        description:
          "Combine firmographic, demographic, and intent-signal monitoring to reach active buyers earlier.",
      },
      {
        title: "Privacy-First Execution",
        description:
          "Built around GDPR and CCPA compliance standards across every prospect touchpoint.",
      },
    ],
    process: [
      {
        step: "01",
        title: "ICP & Pipeline Alignment",
        description:
          "Align firmographic, demographic, and qualification criteria with your revenue objectives.",
      },
      {
        step: "02",
        title: "Intent & Predictive Scoring",
        description:
          "Monitor buying signals and prioritize high-propensity prospects.",
      },
      {
        step: "03",
        title: "Multi-Channel Prospecting & Validation",
        description:
          "Engage decision-makers and run human data-quality checks before handoff.",
      },
      {
        step: "04",
        title: "Sales-Ready Delivery & Optimization",
        description:
          "Deliver qualified leads and continuously refine targeting based on feedback.",
      },
    ],
    useCases: [
      {
        title: "Enterprise SDR Pipeline Support",
        description:
          "Supply outbound and field sales teams with verified, ICP-matched prospects.",
      },
      {
        title: "Vertical-Specific Demand Campaigns",
        description:
          "Target specialized B2B industries with tailored value propositions and role filtering.",
      },
    ],
    faqs: [
      {
        question: "What differentiates ZBR lead generation from standard lead vendors?",
        answer:
          "Instead of automated exports from static lists, we combine AI intent analysis with human validation and buying-committee mapping.",
      },
      {
        question: "How is Lead Generation priced?",
        answer:
          "Contact for Pricing — tailored to qualification criteria and target markets.",
      },
    ],
    relatedSlugs: ["account-based-marketing", "content-syndication", "email-marketing"],
    engagementNote:
      "Lead qualification filters, SLA turnaround, and regional delivery rules are customized per campaign during your strategy call.",
  },
  {
    slug: "data-enrichment",
    title: "Data Enrichment",
    shortTitle: "Data Enrichment",
    tagline: "Transform decaying CRM records into accurate revenue intelligence.",
    summary:
      "Transform incomplete and outdated records into actionable business intelligence with matching, validation, and normalization.",
    overview:
      "Transform incomplete and outdated records into actionable business intelligence. Our enrichment process uses automated matching, validation, and normalization to improve accuracy and uncover missing contact and company information.",
    iconName: "DatabaseZap",
    accentColor: "#22D3EE",
    highlights: [
      "Automated validation, standardization & deduplication",
      "Contact & company intelligence enhancement",
      "Technographic insights & continuous data refresh",
    ],
    deliverables: [
      "Automated data validation",
      "Contact information enrichment",
      "Company intelligence enhancement",
      "Data standardization",
      "Duplicate removal",
      "CRM data cleansing",
      "Technographic insights",
      "Continuous data refresh",
    ],
    benefits: [
      {
        title: "Eliminate CRM Decay",
        description:
          "Duplicate removal, CRM data cleansing, and deliverability checks remove stale records before they impact outreach.",
      },
      {
        title: "Complete Account Intelligence",
        description:
          "Append missing contact information, company attributes, and technographic insights for accurate routing and scoring.",
      },
      {
        title: "Continuous Refresh Readiness",
        description:
          "Standardized taxonomies keep territory planning, lead routing, and ABM scoring consistently reliable.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Database Audit & Gap Analysis",
        description:
          "Assess completeness, duplicates, and outdated roles across your existing CRM records.",
      },
      {
        step: "02",
        title: "Automated Matching & Standardization",
        description:
          "Normalize company records, industry classifications, and job titles.",
      },
      {
        step: "03",
        title: "Human Verification & Technographics",
        description:
          "Enrich missing decision-maker details and company intelligence with human-assisted QA.",
      },
      {
        step: "04",
        title: "Clean Delivery & Ongoing Refresh",
        description:
          "Deliver deduplicated, validated records formatted cleanly for CRM re-integration.",
      },
    ],
    useCases: [
      {
        title: "Pre-Campaign CRM Cleansing",
        description:
          "Cleanse legacy prospect lists prior to major product or regional outreach.",
      },
      {
        title: "ABM Territory Readiness",
        description:
          "Ensure account fit and scoring models operate on verified firmographic and technographic inputs.",
      },
    ],
    faqs: [
      {
        question: "What checks are included in Data Enrichment?",
        answer:
          "Our multi-layer validation covers triple-verified contacts, job-title and industry checks, deduplication, and deliverability testing.",
      },
      {
        question: "How is Data Enrichment priced?",
        answer:
          "Contact for Pricing — based on record volume and required enrichment attributes.",
      },
    ],
    relatedSlugs: ["contact-discovery", "account-based-marketing", "email-marketing"],
    engagementNote:
      "CRM schema field mapping and enrichment attribute sets are tailored to your target fields and compliance requirements during onboarding.",
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
