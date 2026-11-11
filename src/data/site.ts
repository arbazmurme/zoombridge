export interface NavLinkItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

export const SITE_INFO = {
  name: "ZoomBridge Research",
  shortName: "ZBR",
  tagline: "Smarter Revenue Growth for B2B Teams.",
  domain: "wearezbr.com",
  email: "sales@wearezbr.com",
  privacyEmail: "info@wearezbr.com",
  linkedin: "https://www.linkedin.com/company/zoombridge-research/",
  turnaround: "< 24h",
  pricingLabel: "Contact for Pricing",
  copyright: "© 2026 ZoomBridge Research. All rights reserved.",
  footerDescription:
    "Research-led B2B demand generation & market intelligence. We connect enterprise revenue teams to verified decision-makers, turning multi-touch intent into predictable, high-value pipeline.",
};

export const HEADER_LINKS: NavLinkItem[] = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Why ZBR", href: "/why-zbr" },
  { label: "Contact", href: "/contact" },
  { label: "ABM Scoring", href: "/abm-scoring" },
];

export const TRUST_INDICATORS = [
  "GDPR & CCPA-ready",
  "Human-verified intent",
  "Decision-makers only",
] as const;

/**
 * Official B2B industries supported by ZoomBridge Research (from wearezbr.com/about).
 */
export const SUPPORTED_INDUSTRIES = [
  { name: "SaaS", sector: "Enterprise & B2B Software" },
  { name: "Information Technology", sector: "IT Infrastructure & Systems" },
  { name: "Cybersecurity", sector: "Security & Risk Platforms" },
  { name: "Cloud Computing", sector: "Cloud & Platform Engineering" },
  { name: "Artificial Intelligence", sector: "AI & Data Intelligence" },
  { name: "Manufacturing", sector: "Industrial & Production" },
  { name: "Healthcare", sector: "HealthTech & Medical" },
  { name: "Financial Services", sector: "FinTech & Banking" },
  { name: "Telecommunications", sector: "Carrier & Network Systems" },
  { name: "Professional Services", sector: "Consulting & Advisory" },
  { name: "Education", sector: "EdTech & Higher Education" },
  { name: "Retail & eCommerce", sector: "Digital Commerce" },
  { name: "Logistics", sector: "Supply Chain & Mobility" },
  { name: "HR Technology", sector: "Workforce & Talent Platforms" },
] as const;

export const WHO_WE_ARE_METRICS = [
  { value: 15, suffix: "+", label: "Years Experience", detail: "Deep expert capability across global B2B demand generation" },
  { value: 120, suffix: "+", label: "Countries", detail: "Global audience reach across every major region" },
  { value: 4, suffix: "", label: "Global Regions", detail: "AMER, EMEA, APAC, and LATAM coverage" },
  { value: 95, suffix: "%", label: "Accuracy Goal", detail: "Quality baseline maintained through human validation" },
] as const;

export interface WhyStage {
  step: string;
  title: string;
  subtitle: string;
  accent: "blue" | "cyan" | "purple" | "emerald";
  bullets: string[];
}

export const WHY_ZOOMBRIDGE_STAGES: WhyStage[] = [
  {
    step: "01",
    title: "AI Identifies",
    subtitle: "Signal detection at scale",
    accent: "blue",
    bullets: [
      "Ideal Customer Profiles",
      "Buying signals",
      "Market trends",
      "Account prioritization",
    ],
  },
  {
    step: "02",
    title: "AI Analyzes",
    subtitle: "Deep scoring & pattern synthesis",
    accent: "cyan",
    bullets: [
      "Intent data",
      "Engagement patterns",
      "Account-fit scores",
      "Pipeline opportunities",
    ],
  },
  {
    step: "03",
    title: "Humans Validate",
    subtitle: "Research-grade manual verification",
    accent: "purple",
    bullets: [
      "Contact accuracy",
      "Decision-maker relevance",
      "Buying-committee structures",
      "Data quality",
    ],
  },
  {
    step: "04",
    title: "Customers Win",
    subtitle: "Predictable pipeline outcomes",
    accent: "emerald",
    bullets: [
      "Higher response rates",
      "Better conversion rates",
      "Faster pipeline growth",
      "Lower acquisition cost",
    ],
  },
];

export const MISSION_VISION = {
  mission: {
    label: "Our Mission",
    statement:
      "To empower businesses with data-driven intelligence, accurate data, and targeted demand-generation solutions that drive meaningful business growth.",
  },
  vision: {
    label: "Our Vision",
    statement:
      "To become a trusted global partner for organizations seeking smarter, data-driven ways to connect with their ideal customers and accelerate revenue.",
  },
} as const;

export const ADVANTAGE_COMPARISON = [
  {
    dimension: "Core Value",
    traditional: "Deliver data",
    zbr: "Deliver business intelligence",
  },
  {
    dimension: "Data Sourcing",
    traditional: "Standardized databases",
    zbr: "Customized research solutions",
  },
  {
    dimension: "Client Relationship",
    traditional: "Transaction-based engagement",
    zbr: "Strategic long-term partnership",
  },
  {
    dimension: "Prospect Targeting",
    traditional: "Generic prospect lists",
    zbr: "ICP-driven, business-specific targeting",
  },
  {
    dimension: "Quality Assurance",
    traditional: "Automated exports",
    zbr: "Human validation & QA review",
  },
  {
    dimension: "Methodology",
    traditional: "Data-first approach",
    zbr: "Strategy-first approach",
  },
  {
    dimension: "Optimization",
    traditional: "One-time delivery",
    zbr: "Continuous collaboration & optimization",
  },
] as const;

export const GLOBAL_REACH = {
  heading: "We connect you directly with budget holders.",
  metrics: [
    { value: 50, suffix: "M+", label: "Verified Professional Records" },
    { value: 120, suffix: "+", label: "Countries Supported Globally" },
  ],
  decisionMakers: [
    "Executive Leadership",
    "Vice Presidents",
    "Directors",
    "Managers",
    "Technical Buyers",
    "Procurement Teams",
    "Marketing & Sales Leaders",
  ],
  regions: [
    { name: "Americas", code: "AMER", scope: "Enterprise & mid-market B2B coverage" },
    { name: "EMEA", code: "EMEA", scope: "GDPR-aligned UK, EU & regional execution" },
    { name: "Asia-Pacific", code: "APAC", scope: "Multi-market APAC account intelligence" },
    { name: "Latin America", code: "LATAM", scope: "Regional decision-maker & ABM outreach" },
  ],
} as const;

export const COMPLIANCE_PILLARS = [
  {
    id: "gdpr",
    badge: "GDPR",
    title: "General Data Protection Regulation",
    description:
      "We process EU and UK personal data on a lawful basis, honour consent and legitimate-interest requirements, and support data-subject rights including access, correction, and erasure.",
    href: "/gdpr",
  },
  {
    id: "ccpa",
    badge: "CCPA",
    title: "California Consumer Privacy Act",
    description:
      "We respect California residents' rights to know what data is held, to request deletion, and to opt out of the sale or sharing of personal information.",
    href: "/ccpa",
  },
  {
    id: "verified",
    badge: "Verified",
    title: "Multi-layer Data Validation",
    description:
      "Triple-verified contacts, job-title and industry checks, deduping, and deliverability testing keep your CRM and sender score clean.",
    bullets: [
      "Triple-verified contacts",
      "Job-title and industry checks",
      "Deduplication",
      "Deliverability testing",
    ],
    href: "/why-zbr",
  },
] as const;

export const ABOUT_STORY = {
  badge: "Our Story",
  heading: "Why we started ZoomBridge.",
  paragraphs: [
    "In today's competitive B2B landscape, finding accurate business data has become increasingly challenging. Organizations often struggle with outdated databases, low-quality leads, and generic prospect lists that waste valuable sales time.",
    "ZoomBridge Research was established to solve this challenge. With over 15 years of industry experience, our team recognized that successful prospecting requires more than automation. While AI can process vast amounts of information, human expertise remains essential for validating, enriching, and understanding complex business relationships.",
    "By combining AI-powered research with human intelligence, we provide businesses with data they can trust — helping them reach the right prospects, improve campaign performance, and generate meaningful business conversations.",
  ],
  missionQuote:
    "To empower sales and marketing teams with reliable research, verified data, and intelligent solutions that accelerate growth and create long-term business relationships.",
} as const;

export const ABOUT_DIFFERENCE = [
  {
    title: "AI-Powered Research",
    description:
      "We leverage advanced AI technologies to accelerate market research, identify buying signals, build accurate Ideal Customer Profiles (ICPs), and analyze target markets faster than traditional methods.",
  },
  {
    title: "Human Verification",
    description:
      "Technology alone isn't enough. Every dataset undergoes multiple quality checks performed by experienced researchers who verify company information, decision-makers, contact details, and account relevance before delivery.",
  },
  {
    title: "Tailored Research",
    description:
      "Every client has different goals. Instead of selling generic databases, we create customized research projects aligned with your industry, target market, technology stack, company size, geography, and buying personas.",
  },
  {
    title: "Enterprise Quality",
    description:
      "Our focus isn't quantity. Our focus is delivering accurate, relevant, and sales-ready intelligence that your teams can immediately use.",
  },
] as const;

export const ABOUT_CORE_VALUES = [
  {
    title: "Accuracy",
    tagline: "Reliable Data. Smarter Decisions.",
    description:
      "Accuracy is at the heart of everything we do. We ensure every dataset, contact, and market insight is thoroughly researched and verified, enabling our clients to make informed business decisions with confidence.",
  },
  {
    title: "Innovation",
    tagline: "Driven by AI. Strengthened by Human Expertise.",
    description:
      "We embrace innovation by combining AI-powered research with experienced human intelligence. This balanced approach allows us to deliver smarter insights, faster execution, and continuously evolving solutions for our clients.",
  },
  {
    title: "Integrity",
    tagline: "Built on Trust and Transparency.",
    description:
      "We are committed to ethical research practices, transparent communication, and responsible data handling. Every project is delivered with honesty, accountability, and a strong focus on compliance and client trust.",
  },
  {
    title: "Partnership",
    tagline: "Your Goals Are Our Priority.",
    description:
      "We believe in building long-term relationships, not just completing projects. By working as an extension of our clients' teams, we deliver tailored solutions that support their growth and contribute to their long-term success.",
  },
  {
    title: "Excellence",
    tagline: "Quality Without Compromise.",
    description:
      "We are dedicated to delivering exceptional results in every engagement. Through rigorous quality standards, attention to detail, and a commitment to continuous improvement, we consistently provide value that exceeds expectations.",
  },
] as const;

export const WHY_ZBR_CONTENT = {
  quote:
    "We don't measure success by the number of records we deliver. We measure it by the opportunities we help create, the conversations we help start, and the long-term value we bring to your business.",
  difference: [
    {
      title: "We Start with Your Business, Not Your Requirements",
      description:
        "Many providers begin by asking what data you need. We begin by understanding why you need it — your business model, target market, ICP, sales objectives, and expansion plans.",
    },
    {
      title: "Intelligence Over Information",
      description:
        "Information is everywhere. Actionable intelligence is rare. Every project is designed to provide context, relevance, and insight rather than overwhelming your team with volume.",
    },
    {
      title: "Human Expertise Enhanced by Artificial Intelligence",
      description:
        "AI accelerates discovery, pattern recognition, and data processing, while our specialists validate findings, enrich information, and apply business context.",
    },
    {
      title: "Tailored Research for Every Business",
      description:
        "No two organizations share the same market, customers, or growth objectives. Every engagement is customized around your industry, audience, geography, and buyer personas.",
    },
    {
      title: "Quality That Inspires Confidence",
      description:
        "Our QA process is embedded into every stage of the workflow — from initial research through verification, validation, and final review.",
    },
    {
      title: "A Partner That Grows with You",
      description:
        "As your markets expand and your strategies mature, we continuously adapt our approach — valued as much for responsiveness and flexibility as for data quality.",
    },
  ],
  approach: [
    {
      step: "01",
      title: "Understand Before We Execute",
      description:
        "Every successful project starts with listening. We invest time in understanding your business goals, target audience, challenges, and growth plans before recommending a solution.",
    },
    {
      step: "02",
      title: "Research with Purpose",
      description:
        "Every account, contact, and market insight we deliver is backed by a clear objective — intelligence that supports strategic decision-making.",
    },
    {
      step: "03",
      title: "Verify with Precision",
      description:
        "Quality is built through discipline. Our structured validation process ensures the information we provide is accurate, relevant, and ready for business development.",
    },
    {
      step: "04",
      title: "Deliver Measurable Value",
      description:
        "Research should generate outcomes, not just reports. Our deliverables are designed to improve campaign performance, strengthen prospect engagement, and accelerate revenue growth.",
    },
  ],
  principles: [
    {
      title: "Strategic Thinking",
      description:
        "We align every engagement with your business objectives to ensure our work contributes to long-term success, not just immediate deliverables.",
    },
    {
      title: "Collaboration",
      description:
        "By working as an extension of your team, we create solutions that are better aligned and easier to execute.",
    },
    {
      title: "Accountability",
      description:
        "We take ownership of every project, maintaining transparency, consistency, and a commitment to delivering on our promises.",
    },
    {
      title: "Continuous Innovation",
      description:
        "Markets evolve rapidly, and so do we. We continuously refine our methodologies and adopt emerging technologies so clients stay ahead of change.",
    },
    {
      title: "Long-Term Partnership",
      description:
        "We earn your trust through consistent quality, reliable support, and measurable business value — partnerships that grow stronger over time.",
    },
  ],
  promise:
    "We promise to deliver more than research. We deliver clarity where there is uncertainty, intelligence where there is information overload, and strategic insight where business decisions matter most.",
} as const;

export interface FaqItem {
  question: string;
  answer: string;
  category: "Data Accuracy" | "Verification" | "Turnaround" | "Services" | "Compliance" | "ABM Scoring";
}

export const CORE_FAQS: FaqItem[] = [
  {
    question: "How does ZoomBridge Research verify contact and account data?",
    answer:
      "We pair AI signal identification and account scoring with human research validation. Every contact record goes through multi-layer validation including triple-verified contact checks, job-title and industry checks, deduplication, and deliverability testing to support our 95% accuracy goal.",
    category: "Verification",
  },
  {
    question: "What makes your data accuracy different from static B2B databases?",
    answer:
      "Static databases rely on periodic automated scrapes that decay quickly. ZoomBridge Research combines continuous data intelligence with human verification and buying-committee mapping tailored specifically to your Ideal Customer Profile.",
    category: "Data Accuracy",
  },
  {
    question: "What is the typical turnaround time for inquiries and sample data?",
    answer:
      "We respond to inquiries within one business day (under 24 hours turnaround for initial consultation and segment scoping). Sample data timelines depend on ICP complexity and target geography, which we confirm on your strategy call.",
    category: "Turnaround",
  },
  {
    question: "Which B2B demand generation services do you provide?",
    answer:
      "Our core services include Email Marketing, Account-Based Marketing (ABM), Content Syndication, Contact Discovery, Lead Generation, and Data Enrichment, alongside our ABM Scoring Engine methodology.",
    category: "Services",
  },
  {
    question: "How does ZoomBridge Research align with GDPR and CCPA?",
    answer:
      "We are built privacy-first by default. For GDPR, we process EU and UK personal data on a lawful basis, honour consent and legitimate-interest requirements, and support access, correction, and erasure rights. For CCPA, we respect California residents' rights to know, request deletion, and opt out of sale or sharing.",
    category: "Compliance",
  },
  {
    question: "How does ABM Scoring help prioritize enterprise accounts?",
    answer:
      "ABM Scoring combines Fit Scoring (firmographic and technographic ICP alignment), Intent Scoring (active research and buying signals), and Engagement Scoring (multi-touch campaign interactions) to classify accounts into Tier 1, Tier 2, and Tier 3 priority levels.",
    category: "ABM Scoring",
  },
  {
    question: "How is ZoomBridge Research pricing structured?",
    answer:
      "Contact for Pricing. Because every enterprise team has distinct ICP criteria, target geographies, buying-committee depth, and campaign volume requirements, we scope custom engagements after a strategy call.",
    category: "Services",
  },
];
