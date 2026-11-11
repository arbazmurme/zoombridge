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
  status: "CMS Placeholder Template";
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
  status: "CMS-Ready Placeholder";
}

export const BLOG_CATEGORIES: ContentCategory[] = [
  "All",
  "ABM Intelligence",
  "Data Verification",
  "Compliance & Privacy",
  "Demand Generation",
];

/**
 * CMS-ready structural templates only.
 * No fabricated customer stories, case studies, or performance statistics.
 */
export const BLOG_TEMPLATES: BlogArticle[] = [
  {
    slug: "ai-identifies-humans-verify-framework",
    title: "AI Identifies. Humans Verify: Designing Research-Led B2B Pipeline",
    excerpt:
      "CMS-ready editorial blueprint explaining how enterprise revenue teams pair AI signal detection with human buying-committee validation.",
    category: "Data Verification",
    readingTime: "4 min read",
    status: "CMS Placeholder Template",
    publishedLabel: "CMS Draft Template • Awaiting Publication Date",
    authorLabel: "ZoomBridge Research Editorial Team",
    sections: [
      {
        heading: "Why Automated Exports Alone Stall Enterprise Pipeline",
        body: "This structural slot is ready for your editorial deep dive into how static B2B databases decay and why automated exports create bounce risk, misaligned outreach, and wasted SDR cycles.",
      },
      {
        heading: "Combining AI Signal Detection with Human Verification",
        body: "Detail the four-stage ZoomBridge Research model: AI Identifies ICPs and buying signals, AI Analyzes intent and account-fit scores, Humans Validate contact accuracy and buying-committee structures, and Customers Win predictable pipeline.",
      },
      {
        heading: "Multi-Layer Validation Checklist",
        body: "Outline triple-verified contact checks, job-title and industry verification, deduplication, and deliverability testing prior to CRM handoff.",
      },
    ],
  },
  {
    slug: "abm-scoring-fit-intent-engagement-guide",
    title: "Structuring Fit, Intent, and Engagement in Modern ABM Scoring",
    excerpt:
      "CMS-ready framework guide covering Tier 1, Tier 2, and Tier 3 account prioritization without guesswork.",
    category: "ABM Intelligence",
    readingTime: "5 min read",
    status: "CMS Placeholder Template",
    publishedLabel: "CMS Draft Template • Awaiting Publication Date",
    authorLabel: "ZoomBridge Research Editorial Team",
    sections: [
      {
        heading: "Moving Beyond Single-Dimension Lead Scores",
        body: "Explain why isolated email opens or firmographic match alone misallocate SDR bandwidth, and how combining Fit, Intent, and Engagement creates balanced account prioritization.",
      },
      {
        heading: "Defining Tier 1, Tier 2, and Tier 3 Workflows",
        body: "Document actionable sales and marketing playbooks for each tier, aligning 1:1 buying-committee outreach with high-priority accounts.",
      },
    ],
  },
  {
    slug: "privacy-first-b2b-demand-gdpr-ccpa",
    title: "Privacy-First B2B Demand Generation Across GDPR and CCPA",
    excerpt:
      "CMS-ready compliance overview covering lawful-basis processing, data-subject rights, and California consumer privacy standards.",
    category: "Compliance & Privacy",
    readingTime: "4 min read",
    status: "CMS Placeholder Template",
    publishedLabel: "CMS Draft Template • Awaiting Publication Date",
    authorLabel: "ZoomBridge Research Editorial Team",
    sections: [
      {
        heading: "Lawful Basis & Data-Subject Rights Under GDPR",
        body: "Summarize how EU and UK personal data is processed on a lawful basis while supporting access, correction, and erasure requests.",
      },
      {
        heading: "Honouring CCPA Transparency & Opt-Out Rights",
        body: "Detail processes respecting California residents' rights to know what data is held, request deletion, and opt out of sale or sharing.",
      },
    ],
  },
];

export const RESOURCE_TEMPLATES: ResourceItem[] = [
  {
    id: "res-abm-blueprint",
    title: "Enterprise ABM Scoring & Buying-Committee Checklist",
    format: "CMS-Ready Playbook Slot",
    category: "ABM Intelligence",
    summary:
      "Placeholder slot for downloadable PDF playbook covering Fit, Intent, and Engagement scoring workflows.",
    status: "CMS-Ready Placeholder",
  },
  {
    id: "res-data-hygiene",
    title: "Multi-Layer B2B Data Validation Specification",
    format: "CMS-Ready Technical Brief Slot",
    category: "Data Verification",
    summary:
      "Placeholder slot for documenting triple-verified contact checks, deduplication, and deliverability QA.",
    status: "CMS-Ready Placeholder",
  },
  {
    id: "res-privacy-guide",
    title: "GDPR & CCPA Data Governance Overview",
    format: "CMS-Ready Compliance Brief Slot",
    category: "Compliance & Privacy",
    summary:
      "Placeholder slot for legal and procurement teams reviewing ZoomBridge Research privacy standards.",
    status: "CMS-Ready Placeholder",
  },
];

export function getBlogBySlug(slug: string): BlogArticle | undefined {
  return BLOG_TEMPLATES.find((a) => a.slug === slug);
}

