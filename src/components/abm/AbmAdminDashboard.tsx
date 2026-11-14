"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
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
  Eye,
  FileSpreadsheet,
  FileText,
  Filter,
  Layers,
  LogOut,
  Mail,
  MessageSquare,
  MoreVertical,
  Play,
  Radio,
  RefreshCw,
  RotateCcw,
  Search,
  Settings,
  Share2,
  Sliders,
  SlidersHorizontal,
  Sparkles,
  Target,
  Trash2,
  TrendingUp,
  Upload,
  User,
  Users,
} from "lucide-react";
import { ZbrLogo } from "@/components/ui/ZbrLogo";
import { cn } from "@/lib/utils";

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
    bestFitTitle: "RevOps Manager — 91%",
    titleOptions: [
      "RevOps Manager — 91%",
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
    bestFitTitle: "Head of Growth — 95%",
    titleOptions: [
      "Head of Growth — 95%",
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
    bestFitTitle: "Chief Technology Officer — 94%",
    titleOptions: [
      "Chief Technology Officer — 94%",
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

interface AbmAdminDashboardProps {
  adminEmail: string;
  onSignOut: () => void;
}

export function AbmAdminDashboard({
  adminEmail,
  onSignOut,
}: AbmAdminDashboardProps) {
  // Navigation State
  const [activeTab, setActiveTab] = useState<
    "scoring" | "explorer" | "reports" | "settings"
  >("scoring");
  const [activeSidebar, setActiveSidebar] = useState<string>("Account Scoring");

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

  // Total Weight Calculation
  const totalWeight =
    fundingWeight +
    newsWeight +
    sizeWeight +
    hiringWeight +
    industryWeight +
    intentWeight;

  const handleResetWeights = () => {
    setFundingWeight(7);
    setNewsWeight(7);
    setSizeWeight(8);
    setHiringWeight(30);
    setIndustryWeight(30);
    setIntentWeight(17);
  };

  // Calculate composite score for each account
  const scoredAccounts = useMemo(() => {
    return accounts.map((acc) => {
      const normalizedFunding = (fundingWeight / 100) * acc.funding;
      const normalizedNews = (newsWeight / 100) * acc.news;
      const normalizedSize = (sizeWeight / 100) * acc.sizeFit;
      const normalizedHiring = (hiringWeight / 100) * acc.hiring;
      const normalizedIndustry = (industryWeight / 100) * acc.industryFit;
      const normalizedIntent = (intentWeight / 100) * acc.techIntent;

      const rawScore =
        normalizedFunding +
        normalizedNews +
        normalizedSize +
        normalizedHiring +
        normalizedIndustry +
        normalizedIntent;

      // Score between 0.1 and 0.99
      const finalScore = parseFloat(rawScore.toFixed(2));

      let tier: "A" | "B" | "C" = "C";
      if (finalScore >= 0.75) {
        tier = "A";
      } else if (finalScore >= 0.65) {
        tier = "B";
      } else {
        tier = "C";
      }

      return {
        ...acc,
        compositeScore: finalScore,
        tier,
      };
    });
  }, [
    accounts,
    fundingWeight,
    newsWeight,
    sizeWeight,
    hiringWeight,
    industryWeight,
    intentWeight,
  ]);

  // Filtered accounts
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
    setDownloadToast("Preparing Excel format export with all 6 weight dimensions...");
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

      const encoded = encodeURI(csv);
      const link = document.createElement("a");
      link.setAttribute("href", encoded);
      link.setAttribute(
        "download",
        `zbr-abm-ranked-accounts-${Date.now()}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadToast("Ranked Accounts exported successfully!");
      setTimeout(() => setDownloadToast(null), 3000);
    }, 600);
  };

  const handleBestFitTitleChange = (id: number, newTitle: string) => {
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.id === id ? { ...acc, bestFitTitle: newTitle } : acc
      )
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

  return (
    <div className="flex min-h-screen bg-[#F4F6FC] font-sans text-slate-800 antialiased">
      {/* 1. LEFT SIDEBAR (Deep Navy) */}
      <aside className="w-64 shrink-0 bg-[#0C142E] text-slate-300 flex flex-col justify-between hidden md:flex border-r border-slate-800/60 shadow-xl">
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
              const isActive = activeSidebar === item.label;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setActiveSidebar(item.label)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition text-left",
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
              Research-led insights for revenue teams.
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

      {/* 2. MAIN APPLICATION WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top App Bar Header */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4 shadow-sm">
          {/* Top Horizontal Tabs */}
          <div className="flex items-center gap-1 sm:gap-2">
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
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition",
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

          {/* Top Right Admin Profile & Actions */}
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-3.5 w-3.5 bg-red-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                  8
                </span>
              </button>

              {notificationOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-xl bg-white p-3 shadow-xl border border-slate-200 text-xs z-50">
                  <div className="font-bold text-slate-900 border-b pb-2 mb-2">
                    System Notifications (8)
                  </div>
                  <div className="space-y-2 text-slate-600">
                    <p className="p-1.5 rounded bg-purple-50 text-purple-800">
                      ✓ Snowflake Inc. updated with 9 verified buyers.
                    </p>
                    <p className="p-1.5 rounded bg-blue-50 text-blue-800">
                      ✓ 312 accounts passed Tier A qualification threshold.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Badge matching Screenshot: AM / Arbaz Murme / Admin */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                AM
              </div>
              <div className="hidden sm:flex flex-col text-left leading-tight">
                <span className="text-xs font-bold text-slate-900">Arbaz Murme</span>
                <span className="text-[10px] text-slate-500 font-medium">Admin</span>
              </div>

              {/* Sign Out Action */}
              <button
                type="button"
                onClick={onSignOut}
                className="ml-1 p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                title="Sign Out of Admin Portal"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </header>

        {/* 3. MAIN DASHBOARD BODY */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          
          {/* Top Banner with 3D Globe Illustration */}
          <div className="relative rounded-2xl bg-white border border-slate-200/80 p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden shadow-xs">
            <div className="space-y-2 max-w-2xl">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Research-led B2B demand generation &amp; market intelligence.
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                We connect enterprise revenue teams to verified decision-makers, turning multi-touch
                intent into predictable, high-value pipeline.
              </p>
            </div>

            {/* Glowing Globe Visual from design */}
            <div className="relative w-36 h-24 sm:w-48 sm:h-28 shrink-0">
              <Image
                src="/images/abm-scoring/login-globe.webp"
                alt="ZoomBridge B2B Global Intelligence Sphere"
                fill
                priority
                className="object-contain drop-shadow-[0_8px_20px_rgba(124,58,237,0.35)]"
              />
            </div>
          </div>

          {/* Section Header & Metrics Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Account Scoring</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Upload your data, set scoring weights, and get a ranked list of best-fit accounts.
              </p>
            </div>

            {/* 4 Metric Cards matching Screenshot */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Metric 1 */}
              <div className="rounded-xl bg-white border border-slate-200/80 p-3 shadow-2xs flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                  <Layers className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-sm font-extrabold text-slate-900">5</span>
                  <span className="text-[10px] text-slate-500 font-medium">Input Datasets</span>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="rounded-xl bg-white border border-slate-200/80 p-3 shadow-2xs flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
                  <Building2 className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-sm font-extrabold text-slate-900">1,248</span>
                  <span className="text-[10px] text-slate-500 font-medium">Accounts Scored</span>
                </div>
              </div>

              {/* Metric 3 */}
              <div className="rounded-xl bg-white border border-slate-200/80 p-3 shadow-2xs flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                  <Target className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-sm font-extrabold text-slate-900">312</span>
                  <span className="text-[10px] text-slate-500 font-medium">High Fit (A Tier)</span>
                </div>
              </div>

              {/* Metric 4 */}
              <div className="rounded-xl bg-white border border-slate-200/80 p-3 shadow-2xs flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-sm font-extrabold text-slate-900">0.76</span>
                  <span className="text-[10px] text-slate-500 font-medium">Avg. Score</span>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 1: UPLOAD YOUR INPUTS */}
          <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white text-[11px] font-bold">
                1
              </span>
              <h3 className="font-bold text-sm text-slate-900">Upload Your Inputs</h3>
            </div>

            {/* 3 Input Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1 */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-2.5">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                  <Database className="h-4 w-4 text-purple-600" />
                  <span>Target Account List</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  CSV with company, domain, or both
                </p>
                <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <FileSpreadsheet className="h-4 w-4 text-slate-400" />
                    <div>
                      <span className="font-semibold block text-[11px]">target_accounts.csv</span>
                      <span className="text-[10px] text-slate-400">5 accounts &bull; 6.2 KB</span>
                    </div>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </div>
              </div>

              {/* Card 2 */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-2.5">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span>Job Titles</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  CSV with one title per line
                </p>
                <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <FileText className="h-4 w-4 text-slate-400" />
                    <div>
                      <span className="font-semibold block text-[11px]">job_titles.csv</span>
                      <span className="text-[10px] text-slate-400">4 titles &bull; 1.1 KB</span>
                    </div>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </div>
              </div>

              {/* Card 3 */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-2.5">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
                  <Mail className="h-4 w-4 text-indigo-600" />
                  <span>Email Assets</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  CSV with name and topic/persona
                </p>
                <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <div>
                      <span className="font-semibold block text-[11px]">email_assets.csv</span>
                      <span className="text-[10px] text-slate-400">4 assets &bull; 1.8 KB</span>
                    </div>
                  </div>
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setDownloadToast("Building real-time scoring table with latest weights...")}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:from-purple-500 hover:to-indigo-500 transition"
                >
                  <Play className="h-3 w-3 fill-white" />
                  <span>Build Scoring Table</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAccounts(INITIAL_ACCOUNTS)}
                  className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Load Sample Data
                </button>
              </div>

              <button
                type="button"
                onClick={() => setAccounts([])}
                className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-red-600 transition"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Clear All</span>
              </button>
            </div>
          </div>

          {/* STEP 2: SET YOUR SCORING WEIGHTS */}
          <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white text-[11px] font-bold">
                  2
                </span>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Set Your Scoring Weights</h3>
                  <p className="text-[11px] text-slate-500">
                    Adjust the importance of each signal. Total weight is 100%.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleResetWeights}
                className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-purple-600 transition"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset to Default</span>
              </button>
            </div>

            {/* Sliders Grid + Donut Gauge */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* 6 Sliders (2 columns of 3) */}
              <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {/* 1. Funding & Investment */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">Funding &amp; Investment</span>
                    <span className="font-mono font-bold text-slate-900">{fundingWeight}%</span>
                  </div>
                  <p className="text-[10px] text-slate-400">Recent raises, budget expansion</p>
                  <input
                    type="range"
                    min={0}
                    max={50}
                    value={fundingWeight}
                    onChange={(e) => setFundingWeight(Number(e.target.value))}
                    className="w-full accent-purple-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                {/* 4. Hiring Velocity */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">Hiring Velocity</span>
                    <span className="font-mono font-bold text-slate-900">{hiringWeight}%</span>
                  </div>
                  <p className="text-[10px] text-slate-400">Open roles matching your titles</p>
                  <input
                    type="range"
                    min={0}
                    max={50}
                    value={hiringWeight}
                    onChange={(e) => setHiringWeight(Number(e.target.value))}
                    className="w-full accent-purple-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                {/* 2. Events & News */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">Events &amp; News</span>
                    <span className="font-mono font-bold text-slate-900">{newsWeight}%</span>
                  </div>
                  <p className="text-[10px] text-slate-400">Launches, expansions, leadership change</p>
                  <input
                    type="range"
                    min={0}
                    max={50}
                    value={newsWeight}
                    onChange={(e) => setNewsWeight(Number(e.target.value))}
                    className="w-full accent-purple-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                {/* 5. Industry Fit */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">Industry Fit</span>
                    <span className="font-mono font-bold text-slate-900">{industryWeight}%</span>
                  </div>
                  <p className="text-[10px] text-slate-400">Matches your ideal customer profile</p>
                  <input
                    type="range"
                    min={0}
                    max={50}
                    value={industryWeight}
                    onChange={(e) => setIndustryWeight(Number(e.target.value))}
                    className="w-full accent-purple-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                {/* 3. Company Size Fit */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">Company Size Fit</span>
                    <span className="font-mono font-bold text-slate-900">{sizeWeight}%</span>
                  </div>
                  <p className="text-[10px] text-slate-400">Headcount / revenue in target range</p>
                  <input
                    type="range"
                    min={0}
                    max={50}
                    value={sizeWeight}
                    onChange={(e) => setSizeWeight(Number(e.target.value))}
                    className="w-full accent-purple-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>

                {/* 6. Tech / Intent Signal */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">Tech / Intent Signal</span>
                    <span className="font-mono font-bold text-slate-900">{intentWeight}%</span>
                  </div>
                  <p className="text-[10px] text-slate-400">Stack, content engagement, review activity</p>
                  <input
                    type="range"
                    min={0}
                    max={50}
                    value={intentWeight}
                    onChange={(e) => setIntentWeight(Number(e.target.value))}
                    className="w-full accent-purple-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Total Donut Chart Gauge */}
              <div className="lg:col-span-3 flex flex-col items-center justify-center p-3">
                <div className="relative flex items-center justify-center h-28 w-28">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      className="text-slate-100"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                    />
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
                      strokeDashoffset={251.2 - (totalWeight / 100) * 251.2}
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
              </div>
            </div>
          </div>

          {/* STEP 3: SCORE EACH ACCOUNT & DATA TABLE */}
          <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white text-[11px] font-bold">
                  3
                </span>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Score Each Account</h3>
                  <p className="text-[11px] text-slate-500">
                    Score is the weighted average of all six signals, shown on a 0.1 – 0.9 scale.
                  </p>
                </div>
              </div>

              {/* Actions & Filters */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Search */}
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

                {/* Tier Filter */}
                <select
                  value={tierFilter}
                  onChange={(e) => setTierFilter(e.target.value as any)}
                  className="rounded-lg border border-slate-200 py-1.5 px-2.5 text-xs text-slate-700 bg-white"
                >
                  <option value="ALL">All Tiers</option>
                  <option value="A">Tier A (High Fit)</option>
                  <option value="B">Tier B (Targeted)</option>
                  <option value="C">Tier C (Monitor)</option>
                </select>

                {/* Industry Filter */}
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
                </select>

                {/* Refresh */}
                <button
                  type="button"
                  onClick={() => setDownloadToast("Recalculating account signals...")}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs flex items-center gap-1"
                  title="Refresh Estimates"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span className="hidden xl:inline text-xs">Refresh Estimates</span>
                </button>

                {/* Export Excel Button */}
                <button
                  type="button"
                  onClick={handleExportExcel}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-xs hover:from-purple-500 hover:to-indigo-500 transition"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Export Ranked Excel</span>
                </button>
              </div>
            </div>

            {/* Notification Toast */}
            {downloadToast && (
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-purple-50 border border-purple-200 text-xs text-purple-800">
                <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0" />
                <span>{downloadToast}</span>
              </div>
            )}

            {/* DATA TABLE */}
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
                  {filteredAccounts.map((acc, index) => {
                    return (
                      <tr key={acc.id} className="hover:bg-slate-50/80 transition">
                        {/* Index */}
                        <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">
                          {index + 1}
                        </td>

                        {/* Company with Logo Icon */}
                        <td className="py-3 px-3 font-bold text-slate-900 flex items-center gap-2">
                          <div className="h-6 w-6 rounded bg-gradient-to-tr from-blue-500 to-indigo-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                            {acc.name.charAt(0)}
                          </div>
                          <span className="truncate max-w-[150px]">{acc.name}</span>
                        </td>

                        {/* Domain */}
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

                        {/* Industry Badge */}
                        <td className="py-3 px-3">
                          <span
                            className={cn(
                              "inline-block rounded-md px-2 py-0.5 text-[10px] font-semibold border",
                              acc.industryColor
                            )}
                          >
                            {acc.industry}
                          </span>
                        </td>

                        {/* 6 Sub-scores */}
                        <td className="py-3 px-2 text-center font-mono text-slate-600">
                          {acc.funding.toFixed(2)}
                        </td>
                        <td className="py-3 px-2 text-center font-mono text-slate-600">
                          {acc.hiring.toFixed(2)}
                        </td>
                        <td className="py-3 px-2 text-center font-mono text-slate-600">
                          {acc.news.toFixed(2)}
                        </td>
                        <td className="py-3 px-2 text-center font-mono text-slate-600">
                          {acc.industryFit.toFixed(2)}
                        </td>
                        <td className="py-3 px-2 text-center font-mono text-slate-600">
                          {acc.sizeFit.toFixed(2)}
                        </td>
                        <td className="py-3 px-2 text-center font-mono text-slate-600">
                          {acc.techIntent.toFixed(2)}
                        </td>

                        {/* Composite Score with colored bar */}
                        <td className="py-3 px-3 text-center">
                          <div className="flex flex-col items-center">
                            <span className="font-mono font-bold text-slate-900 text-xs">
                              {acc.compositeScore.toFixed(2)}
                            </span>
                            <div className="w-10 h-1 rounded-full bg-slate-100 mt-0.5 overflow-hidden">
                              <div
                                className={cn(
                                  "h-full rounded-full",
                                  acc.compositeScore >= 0.75
                                    ? "bg-emerald-500"
                                    : acc.compositeScore >= 0.65
                                    ? "bg-amber-500"
                                    : "bg-rose-500"
                                )}
                                style={{ width: `${acc.compositeScore * 100}%` }}
                              />
                            </div>
                          </div>
                        </td>

                        {/* Tier Badge */}
                        <td className="py-3 px-2 text-center">
                          <span
                            className={cn(
                              "inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold",
                              acc.tier === "A"
                                ? "bg-emerald-100 text-emerald-800"
                                : acc.tier === "B"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-rose-100 text-rose-800"
                            )}
                          >
                            {acc.tier}
                          </span>
                        </td>

                        {/* Best Fit Title Dropdown */}
                        <td className="py-3 px-3">
                          <select
                            value={acc.bestFitTitle}
                            onChange={(e) => handleBestFitTitleChange(acc.id, e.target.value)}
                            className="w-full text-[11px] rounded border border-slate-200 py-1 px-1.5 bg-slate-50/60 text-slate-700 focus:bg-white"
                          >
                            {acc.titleOptions.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </td>

                        {/* Notes / Actions */}
                        <td className="py-3 px-3 text-center">
                          <div className="flex items-center justify-center gap-1 text-slate-400">
                            <button
                              type="button"
                              className="p-1 hover:text-purple-600 transition"
                              title="View research notes"
                            >
                              <MessageSquare className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              className="p-1 hover:text-slate-700 transition"
                              title="Account menu"
                            >
                              <MoreVertical className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls matching screenshot */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs text-slate-500">
              <span>Showing 1–{filteredAccounts.length} of 1,248 accounts</span>

              <div className="flex items-center gap-1 font-mono">
                <button
                  type="button"
                  className="h-7 w-7 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-100 disabled:opacity-50"
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage(1)}
                  className="h-7 w-7 rounded bg-purple-700 text-white font-bold flex items-center justify-center"
                >
                  1
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage(2)}
                  className="h-7 w-7 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-700"
                >
                  2
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage(3)}
                  className="h-7 w-7 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-700"
                >
                  3
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage(4)}
                  className="h-7 w-7 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-700"
                >
                  4
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage(5)}
                  className="h-7 w-7 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-700"
                >
                  5
                </button>
                <span className="px-1 text-slate-400">...</span>
                <button
                  type="button"
                  className="h-7 w-9 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-100 text-slate-700 text-[11px]"
                >
                  250
                </button>
                <button
                  type="button"
                  className="h-7 w-7 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-100"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
