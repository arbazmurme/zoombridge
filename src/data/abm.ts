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
 * NOTE: Strictly illustrative sample accounts for interactive demonstration only.
 * Not real customer accounts or proprietary client results.
 */
export const ILLUSTRATIVE_ABM_ACCOUNTS: IllustrativeAccount[] = [
  {
    id: "sample-a",
    accountLabel: "Sample Enterprise Account A",
    industry: "Cloud Infrastructure (Illustrative)",
    region: "North America & EMEA",
    companyBand: "1,000–5,000 employees",
    fitScore: 92,
    intentScore: 88,
    engagementScore: 84,
    buyingCommitteeMapped: 7,
    signals: ["Category Research Surge", "Multi-Region Expansion", "Technical Buyer Engagement"],
    fitReasons: ["Exact ICP industry match", "Target revenue & headcount band", "Multi-region footprint"],
    intentReasons: ["Elevated solution topic activity", "Recent executive technology initiatives"],
    engagementReasons: ["3 stakeholders engaged with research brief", "Direct reply from VP stakeholder"],
  },
  {
    id: "sample-b",
    accountLabel: "Sample Mid-Market Account B",
    industry: "B2B FinTech Software (Illustrative)",
    region: "EMEA",
    companyBand: "250–1,000 employees",
    fitScore: 81,
    intentScore: 68,
    engagementScore: 62,
    buyingCommitteeMapped: 5,
    signals: ["Security & Compliance Topic Interest", "Director-Level Content Download"],
    fitReasons: ["Core ICP vertical match", "EMEA target geography"],
    intentReasons: ["Moderate buying-signal activity over 30 days"],
    engagementReasons: ["2 content downloads from Director & Manager roles"],
  },
  {
    id: "sample-c",
    accountLabel: "Sample Growth Account C",
    industry: "Industrial Manufacturing (Illustrative)",
    region: "APAC",
    companyBand: "500–1,500 employees",
    fitScore: 74,
    intentScore: 42,
    engagementScore: 35,
    buyingCommitteeMapped: 3,
    signals: ["Early Market Evaluation", "Single Contact Open"],
    fitReasons: ["Strong firmographic alignment", "Target APAC territory"],
    intentReasons: ["Early-stage baseline signal volume"],
    engagementReasons: ["Initial email open; awaiting multi-touch depth"],
  },
];

