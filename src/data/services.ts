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
  benefits: Array<{ title: string; description: string }>;
  process: ServiceProcessStep[];
  useCases: Array<{ title: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
  relatedSlugs: string[];
  placeholderNote: string;
}

export const SERVICES: ServiceDetail[] = [
  {
    slug: "email-marketing",
    title: "Email Marketing",
    shortTitle: "Email Marketing",
    tagline: "Precision outreach engineered for decision-maker engagement.",
    summary:
      "Launch targeted, deliverability-tested email campaigns built around verified buyer personas and ICP intent signals.",
    overview:
      "Enterprise email outreach fails when built on stale lists and generic messaging. ZoomBridge Research pairs triple-verified contact intelligence with smart personalization tailored to each stakeholder's role inside your target buying committee.",
    iconName: "Mail",
    accentColor: "#1E5EFF",
    highlights: [
      "Deliverability-tested decision-maker lists",
      "Role-based smart personalization",
      "GDPR & CCPA-ready outreach alignment",
    ],
    benefits: [
      {
        title: "Protected Sender Reputation",
        description:
          "Pre-campaign deliverability testing and deduplication minimize bounce rates and domain risk.",
      },
      {
        title: "ICP-Aligned Segmentation",
        description:
          "Sequences are structured by industry, seniority, and buying-committee function rather than generic blasts.",
      },
      {
        title: "Human-Validated Contacts",
        description:
          "Job-title and company checks confirm you reach active budget holders and influencers.",
      },
    ],
    process: [
      {
        step: "01",
        title: "ICP & Persona Scoping",
        description:
          "Define target industries, geographies, company sizes, and decision-maker roles.",
      },
      {
        step: "02",
        title: "Contact Verification & Hygiene",
        description:
          "Apply triple-verified contact checks, deduplication, and deliverability testing.",
      },
      {
        step: "03",
        title: "Smart Personalization Sequencing",
        description:
          "Align messaging to account context, intent signals, and stakeholder priorities.",
      },
      {
        step: "04",
        title: "Campaign Execution & Hand-Off",
        description:
          "Monitor engagement patterns and route qualified replies to your revenue team.",
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
        answer: "Contact for Pricing — scope depends on target segment size, regions, and campaign cadence.",
      },
    ],
    relatedSlugs: ["account-based-marketing", "contact-discovery", "data-enrichment"],
    placeholderNote:
      "Campaign benchmark figures and client-specific reply metrics are omitted until verified performance data is approved for publication.",
  },
  {
    slug: "account-based-marketing",
    title: "Account-Based Marketing",
    shortTitle: "ABM",
    tagline: "Orchestrate multi-touch demand across high-value target accounts.",
    summary:
      "Focus budget on prioritized accounts using fit scoring, intent analysis, and full buying-committee mapping.",
    overview:
      "ZoomBridge Research transforms Account-Based Marketing from static account lists into an intelligence-led revenue motion. We identify high-fit accounts showing active buying signals, map the full buying committee, and coordinate multi-channel outreach.",
    iconName: "Target",
    accentColor: "#22D3EE",
    highlights: [
      "Fit, intent & engagement account scoring",
      "Full buying-committee stakeholder mapping",
      "Coordinated multi-touch activation",
    ],
    benefits: [
      {
        title: "Budget Focused on Tier 1 Accounts",
        description:
          "Concentrate sales and marketing spend on accounts demonstrating both strong ICP fit and active intent.",
      },
      {
        title: "Multi-Stakeholder Coverage",
        description:
          "Engage Executive Leadership, Technical Buyers, and Procurement simultaneously rather than single contacts.",
      },
      {
        title: "Sales & Marketing Alignment",
        description:
          "Shared account tiers and verified stakeholder intelligence eliminate handoff friction.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Target Account List & Fit Scoring",
        description:
          "Evaluate accounts against firmographic, technographic, and regional criteria.",
      },
      {
        step: "02",
        title: "Intent & Signal Layering",
        description:
          "Overlay buying signals and market trends to rank Tier 1, Tier 2, and Tier 3 accounts.",
      },
      {
        step: "03",
        title: "Buying-Committee Mapping",
        description:
          "Human researchers verify decision-makers, technical evaluators, and budget holders.",
      },
      {
        step: "04",
        title: "Multi-Touch Campaign Delivery",
        description:
          "Activate targeted outreach and track account-level engagement progression.",
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
        question: "Do you integrate with our existing target account list?",
        answer:
          "Yes. We can enrich and score your existing named-account list or build a net-new ICP-aligned target list.",
      },
      {
        question: "What is the pricing for ABM programs?",
        answer: "Contact for Pricing — customized to account tier volume, regions, and channel mix.",
      },
    ],
    relatedSlugs: ["lead-generation", "contact-discovery", "content-syndication"],
    placeholderNote:
      "Illustrative ABM scoring workflows are available on /abm-scoring; customer-specific ROI figures are not fabricated.",
  },
  {
    slug: "content-syndication",
    title: "Content Syndication",
    shortTitle: "Content Syndication",
    tagline: "Put your research and thought leadership in front of active buyers.",
    summary:
      "Distribute whitepapers, analyst briefs, and solution guides to verified decision-makers matching your ICP.",
    overview:
      "Content syndication works when your assets reach genuine buyers—not unverified form-fills. ZoomBridge Research targets role-verified professionals across your chosen industries and validates every lead before delivery.",
    iconName: "Share2",
    accentColor: "#8B5CF6",
    highlights: [
      "ICP-gated content distribution",
      "Role & industry human verification",
      "GDPR & CCPA consent-aligned capture",
    ],
    benefits: [
      {
        title: "Qualified Asset Engagement",
        description:
          "Ensure whitepapers and guides reach Directors, VPs, and technical evaluators inside your target market.",
      },
      {
        title: "Zero Unverified Bulk Leads",
        description:
          "Every syndicated lead passes job-title, company, and deduplication checks before entering your CRM.",
      },
      {
        title: "Regional & Global Reach",
        description:
          "Extend distribution across 120+ supported countries across Americas, EMEA, APAC, and LATAM.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Asset & Audience Alignment",
        description:
          "Match your gated assets to the exact seniority and functional personas you want to influence.",
      },
      {
        step: "02",
        title: "Targeted Distribution",
        description:
          "Syndicate content to relevant ICP accounts with privacy-compliant consent capture.",
      },
      {
        step: "03",
        title: "Human Data Validation",
        description:
          "Verify contact accuracy, role relevance, and account alignment on every submission.",
      },
      {
        step: "04",
        title: "Structured CRM Delivery",
        description:
          "Deliver clean, deduplicated lead files ready for SDR follow-up and nurture.",
      },
    ],
    useCases: [
      {
        title: "Top-of-Funnel Pipeline Scaling",
        description:
          "Build consistent, ICP-aligned demand around flagship research reports and buyer guides.",
      },
      {
        title: "New Market Entry",
        description:
          "Introduce your brand to decision-makers in new geographic regions or industry verticals.",
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
        answer: "Contact for Pricing — structured around target criteria, volume, and geographies.",
      },
    ],
    relatedSlugs: ["lead-generation", "account-based-marketing", "email-marketing"],
    placeholderNote:
      "Detailed media-kit specifications and historical asset download benchmarks are CMS placeholders awaiting live collateral.",
  },
  {
    slug: "contact-discovery",
    title: "Contact Discovery",
    shortTitle: "Contact Discovery",
    tagline: "Uncover verified decision-makers and full buying committees.",
    summary:
      "Custom research-led contact discovery mapping budget holders, technical buyers, and champions inside your target accounts.",
    overview:
      "Off-the-shelf databases miss org-chart nuances and newly appointed leaders. ZoomBridge Research combines AI discovery with human researchers to map buying-committee structures and deliver verified, decision-maker-only contacts.",
    iconName: "UserSearch",
    accentColor: "#3B7BFF",
    highlights: [
      "Custom buying-committee mapping",
      "Executive, VP, Director & Technical Buyer coverage",
      "95% accuracy goal via human validation",
    ],
    benefits: [
      {
        title: "Reach True Budget Holders",
        description:
          "Go beyond generic titles to pinpoint the exact stakeholders who influence and approve spend.",
      },
      {
        title: "Org-Level Precision",
        description:
          "Map multi-region subsidiaries, business units, and reporting lines accurately.",
      },
      {
        title: "Fresh Research Over Stale Exports",
        description:
          "Records are researched and validated specifically for your brief rather than pulled from aged static tables.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Account & Role Blueprint",
        description:
          "Define target accounts and the exact buying-committee personas required per account.",
      },
      {
        step: "02",
        title: "AI Discovery Sweep",
        description:
          "Surface candidate profiles and organizational signals across global data sources.",
      },
      {
        step: "03",
        title: "Human Researcher Verification",
        description:
          "Validate current title, department relevance, and direct contact accuracy.",
      },
      {
        step: "04",
        title: "Deduplicated Delivery",
        description:
          "Deliver clean records formatted for immediate sales and ABM activation.",
      },
    ],
    useCases: [
      {
        title: "Strategic Account Penetration",
        description:
          "Equip AEs and SDRs with verified buying committees for top named accounts.",
      },
      {
        title: "Multi-Region Expansion",
        description:
          "Discover local leadership across EMEA, APAC, LATAM, and North America.",
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
        answer: "Contact for Pricing — scoped by account volume, persona depth, and regions.",
      },
    ],
    relatedSlugs: ["data-enrichment", "account-based-marketing", "lead-generation"],
    placeholderNote:
      "Sample record schemas can be requested directly for your specific Ideal Customer Profile.",
  },
  {
    slug: "lead-generation",
    title: "Lead Generation",
    shortTitle: "Lead Generation",
    tagline: "Turn verified intent into predictable, sales-ready pipeline.",
    summary:
      "Full-funnel B2B lead generation aligning intent intelligence, human qualification, and targeted outreach.",
    overview:
      "More leads do not equal more revenue if sales teams spend hours disqualifying poor-fit contacts. ZoomBridge Research builds demand programs grounded in ICP fit, verified buying signals, and human-validated contact records.",
    iconName: "TrendingUp",
    accentColor: "#1E5EFF",
    highlights: [
      "ICP-aligned prospect qualification",
      "Human-verified intent & buyer relevance",
      "Faster pipeline growth with lower wasted outreach",
    ],
    benefits: [
      {
        title: "Higher Sales Acceptance",
        description:
          "Lead delivery focuses on verified decision-makers inside target accounts, reducing SDR research overhead.",
      },
      {
        title: "Predictable Demand Cadence",
        description:
          "Consistent campaign execution aligned to quarterly pipeline goals.",
      },
      {
        title: "Privacy-First Execution",
        description:
          "Built around GDPR and CCPA requirements from first touch through CRM handoff.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Pipeline Goal Alignment",
        description:
          "Calibrate lead volume, ICP filters, and qualification criteria with your revenue leaders.",
      },
      {
        step: "02",
        title: "Signal & Account Selection",
        description:
          "Prioritize accounts showing fit and intent alignment.",
      },
      {
        step: "03",
        title: "Multi-Channel Activation & Validation",
        description:
          "Engage decision-makers and validate every lead against strict quality gates.",
      },
      {
        step: "04",
        title: "Pipeline Delivery & Feedback Loop",
        description:
          "Refine targeting continuously based on sales team feedback.",
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
          "Target specialized industries with tailored value propositions and role filtering.",
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
        answer: "Contact for Pricing — tailored to qualification criteria and target markets.",
      },
    ],
    relatedSlugs: ["account-based-marketing", "content-syndication", "email-marketing"],
    placeholderNote:
      "Customer conversion benchmarks are intentionally omitted until verified client studies are approved.",
  },
  {
    slug: "data-enrichment",
    title: "Data Enrichment",
    shortTitle: "Data Enrichment",
    tagline: "Transform decaying CRM records into accurate revenue intelligence.",
    summary:
      "Cleanse, deduplicate, and enrich existing CRM and MAP databases with human-verified firmographics and contacts.",
    overview:
      "B2B contact and account records decay continuously as leaders change roles and companies reorganize. ZoomBridge Research restores CRM health through triple-verified contact updates, job-title normalization, deduplication, and deliverability testing.",
    iconName: "DatabaseZap",
    accentColor: "#22D3EE",
    highlights: [
      "Triple-verified contact refresh",
      "Job-title, industry & firmographic enrichment",
      "Deduplication & deliverability testing",
    ],
    benefits: [
      {
        title: "Eliminate CRM Decay",
        description:
          "Identify outdated roles, bounced emails, and duplicate records before they distort attribution or routing.",
      },
      {
        title: "Complete Account Profiles",
        description:
          "Append missing firmographic, geographic, and buying-committee fields for accurate scoring.",
      },
      {
        title: "Ready for Automated Routing & ABM",
        description:
          "Clean, standardized data improves lead routing, territory planning, and ABM scoring accuracy.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Database Audit & Gap Analysis",
        description:
          "Assess completeness, duplicates, and decay across your current CRM/MAP records.",
      },
      {
        step: "02",
        title: "AI Matching & Standardization",
        description:
          "Normalize company hierarchies, industries, and job-title taxonomies.",
      },
      {
        step: "03",
        title: "Human Verification & Testing",
        description:
          "Validate key decision-maker records and run deliverability checks.",
      },
      {
        step: "04",
        title: "Clean Re-Integration",
        description:
          "Return structured, deduplicated records ready for CRM import.",
      },
    ],
    useCases: [
      {
        title: "Pre-Campaign CRM Hygiene",
        description:
          "Cleanse legacy prospect lists prior to major product or regional outreach.",
      },
      {
        title: "ABM Territory Readiness",
        description:
          "Ensure account fit and scoring models operate on verified firmographic inputs.",
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
        answer: "Contact for Pricing — based on record volume and required enrichment attributes.",
      },
    ],
    relatedSlugs: ["contact-discovery", "account-based-marketing", "email-marketing"],
    placeholderNote:
      "Specific CRM connector field-mapping templates are customized during onboarding.",
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

