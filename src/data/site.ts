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

export const TRUSTED_BY_PLACEHOLDERS = [
  { name: "Northwind", sector: "Enterprise SaaS" },
  { name: "AlphaEdge", sector: "Cloud Infrastructure" },
  { name: "CoreSignal", sector: "B2B Analytics" },
  { name: "GridPoint", sector: "Industrial Tech" },
  { name: "FusionLabs", sector: "Security Platforms" },
  { name: "PeakFlow", sector: "RevOps Systems" },
] as const;

export const WHO_WE_ARE_METRICS = [
  { value: 15, suffix: "+", label: "Years Experience", detail: "Enterprise research & demand gen expertise" },
  { value: 120, suffix: "+", label: "Countries", detail: "Multi-region coverage for global teams" },
  { value: 4, suffix: "", label: "Global Regions", detail: "Americas, EMEA, APAC & LATAM execution" },
  { value: 95, suffix: "%", label: "Accuracy Goal", detail: "Human-validated contact & role precision" },
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
    dimension: "Data Foundation",
    traditional: "Static databases",
    zbr: "Data-driven intelligence",
  },
  {
    dimension: "Targeting Precision",
    traditional: "Generic lists",
    zbr: "ICP-aligned prospects",
  },
  {
    dimension: "Quality Assurance",
    traditional: "Automated exports",
    zbr: "Human validation",
  },
  {
    dimension: "Stakeholder Depth",
    traditional: "Basic contacts",
    zbr: "Buying-committee mapping",
  },
  {
    dimension: "Campaign Relevance",
    traditional: "Limited personalization",
    zbr: "Smart personalization",
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
    { name: "North America", code: "NAM", hubs: "New York • San Francisco • Toronto" },
    { name: "EMEA", code: "EMEA", hubs: "London • Frankfurt • Amsterdam • Dubai" },
    { name: "Asia-Pacific", code: "APAC", hubs: "Singapore • Sydney • Tokyo • Bengaluru" },
    { name: "Latin America", code: "LATAM", hubs: "São Paulo • Mexico City • Bogotá" },
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
      "Every contact record undergoes structured, human-assisted verification before delivery to protect sender reputation and sales outreach efficiency.",
    bullets: [
      "Triple-verified contacts",
      "Job-title and industry checks",
      "Deduplication",
      "Deliverability testing",
    ],
    href: "/why-zbr",
  },
] as const;

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

