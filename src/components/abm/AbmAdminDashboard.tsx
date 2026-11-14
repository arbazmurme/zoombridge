"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Database,
  Download,
  ExternalLink,
  FileSpreadsheet,
  FileText,
  Filter,
  Layers,
  LogOut,
  Mail,
  MessageSquare,
  MoreVertical,
  Play,
  RefreshCw,
  RotateCcw,
  Search,
  Settings,
  Share2,
  Sliders,
  Sparkles,
  Target,
  Trash2,
  TrendingUp,
  Upload,
  User,
  Users,
  PlusCircle,
  Eye,
  Copy,
  Archive,
  Globe,
  MapPin,
  Briefcase,
  DollarSign,
  Activity,
  Clock,
  ShieldCheck,
  Cpu,
  Key,
  Check,
  Menu,
  X,
} from "lucide-react";
import { ZbrLogo } from "@/components/ui/ZbrLogo";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────
   TYPE DEFINITIONS
───────────────────────────────────────────── */

interface AccountRow {
  id: number;
  name: string;
  domain: string;
  industry: string;
  industryColor: string;
  funding: number;
  hiring: number;
  news: number;
  industryFit: number;
  sizeFit: number;
  techIntent: number;
  bestFitTitle: string;
  titleOptions: string[];
}

/* ─────────────────────────────────────────────
   ACCOUNT SCORING DATA
───────────────────────────────────────────── */

const INITIAL_ACCOUNTS: AccountRow[] = [
  {
    id: 1,
    name: "Blue Harbor Health",
    domain: "blueharborhealth.com",
    industry: "Healthcare",
    industryColor: "bg-blue-50 text-blue-700 border-blue-200",
    funding: 0.7,
    hiring: 0.7,
    news: 0.8,
    industryFit: 0.9,
    sizeFit: 0.8,
    techIntent: 0.8,
    bestFitTitle: "Director of Demand Generation",
    titleOptions: [
      "Director of Demand Generation",
      "VP of Digital Health",
      "Head of Enterprise Procurement",
    ],
  },
  {
    id: 2,
    name: "Northwind Robotics",
    domain: "northwindrobotics.com",
    industry: "Robotics",
    industryColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    funding: 0.8,
    hiring: 0.7,
    news: 0.7,
    industryFit: 0.8,
    sizeFit: 0.8,
    techIntent: 0.8,
    bestFitTitle: "RevOps Manager",
    titleOptions: [
      "RevOps Manager",
      "VP of Automation Architecture",
      "Director of Global Sourcing",
    ],
  },
  {
    id: 3,
    name: "CascadeFreight",
    domain: "cascadefreight.com",
    industry: "Logistics",
    industryColor: "bg-teal-50 text-teal-700 border-teal-200",
    funding: 0.8,
    hiring: 0.7,
    news: 0.8,
    industryFit: 0.7,
    sizeFit: 0.8,
    techIntent: 0.7,
    bestFitTitle: "Director of Demand Generation",
    titleOptions: [
      "Director of Demand Generation",
      "VP Supply Chain Solutions",
      "Head of Commercial Fleet",
    ],
  },
  {
    id: 4,
    name: "FerrousAnalytics",
    domain: "ferrousanalytics.io",
    industry: "Analytics",
    industryColor: "bg-purple-50 text-purple-700 border-purple-200",
    funding: 0.5,
    hiring: 0.6,
    news: 0.4,
    industryFit: 0.5,
    sizeFit: 0.5,
    techIntent: 0.7,
    bestFitTitle: "Head of Growth",
    titleOptions: [
      "Head of Growth",
      "Chief Data Architect",
      "VP Enterprise BI",
    ],
  },
  {
    id: 5,
    name: "Solace Payments",
    domain: "solacepay.com",
    industry: "Payments",
    industryColor: "bg-sky-50 text-sky-700 border-sky-200",
    funding: 0.7,
    hiring: 0.5,
    news: 0.5,
    industryFit: 0.6,
    sizeFit: 0.4,
    techIntent: 0.5,
    bestFitTitle: "Director of Demand Generation",
    titleOptions: [
      "Director of Demand Generation",
      "Head of Compliance & Risk",
      "VP Global FinTech Partnerships",
    ],
  },
  {
    id: 6,
    name: "Snowflake Cloud Infrastructure",
    domain: "snowflake.com",
    industry: "Cloud & Data",
    industryColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    funding: 0.9,
    hiring: 0.9,
    news: 0.9,
    industryFit: 0.9,
    sizeFit: 0.9,
    techIntent: 0.9,
    bestFitTitle: "VP of Enterprise Infrastructure",
    titleOptions: [
      "VP of Enterprise Infrastructure",
      "Head of Global Data Operations",
      "Chief Information Security Officer",
    ],
  },
  {
    id: 7,
    name: "Datadog Observability",
    domain: "datadoghq.com",
    industry: "Cloud & Security",
    industryColor: "bg-violet-50 text-violet-700 border-violet-200",
    funding: 0.8,
    hiring: 0.9,
    news: 0.8,
    industryFit: 0.9,
    sizeFit: 0.8,
    techIntent: 0.8,
    bestFitTitle: "Chief Technology Officer",
    titleOptions: [
      "Chief Technology Officer",
      "Director of Site Reliability",
      "Global Sourcing Architect",
    ],
  },
  {
    id: 8,
    name: "Palo Alto Networks",
    domain: "paloaltonetworks.com",
    industry: "Cybersecurity",
    industryColor: "bg-rose-50 text-rose-700 border-rose-200",
    funding: 0.8,
    hiring: 0.8,
    news: 0.8,
    industryFit: 0.8,
    sizeFit: 0.9,
    techIntent: 0.8,
    bestFitTitle: "Head of Zero-Trust Security",
    titleOptions: [
      "Head of Zero-Trust Security",
      "VP Enterprise Strategic Alliances",
      "Global Procurement Lead",
    ],
  },
];

/* ─────────────────────────────────────────────
   TARGET ACCOUNTS TAB DATA
───────────────────────────────────────────── */
const TARGET_ACCOUNTS = [
  { id: 1, company: "Snowflake Inc.", website: "snowflake.com", industry: "Cloud & Data", hq: "San Mateo, CA", employees: "6,000+", revenue: "$2.8B", icpScore: 94, stage: "Engaged", owner: "sales@wearezbr.com" },
  { id: 2, company: "Datadog Inc.", website: "datadoghq.com", industry: "Cloud & Security", hq: "New York, NY", employees: "5,200+", revenue: "$2.1B", icpScore: 91, stage: "Qualified", owner: "sales@wearezbr.com" },
  { id: 3, company: "Palo Alto Networks", website: "paloaltonetworks.com", industry: "Cybersecurity", hq: "Santa Clara, CA", employees: "13,000+", revenue: "$8.0B", icpScore: 89, stage: "Prospecting", owner: "sales@wearezbr.com" },
  { id: 4, company: "Stripe Inc.", website: "stripe.com", industry: "FinTech", hq: "San Francisco, CA", employees: "7,000+", revenue: "$14.4B", icpScore: 87, stage: "Engaged", owner: "sales@wearezbr.com" },
  { id: 5, company: "Siemens Digital", website: "siemens.com", industry: "Industrial Tech", hq: "Munich, Germany", employees: "300,000+", revenue: "$72.0B", icpScore: 85, stage: "Qualified", owner: "sales@wearezbr.com" },
  { id: 6, company: "ServiceNow", website: "servicenow.com", industry: "Enterprise SaaS", hq: "Santa Clara, CA", employees: "20,000+", revenue: "$8.9B", icpScore: 83, stage: "Prospecting", owner: "sales@wearezbr.com" },
  { id: 7, company: "Workday Inc.", website: "workday.com", industry: "HRM & Finance SaaS", hq: "Pleasanton, CA", employees: "18,000+", revenue: "$7.3B", icpScore: 81, stage: "Engaged", owner: "sales@wearezbr.com" },
  { id: 8, company: "SAP SE", website: "sap.com", industry: "ERP & Cloud", hq: "Walldorf, Germany", employees: "105,000+", revenue: "$33.0B", icpScore: 79, stage: "Prospecting", owner: "sales@wearezbr.com" },
  { id: 9, company: "Oracle Corporation", website: "oracle.com", industry: "Cloud & Database", hq: "Austin, TX", employees: "143,000+", revenue: "$51.0B", icpScore: 78, stage: "Prospecting", owner: "sales@wearezbr.com" },
  { id: 10, company: "Microsoft Azure", website: "azure.microsoft.com", industry: "Cloud Platform", hq: "Redmond, WA", employees: "221,000+", revenue: "$211B", icpScore: 76, stage: "Engaged", owner: "sales@wearezbr.com" },
  { id: 11, company: "Blue Harbor Health", website: "blueharborhealth.com", industry: "Healthcare Tech", hq: "Boston, MA", employees: "2,400+", revenue: "$410M", icpScore: 79, stage: "Qualified", owner: "sales@wearezbr.com" },
  { id: 12, company: "Northwind Robotics", website: "northwindrobotics.com", industry: "Robotics & AI", hq: "Austin, TX", employees: "1,100+", revenue: "$190M", icpScore: 76, stage: "Engaged", owner: "sales@wearezbr.com" },
];

/* ─────────────────────────────────────────────
   JOB TITLES TAB DATA
───────────────────────────────────────────── */
const JOB_TITLES = [
  { id: 1, title: "VP of Demand Generation", department: "Marketing", seniority: "VP / Director", icpMatch: 94, accountsUsing: 847, status: "Active" },
  { id: 2, title: "Director of Revenue Operations", department: "Revenue Ops", seniority: "Director", icpMatch: 91, accountsUsing: 643, status: "Active" },
  { id: 3, title: "Chief Marketing Officer", department: "Marketing", seniority: "C-Suite", icpMatch: 89, accountsUsing: 312, status: "Active" },
  { id: 4, title: "Head of Enterprise Procurement", department: "Procurement", seniority: "Head / Lead", icpMatch: 86, accountsUsing: 274, status: "Active" },
  { id: 5, title: "VP of Cloud Infrastructure", department: "Engineering", seniority: "VP / Director", icpMatch: 84, accountsUsing: 391, status: "Active" },
  { id: 6, title: "Director of Growth Marketing", department: "Marketing", seniority: "Director", icpMatch: 82, accountsUsing: 219, status: "Active" },
  { id: 7, title: "Chief Revenue Officer", department: "Revenue", seniority: "C-Suite", icpMatch: 80, accountsUsing: 198, status: "Active" },
  { id: 8, title: "Head of B2B Sales Enablement", department: "Sales", seniority: "Head / Lead", icpMatch: 78, accountsUsing: 175, status: "Active" },
  { id: 9, title: "VP of Enterprise Accounts", department: "Sales", seniority: "VP / Director", icpMatch: 76, accountsUsing: 153, status: "Active" },
  { id: 10, title: "Director of ABM Strategy", department: "Marketing", seniority: "Director", icpMatch: 74, accountsUsing: 142, status: "Paused" },
  { id: 11, title: "Head of Zero-Trust Security", department: "IT / Security", seniority: "Head / Lead", icpMatch: 71, accountsUsing: 98, status: "Active" },
  { id: 12, title: "Chief Data & AI Officer", department: "Data / AI", seniority: "C-Suite", icpMatch: 69, accountsUsing: 87, status: "Paused" },
];

/* ─────────────────────────────────────────────
   EMAIL ASSETS TAB DATA
───────────────────────────────────────────── */
const EMAIL_ASSETS = [
  { id: 1, name: "Enterprise Decision Maker Intro", persona: "C-Suite / CMO", subject: "Connecting verified buyer intent to pipeline goals", openRate: 42.3, clickRate: 11.8, sent: 3842, created: "Oct 12, 2026", status: "Active" },
  { id: 2, name: "VP Cloud Infrastructure Nurture", persona: "VP Engineering", subject: "How enterprise cloud teams validate 300% more pipeline", openRate: 38.7, clickRate: 9.4, sent: 2614, created: "Oct 20, 2026", status: "Active" },
  { id: 3, name: "RevOps ROI Framework", persona: "RevOps Director", subject: "The 6-signal scoring model cutting CAC by 34%", openRate: 35.1, clickRate: 8.2, sent: 1983, created: "Nov 1, 2026", status: "Active" },
  { id: 4, name: "FinTech Compliance Outreach", persona: "Head of Compliance", subject: "Verified buyer intelligence for regulated industries", openRate: 29.6, clickRate: 6.9, sent: 1241, created: "Nov 5, 2026", status: "Active" },
  { id: 5, name: "ABM Pilot Invite — Tier A Accounts", persona: "VP Sales / CRO", subject: "50 highest-intent enterprise accounts — ready to activate", openRate: 48.2, clickRate: 14.6, sent: 847, created: "Nov 8, 2026", status: "Active" },
  { id: 6, name: "Cold Outbound — Procurement Buyer", persona: "Head of Procurement", subject: "Data-led pipeline expansion for procurement teams", openRate: 22.4, clickRate: 4.7, sent: 2109, created: "Sep 29, 2026", status: "Active" },
  { id: 7, name: "Cybersecurity Account Warm-Up", persona: "CISO / Security Lead", subject: "Zero-trust posture meets verified B2B outreach strategy", openRate: 31.9, clickRate: 7.1, sent: 983, created: "Oct 15, 2026", status: "Active" },
  { id: 8, name: "Re-Engagement — Dormant Tier B", persona: "Marketing / Ops", subject: "Refreshed account buying signals for Q4", openRate: 18.3, clickRate: 3.2, sent: 1587, created: "Nov 10, 2026", status: "Paused" },
];

/* ─────────────────────────────────────────────
   EXPORTS TAB DATA
───────────────────────────────────────────── */
const EXPORT_HISTORY = [
  { id: 1, name: "Q4 2026 Tier A Accounts", createdBy: "sales@wearezbr.com", date: "Nov 14, 2026 · 11:42 PM", format: "CSV", records: 312, status: "Ready", size: "184 KB" },
  { id: 2, name: "Snowflake Buying Committee", createdBy: "sales@wearezbr.com", date: "Nov 13, 2026 · 03:17 PM", format: "XLSX", records: 47, status: "Ready", size: "62 KB" },
  { id: 3, name: "EMEA Target List Nov 2026", createdBy: "sales@wearezbr.com", date: "Nov 12, 2026 · 09:08 AM", format: "CSV", records: 198, status: "Ready", size: "116 KB" },
  { id: 4, name: "Cybersecurity Verticals — All Tiers", createdBy: "sales@wearezbr.com", date: "Nov 11, 2026 · 06:51 PM", format: "JSON", records: 423, status: "Ready", size: "342 KB" },
  { id: 5, name: "Full Scored Account Universe", createdBy: "sales@wearezbr.com", date: "Nov 10, 2026 · 02:30 AM", format: "XLSX", records: 1248, status: "Ready", size: "1.2 MB" },
  { id: 6, name: "VP Engineering ABM Sequence", createdBy: "sales@wearezbr.com", date: "Nov 9, 2026 · 05:12 PM", format: "CSV", records: 391, status: "Ready", size: "221 KB" },
  { id: 7, name: "RevOps Director Contacts", createdBy: "sales@wearezbr.com", date: "Nov 8, 2026 · 12:00 PM", format: "CSV", records: 643, status: "Processing", size: "—" },
  { id: 8, name: "Cold Outbound — APAC Segment", createdBy: "sales@wearezbr.com", date: "Nov 7, 2026 · 08:44 AM", format: "XLSX", records: 274, status: "Ready", size: "198 KB" },
];

/* ─────────────────────────────────────────────
   TOP SCORED ACCOUNTS
───────────────────────────────────────────── */
const TOP_SCORED_ACCOUNTS = [
  { rank: 1, name: "Snowflake Cloud Infrastructure", domain: "snowflake.com", industry: "Cloud & Data", score: 0.90, tier: "A" as const },
  { rank: 2, name: "Datadog Observability", domain: "datadoghq.com", industry: "Cloud & Security", score: 0.84, tier: "A" as const },
  { rank: 3, name: "Palo Alto Networks", domain: "paloaltonetworks.com", industry: "Cybersecurity", score: 0.82, tier: "A" as const },
  { rank: 4, name: "Blue Harbor Health", domain: "blueharborhealth.com", industry: "Healthcare", score: 0.79, tier: "A" as const },
  { rank: 5, name: "Northwind Robotics", domain: "northwindrobotics.com", industry: "Robotics", score: 0.76, tier: "A" as const },
];

/* ─────────────────────────────────────────────
   ACCOUNT EXPLORER DETAIL PRESETS
───────────────────────────────────────────── */
const EXPLORER_DETAILS: Record<string, {
  summary: string;
  intentSignals: { label: string; score: string; date: string }[];
  buyingCommittee: { name: string; title: string; verified: boolean; emailStatus: string }[];
  techStack: string[];
  recommendedPlay: string;
}> = {
  "Snowflake Inc.": {
    summary: "Leading cloud data warehousing platform scaling enterprise sales intelligence operations.",
    intentSignals: [
      { label: "Surge in RevOps Architecture research on G2 & TrustRadius", score: "+46% Intent Velocity", date: "2 days ago" },
      { label: "Active job openings: 14 VP & Director of Sales Operations roles", score: "High Velocity", date: "5 days ago" },
      { label: "Enterprise procurement budget cycle opened for FY27", score: "High Budget Fit", date: "1 week ago" },
    ],
    buyingCommittee: [
      { name: "David Marcus", title: "VP of Enterprise Infrastructure", verified: true, emailStatus: "Verified Direct" },
      { name: "Elena Rostova", title: "Global Head of Revenue Operations", verified: true, emailStatus: "Verified Direct" },
      { name: "Michael Chang", title: "Chief Information Security Officer", verified: true, emailStatus: "Verified Direct" },
    ],
    techStack: ["Snowflake", "AWS", "Datadog", "Salesforce CRM", "Outreach.io", "Kubernetes"],
    recommendedPlay: "Tier A Executive 1:1 ABM Play with Custom ROI Deck & In-Person Briefing",
  },
  "Datadog Inc.": {
    summary: "High-growth observability & security platform evaluating multi-channel intent data vendors.",
    intentSignals: [
      { label: "Evaluating B2B Data Enrichment & ICP validation software", score: "+38% Intent Surge", date: "Yesterday" },
      { label: "Hiring: 9 Demand Generation & Growth Marketing leaders in NY", score: "Active Expansion", date: "4 days ago" },
      { label: "Series expansion in European Cloud Security footprint", score: "Regional Surge", date: "2 weeks ago" },
    ],
    buyingCommittee: [
      { name: "Sarah Jenkins", title: "Chief Technology Officer", verified: true, emailStatus: "Verified Direct" },
      { name: "Julian Vance", title: "Director of Demand Generation", verified: true, emailStatus: "Verified Direct" },
      { name: "Marcus Thorne", title: "VP Enterprise Strategic Alliances", verified: true, emailStatus: "Verified Direct" },
    ],
    techStack: ["Datadog", "GCP", "Salesforce", "Marketo", "Segment", "Kafka"],
    recommendedPlay: "Multi-Touch Buyer Persona Warm-Up Sequence + Engineering Leadership Outreach",
  },
  "Palo Alto Networks": {
    summary: "Global cybersecurity leader modernizing global pipeline generation across Zero-Trust solutions.",
    intentSignals: [
      { label: "High search frequency for automated account scoring & ICP mapping", score: "+52% Surge", date: "3 days ago" },
      { label: "Quarterly earnings announced major enterprise expansion targets", score: "Capital Infusion", date: "1 week ago" },
      { label: "Key leadership appointments in Enterprise Demand Gen", score: "Leadership Change", date: "2 weeks ago" },
    ],
    buyingCommittee: [
      { name: "Alexander Wright", title: "Head of Zero-Trust Security", verified: true, emailStatus: "Verified Direct" },
      { name: "Chloe Dupont", title: "VP Global Enterprise Marketing", verified: true, emailStatus: "Verified Direct" },
      { name: "Robert Keller", title: "Chief Revenue Officer", verified: true, emailStatus: "Verified Direct" },
    ],
    techStack: ["Prisma Cloud", "AWS", "Azure", "HubSpot Enterprise", "Snowflake", "Okta"],
    recommendedPlay: "Enterprise Zero-Trust Case Study Syndication + C-Level Peer Introduction",
  },
};

/* ─────────────────────────────────────────────
   COMPONENT PROPS
───────────────────────────────────────────── */

interface AbmAdminDashboardProps {
  adminEmail: string;
  onSignOut: () => void;
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */

export function AbmAdminDashboard({ adminEmail, onSignOut }: AbmAdminDashboardProps) {
  // Navigation State
  const [activeTab, setActiveTab] = useState<"scoring" | "explorer" | "reports" | "settings">("scoring");
  const [activeSidebar, setActiveSidebar] = useState<string>("Account Scoring");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Weights State
  const [fundingWeight, setFundingWeight] = useState<number>(7);
  const [newsWeight, setNewsWeight] = useState<number>(7);
  const [sizeWeight, setSizeWeight] = useState<number>(8);
  const [hiringWeight, setHiringWeight] = useState<number>(30);
  const [industryWeight, setIndustryWeight] = useState<number>(30);
  const [intentWeight, setIntentWeight] = useState<number>(17);

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [tierFilter, setTierFilter] = useState<"ALL" | "A" | "B" | "C">("ALL");
  const [industryFilter, setIndustryFilter] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [accounts, setAccounts] = useState<AccountRow[]>(INITIAL_ACCOUNTS);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);

  // Other tab states
  const [targetSearch, setTargetSearch] = useState("");
  const [targetStageFilter, setTargetStageFilter] = useState("ALL");
  const [titleDeptFilter, setTitleDeptFilter] = useState("ALL");
  const [emailSearch, setEmailSearch] = useState("");
  const [selectedExplorerAccount, setSelectedExplorerAccount] = useState("Snowflake Inc.");

  // Total Weight Calculation
  const totalWeight = fundingWeight + newsWeight + sizeWeight + hiringWeight + industryWeight + intentWeight;

  const handleResetWeights = () => {
    setFundingWeight(7);
    setNewsWeight(7);
    setSizeWeight(8);
    setHiringWeight(30);
    setIndustryWeight(30);
    setIntentWeight(17);
  };

  // Calculate composite score
  const scoredAccounts = useMemo(() => {
    return accounts.map((acc) => {
      const rawScore =
        (fundingWeight / 100) * acc.funding +
        (newsWeight / 100) * acc.news +
        (sizeWeight / 100) * acc.sizeFit +
        (hiringWeight / 100) * acc.hiring +
        (industryWeight / 100) * acc.industryFit +
        (intentWeight / 100) * acc.techIntent;

      const finalScore = parseFloat(rawScore.toFixed(2));
      const tier: "A" | "B" | "C" = finalScore >= 0.75 ? "A" : finalScore >= 0.65 ? "B" : "C";
      return { ...acc, compositeScore: finalScore, tier };
    });
  }, [accounts, fundingWeight, newsWeight, sizeWeight, hiringWeight, industryWeight, intentWeight]);

  const filteredAccounts = useMemo(() => {
    return scoredAccounts.filter((acc) => {
      const matchesSearch =
        acc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        acc.domain.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTier = tierFilter === "ALL" || acc.tier === tierFilter;
      const matchesIndustry =
        industryFilter === "ALL" || acc.industry.toLowerCase().includes(industryFilter.toLowerCase());
      return matchesSearch && matchesTier && matchesIndustry;
    });
  }, [scoredAccounts, searchQuery, tierFilter, industryFilter]);

  const handleExportExcel = () => {
    setDownloadToast("Preparing export with all 6 signal dimensions...");
    setTimeout(() => {
      const csv =
        "data:text/csv;charset=utf-8," +
        [
          "#,Company,Domain,Industry,Funding & Investment,Hiring Velocity,Events & News,Industry Fit,Company Size Fit,Tech / Intent Signal,Composite Score,Tier,Best-Fit Title",
          ...filteredAccounts.map(
            (a) =>
              `${a.id},"${a.name}",${a.domain},${a.industry},${a.funding},${a.hiring},${a.news},${a.industryFit},${a.sizeFit},${a.techIntent},${a.compositeScore},Tier ${a.tier},"${a.bestFitTitle}"`
          ),
        ].join("\n");
      const link = document.createElement("a");
      link.setAttribute("href", encodeURI(csv));
      link.setAttribute("download", `zbr-abm-ranked-accounts-${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadToast("Ranked Accounts exported successfully!");
      setTimeout(() => setDownloadToast(null), 3000);
    }, 600);
  };

  const handleBestFitTitleChange = (id: number, newTitle: string) => {
    setAccounts((prev) =>
      prev.map((acc) => (acc.id === id ? { ...acc, bestFitTitle: newTitle } : acc))
    );
  };

  const sidebarLinks = [
    { label: "Account Scoring", icon: Target },
    { label: "Target Accounts", icon: Users },
    { label: "Job Titles", icon: FileText },
    { label: "Email Assets", icon: Mail },
    { label: "Scoring Results", icon: BarChart3 },
    { label: "Exports", icon: Download },
  ];

  /* ── SHARED TOAST ── */
  const showToast = (msg: string) => {
    setDownloadToast(msg);
    setTimeout(() => setDownloadToast(null), 3000);
  };

  const handleSelectSidebar = (label: string) => {
    setActiveSidebar(label);
    setActiveTab("scoring");
    setMobileMenuOpen(false);
  };

  /* ─────────────────────────────────────────────
     RENDER
  ───────────────────────────────────────────── */

  return (
    <div className="min-h-screen bg-[#F4F6FC] font-sans text-slate-800 antialiased">

      {/* ══════════════════════════════════════
          LEFT SIDEBAR — FIXED TO VIEWPORT
          Never scrolls with the page content
      ══════════════════════════════════════ */}
      <aside className="fixed inset-y-0 left-0 w-64 h-screen bg-[#0C142E] text-slate-300 flex-col justify-between hidden md:flex border-r border-slate-800/60 shadow-xl overflow-y-auto z-30 select-none">
        <div>
          {/* Logo Brand Header */}
          <div className="p-5 flex items-center gap-3 border-b border-white/10">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ZoomBridge Research Home"
              className="inline-flex items-center gap-2 hover:opacity-90 transition"
            >
              <ZbrLogo light size={32} />
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1.5" aria-label="ABM Application Menu">
            {sidebarLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeSidebar === item.label && activeTab === "scoring";
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleSelectSidebar(item.label)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition text-left cursor-pointer",
                    isActive
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-900/40"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Feature Card */}
        <div className="p-4">
          <div className="rounded-2xl bg-gradient-to-br from-[#1E254A] to-[#121938] border border-indigo-500/20 p-4 text-white relative overflow-hidden shadow-lg">
            <div className="h-7 w-7 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 mb-2.5 border border-purple-500/30">
              <BarChart3 className="h-4 w-4" />
            </div>
            <h4 className="font-bold text-xs tracking-tight">Market Intelligence</h4>
            <p className="text-[11px] text-slate-300 mt-1 leading-snug">
              Research-led insights for enterprise revenue teams.
            </p>
            <Link
              href="/services"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 px-3 py-1.5 rounded-lg shadow-sm transition"
            >
              <span>Get Started</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer (if on phone/small screen) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden bg-black/60 backdrop-blur-sm">
          <div className="w-64 h-full bg-[#0C142E] text-slate-300 flex flex-col justify-between p-4">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <ZbrLogo light size={28} />
                <button type="button" onClick={() => setMobileMenuOpen(false)} className="text-white p-1">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="mt-4 space-y-1">
                {sidebarLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSidebar === item.label && activeTab === "scoring";
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => handleSelectSidebar(item.label)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold",
                        isActive ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          RIGHT CONTENT AREA
          Offset by md:pl-64 to clear the fixed sidebar
          Only this side scrolls!
      ══════════════════════════════════════ */}
      <div className="md:pl-64 flex flex-col min-h-screen">

        {/* Top App Bar — Sticky inside the content column */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 shadow-xs">
          {/* Mobile hamburger + Top Horizontal Tabs */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 mr-1"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            {[
              { id: "scoring", label: "Account Scoring", icon: Target },
              { id: "explorer", label: "Account Explorer", icon: Search },
              { id: "reports", label: "Reports", icon: FileText },
              { id: "settings", label: "Settings", icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as "scoring" | "explorer" | "reports" | "settings")}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer",
                    isActive
                      ? "bg-purple-100 text-purple-800 font-bold shadow-xs"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Top Right: Notifications + Profile */}
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => { setNotificationOpen(!notificationOpen); setProfileOpen(false); }}
                className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-3.5 w-3.5 bg-red-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                  8
                </span>
              </button>
              {notificationOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl bg-white p-3 shadow-xl border border-slate-200 text-xs z-50">
                  <div className="font-bold text-slate-900 border-b pb-2 mb-2">System Notifications (8)</div>
                  <div className="space-y-1.5 text-slate-600">
                    <p className="p-1.5 rounded bg-purple-50 text-purple-800">✓ Snowflake Inc. updated with 9 verified buyers.</p>
                    <p className="p-1.5 rounded bg-blue-50 text-blue-800">✓ 312 accounts passed Tier A qualification threshold.</p>
                    <p className="p-1.5 rounded bg-emerald-50 text-emerald-800">✓ Email sequence &ldquo;ABM Pilot Invite&rdquo; open rate: 48.2%.</p>
                    <p className="p-1.5 rounded bg-amber-50 text-amber-800">⚡ Palo Alto Networks hiring velocity spiked +23%.</p>
                    <p className="p-1.5 rounded bg-slate-50 text-slate-700">ℹ Q4 Tier A export (312 records) is ready to download.</p>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile — ZBR Sales Admin */}
            <div className="relative">
              <button
                type="button"
                onClick={() => { setProfileOpen(!profileOpen); setNotificationOpen(false); }}
                className="flex items-center gap-2 pl-2 border-l border-slate-200 hover:opacity-80 transition cursor-pointer"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                  SA
                </div>
                <div className="hidden sm:flex flex-col text-left leading-tight">
                  <span className="text-xs font-bold text-slate-900">ZBR Sales Admin</span>
                  <span className="text-[10px] text-slate-500 font-medium">{adminEmail}</span>
                </div>
                <ChevronDown className="h-3 w-3 text-slate-400 hidden sm:block" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white p-3 shadow-xl border border-slate-200 text-xs z-50">
                  <div className="flex items-center gap-3 p-2 border-b border-slate-100 mb-2">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-bold flex items-center justify-center">SA</div>
                    <div>
                      <p className="font-bold text-slate-900">ZBR Sales Admin</p>
                      <p className="text-slate-500 text-[10px]">{adminEmail}</p>
                      <span className="inline-block mt-0.5 px-1.5 py-0.5 bg-purple-100 text-purple-700 rounded text-[9px] font-bold">Super Admin</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onSignOut}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-red-600 hover:bg-red-50 font-semibold transition cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ══════════════════════════════════
            SCROLLABLE MAIN WORKSPACE
        ════════════════════════════════════ */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto flex-1">

          {/* Toast Notification */}
          {downloadToast && (
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-purple-50 border border-purple-200 text-xs text-purple-800 sticky top-16 z-30 shadow-sm animate-in fade-in">
              <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0" />
              <span>{downloadToast}</span>
            </div>
          )}

          {/* Top Banner with 3D Globe Illustration */}
          <div className="relative rounded-2xl bg-white border border-slate-200/80 p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden shadow-2xs">
            <div className="space-y-2 max-w-2xl">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Research-led B2B demand generation &amp; market intelligence.
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                We connect enterprise revenue teams to verified decision-makers, turning multi-touch intent into predictable, high-value pipeline.
              </p>
            </div>
            <div className="relative w-36 h-24 sm:w-48 sm:h-28 shrink-0">
              <Image
                src="/images/abm-scoring/login-globe.webp"
                alt="ZoomBridge B2B Global Intelligence Sphere"
                fill
                priority
                sizes="(max-width: 640px) 144px, 192px"
                className="object-contain drop-shadow-[0_8px_20px_rgba(124,58,237,0.35)]"
              />
            </div>
          </div>

          {/* ══════════════════════════════════════════════
              VIEW ROUTING:
              - If activeTab === "explorer" -> Account Explorer View
              - If activeTab === "reports" -> Reports View
              - If activeTab === "settings" -> Settings View
              - If activeTab === "scoring" -> Active Sidebar Tab
          ══════════════════════════════════════════════ */}

          {/* TOP TAB: ACCOUNT EXPLORER */}
          {activeTab === "explorer" && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Account Explorer</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Deep-dive intelligence into buying committees, tech stacks, and intent timelines.</p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedExplorerAccount}
                    onChange={(e) => setSelectedExplorerAccount(e.target.value)}
                    className="rounded-lg border border-slate-200 py-1.5 px-3 text-xs font-semibold text-slate-800 bg-white shadow-2xs"
                  >
                    <option value="Snowflake Inc.">Snowflake Inc.</option>
                    <option value="Datadog Inc.">Datadog Inc.</option>
                    <option value="Palo Alto Networks">Palo Alto Networks</option>
                  </select>
                  <button type="button" onClick={() => showToast(`Initiating ABM Campaign for ${selectedExplorerAccount}...`)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold shadow-xs">
                    <Play className="h-3.5 w-3.5" />
                    <span>Launch Campaign</span>
                  </button>
                </div>
              </div>

              {/* Account Quick Summary Card */}
              {EXPLORER_DETAILS[selectedExplorerAccount] && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  {/* Left Column: Account Profile & Tech Stack */}
                  <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-2xs space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-700 text-white font-extrabold text-sm flex items-center justify-center shadow-sm">
                        {selectedExplorerAccount.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-slate-900">{selectedExplorerAccount}</h3>
                        <p className="text-[11px] text-slate-500">Tier A High-Priority Target Account</p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {EXPLORER_DETAILS[selectedExplorerAccount].summary}
                    </p>
                    <div className="border-t border-slate-100 pt-3">
                      <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">Detected Tech Stack</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {EXPLORER_DETAILS[selectedExplorerAccount].techStack.map((tech) => (
                          <span key={tech} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-medium border border-slate-200">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="border-t border-slate-100 pt-3">
                      <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">Recommended ABM Play</h4>
                      <p className="text-xs text-purple-700 font-semibold bg-purple-50 p-2 rounded-lg border border-purple-200/60">
                        {EXPLORER_DETAILS[selectedExplorerAccount].recommendedPlay}
                      </p>
                    </div>
                  </div>

                  {/* Middle Column: Buying Committee Members */}
                  <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-sm text-slate-900">Mapped Buying Committee</h3>
                      <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">100% Verified</span>
                    </div>
                    <p className="text-[11px] text-slate-500">Directly verified decision-makers mapped to active procurement cycles.</p>
                    <div className="space-y-2.5 pt-1">
                      {EXPLORER_DETAILS[selectedExplorerAccount].buyingCommittee.map((member) => (
                        <div key={member.name} className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50">
                          <div>
                            <p className="font-bold text-xs text-slate-900">{member.name}</p>
                            <p className="text-[10px] text-slate-500">{member.title}</p>
                          </div>
                          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                            {member.emailStatus}
                          </span>
                        </div>
                      ))}
                    </div>
                    <button type="button" onClick={() => showToast(`Exported contact cards for ${selectedExplorerAccount}`)} className="w-full mt-2 text-center text-xs font-semibold text-purple-600 hover:text-purple-700 py-1.5 border border-purple-200 rounded-lg bg-purple-50/50">
                      Export Full Buying Committee (CSV)
                    </button>
                  </div>

                  {/* Right Column: Intent Timeline */}
                  <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-sm text-slate-900">Active Intent Signals</h3>
                      <Activity className="h-4 w-4 text-purple-600" />
                    </div>
                    <p className="text-[11px] text-slate-500">Real-time intent surges detected across syndicate review &amp; job boards.</p>
                    <div className="space-y-3 pt-1">
                      {EXPLORER_DETAILS[selectedExplorerAccount].intentSignals.map((signal, idx) => (
                        <div key={idx} className="border-l-2 border-purple-500 pl-3 space-y-0.5">
                          <p className="text-xs font-semibold text-slate-800">{signal.label}</p>
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="font-bold text-purple-700">{signal.score}</span>
                            <span className="text-slate-400">{signal.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TOP TAB: REPORTS */}
          {activeTab === "reports" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Enterprise Reports</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Executive pipeline attribution and account engagement metrics.</p>
                </div>
                <button type="button" onClick={() => showToast("Exporting comprehensive ABM PDF Report...")} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold shadow-xs">
                  <Download className="h-3.5 w-3.5" />
                  <span>Download PDF Report</span>
                </button>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Total Qualified Pipeline", val: "$48.2M", change: "+32.4% vs Q3", color: "text-emerald-600" },
                  { label: "Avg Enterprise Deal Size", val: "$142K", change: "+18.0% YoY", color: "text-emerald-600" },
                  { label: "Sales Cycle Velocity", val: "46 Days", change: "-14 days faster", color: "text-purple-600" },
                  { label: "Win-Rate Lift", val: "3.4x", change: "Tier A vs unsegmented", color: "text-blue-600" },
                ].map((kpi) => (
                  <div key={kpi.label} className="rounded-xl bg-white border border-slate-200/80 p-4 shadow-2xs space-y-1">
                    <span className="text-[11px] text-slate-500 font-medium">{kpi.label}</span>
                    <p className="text-xl font-extrabold text-slate-900">{kpi.val}</p>
                    <span className={cn("text-[10px] font-bold block", kpi.color)}>{kpi.change}</span>
                  </div>
                ))}
              </div>

              {/* Funnel Section */}
              <div className="rounded-2xl bg-white border border-slate-200/80 p-6 shadow-2xs space-y-4">
                <h3 className="font-bold text-sm text-slate-900">ABM Account Conversion Funnel</h3>
                <div className="space-y-3">
                  {[
                    { stage: "Total Accounts Scored", count: "1,248 Accounts", pct: "100%", width: "100%", color: "bg-blue-600" },
                    { stage: "Tier A (High-Fit Threshold ≥ 0.75)", count: "312 Accounts", pct: "25.0%", width: "75%", color: "bg-purple-600" },
                    { stage: "Multi-Touch Buyer Engagement Active", count: "148 Accounts", pct: "11.8%", width: "50%", color: "bg-indigo-600" },
                    { stage: "Pipeline Opportunities Created", count: "42 Accounts", pct: "3.3%", width: "25%", color: "bg-emerald-600" },
                  ].map((step) => (
                    <div key={step.stage} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-800">{step.stage}</span>
                        <span className="font-bold text-slate-900">{step.count} ({step.pct})</span>
                      </div>
                      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className={cn("h-full rounded-full transition-all duration-500", step.color)} style={{ width: step.width }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TOP TAB: SETTINGS */}
          {activeTab === "settings" && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Platform Settings</h2>
                <p className="text-xs text-slate-500 mt-0.5">Configure CRM synchronizations, scoring threshold presets, and security keys.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* CRM Integrations */}
                <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-2xs space-y-3">
                  <h3 className="font-bold text-sm text-slate-900">Active Data Integrations</h3>
                  <div className="space-y-2.5">
                    {[
                      { name: "Salesforce CRM", desc: "Two-way account and opportunity sync", status: "Connected", ping: "Synced 4m ago" },
                      { name: "HubSpot Marketing", desc: "Outbound campaign enrollment automation", status: "Connected", ping: "Synced 12m ago" },
                      { name: "6sense Intent Network", desc: "Third-party keyword surge ingestion", status: "Connected", ping: "Synced 1h ago" },
                      { name: "Outreach.io", desc: "Automated sequence trigger for Tier A buyers", status: "Connected", ping: "Synced 22m ago" },
                    ].map((integ) => (
                      <div key={integ.name} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                        <div>
                          <p className="font-bold text-xs text-slate-900">{integ.name}</p>
                          <p className="text-[10px] text-slate-500">{integ.desc}</p>
                        </div>
                        <div className="text-right">
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                            <Check className="h-2.5 w-2.5" />
                            {integ.status}
                          </span>
                          <span className="block text-[9px] text-slate-400 mt-0.5">{integ.ping}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security & Access */}
                <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-2xs space-y-4">
                  <h3 className="font-bold text-sm text-slate-900">Enterprise Security &amp; Credentials</h3>
                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="text-slate-500 font-medium block">Authorized Administrator Account</span>
                      <p className="font-mono font-bold text-slate-900 text-xs mt-0.5">{adminEmail}</p>
                    </div>
                    <div>
                      <span className="text-slate-500 font-medium block">Session Security Level</span>
                      <p className="font-semibold text-emerald-700 mt-0.5 flex items-center gap-1">
                        <ShieldCheck className="h-4 w-4" />
                        256-Bit SSL Encrypted Admin Session
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-500 font-medium block">API Key (Production)</span>
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="password"
                          readOnly
                          value="zbr_live_sk_9482930491823901"
                          className="bg-slate-100 font-mono text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 w-full"
                        />
                        <button type="button" onClick={() => showToast("API Key copied to clipboard.")} className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800">
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TOP TAB: ACCOUNT SCORING (DEFAULT WORKSPACE) */}
          {activeTab === "scoring" && (
            <>
              {/* ══════════════════════════════════
                  SIDEBAR TAB 1: ACCOUNT SCORING
              ════════════════════════════════════ */}
              {activeSidebar === "Account Scoring" && (
                <>
                  {/* Section Header & Metrics Bar */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Account Scoring</h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Upload your data, set scoring weights, and get a ranked list of best-fit accounts.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { icon: Layers, color: "bg-blue-50 text-blue-600 border-blue-100", val: "5", label: "Input Datasets" },
                        { icon: Building2, color: "bg-purple-50 text-purple-600 border-purple-100", val: "1,248", label: "Accounts Scored" },
                        { icon: Target, color: "bg-emerald-50 text-emerald-600 border-emerald-100", val: "312", label: "High Fit (A Tier)" },
                        { icon: TrendingUp, color: "bg-indigo-50 text-indigo-600 border-indigo-100", val: "0.76", label: "Avg. Score" },
                      ].map(({ icon: Icon, color, val, label }) => (
                        <div key={label} className="rounded-xl bg-white border border-slate-200/80 p-3 shadow-2xs flex items-center gap-3">
                          <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center border", color)}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <span className="block text-sm font-extrabold text-slate-900">{val}</span>
                            <span className="text-[10px] text-slate-500 font-medium">{label}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step 1: Upload Your Inputs */}
                  <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-2xs space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white text-[11px] font-bold">1</span>
                      <h3 className="font-bold text-sm text-slate-900">Upload Your Inputs</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { icon: Database, color: "text-purple-600", label: "Target Account List", desc: "CSV with company, domain, or both", file: "target_accounts.csv", meta: "12 accounts · 6.2 KB" },
                        { icon: Users, color: "text-blue-600", label: "Job Titles", desc: "CSV with one title per line", file: "job_titles.csv", meta: "12 titles · 4.1 KB" },
                        { icon: Mail, color: "text-indigo-600", label: "Email Assets", desc: "CSV with name and topic/persona", file: "email_assets.csv", meta: "8 assets · 5.8 KB" },
                      ].map(({ icon: Icon, color, label, desc, file, meta }) => (
                        <div key={label} className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-2.5">
                          <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                            <Icon className={cn("h-4 w-4", color)} />
                            <span>{label}</span>
                          </div>
                          <p className="text-[11px] text-slate-500">{desc}</p>
                          <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-2 text-xs">
                            <div className="flex items-center gap-2 text-slate-700">
                              <FileSpreadsheet className="h-4 w-4 text-slate-400" />
                              <div>
                                <span className="font-semibold block text-[11px]">{file}</span>
                                <span className="text-[10px] text-slate-400">{meta}</span>
                              </div>
                            </div>
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => showToast("Building real-time scoring table with latest signal weights...")}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:from-purple-500 hover:to-indigo-500 transition cursor-pointer"
                        >
                          <Play className="h-3 w-3 fill-white" />
                          <span>Build Scoring Table</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setAccounts(INITIAL_ACCOUNTS)}
                          className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                        >
                          Load Account Data
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => setAccounts([])}
                        className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-red-600 transition cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Clear All</span>
                      </button>
                    </div>
                  </div>

                  {/* Step 2: Scoring Weights */}
                  <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-2xs space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white text-[11px] font-bold">2</span>
                        <div>
                          <h3 className="font-bold text-sm text-slate-900">Set Your Scoring Weights</h3>
                          <p className="text-[11px] text-slate-500">Adjust the importance of each signal. Total weight is 100%.</p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleResetWeights}
                        className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-purple-600 transition cursor-pointer"
                      >
                        <RotateCcw className="h-3 w-3" />
                        <span>Reset to Default</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                      <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        {[
                          { label: "Funding & Investment", desc: "Recent raises, budget expansion", val: fundingWeight, setter: setFundingWeight },
                          { label: "Hiring Velocity", desc: "Open roles matching your titles", val: hiringWeight, setter: setHiringWeight },
                          { label: "Events & News", desc: "Launches, expansions, leadership change", val: newsWeight, setter: setNewsWeight },
                          { label: "Industry Fit", desc: "Matches your ideal customer profile", val: industryWeight, setter: setIndustryWeight },
                          { label: "Company Size Fit", desc: "Headcount / revenue in target range", val: sizeWeight, setter: setSizeWeight },
                          { label: "Tech / Intent Signal", desc: "Stack, content engagement, review activity", val: intentWeight, setter: setIntentWeight },
                        ].map(({ label, desc, val, setter }) => (
                          <div key={label} className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-slate-800">{label}</span>
                              <span className="font-mono font-bold text-slate-900">{val}%</span>
                            </div>
                            <p className="text-[10px] text-slate-400">{desc}</p>
                            <input
                              type="range"
                              min={0}
                              max={50}
                              value={val}
                              onChange={(e) => setter(Number(e.target.value))}
                              className="w-full accent-purple-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                            />
                          </div>
                        ))}
                      </div>

                      {/* Donut Gauge */}
                      <div className="lg:col-span-3 flex flex-col items-center justify-center p-3">
                        <div className="relative flex items-center justify-center h-28 w-28">
                          <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="40" className="text-slate-100" strokeWidth="8" stroke="currentColor" fill="transparent" />
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              className={cn(
                                "transition-all duration-300",
                                totalWeight === 100 ? "text-blue-500" : "text-amber-500"
                              )}
                              strokeWidth="8"
                              strokeDasharray={251.2}
                              strokeDashoffset={251.2 - (Math.min(totalWeight, 100) / 100) * 251.2}
                              strokeLinecap="round"
                              stroke="currentColor"
                              fill="transparent"
                            />
                          </svg>
                          <div className="absolute flex flex-col items-center justify-center text-center">
                            <span className="text-base font-extrabold text-slate-900">{totalWeight}%</span>
                            <span className="text-[9px] text-slate-400 font-semibold uppercase">Total Weight</span>
                          </div>
                        </div>
                        {totalWeight !== 100 && (
                          <p className="text-[10px] text-amber-600 font-medium mt-1 text-center">Adjust to reach 100%</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Score Each Account */}
                  <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-2xs space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white text-[11px] font-bold">3</span>
                        <div>
                          <h3 className="font-bold text-sm text-slate-900">Score Each Account</h3>
                          <p className="text-[11px] text-slate-500">Weighted average of all six signals, shown on a 0.1 – 0.9 scale.</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <div className="relative">
                          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search company or domain..."
                            className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs w-48 sm:w-56 focus:outline-none focus:ring-1 focus:ring-purple-500"
                          />
                        </div>

                        <select
                          value={tierFilter}
                          onChange={(e) => setTierFilter(e.target.value as "ALL" | "A" | "B" | "C")}
                          className="rounded-lg border border-slate-200 py-1.5 px-2.5 text-xs text-slate-700 bg-white"
                        >
                          <option value="ALL">All Tiers</option>
                          <option value="A">Tier A (High Fit)</option>
                          <option value="B">Tier B (Targeted)</option>
                          <option value="C">Tier C (Monitor)</option>
                        </select>

                        <select
                          value={industryFilter}
                          onChange={(e) => setIndustryFilter(e.target.value)}
                          className="rounded-lg border border-slate-200 py-1.5 px-2.5 text-xs text-slate-700 bg-white"
                        >
                          <option value="ALL">All Industries</option>
                          <option value="Healthcare">Healthcare</option>
                          <option value="Robotics">Robotics</option>
                          <option value="Logistics">Logistics</option>
                          <option value="Analytics">Analytics</option>
                          <option value="Payments">Payments</option>
                          <option value="Cloud">Cloud &amp; Data</option>
                          <option value="Cybersecurity">Cybersecurity</option>
                        </select>

                        <button
                          type="button"
                          onClick={() => showToast("Recalculating account signals with latest intelligence...")}
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs flex items-center gap-1 cursor-pointer"
                          title="Refresh Estimates"
                        >
                          <RefreshCw className="h-3.5 w-3.5" />
                          <span className="hidden xl:inline text-xs">Refresh Estimates</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleExportExcel}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-xs hover:from-purple-500 hover:to-indigo-500 transition cursor-pointer"
                        >
                          <Download className="h-3.5 w-3.5" />
                          <span>Export Ranked Excel</span>
                        </button>
                      </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto rounded-xl border border-slate-200">
                      <table className="w-full min-w-[950px] text-left text-xs">
                        <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                          <tr>
                            <th className="py-3 px-3 w-8">#</th>
                            <th className="py-3 px-3">Company</th>
                            <th className="py-3 px-3">Domain</th>
                            <th className="py-3 px-3">Industry</th>
                            <th className="py-3 px-2 text-center">Funding &amp; Inv.</th>
                            <th className="py-3 px-2 text-center">Hiring Vel.</th>
                            <th className="py-3 px-2 text-center">Events &amp; News</th>
                            <th className="py-3 px-2 text-center">Industry Fit</th>
                            <th className="py-3 px-2 text-center">Size Fit</th>
                            <th className="py-3 px-2 text-center">Tech / Intent</th>
                            <th className="py-3 px-3 text-center font-bold text-slate-800">Score &darr;</th>
                            <th className="py-3 px-2 text-center">Tier</th>
                            <th className="py-3 px-3">Best-Fit Title</th>
                            <th className="py-3 px-3 text-center">Notes</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {filteredAccounts.map((acc, index) => (
                            <tr key={acc.id} className="hover:bg-slate-50/80 transition">
                              <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">{index + 1}</td>
                              <td className="py-3 px-3 font-bold text-slate-900">
                                <div className="flex items-center gap-2">
                                  <div className="h-6 w-6 rounded bg-gradient-to-tr from-blue-500 to-indigo-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                                    {acc.name.charAt(0)}
                                  </div>
                                  <span className="truncate max-w-[150px]">{acc.name}</span>
                                </div>
                              </td>
                              <td className="py-3 px-3">
                                <a
                                  href={`https://${acc.domain}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-slate-600 hover:text-purple-600 transition"
                                >
                                  <span>{acc.domain}</span>
                                  <ExternalLink className="h-3 w-3 text-slate-400" />
                                </a>
                              </td>
                              <td className="py-3 px-3">
                                <span className={cn("inline-block rounded-md px-2 py-0.5 text-[10px] font-semibold border", acc.industryColor)}>
                                  {acc.industry}
                                </span>
                              </td>
                              <td className="py-3 px-2 text-center font-mono text-slate-600">{acc.funding.toFixed(2)}</td>
                              <td className="py-3 px-2 text-center font-mono text-slate-600">{acc.hiring.toFixed(2)}</td>
                              <td className="py-3 px-2 text-center font-mono text-slate-600">{acc.news.toFixed(2)}</td>
                              <td className="py-3 px-2 text-center font-mono text-slate-600">{acc.industryFit.toFixed(2)}</td>
                              <td className="py-3 px-2 text-center font-mono text-slate-600">{acc.sizeFit.toFixed(2)}</td>
                              <td className="py-3 px-2 text-center font-mono text-slate-600">{acc.techIntent.toFixed(2)}</td>
                              <td className="py-3 px-3 text-center">
                                <div className="flex flex-col items-center">
                                  <span className="font-mono font-bold text-slate-900 text-xs">{acc.compositeScore.toFixed(2)}</span>
                                  <div className="w-10 h-1 rounded-full bg-slate-100 mt-0.5 overflow-hidden">
                                    <div
                                      className={cn(
                                        "h-full rounded-full",
                                        acc.compositeScore >= 0.75 ? "bg-emerald-500" : acc.compositeScore >= 0.65 ? "bg-amber-500" : "bg-rose-500"
                                      )}
                                      style={{ width: `${acc.compositeScore * 100}%` }}
                                    />
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-2 text-center">
                                <span
                                  className={cn(
                                    "inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold",
                                    acc.tier === "A" ? "bg-emerald-100 text-emerald-800" : acc.tier === "B" ? "bg-amber-100 text-amber-800" : "bg-rose-100 text-rose-800"
                                  )}
                                >
                                  {acc.tier}
                                </span>
                              </td>
                              <td className="py-3 px-3">
                                <select
                                  value={acc.bestFitTitle}
                                  onChange={(e) => handleBestFitTitleChange(acc.id, e.target.value)}
                                  className="w-full text-[11px] rounded border border-slate-200 py-1 px-1.5 bg-slate-50/60 text-slate-700 focus:bg-white"
                                >
                                  {acc.titleOptions.map((opt) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                  ))}
                                </select>
                              </td>
                              <td className="py-3 px-3 text-center">
                                <div className="flex items-center justify-center gap-1 text-slate-400">
                                  <button type="button" className="p-1 hover:text-purple-600 transition" title="View notes">
                                    <MessageSquare className="h-3.5 w-3.5" />
                                  </button>
                                  <button type="button" className="p-1 hover:text-slate-700 transition" title="More actions">
                                    <MoreVertical className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs text-slate-500">
                      <span>Showing 1–{filteredAccounts.length} of 1,248 accounts</span>
                      <div className="flex items-center gap-1 font-mono">
                        <button
                          type="button"
                          className="h-7 w-7 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-100 disabled:opacity-50 cursor-pointer"
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="h-3.5 w-3.5" />
                        </button>
                        {[1, 2, 3, 4, 5].map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => setCurrentPage(p)}
                            className={cn(
                              "h-7 w-7 rounded flex items-center justify-center cursor-pointer",
                              currentPage === p ? "bg-purple-700 text-white font-bold" : "border border-slate-200 hover:bg-slate-100 text-slate-700"
                            )}
                          >
                            {p}
                          </button>
                        ))}
                        <span className="px-1 text-slate-400">...</span>
                        <button type="button" className="h-7 w-9 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-700 text-[11px]">250</button>
                        <button
                          type="button"
                          onClick={() => setCurrentPage((p) => p + 1)}
                          className="h-7 w-7 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-100 cursor-pointer"
                        >
                          <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* ══════════════════════════════════
                  SIDEBAR TAB 2: TARGET ACCOUNTS
              ════════════════════════════════════ */}
              {activeSidebar === "Target Accounts" && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Target Accounts</h2>
                      <p className="text-xs text-slate-500 mt-0.5">Firmographic universe of validated enterprise accounts in your ICP.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => showToast("Add Account feature ready — modal opened.")}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:from-purple-500 hover:to-indigo-500 transition cursor-pointer"
                    >
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span>Add Account</span>
                    </button>
                  </div>

                  {/* Summary Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { icon: Building2, color: "bg-blue-50 text-blue-600 border-blue-100", val: "12", label: "Total Accounts" },
                      { icon: CheckCircle2, color: "bg-emerald-50 text-emerald-600 border-emerald-100", val: "5", label: "Qualified" },
                      { icon: Activity, color: "bg-purple-50 text-purple-600 border-purple-100", val: "4", label: "Engaged" },
                      { icon: Globe, color: "bg-indigo-50 text-indigo-600 border-indigo-100", val: "3", label: "Prospecting" },
                    ].map(({ icon: Icon, color, val, label }) => (
                      <div key={label} className="rounded-xl bg-white border border-slate-200/80 p-3 shadow-2xs flex items-center gap-3">
                        <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center border", color)}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <span className="block text-sm font-extrabold text-slate-900">{val}</span>
                          <span className="text-[10px] text-slate-500 font-medium">{label}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Filters */}
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                      <input
                        type="text"
                        value={targetSearch}
                        onChange={(e) => setTargetSearch(e.target.value)}
                        placeholder="Search accounts..."
                        className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs w-48 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                    </div>
                    <select
                      value={targetStageFilter}
                      onChange={(e) => setTargetStageFilter(e.target.value)}
                      className="rounded-lg border border-slate-200 py-1.5 px-2.5 text-xs text-slate-700 bg-white"
                    >
                      <option value="ALL">All Stages</option>
                      <option value="Prospecting">Prospecting</option>
                      <option value="Engaged">Engaged</option>
                      <option value="Qualified">Qualified</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => showToast("Syncing account data from ZBR intelligence network...")}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-xs hover:bg-slate-50 cursor-pointer"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      <span>Sync</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => showToast("Exporting target accounts list...")}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-xs hover:bg-slate-50 cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Export</span>
                    </button>
                  </div>

                  {/* Table */}
                  <div className="rounded-2xl bg-white border border-slate-200/80 shadow-2xs overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[900px] text-xs text-left">
                        <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                          <tr>
                            <th className="py-3 px-4">Company</th>
                            <th className="py-3 px-3">Website</th>
                            <th className="py-3 px-3">Industry</th>
                            <th className="py-3 px-3">HQ</th>
                            <th className="py-3 px-3 text-center">Employees</th>
                            <th className="py-3 px-3 text-center">Revenue</th>
                            <th className="py-3 px-3 text-center">ICP Score</th>
                            <th className="py-3 px-3 text-center">Stage</th>
                            <th className="py-3 px-3">Owner</th>
                            <th className="py-3 px-3 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {TARGET_ACCOUNTS
                            .filter((a) =>
                              (targetSearch === "" || a.company.toLowerCase().includes(targetSearch.toLowerCase()) || a.website.toLowerCase().includes(targetSearch.toLowerCase())) &&
                              (targetStageFilter === "ALL" || a.stage === targetStageFilter)
                            )
                            .map((account) => (
                              <tr key={account.id} className="hover:bg-slate-50/80 transition">
                                <td className="py-3 px-4 font-bold text-slate-900">
                                  <div className="flex items-center gap-2">
                                    <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0">
                                      {account.company.charAt(0)}
                                    </div>
                                    <span>{account.company}</span>
                                  </div>
                                </td>
                                <td className="py-3 px-3">
                                  <a href={`https://${account.website}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-slate-600 hover:text-purple-600">
                                    {account.website} <ExternalLink className="h-3 w-3" />
                                  </a>
                                </td>
                                <td className="py-3 px-3 text-slate-600">{account.industry}</td>
                                <td className="py-3 px-3">
                                  <div className="flex items-center gap-1 text-slate-600">
                                    <MapPin className="h-3 w-3 text-slate-400" />
                                    {account.hq}
                                  </div>
                                </td>
                                <td className="py-3 px-3 text-center text-slate-600">{account.employees}</td>
                                <td className="py-3 px-3 text-center font-semibold text-slate-700">{account.revenue}</td>
                                <td className="py-3 px-3 text-center">
                                  <div className="flex flex-col items-center">
                                    <span className="font-bold text-slate-900">{account.icpScore}</span>
                                    <div className="w-12 h-1 rounded bg-slate-100 mt-0.5 overflow-hidden">
                                      <div
                                        className={cn(
                                          "h-full rounded",
                                          account.icpScore >= 85 ? "bg-emerald-500" : account.icpScore >= 75 ? "bg-amber-500" : "bg-rose-400"
                                        )}
                                        style={{ width: `${account.icpScore}%` }}
                                      />
                                    </div>
                                  </div>
                                </td>
                                <td className="py-3 px-3 text-center">
                                  <span
                                    className={cn(
                                      "inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold",
                                      account.stage === "Qualified" ? "bg-emerald-100 text-emerald-800" :
                                      account.stage === "Engaged" ? "bg-blue-100 text-blue-800" :
                                      "bg-slate-100 text-slate-700"
                                    )}
                                  >
                                    {account.stage}
                                  </span>
                                </td>
                                <td className="py-3 px-3 text-slate-600 font-mono text-[11px]">{account.owner}</td>
                                <td className="py-3 px-3">
                                  <div className="flex items-center justify-center gap-1">
                                    <button type="button" onClick={() => showToast(`Viewing profile: ${account.company}`)} className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-purple-600 transition" title="View Profile">
                                      <Eye className="h-3.5 w-3.5" />
                                    </button>
                                    <button type="button" onClick={() => showToast(`${account.company} added to active campaign.`)} className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-blue-600 transition" title="Add to Campaign">
                                      <Share2 className="h-3.5 w-3.5" />
                                    </button>
                                    <button type="button" onClick={() => showToast(`${account.company} removed from list.`)} className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-red-600 transition" title="Remove">
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ══════════════════════════════════
                  SIDEBAR TAB 3: JOB TITLES
              ════════════════════════════════════ */}
              {activeSidebar === "Job Titles" && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Job Titles</h2>
                      <p className="text-xs text-slate-500 mt-0.5">Manage and score ICP-aligned buyer titles across your target universe.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => showToast("Add Title panel opened.")}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:from-purple-500 hover:to-indigo-500 transition cursor-pointer"
                    >
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span>Add Title</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { icon: FileText, color: "bg-blue-50 text-blue-600 border-blue-100", val: "12", label: "Total Titles" },
                      { icon: CheckCircle2, color: "bg-emerald-50 text-emerald-600 border-emerald-100", val: "10", label: "Active" },
                      { icon: Briefcase, color: "bg-purple-50 text-purple-600 border-purple-100", val: "3,881", label: "Accounts Using" },
                      { icon: TrendingUp, color: "bg-indigo-50 text-indigo-600 border-indigo-100", val: "82%", label: "Avg ICP Match" },
                    ].map(({ icon: Icon, color, val, label }) => (
                      <div key={label} className="rounded-xl bg-white border border-slate-200/80 p-3 shadow-2xs flex items-center gap-3">
                        <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center border", color)}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <span className="block text-sm font-extrabold text-slate-900">{val}</span>
                          <span className="text-[10px] text-slate-500 font-medium">{label}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <select
                      value={titleDeptFilter}
                      onChange={(e) => setTitleDeptFilter(e.target.value)}
                      className="rounded-lg border border-slate-200 py-1.5 px-2.5 text-xs text-slate-700 bg-white"
                    >
                      <option value="ALL">All Departments</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Revenue Ops">Revenue Ops</option>
                      <option value="Sales">Sales</option>
                      <option value="Engineering">Engineering</option>
                      <option value="IT / Security">IT / Security</option>
                      <option value="Procurement">Procurement</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => showToast("Exporting job titles list...")}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-xs hover:bg-slate-50 cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Export</span>
                    </button>
                  </div>

                  <div className="rounded-2xl bg-white border border-slate-200/80 shadow-2xs overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[700px] text-xs text-left">
                        <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                          <tr>
                            <th className="py-3 px-4">Title Name</th>
                            <th className="py-3 px-3">Department</th>
                            <th className="py-3 px-3">Seniority</th>
                            <th className="py-3 px-3 text-center">ICP Match %</th>
                            <th className="py-3 px-3 text-center">Accounts Using</th>
                            <th className="py-3 px-3 text-center">Status</th>
                            <th className="py-3 px-3 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {JOB_TITLES
                            .filter((t) => titleDeptFilter === "ALL" || t.department === titleDeptFilter)
                            .map((title) => (
                              <tr key={title.id} className="hover:bg-slate-50/80 transition">
                                <td className="py-3 px-4 font-semibold text-slate-900">{title.title}</td>
                                <td className="py-3 px-3 text-slate-600">{title.department}</td>
                                <td className="py-3 px-3">
                                  <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-medium">{title.seniority}</span>
                                </td>
                                <td className="py-3 px-3 text-center">
                                  <div className="flex flex-col items-center">
                                    <span className="font-bold text-slate-900">{title.icpMatch}%</span>
                                    <div className="w-12 h-1 rounded bg-slate-100 mt-0.5 overflow-hidden">
                                      <div className="h-full bg-purple-500 rounded" style={{ width: `${title.icpMatch}%` }} />
                                    </div>
                                  </div>
                                </td>
                                <td className="py-3 px-3 text-center font-semibold text-slate-700">{title.accountsUsing.toLocaleString()}</td>
                                <td className="py-3 px-3 text-center">
                                  <span className={cn("inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold", title.status === "Active" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500")}>
                                    {title.status}
                                  </span>
                                </td>
                                <td className="py-3 px-3">
                                  <div className="flex items-center justify-center gap-1">
                                    <button type="button" onClick={() => showToast(`Editing: ${title.title}`)} className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-purple-600 transition" title="Edit">
                                      <Sliders className="h-3.5 w-3.5" />
                                    </button>
                                    <button type="button" onClick={() => showToast(`${title.title} archived.`)} className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-amber-600 transition" title="Archive">
                                      <Archive className="h-3.5 w-3.5" />
                                    </button>
                                    <button type="button" onClick={() => showToast(`${title.title} removed.`)} className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-red-600 transition" title="Delete">
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ══════════════════════════════════
                  SIDEBAR TAB 4: EMAIL ASSETS
              ════════════════════════════════════ */}
              {activeSidebar === "Email Assets" && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Email Assets</h2>
                      <p className="text-xs text-slate-500 mt-0.5">Enterprise outbound sequences, performance analytics, and persona mapping.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => showToast("New Email Asset builder opened.")}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:from-purple-500 hover:to-indigo-500 transition cursor-pointer"
                    >
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span>New Asset</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { icon: Mail, color: "bg-blue-50 text-blue-600 border-blue-100", val: "8", label: "Active Sequences" },
                      { icon: Activity, color: "bg-purple-50 text-purple-600 border-purple-100", val: "34.6%", label: "Avg Open Rate" },
                      { icon: TrendingUp, color: "bg-emerald-50 text-emerald-600 border-emerald-100", val: "8.5%", label: "Avg Click Rate" },
                      { icon: Users, color: "bg-indigo-50 text-indigo-600 border-indigo-100", val: "14,205", label: "Total Sends" },
                    ].map(({ icon: Icon, color, val, label }) => (
                      <div key={label} className="rounded-xl bg-white border border-slate-200/80 p-3 shadow-2xs flex items-center gap-3">
                        <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center border", color)}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <span className="block text-sm font-extrabold text-slate-900">{val}</span>
                          <span className="text-[10px] text-slate-500 font-medium">{label}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                      <input
                        type="text"
                        value={emailSearch}
                        onChange={(e) => setEmailSearch(e.target.value)}
                        placeholder="Search assets..."
                        className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs w-56 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => showToast("Exporting email asset library...")}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 text-xs hover:bg-slate-50 cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Export Library</span>
                    </button>
                  </div>

                  <div className="rounded-2xl bg-white border border-slate-200/80 shadow-2xs overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[900px] text-xs text-left">
                        <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                          <tr>
                            <th className="py-3 px-4">Asset Name</th>
                            <th className="py-3 px-3">Persona</th>
                            <th className="py-3 px-3">Subject Line</th>
                            <th className="py-3 px-3 text-center">Open Rate</th>
                            <th className="py-3 px-3 text-center">Click Rate</th>
                            <th className="py-3 px-3 text-center">Sent</th>
                            <th className="py-3 px-3">Created</th>
                            <th className="py-3 px-3 text-center">Status</th>
                            <th className="py-3 px-3 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {EMAIL_ASSETS
                            .filter((a) => emailSearch === "" || a.name.toLowerCase().includes(emailSearch.toLowerCase()) || a.persona.toLowerCase().includes(emailSearch.toLowerCase()))
                            .map((asset) => (
                              <tr key={asset.id} className="hover:bg-slate-50/80 transition">
                                <td className="py-3 px-4 font-semibold text-slate-900 max-w-[180px] truncate">{asset.name}</td>
                                <td className="py-3 px-3">
                                  <span className="inline-block px-2 py-0.5 bg-purple-50 text-purple-700 border border-purple-200 rounded text-[10px] font-medium">{asset.persona}</span>
                                </td>
                                <td className="py-3 px-3 text-slate-600 max-w-[220px] truncate italic text-[11px]">&ldquo;{asset.subject}&rdquo;</td>
                                <td className="py-3 px-3 text-center">
                                  <div className="flex flex-col items-center">
                                    <span className="font-bold text-slate-900">{asset.openRate}%</span>
                                    <div className="w-10 h-1 rounded bg-slate-100 mt-0.5 overflow-hidden">
                                      <div className="h-full bg-blue-500 rounded" style={{ width: `${asset.openRate}%` }} />
                                    </div>
                                  </div>
                                </td>
                                <td className="py-3 px-3 text-center">
                                  <div className="flex flex-col items-center">
                                    <span className="font-bold text-slate-900">{asset.clickRate}%</span>
                                    <div className="w-10 h-1 rounded bg-slate-100 mt-0.5 overflow-hidden">
                                      <div className="h-full bg-emerald-500 rounded" style={{ width: `${asset.clickRate * 5}%` }} />
                                    </div>
                                  </div>
                                </td>
                                <td className="py-3 px-3 text-center font-semibold text-slate-700">{asset.sent.toLocaleString()}</td>
                                <td className="py-3 px-3 text-slate-500 text-[11px]">{asset.created}</td>
                                <td className="py-3 px-3 text-center">
                                  <span className={cn("inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold", asset.status === "Active" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500")}>
                                    {asset.status}
                                  </span>
                                </td>
                                <td className="py-3 px-3">
                                  <div className="flex items-center justify-center gap-1">
                                    <button type="button" onClick={() => showToast(`Previewing: ${asset.name}`)} className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-purple-600" title="Preview">
                                      <Eye className="h-3.5 w-3.5" />
                                    </button>
                                    <button type="button" onClick={() => showToast(`${asset.name} cloned successfully.`)} className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-blue-600" title="Clone">
                                      <Copy className="h-3.5 w-3.5" />
                                    </button>
                                    <button type="button" onClick={() => showToast(`${asset.name} archived.`)} className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-amber-600" title="Archive">
                                      <Archive className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ══════════════════════════════════
                  SIDEBAR TAB 5: SCORING RESULTS
              ════════════════════════════════════ */}
              {activeSidebar === "Scoring Results" && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Scoring Results</h2>
                      <p className="text-xs text-slate-500 mt-0.5">Analytics overview of the entire scored account universe.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => showToast("Generating scoring report PDF...")}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:from-purple-500 hover:to-indigo-500 transition cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Export Report</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { icon: Building2, color: "bg-blue-50 text-blue-600 border-blue-100", val: "1,248", label: "Accounts Scored" },
                      { icon: Target, color: "bg-emerald-50 text-emerald-600 border-emerald-100", val: "312", label: "Tier A (High Fit)" },
                      { icon: TrendingUp, color: "bg-purple-50 text-purple-600 border-purple-100", val: "0.76", label: "Avg Score" },
                      { icon: Mail, color: "bg-indigo-50 text-indigo-600 border-indigo-100", val: "847", label: "Contacted" },
                    ].map(({ icon: Icon, color, val, label }) => (
                      <div key={label} className="rounded-xl bg-white border border-slate-200/80 p-3 shadow-2xs flex items-center gap-3">
                        <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center border", color)}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <span className="block text-sm font-extrabold text-slate-900">{val}</span>
                          <span className="text-[10px] text-slate-500 font-medium">{label}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {/* Tier Breakdown Donut */}
                    <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-2xs">
                      <h3 className="font-bold text-sm text-slate-900 mb-4">Tier Distribution</h3>
                      <div className="flex items-center justify-around gap-4">
                        <div className="relative h-32 w-32 flex-shrink-0">
                          <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="38" fill="transparent" stroke="#f1f5f9" strokeWidth="12" />
                            <circle cx="50" cy="50" r="38" fill="transparent" stroke="#10b981" strokeWidth="12" strokeDasharray="239.0" strokeDashoffset={239 - 239 * 0.25} strokeLinecap="butt" />
                            <circle cx="50" cy="50" r="38" fill="transparent" stroke="#f59e0b" strokeWidth="12" strokeDasharray="239.0" strokeDashoffset={239 - 239 * 0.39} strokeLinecap="butt" style={{ transform: "rotate(90deg)", transformOrigin: "50% 50%" }} />
                            <circle cx="50" cy="50" r="38" fill="transparent" stroke="#f87171" strokeWidth="12" strokeDasharray="239.0" strokeDashoffset={239 - 239 * 0.36} strokeLinecap="butt" style={{ transform: "rotate(230.4deg)", transformOrigin: "50% 50%" }} />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                            <span className="text-sm font-extrabold text-slate-900">1,248</span>
                            <span className="text-[9px] text-slate-400 uppercase font-semibold">Accounts</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          {[
                            { tier: "A", count: 312, pct: "25%", color: "bg-emerald-500", label: "High Fit" },
                            { tier: "B", count: 487, pct: "39%", color: "bg-amber-400", label: "Targeted" },
                            { tier: "C", count: 449, pct: "36%", color: "bg-rose-400", label: "Monitor" },
                          ].map(({ tier, count, pct, color, label }) => (
                            <div key={tier} className="flex items-center gap-2.5">
                              <div className={cn("h-3 w-3 rounded-sm flex-shrink-0", color)} />
                              <div>
                                <span className="text-xs font-bold text-slate-900">Tier {tier} — {label}</span>
                                <div className="text-[11px] text-slate-500">{count.toLocaleString()} accounts ({pct})</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Top 5 Accounts */}
                    <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-2xs">
                      <h3 className="font-bold text-sm text-slate-900 mb-4">Top 5 Accounts by Score</h3>
                      <div className="space-y-2.5">
                        {TOP_SCORED_ACCOUNTS.map((acc) => (
                          <div key={acc.rank} className="flex items-center gap-3">
                            <span className="h-5 w-5 rounded-full bg-purple-100 text-purple-700 font-bold text-[10px] flex items-center justify-center flex-shrink-0">{acc.rank}</span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-xs font-semibold text-slate-900 truncate">{acc.name}</span>
                                <span className="font-mono font-bold text-slate-900 text-xs flex-shrink-0">{acc.score}</span>
                              </div>
                              <div className="flex items-center justify-between text-[10px] text-slate-500 mt-0.5">
                                <span>{acc.industry}</span>
                                <span className={cn("px-1.5 py-0.5 rounded-full font-semibold", acc.tier === "A" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800")}>
                                  Tier {acc.tier}
                                </span>
                              </div>
                              <div className="mt-1 h-1 rounded bg-slate-100 overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded" style={{ width: `${acc.score * 100}%` }} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Signal Heatmap by Industry */}
                  <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-2xs">
                    <h3 className="font-bold text-sm text-slate-900 mb-1">Signal Strength by Industry</h3>
                    <p className="text-[11px] text-slate-500 mb-4">Average signal scores across all 1,248 scored accounts, by vertical.</p>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[600px] text-xs">
                        <thead>
                          <tr className="border-b border-slate-200 text-[11px] text-slate-500 uppercase">
                            <th className="py-2 px-3 text-left font-semibold">Industry</th>
                            <th className="py-2 px-3 text-center font-semibold">Funding</th>
                            <th className="py-2 px-3 text-center font-semibold">Hiring</th>
                            <th className="py-2 px-3 text-center font-semibold">News</th>
                            <th className="py-2 px-3 text-center font-semibold">ICP Fit</th>
                            <th className="py-2 px-3 text-center font-semibold">Size Fit</th>
                            <th className="py-2 px-3 text-center font-semibold">Tech Intent</th>
                            <th className="py-2 px-3 text-center font-semibold">Avg Score</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {[
                            { industry: "Cloud & Data", funding: 0.90, hiring: 0.90, news: 0.90, icp: 0.90, size: 0.90, intent: 0.90, avg: 0.90 },
                            { industry: "Cybersecurity", funding: 0.80, hiring: 0.80, news: 0.80, icp: 0.80, size: 0.90, intent: 0.80, avg: 0.82 },
                            { industry: "Healthcare Tech", funding: 0.70, hiring: 0.70, news: 0.80, icp: 0.90, size: 0.80, intent: 0.80, avg: 0.79 },
                            { industry: "Robotics & AI", funding: 0.80, hiring: 0.70, news: 0.70, icp: 0.80, size: 0.80, intent: 0.80, avg: 0.76 },
                            { industry: "Logistics", funding: 0.80, hiring: 0.70, news: 0.80, icp: 0.70, size: 0.80, intent: 0.70, avg: 0.72 },
                            { industry: "Analytics", funding: 0.50, hiring: 0.60, news: 0.40, icp: 0.50, size: 0.50, intent: 0.70, avg: 0.56 },
                            { industry: "FinTech", funding: 0.70, hiring: 0.50, news: 0.50, icp: 0.60, size: 0.40, intent: 0.50, avg: 0.54 },
                          ].map((row) => (
                            <tr key={row.industry} className="hover:bg-slate-50/50">
                              <td className="py-2.5 px-3 font-semibold text-slate-700">{row.industry}</td>
                              {[row.funding, row.hiring, row.news, row.icp, row.size, row.intent].map((val, i) => (
                                <td key={i} className="py-2.5 px-3 text-center">
                                  <span className={cn("inline-block px-2 py-0.5 rounded text-[10px] font-bold", val >= 0.80 ? "bg-emerald-100 text-emerald-800" : val >= 0.65 ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700")}>
                                    {val.toFixed(2)}
                                  </span>
                                </td>
                              ))}
                              <td className="py-2.5 px-3 text-center">
                                <span className="font-mono font-extrabold text-slate-900">{row.avg.toFixed(2)}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ══════════════════════════════════
                  SIDEBAR TAB 6: EXPORTS
              ════════════════════════════════════ */}
              {activeSidebar === "Exports" && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Exports</h2>
                      <p className="text-xs text-slate-500 mt-0.5">Download history and export management for all scored data packages.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => showToast("New Export wizard opened — select format and filters.")}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:from-purple-500 hover:to-indigo-500 transition cursor-pointer"
                    >
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span>New Export</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { icon: FileSpreadsheet, color: "bg-blue-50 text-blue-600 border-blue-100", val: "8", label: "Total Exports" },
                      { icon: CheckCircle2, color: "bg-emerald-50 text-emerald-600 border-emerald-100", val: "7", label: "Ready" },
                      { icon: Clock, color: "bg-amber-50 text-amber-600 border-amber-100", val: "1", label: "Processing" },
                      { icon: Database, color: "bg-purple-50 text-purple-600 border-purple-100", val: "2.3 MB", label: "Storage Used" },
                    ].map(({ icon: Icon, color, val, label }) => (
                      <div key={label} className="rounded-xl bg-white border border-slate-200/80 p-3 shadow-2xs flex items-center gap-3">
                        <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center border", color)}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <span className="block text-sm font-extrabold text-slate-900">{val}</span>
                          <span className="text-[10px] text-slate-500 font-medium">{label}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl bg-white border border-slate-200/80 shadow-2xs overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[800px] text-xs text-left">
                        <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                          <tr>
                            <th className="py-3 px-4">Export Name</th>
                            <th className="py-3 px-3">Created By</th>
                            <th className="py-3 px-3">Date &amp; Time</th>
                            <th className="py-3 px-3 text-center">Format</th>
                            <th className="py-3 px-3 text-center">Records</th>
                            <th className="py-3 px-3 text-center">Size</th>
                            <th className="py-3 px-3 text-center">Status</th>
                            <th className="py-3 px-3 text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {EXPORT_HISTORY.map((exp) => (
                            <tr key={exp.id} className="hover:bg-slate-50/80 transition">
                              <td className="py-3 px-4 font-semibold text-slate-900">
                                <div className="flex items-center gap-2">
                                  <FileSpreadsheet className="h-4 w-4 text-slate-400 flex-shrink-0" />
                                  {exp.name}
                                </div>
                              </td>
                              <td className="py-3 px-3 text-slate-600 font-mono text-[11px]">{exp.createdBy}</td>
                              <td className="py-3 px-3 text-slate-500 text-[11px]">{exp.date}</td>
                              <td className="py-3 px-3 text-center">
                                <span
                                  className={cn(
                                    "inline-block px-2 py-0.5 rounded text-[10px] font-bold",
                                    exp.format === "CSV" ? "bg-blue-50 text-blue-700" :
                                    exp.format === "XLSX" ? "bg-emerald-50 text-emerald-700" :
                                    "bg-amber-50 text-amber-700"
                                  )}
                                >
                                  {exp.format}
                                </span>
                              </td>
                              <td className="py-3 px-3 text-center font-semibold text-slate-700">{exp.records.toLocaleString()}</td>
                              <td className="py-3 px-3 text-center text-slate-500">{exp.size}</td>
                              <td className="py-3 px-3 text-center">
                                <span
                                  className={cn(
                                    "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold",
                                    exp.status === "Ready" ? "bg-emerald-100 text-emerald-800" :
                                    exp.status === "Processing" ? "bg-amber-100 text-amber-800" :
                                    "bg-rose-100 text-rose-800"
                                  )}
                                >
                                  {exp.status === "Ready" && <CheckCircle2 className="h-3 w-3" />}
                                  {exp.status === "Processing" && <Clock className="h-3 w-3" />}
                                  {exp.status}
                                </span>
                              </td>
                              <td className="py-3 px-3">
                                <div className="flex items-center justify-center gap-1">
                                  {exp.status === "Ready" ? (
                                    <button
                                      type="button"
                                      onClick={() => showToast(`Downloading: ${exp.name}`)}
                                      className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-purple-600 transition cursor-pointer"
                                      title="Download"
                                    >
                                      <Download className="h-3.5 w-3.5" />
                                    </button>
                                  ) : (
                                    <span className="p-1 text-slate-300"><Download className="h-3.5 w-3.5" /></span>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => showToast(`${exp.name} deleted.`)}
                                    className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-red-600 transition cursor-pointer"
                                    title="Delete"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Storage Indicator */}
                  <div className="rounded-2xl bg-white border border-slate-200/80 p-4 shadow-2xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-700">Export Storage</span>
                      <span className="text-xs text-slate-500">2.3 MB / 10 GB</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" style={{ width: "23%" }} />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">Exports are retained for 90 days. Auto-purge: Feb 12, 2027.</p>
                  </div>
                </div>
              )}
            </>
          )}

        </main>
      </div>
    </div>
  );
}
