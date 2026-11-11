export type ContentCategory =
  | "All"
  | "ABM Intelligence"
  | "Data Verification"
  | "Compliance & Privacy"
  | "Demand Generation";

export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: Exclude<ContentCategory, "All">;
  readingTime: string;
  status: string;
  publishedLabel: string;
  authorLabel: string;
  sections: Array<{
    heading: string;
    body: string;
  }>;
}

export interface ResourceItem {
  id: string;
  title: string;
  format: string;
  category: Exclude<ContentCategory, "All">;
  summary: string;
  status: string;
}

export const BLOG_CATEGORIES: ContentCategory[] = [
  "All",
  "ABM Intelligence",
  "Data Verification",
  "Compliance & Privacy",
  "Demand Generation",
];

/**
 * Published ZoomBridge Research methodology & governance guides
 * grounded strictly in official wearezbr.com documentation.
 */
export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: "ai-identifies-humans-verify-framework",
    title: "AI Identifies. Humans Verify: Designing Research-Led B2B Pipeline",
    excerpt:
      "How ZoomBridge Research pairs AI signal detection and intent analysis with human validation to support a 95% accuracy goal.",
    category: "Data Verification",
    readingTime: "4 min read",
    status: "Research Methodology",
    publishedLabel: "ZoomBridge Research Methodology Guide",
    authorLabel: "ZoomBridge Research Team",
    sections: [
      {
        heading: "Why Static B2B Databases Fail Revenue Teams",
        body: "Automated exports from static databases decay quickly as decision-makers change roles and organizations restructure. Relying on unverified contact lists increases bounce risk, wastes SDR selling hours, and obscures the full buying committee behind enterprise purchase decisions.",
      },
      {
        heading: "The Four-Stage ZoomBridge Research Model",
        body: "Every engagement pairs speed with human oversight: AI Identifies Ideal Customer Profiles, buying signals, market trends, and account prioritization; AI Analyzes intent data, engagement patterns, and account-fit scores; Humans Validate contact accuracy, decision-maker relevance, and buying-committee structures; and Customers Win with stronger conversion readiness.",
      },
      {
        heading: "Multi-Layer Validation Before CRM Delivery",
        body: "Every dataset passes four core quality checks prior to delivery: triple-verified contact checks, job-title and industry relevance checks, entity deduplication, and pre-campaign deliverability testing across AMER, EMEA, APAC, and LATAM coverage.",
      },
    ],
  },
  {
    slug: "abm-scoring-fit-intent-engagement-guide",
    title: "Structuring Fit, Intent, and Engagement in Modern ABM Scoring",
    excerpt:
      "Prioritizing Target Account Lists into Tier 1, Tier 2, and Tier 3 execution lanes using multi-signal scoring.",
    category: "ABM Intelligence",
    readingTime: "5 min read",
    status: "ABM Framework",
    publishedLabel: "ZoomBridge Research ABM Guide",
    authorLabel: "ZoomBridge Research Team",
    sections: [
      {
        heading: "Moving Beyond Single-Dimension Lead Scores",
        body: "Isolated firmographic fit or single email opens rarely predict enterprise readiness. Combining Fit Scoring (ICP industry, company size, geography, and buying-committee availability), Intent Scoring (active category research and market expansion signals), and Engagement Scoring provides balanced account prioritization.",
      },
      {
        heading: "Aligning Tier 1, Tier 2, and Tier 3 Workflows",
        body: "Tier 1 accounts (Grade A) trigger immediate executive outreach and 1:1 buying-committee mapping. Tier 2 accounts (Grade B) enter targeted multi-touch nurturing and content syndication, while Tier 3 accounts remain monitored on signal watchlists until buying intent crosses activation thresholds.",
      },
    ],
  },
  {
    slug: "privacy-first-b2b-demand-gdpr-ccpa",
    title: "Privacy-First B2B Demand Generation Across GDPR and CCPA",
    excerpt:
      "How research-led demand teams align contact intelligence, consent governance, and data-subject rights with global privacy standards.",
    category: "Compliance & Privacy",
    readingTime: "4 min read",
    status: "Governance Brief",
    publishedLabel: "ZoomBridge Research Privacy Overview",
    authorLabel: "ZoomBridge Research Team",
    sections: [
      {
        heading: "Lawful Basis & Data-Subject Rights Under GDPR",
        body: "For EU and UK personal data, ZoomBridge Research processes business intelligence on a clear lawful basis, honours consent and legitimate-interest requirements, and maintains full workflows for access, rectification, erasure, and objection requests.",
      },
      {
        heading: "Honouring CCPA Transparency & Opt-Out Rights",
        body: "In alignment with California privacy standards, we respect individuals' rights to know what data is held, request deletion, and opt out of the sale or sharing of personal information, with direct opt-out support via info@wearezbr.com.",
      },
    ],
  },
];

export const RESOURCE_ITEMS: ResourceItem[] = [
  {
    id: "res-abm-blueprint",
    title: "Enterprise ABM Scoring & Buying-Committee Guide",
    format: "Methodology Playbook",
    category: "ABM Intelligence",
    summary:
      "How Fit, Intent, and Engagement signals rank Target Account Lists and align Executive, Technical, and Procurement outreach.",
    status: "Available on Request",
  },
  {
    id: "res-data-hygiene",
    title: "Multi-Layer B2B Data Validation Specification",
    format: "Technical QA Brief",
    category: "Data Verification",
    summary:
      "Overview of ZBR's triple-verified contact checks, job-title verification, deduplication, and deliverability testing workflow.",
    status: "Available on Request",
  },
  {
    id: "res-privacy-guide",
    title: "GDPR & CCPA Data Governance Overview",
    format: "Compliance Summary",
    category: "Compliance & Privacy",
    summary:
      "Documentation for legal, security, and procurement teams reviewing ZoomBridge Research data governance and rights handling.",
    status: "Available on Request",
  },
];

export const BLOG_TEMPLATES = BLOG_ARTICLES;
export const RESOURCE_TEMPLATES = RESOURCE_ITEMS;

export function getBlogBySlug(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find((a) => a.slug === slug);
}
