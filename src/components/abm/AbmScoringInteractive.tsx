"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Info, Layers, Sliders, Sparkles, Target } from "lucide-react";
import {
  ABM_PILLARS,
  ABM_TIERS,
  ILLUSTRATIVE_ABM_ACCOUNTS,
} from "@/data/abm";
import { TiltCard } from "@/components/ui/TiltCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function AbmScoringInteractive() {
  const [selectedAccountId, setSelectedAccountId] = useState(
    ILLUSTRATIVE_ABM_ACCOUNTS[0].id
  );
  const selectedAccount =
    ILLUSTRATIVE_ABM_ACCOUNTS.find((a) => a.id === selectedAccountId) ||
    ILLUSTRATIVE_ABM_ACCOUNTS[0];

  const [fitInput, setFitInput] = useState(selectedAccount.fitScore);
  const [intentInput, setIntentInput] = useState(selectedAccount.intentScore);
  const [engagementInput, setEngagementInput] = useState(
    selectedAccount.engagementScore
  );
  const [hoveredBreakdown, setHoveredBreakdown] = useState<string | null>(null);

  const handleSelectAccount = (id: string) => {
    const acc = ILLUSTRATIVE_ABM_ACCOUNTS.find((a) => a.id === id);
    if (!acc) return;
    setSelectedAccountId(acc.id);
    setFitInput(acc.fitScore);
    setIntentInput(acc.intentScore);
    setEngagementInput(acc.engagementScore);
  };

  // Weighted composite score: 40% Fit + 35% Intent + 25% Engagement
  const compositeScore = useMemo(() => {
    return Math.round(fitInput * 0.4 + intentInput * 0.35 + engagementInput * 0.25);
  }, [fitInput, intentInput, engagementInput]);

  const activeTier = useMemo(() => {
    return (
      ABM_TIERS.find((t) => compositeScore >= t.minScore) || ABM_TIERS[2]
    );
  }, [compositeScore]);

  const circumference = 2 * Math.PI * 76;
  const strokeDashoffset =
    circumference - (compositeScore / 100) * circumference;

  return (
    <>
      {/* Interactive Sample Scoring Engine Demo */}
      <section
        aria-labelledby="abm-demo-heading"
        className="zbr-section bg-white text-[#0F172A]"
      >
        <div className="zbr-container">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#1E5EFF]/20 bg-[#1E5EFF]/8 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#1E5EFF]">
                <Sliders className="h-3.5 w-3.5" aria-hidden="true" />
                Interactive Sample Scoring Demo
              </span>
              <h2 id="abm-demo-heading" className="type-h2 mt-3 text-[#0A1628]">
                Simulate account prioritization in real time.
              </h2>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#1E5EFF]/20 bg-[#1E5EFF]/8 px-3.5 py-1.5 text-xs font-medium text-[#0A1628]">
              <Info className="h-3.5 w-3.5 text-[#1E5EFF]" aria-hidden="true" />
              Sample scoring model — not live client data
            </span>
          </div>

          {/* Account Selector Tabs */}
          <div
            role="tablist"
            aria-label="Sample Account Profiles"
            className="mt-8 flex flex-wrap gap-3"
          >
            {ILLUSTRATIVE_ABM_ACCOUNTS.map((acc) => {
              const active = acc.id === selectedAccountId;
              return (
                <button
                  key={acc.id}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => handleSelectAccount(acc.id)}
                  className={cn(
                    "min-h-[44px] rounded-xl border px-4 py-2.5 text-left text-xs font-semibold transition",
                    active
                      ? "border-[#1E5EFF] bg-[#0A1628] text-white shadow-md"
                      : "border-slate-200 bg-[#F8FAFC] text-slate-700 hover:border-[#1E5EFF]/40"
                  )}
                >
                  <div>{acc.accountLabel}</div>
                  <div
                    className={cn(
                      "text-[11px] font-normal",
                      active ? "text-[#22D3EE]" : "text-slate-500"
                    )}
                  >
                    {acc.industry}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left Controls & Score Sliders */}
            <div className="space-y-6 rounded-3xl border border-slate-200 bg-[#F8FAFC] p-6 sm:p-8 lg:col-span-7">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <p className="font-display text-xl font-semibold text-[#0A1628]">
                    {selectedAccount.accountLabel}
                  </p>
                  <p className="text-xs text-slate-500">
                    {selectedAccount.region} • {selectedAccount.companyBand} •{" "}
                    {selectedAccount.buyingCommitteeMapped} illustrative contacts mapped
                  </p>
                </div>
                <span className="rounded-full bg-white px-3 py-1 font-mono-metric text-xs font-semibold text-[#1E5EFF] shadow-sm">
                  40% Fit / 35% Intent / 25% Eng.
                </span>
              </div>

              {/* Fit Slider */}
              <div
                onMouseEnter={() => setHoveredBreakdown("fit")}
                onMouseLeave={() => setHoveredBreakdown(null)}
                className="relative rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-[#1E5EFF]/40"
              >
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="fit-slider"
                    className="font-display text-sm font-semibold text-[#0A1628]"
                  >
                    Fit Score (40% Weight)
                  </label>
                  <span className="font-mono-metric text-lg font-bold text-[#1E5EFF]">
                    {fitInput}/100
                  </span>
                </div>
                <input
                  id="fit-slider"
                  type="range"
                  min={0}
                  max={100}
                  value={fitInput}
                  onChange={(e) => setFitInput(Number(e.target.value))}
                  className="mt-3 w-full accent-[#1E5EFF]"
                />
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-[#1E5EFF] transition-all duration-300"
                    style={{ width: `${fitInput}%` }}
                  />
                </div>
                {hoveredBreakdown === "fit" ? (
                  <div className="mt-3 rounded-xl border border-[#1E5EFF]/20 bg-[#1E5EFF]/5 p-3 text-xs text-slate-700">
                    <strong>Illustrative Fit Factors:</strong>{" "}
                    {selectedAccount.fitReasons.join(" • ")}
                  </div>
                ) : null}
              </div>

              {/* Intent Slider */}
              <div
                onMouseEnter={() => setHoveredBreakdown("intent")}
                onMouseLeave={() => setHoveredBreakdown(null)}
                className="relative rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-[#22D3EE]/60"
              >
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="intent-slider"
                    className="font-display text-sm font-semibold text-[#0A1628]"
                  >
                    Intent Score (35% Weight)
                  </label>
                  <span className="font-mono-metric text-lg font-bold text-[#0891B2]">
                    {intentInput}/100
                  </span>
                </div>
                <input
                  id="intent-slider"
                  type="range"
                  min={0}
                  max={100}
                  value={intentInput}
                  onChange={(e) => setIntentInput(Number(e.target.value))}
                  className="mt-3 w-full accent-[#22D3EE]"
                />
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-[#22D3EE] transition-all duration-300"
                    style={{ width: `${intentInput}%` }}
                  />
                </div>
                {hoveredBreakdown === "intent" ? (
                  <div className="mt-3 rounded-xl border border-[#22D3EE]/30 bg-[#22D3EE]/10 p-3 text-xs text-slate-700">
                    <strong>Illustrative Intent Signals:</strong>{" "}
                    {selectedAccount.intentReasons.join(" • ")}
                  </div>
                ) : null}
              </div>

              {/* Engagement Slider */}
              <div
                onMouseEnter={() => setHoveredBreakdown("engagement")}
                onMouseLeave={() => setHoveredBreakdown(null)}
                className="relative rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-[#8B5CF6]/50"
              >
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="engagement-slider"
                    className="font-display text-sm font-semibold text-[#0A1628]"
                  >
                    Engagement Score (25% Weight)
                  </label>
                  <span className="font-mono-metric text-lg font-bold text-[#8B5CF6]">
                    {engagementInput}/100
                  </span>
                </div>
                <input
                  id="engagement-slider"
                  type="range"
                  min={0}
                  max={100}
                  value={engagementInput}
                  onChange={(e) => setEngagementInput(Number(e.target.value))}
                  className="mt-3 w-full accent-[#8B5CF6]"
                />
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-[#8B5CF6] transition-all duration-300"
                    style={{ width: `${engagementInput}%` }}
                  />
                </div>
                {hoveredBreakdown === "engagement" ? (
                  <div className="mt-3 rounded-xl border border-[#8B5CF6]/25 bg-[#8B5CF6]/10 p-3 text-xs text-slate-700">
                    <strong>Illustrative Engagement Signals:</strong>{" "}
                    {selectedAccount.engagementReasons.join(" • ")}
                  </div>
                ) : null}
              </div>
            </div>

            {/* Right Interactive Scoring Meter & Tier Classification */}
            <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#0A1628] p-7 text-white shadow-[0_24px_60px_rgba(10,22,40,0.28)] sm:p-9 lg:col-span-5">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#22D3EE]">
                    Composite Account Score
                  </span>
                  <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] text-slate-300">
                    Hover sliders for breakdown
                  </span>
                </div>

                {/* SVG Animated Scoring Meter */}
                <div className="my-8 flex flex-col items-center justify-center">
                  <div className="relative flex h-48 w-48 items-center justify-center">
                    <svg className="h-full w-full -rotate-90" viewBox="0 0 180 180">
                      <circle
                        cx="90"
                        cy="90"
                        r="76"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="90"
                        cy="90"
                        r="76"
                        stroke={activeTier.color}
                        strokeWidth="12"
                        strokeLinecap="round"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-500 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="font-mono-metric text-5xl font-bold text-white">
                        {compositeScore}
                      </span>
                      <span className="text-xs font-medium text-slate-400">
                        out of 100
                      </span>
                    </div>
                  </div>
                </div>

                {/* Animated Tier Reveal */}
                <motion.div
                  key={activeTier.tier}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl border border-white/15 bg-[#0F1E38] p-5"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="rounded-full px-3 py-1 font-mono-metric text-xs font-bold text-[#0A1628]"
                      style={{ backgroundColor: activeTier.color }}
                    >
                      {activeTier.tier} ({activeTier.range})
                    </span>
                    <Sparkles className="h-4 w-4 text-[#22D3EE]" aria-hidden="true" />
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold text-white">
                    {activeTier.label}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                    {activeTier.action}
                  </p>
                </motion.div>
              </div>

              <div className="mt-7">
                <MagneticButton
                  href="/contact?intent=abm-scores"
                  variant="primary"
                  className="w-full"
                  onClick={() =>
                    trackEvent("cta_click", {
                      cta_location: "abm_scoring_demo",
                      cta_label: "See your sample scores.",
                    })
                  }
                >
                  <span>See your sample scores.</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Sample Account Scoring Dashboard Preview Table */}
          <div className="mt-12 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-[#F8FAFC] px-6 py-4">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-[#1E5EFF]" aria-hidden="true" />
                <h3 className="font-display text-base font-semibold text-[#0A1628]">
                  Sample Account Scoring Dashboard
                </h3>
              </div>
              <span className="text-xs text-slate-500">
                Click any row to load into simulator
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="border-b border-slate-200 bg-white text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-3.5">Sample Profile</th>
                    <th className="px-4 py-3.5">Fit</th>
                    <th className="px-4 py-3.5">Intent</th>
                    <th className="px-4 py-3.5">Engagement</th>
                    <th className="px-4 py-3.5">Composite</th>
                    <th className="px-6 py-3.5">Tier Classification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {ILLUSTRATIVE_ABM_ACCOUNTS.map((acc) => {
                    const total = Math.round(
                      acc.fitScore * 0.4 +
                        acc.intentScore * 0.35 +
                        acc.engagementScore * 0.25
                    );
                    const tier =
                      ABM_TIERS.find((t) => total >= t.minScore) || ABM_TIERS[2];
                    return (
                      <tr
                        key={acc.id}
                        onClick={() => handleSelectAccount(acc.id)}
                        className={cn(
                          "cursor-pointer transition hover:bg-[#F8FAFC]",
                          selectedAccountId === acc.id ? "bg-[#1E5EFF]/[0.04]" : ""
                        )}
                      >
                        <td className="px-6 py-4 font-semibold text-[#0A1628]">
                          {acc.accountLabel}
                          <span className="block text-xs font-normal text-slate-500">
                            {acc.industry}
                          </span>
                        </td>
                        <td className="px-4 py-4 font-mono-metric text-slate-700">
                          {acc.fitScore}
                        </td>
                        <td className="px-4 py-4 font-mono-metric text-slate-700">
                          {acc.intentScore}
                        </td>
                        <td className="px-4 py-4 font-mono-metric text-slate-700">
                          {acc.engagementScore}
                        </td>
                        <td className="px-4 py-4 font-mono-metric font-bold text-[#0A1628]">
                          {total}
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 font-mono-metric text-xs font-semibold text-[#0A1628]">
                            {tier.tier}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* What is ABM Scoring? Pillars & Tier Classification */}
      <section className="zbr-section bg-[#F8FAFC] text-[#0F172A]">
        <div className="zbr-container">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1E5EFF]">
              <Layers className="h-3.5 w-3.5" aria-hidden="true" />
              What Is ABM Scoring?
            </span>
            <h2 className="type-h2 mt-3 text-[#0A1628]">
              Three intelligence dimensions, unified.
            </h2>
            <p className="type-body-lg mt-4 text-slate-600">
              Account-based scoring replaces guesswork with a structured view of
              who fits your ICP, who is actively researching, and who is
              engaging with your brand.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-7 lg:grid-cols-3">
            {ABM_PILLARS.map((pillar) => (
              <TiltCard key={pillar.id} className="p-7">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl font-semibold text-[#0A1628]">
                    {pillar.title}
                  </h3>
                  <span
                    className="rounded-full px-3 py-1 font-mono-metric text-xs font-bold text-white"
                    style={{ backgroundColor: pillar.accent }}
                  >
                    {pillar.weightDefault}%
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {pillar.summary}
                </p>
                <ul className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-xs font-medium text-[#0F172A]">
                  {pillar.factors.map((f) => (
                    <li key={f}>• {f}</li>
                  ))}
                </ul>
              </TiltCard>
            ))}
          </div>

          {/* Tier 1 / Tier 2 / Tier 3 Classification */}
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {ABM_TIERS.map((t) => (
              <div
                key={t.tier}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl font-bold text-[#0A1628]">
                    {t.tier}
                  </span>
                  <span className="font-mono-metric text-xs font-semibold text-slate-500">
                    Score {t.range}
                  </span>
                </div>
                <p className="mt-2 text-sm font-semibold text-[#1E5EFF]">
                  {t.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {t.action}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

