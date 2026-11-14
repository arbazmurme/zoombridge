"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  Filter,
  Layers,
  LogOut,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { InnerHero } from "@/components/layout/InnerHero";
import { AbmScoringInteractive } from "@/components/abm/AbmScoringInteractive";
import { BookCallSection } from "@/components/landing/BookCallSection";
import { MagneticButton } from "@/components/ui/MagneticButton";

interface AbmAdminDashboardProps {
  adminEmail: string;
  onSignOut: () => void;
}

export function AbmAdminDashboard({
  adminEmail,
  onSignOut,
}: AbmAdminDashboardProps) {
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const handleExportCsv = () => {
    setExportNotice("Generating verified TAL Scoring CSV report...");
    setTimeout(() => {
      const csvContent =
        "data:text/csv;charset=utf-8," +
        [
          "Account Name,Industry,Region,Fit Score,Intent Score,Engagement Score,Composite Score,Priority Tier",
          "CloudScale Systems,Enterprise SaaS,North America,92,88,84,89,Tier 1",
          "FinTech Nexus,Financial Services,EMEA,86,82,78,83,Tier 1",
          "HealthPulse Analytics,HealthTech,North America,78,74,70,75,Tier 2",
          "OmniLogistics Global,Supply Chain & Logistics,APAC,68,64,60,65,Tier 2",
          "SecureGrid Defense,Cybersecurity,EMEA,54,48,46,50,Tier 3",
        ].join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `zbr-abm-scored-accounts-${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setExportNotice("Exported successfully!");
      setTimeout(() => setExportNotice(null), 3000);
    }, 700);
  };

  return (
    <div className="relative">
      {/* Top Persistent Admin Session Banner */}
      <aside
        aria-label="Admin Session Status"
        className="sticky top-16 z-40 border-b border-cyan-500/20 bg-[#0B1528]/95 px-4 py-2.5 backdrop-blur-md"
      >
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Left: Admin Status Indicator */}
          <div className="flex items-center gap-2.5 text-white">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="font-semibold text-emerald-400">
              Admin Session Active
            </span>
            <span className="hidden text-slate-500 sm:inline">•</span>
            <span className="hidden text-slate-300 sm:inline">
              Authenticated as <strong className="text-white font-mono">{adminEmail}</strong>
            </span>
          </div>

          {/* Right: Admin Session Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportCsv}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-2.5 py-1 font-medium text-slate-200 hover:border-cyan-500/50 hover:bg-slate-700 hover:text-white transition"
            >
              <Download className="h-3.5 w-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Export TAL</span> CSV
            </button>

            <button
              type="button"
              onClick={onSignOut}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-2.5 py-1 font-medium text-red-300 hover:bg-red-500/20 hover:text-red-200 transition"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Export Toast Notice */}
        {exportNotice && (
          <div className="container mx-auto mt-1 flex items-center gap-2 text-[11px] text-cyan-300">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>{exportNotice}</span>
          </div>
        )}
      </aside>

      {/* Hero Section */}
      <InnerHero
        badge="Enterprise ABM Scoring Engine • Admin Portal"
        title="Score every account. Prioritize every dollar."
        description="Combine Fit Scoring, Intent Scoring, and Engagement Scoring into actionable Tier 1, Tier 2, and Tier 3 account prioritization backed by human-verified research."
        breadcrumbs={[{ label: "ABM Scoring" }]}
        illustrationSrc="/images/abm-scoring/abm-scoring-hero.webp"
        illustrationAlt="Predictive Target Account Scoring Radar"
        bgSrc="/images/abm-scoring/abm-scoring-hero-bg.webp?v=2"
        nextSectionId="scoring-engine"
      >
        <div className="flex flex-wrap items-center gap-4">
          <MagneticButton
            href="#scoring-engine"
            variant="primary"
          >
            <span>Launch Live Scoring Simulator</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </MagneticButton>

          <button
            type="button"
            onClick={handleExportCsv}
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
          >
            <Download className="h-4 w-4 text-[#22D3EE]" />
            <span>Download Scored Accounts</span>
          </button>
        </div>
      </InnerHero>

      {/* Interactive Scoring Engine */}
      <AbmScoringInteractive />

      {/* Book Call Section */}
      <BookCallSection />
    </div>
  );
}
