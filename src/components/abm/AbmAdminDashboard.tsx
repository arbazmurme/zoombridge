"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  LogOut,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { InnerHero } from "@/components/layout/InnerHero";
import { AbmScoringInteractive } from "@/components/abm/AbmScoringInteractive";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ZbrLogo } from "@/components/ui/ZbrLogo";

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
          "Snowflake Inc. (NYSE: SNOW),Enterprise Cloud & Data Lakehouse,North America & EMEA,94,92,88,92,Tier 1",
          "Datadog Inc. (NASDAQ: DDOG),Cloud Observability & Security,AMER & EMEA,89,86,81,86,Tier 1",
          "Palo Alto Networks (NASDAQ: PANW),Cybersecurity & Zero Trust,Global (AMER / EMEA),88,84,76,84,Tier 1",
          "Stripe Payments,FinTech & Global Payments,EMEA (Dublin) & US,82,72,66,74,Tier 2",
          "Siemens Digital Industries,Industrial Automation & IoT,EMEA & APAC,75,48,42,57,Tier 2",
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
    <div className="relative min-h-screen bg-[#070e1b] text-white">
      {/* Top Standalone Admin Application Header */}
      <header
        aria-label="Admin Session Status"
        className="sticky top-0 z-50 border-b border-cyan-500/20 bg-[#0B1528]/95 px-4 py-3 backdrop-blur-md"
      >
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Left: Branding & Status */}
          <div className="flex items-center gap-3 text-white">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ZoomBridge Research Home (opens in new tab)"
              className="inline-flex items-center transition hover:opacity-90"
            >
              <ZbrLogo light size={30} />
            </Link>
            <span className="h-4 w-px bg-slate-700" />
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

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportCsv}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 font-medium text-slate-200 hover:border-cyan-500/50 hover:bg-slate-700 hover:text-white transition"
            >
              <Download className="h-3.5 w-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Export TAL</span> CSV
            </button>

            <button
              type="button"
              onClick={onSignOut}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 font-medium text-red-300 hover:bg-red-500/20 hover:text-red-200 transition"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Export Toast Notice */}
        {exportNotice && (
          <div className="container mx-auto mt-1.5 flex items-center gap-2 text-[11px] text-cyan-300">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>{exportNotice}</span>
          </div>
        )}
      </header>

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

      {/* Dedicated Portal Footer */}
      <footer className="border-t border-white/10 bg-[#060D19] py-8 text-center text-xs text-slate-400">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-cyan-400" />
            <span>ZoomBridge Research ABM Intelligence &bull; Enterprise Admin Security Level 4</span>
          </div>
          <p className="text-slate-500 font-mono text-[11px]">
            &copy; 2026 ZoomBridge Research. Confidential &bull; Internal Use Only.
          </p>
        </div>
      </footer>
    </div>
  );
}
