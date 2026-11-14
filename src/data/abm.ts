export interface IllustrativeAccount {
  id: string;
  accountLabel: string;
  industry: string;
  region: string;
  companyBand: string;
  fitScore: number;
  intentScore: number;
  engagementScore: number;
  buyingCommitteeMapped: number;
  signals: string[];
  fitReasons: string[];
  intentReasons: string[];
  engagementReasons: string[];
}

export const ABM_PILLARS = [
  {
    id: "fit",
    title: "Fit Scoring",
    weightDefault: 40,
    accent: "#1E5EFF",
    summary:
      "Measures how closely an account matches your Ideal Customer Profile across industry, company size, geography, and organizational structure.",
    factors: [
      "Industry & vertical alignment",
      "Company size & revenue band",
      "Regional presence & operational footprint",
      "Buying-committee availability",
    ],
  },
  {
    id: "intent",
    title: "Intent Scoring",
    weightDefault: 35,
    accent: "#22D3EE",
    summary:
      "Captures active research behaviour, topic surges, and market signals indicating an account is evaluating solutions in your category.",
    factors: [
      "Category & solution research signals",
      "Buying-signal velocity & recency",
      "Market expansion & hiring triggers",
      "Human-verified intent relevance",
    ],
  },
  {
    id: "engagement",
    title: "Engagement Scoring",
    weightDefault: 25,
    accent: "#8B5CF6",
    summary:
      "Tracks multi-touch interactions across email outreach, syndicated content downloads, and stakeholder responses within the account.",
    factors: [
      "Multi-stakeholder content engagement",
      "Direct outreach replies & interactions",
      "Buying-committee touchpoint depth",
      "Recency of decision-maker activity",
    ],
  },
] as const;

export const ABM_TIERS = [
  {
    tier: "Tier 1",
    range: "80 – 100",
    minScore: 80,
    label: "Immediate Sales & Executive ABM",
    color: "#22D3EE",
    action:
      "Deploy 1:1 buying-committee mapping, custom human-verified outreach, and dedicated AE + SDR orchestration.",
  },
  {
    tier: "Tier 2",
    range: "55 – 79",
    minScore: 55,
    label: "Targeted Multi-Touch Nurturing",
    color: "#3B7BFF",
    action:
      "Run segment-personalized email sequences and targeted content syndication to accelerate intent velocity.",
  },
  {
    tier: "Tier 3",
    range: "0 – 54",
    minScore: 0,
    label: "Monitor & Signal Watchlist",
    color: "#94A3B8",
    action:
      "Keep on automated signal monitoring and data enrichment until buying signals cross activation thresholds.",
  },
] as const;

/**
 * Enterprise Target Accounts for Account-Based Marketing (ABM) Prioritization.
 */
export const ILLUSTRATIVE_ABM_ACCOUNTS: IllustrativeAccount[] = [
  {
    id: "snowflake-inc",
    accountLabel: "Snowflake Inc. (NYSE: SNOW)",
    industry: "Enterprise Cloud & Data Lakehouse",
    region: "North America (San Mateo, CA) & EMEA",
    companyBand: "7,200+ Employees • $2.8B ARR",
    fitScore: 94,
    intentScore: 92,
    engagementScore: 88,
    buyingCommitteeMapped: 9,
    signals: [
      "Data Warehouse Modernization RFP Active",
      "Multi-Region Cloud Expansion Intent Surge",
      "C-Suite Security & Governance Inquiry",
    ],
    fitReasons: [
      "Exact ICP revenue band ($2B+ ARR)",
      "Global multi-cloud enterprise infrastructure",
      "High-density buying committee with 9 key roles identified",
    ],
    intentReasons: [
      "Top 1% intent velocity for Enterprise Data Governance",
      "Executive hiring surge in Cloud Procurement and Architecture",
    ],
    engagementReasons: [
      "VP of Data Engineering downloaded ZBR Research Brief",
      "Direct positive reply from Head of Enterprise Procurement",
      "4 buying-committee touchpoints logged in past 14 days",
    ],
  },
  {
    id: "datadog-inc",
    accountLabel: "Datadog, Inc. (NASDAQ: DDOG)",
    industry: "Cloud Observability & Security",
    region: "AMER & EMEA (New York, NY)",
    companyBand: "5,400+ Employees • $2.1B ARR",
    fitScore: 89,
    intentScore: 86,
    engagementScore: 81,
    buyingCommitteeMapped: 7,
    signals: [
      "APM SASE Integration Demand Surge",
      "VP Infrastructure Tech Spike (+42%)",
      "Cross-Functional Buyer Alignment",
    ],
    fitReasons: [
      "Tier-1 high-growth technology enterprise",
      "North America & Europe engineering hubs",
      "Proven enterprise average contract value ($500K+)",
    ],
    intentReasons: [
      "Surging evaluation volume for automated data pipelines",
      "Executive recruitment detected in Strategic Sourcing",
    ],
    engagementReasons: [
      "Chief Architect attended ZBR executive roundtable",
      "2 Director-level stakeholders engaged with demand framework",
    ],
  },
  {
    id: "palo-alto-networks",
    accountLabel: "Palo Alto Networks (NASDAQ: PANW)",
    industry: "Cybersecurity & Zero Trust",
    region: "Global (Santa Clara, CA)",
    companyBand: "13,900+ Employees • $7.5B ARR",
    fitScore: 88,
    intentScore: 84,
    engagementScore: 76,
    buyingCommitteeMapped: 8,
    signals: [
      "Zero Trust SASE Modernization",
      "Executive Intent Surge: Cloud Security",
      "Global Enterprise Sourcing Review",
    ],
    fitReasons: [
      "Fortune 500 security industry leader",
      "Multi-tier enterprise buying committee established",
      "Multi-million dollar tech infrastructure budget",
    ],
    intentReasons: [
      "Q4 budget allocation review for verified intent data",
      "Strong peer comparison activity detected on analyst portals",
    ],
    engagementReasons: [
      "Director of SASE Architecture viewed ROI Whitepaper",
      "Senior Sourcing Manager scheduled briefing session",
    ],
  },
  {
    id: "stripe-payments",
    accountLabel: "Stripe Payments (Financial Infrastructure)",
    industry: "FinTech & Global Payment Networks",
    region: "EMEA (Dublin, Ireland) & US",
    companyBand: "8,000+ Employees • $3.2B ARR",
    fitScore: 82,
    intentScore: 72,
    engagementScore: 66,
    buyingCommitteeMapped: 6,
    signals: [
      "Cross-Border Compliance Spike",
      "FinTech Intent Velocity +34%",
      "Payment Orchestration Expansion",
    ],
    fitReasons: [
      "Global FinTech payment infrastructure titan",
      "Multi-currency European enterprise footprint",
      "High compliance standard (GDPR & CCPA readiness)",
    ],
    intentReasons: [
      "Active research on automated decision-maker verification",
      "Expansion signals logged in DACH & Benelux regions",
    ],
    engagementReasons: [
      "2 stakeholder downloads from Compliance & Risk team",
      "Inbound inquiry on research-backed target account validation",
    ],
  },
  {
    id: "siemens-digital",
    accountLabel: "Siemens Digital Industries",
    industry: "Industrial Automation & Smart Manufacturing",
    region: "EMEA (Munich, Germany) & APAC",
    companyBand: "24,000+ Div. Employees • $9.4B Rev.",
    fitScore: 75,
    intentScore: 48,
    engagementScore: 42,
    buyingCommitteeMapped: 5,
    signals: [
      "Industry 4.0 Supply Chain Modernization",
      "Baseline Procurement Inquiries",
      "Early Tech Stack Evaluation",
    ],
    fitReasons: [
      "Global industrial automation titan",
      "Structured enterprise RFP cycle",
      "Extensive European & Asian manufacturing plants",
    ],
    intentReasons: [
      "Early evaluation phase for supply chain intelligence",
      "Quarterly intent signal spike in industrial IoT analytics",
    ],
    engagementReasons: [
      "VP of Digital Transformation opened product brief",
      "Awaiting multi-stakeholder nurturing sequence activation",
    ],
  },
];
