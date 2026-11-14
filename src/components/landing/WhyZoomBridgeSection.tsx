"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Activity,
  ArrowRight,
  Check,
  Cpu,
  LineChart,
  Radio,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { WHY_ZOOMBRIDGE_STAGES } from "@/data/site";
import { useMotionConfig } from "@/components/providers/MotionProvider";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const STAGE_CONFIGS = [
  {
    icon: Cpu,
    accentColor: "#1E5EFF",
    glowColor: "rgba(30, 94, 255, 0.45)",
    badgeText: "Stage 01 • Signal Detection at Scale",
    summary: "Ingesting 140,000+ signals daily across 120+ countries.",
  },
  {
    icon: LineChart,
    accentColor: "#22D3EE",
    glowColor: "rgba(34, 211, 238, 0.45)",
    badgeText: "Stage 02 • Deep Scoring & Pattern Synthesis",
    summary: "Algorithmic account scoring combining fit and buying intent.",
  },
  {
    icon: ShieldCheck,
    accentColor: "#8B5CF6",
    glowColor: "rgba(139, 92, 246, 0.45)",
    badgeText: "Stage 03 • Research-Grade Manual Verification",
    summary: "Senior B2B analysts verify every record before campaign delivery.",
  },
  {
    icon: Trophy,
    accentColor: "#10B981",
    glowColor: "rgba(16, 185, 129, 0.45)",
    badgeText: "Stage 04 • Predictable Pipeline Outcomes",
    summary: "Higher reply rates, faster deal cycles, and protected sender reputation.",
  },
];

// Interactive Micro-Visualizer for each of the 4 Stages
function StageMicroVisualizer({
  index,
  isActive,
}: {
  index: number;
  isActive: boolean;
}) {
  if (index === 0) {
    // Stage 01: AI Signal Radar Visualizer
    return (
      <div className="relative overflow-hidden rounded-xl border border-blue-500/30 bg-[#0A1628]/90 p-4">
        {/* Background Grid & Ambient Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[#1E5EFF]/25 blur-xl"
        />

        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#38BDF8] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22D3EE]" />
            </span>
            <span className="font-mono-metric text-[11px] font-semibold tracking-wider text-[#22D3EE] uppercase">
              AI Ingestion Radar Active
            </span>
          </div>
          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono-metric text-[10px] text-slate-300">
            140k+ Signals / Sec
          </span>
        </div>

        {/* Radar Scanner Track with Sweeping Beam */}
        <div className="relative mt-3 flex items-center justify-between gap-3 rounded-lg bg-[#0F1E38]/80 p-2.5">
          <div className="flex items-center gap-2.5">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-[#22D3EE]/30 bg-[#1E5EFF]/20 text-[#22D3EE]">
              <Radio className="h-4 w-4 animate-pulse" />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 animate-ping rounded-lg border border-[#22D3EE]/40 opacity-40"
              />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">
                Live Intent & Hiring Triggers
              </p>
              <p className="text-[10px] text-slate-400">
                120+ Countries • Continuous Ingestion
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="rounded border border-blue-500/30 bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-300">
              TAM Scanned
            </span>
            <span className="rounded border border-[#22D3EE]/30 bg-[#22D3EE]/10 px-2 py-0.5 text-[10px] font-medium text-[#22D3EE]">
              ICP Filtered
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (index === 1) {
    // Stage 02: AI Deep Scoring Matrix Visualizer
    return (
      <div className="relative overflow-hidden rounded-xl border border-cyan-500/30 bg-[#0A1628]/90 p-4">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[#22D3EE]/25 blur-xl"
        />

        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-2">
            <Zap className="h-3.5 w-3.5 text-[#22D3EE]" />
            <span className="font-mono-metric text-[11px] font-semibold tracking-wider text-[#22D3EE] uppercase">
              Predictive TAL Scoring Matrix
            </span>
          </div>
          <span className="rounded-full border border-[#22D3EE]/30 bg-[#22D3EE]/10 px-2 py-0.5 font-mono-metric text-[10px] font-bold text-[#22D3EE]">
            96 / 100 TAL Fit
          </span>
        </div>

        {/* Scoring Bars */}
        <div className="mt-3 space-y-2">
          <div>
            <div className="flex justify-between text-[11px] font-medium text-slate-300">
              <span>Account Fit & Tech-Stack Match</span>
              <span className="font-mono-metric font-bold text-white">96%</span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#1E5EFF] to-[#22D3EE] transition-all duration-700 ease-out"
                style={{ width: isActive ? "96%" : "60%" }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] font-medium text-slate-300">
              <span>Buying-Committee Intent Surge</span>
              <span className="font-mono-metric font-bold text-[#22D3EE]">92% High</span>
            </div>
            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] transition-all duration-700 ease-out"
                style={{ width: isActive ? "92%" : "50%" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (index === 2) {
    // Stage 03: Human Validation Quality Gate
    return (
      <div className="relative overflow-hidden rounded-xl border border-purple-500/35 bg-[#0A1628]/90 p-4">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[#8B5CF6]/25 blur-xl"
        />

        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#A855F7]" />
            <span className="font-mono-metric text-[11px] font-semibold tracking-wider text-[#A855F7] uppercase">
              Human Analyst Quality Gate
            </span>
          </div>
          <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-2 py-0.5 font-mono-metric text-[10px] font-bold text-purple-300">
            95% Accuracy Goal
          </span>
        </div>

        {/* Triple-Verified Badges Grid */}
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
          <div className="flex items-center gap-2 rounded-lg border border-purple-500/20 bg-[#0F1E38] p-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-[#A855F7]">
              ✓
            </span>
            <span className="text-[11px] font-medium text-slate-200">
              Direct Phone
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-purple-500/20 bg-[#0F1E38] p-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-[#A855F7]">
              ✓
            </span>
            <span className="text-[11px] font-medium text-slate-200">
              0% Bounce Email
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-purple-500/20 bg-[#0F1E38] p-2">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-[#A855F7]">
              ✓
            </span>
            <span className="text-[11px] font-medium text-slate-200">
              Budget Authority
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Stage 04: Customers Win Visualizer
  return (
    <div className="relative overflow-hidden rounded-xl border border-emerald-500/35 bg-[#0A1628]/90 p-4">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[#10B981]/25 blur-xl"
      />

      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-[#10B981]" />
          <span className="font-mono-metric text-[11px] font-semibold tracking-wider text-[#10B981] uppercase">
            Predictable Pipeline Acceleration
          </span>
        </div>
        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono-metric text-[10px] font-bold text-emerald-300">
          Enterprise ROI
        </span>
      </div>

      {/* KPI Acceleration Grid */}
      <div className="mt-3 grid grid-cols-3 gap-2">
        <div className="rounded-lg border border-emerald-500/20 bg-[#0F1E38] p-2 text-center">
          <p className="font-mono-metric text-base font-bold text-[#10B981]">
            3.4x
          </p>
          <p className="text-[10px] text-slate-400">Pipeline Velocity</p>
        </div>

        <div className="rounded-lg border border-emerald-500/20 bg-[#0F1E38] p-2 text-center">
          <p className="font-mono-metric text-base font-bold text-white">
            -48%
          </p>
          <p className="text-[10px] text-slate-400">Acquisition Cost</p>
        </div>

        <div className="rounded-lg border border-emerald-500/20 bg-[#0F1E38] p-2 text-center">
          <p className="font-mono-metric text-base font-bold text-[#22D3EE]">
            +38%
          </p>
          <p className="text-[10px] text-slate-400">Response Rate</p>
        </div>
      </div>
    </div>
  );
}

export function WhyZoomBridgeSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const progressLineRef = useRef<HTMLDivElement | null>(null);
  const [activeStage, setActiveStage] = useState(0);
  const { prefersReducedMotion, isDesktop } = useMotionConfig();

  const activeConfig = STAGE_CONFIGS[activeStage] || STAGE_CONFIGS[0];

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Scroll-Driven Parallax progress spine
      if (progressLineRef.current) {
        gsap.fromTo(
          progressLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: {
              trigger: ".why-stages-list",
              start: "top 65%",
              end: "bottom 65%",
              scrub: true,
            },
          }
        );
      }

      // Smooth Stage Cards Entrance & Active Tracking
      const cards = gsap.utils.toArray<HTMLElement>(".why-stage-card");
      cards.forEach((card, idx) => {
        gsap.from(card, {
          opacity: 0,
          y: 32,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true,
          },
        });

        ScrollTrigger.create({
          trigger: card,
          start: "top 55%",
          end: "bottom 45%",
          onEnter: () => setActiveStage(idx),
          onEnterBack: () => setActiveStage(idx),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, isDesktop]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="why-zbr-heading"
      className="zbr-section relative overflow-hidden bg-[#0A1628] text-white"
    >
      {/* Dynamic Ambient Aurora Background Shift */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-1/4 h-[520px] w-[520px] rounded-full opacity-25 blur-3xl transition-colors duration-700"
        style={{
          background: `radial-gradient(circle, ${activeConfig.accentColor} 0%, transparent 70%)`,
        }}
      />

      {/* Cyber Grid Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.18) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="zbr-container relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Sticky Left Control HUD & Narrative */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#22D3EE]/30 bg-[#22D3EE]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#22D3EE]">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Why ZoomBridge?</span>
              </span>

              <h2 id="why-zbr-heading" className="type-h2 mt-4 text-white">
                AI finds it.{" "}
                <span className="text-[#22D3EE]">Humans verify it.</span>
              </h2>

              <p className="type-body-lg mt-5 text-slate-300">
                Automation discovers signals quickly, but enterprise revenue
                requires human judgment. Our four-stage workflow unifies AI
                speed with analyst verification.
              </p>

              {/* Live Stage Progress Indicator Card */}
              <div className="mt-7 rounded-2xl border border-white/15 bg-[#0F1E38]/90 p-4 shadow-xl backdrop-blur-md">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-400">Workflow Phase</span>
                  <span
                    className="font-mono-metric font-bold"
                    style={{ color: activeConfig.accentColor }}
                  >
                    Stage 0{activeStage + 1} of 04
                  </span>
                </div>

                {/* Segmented Progress Track */}
                <div className="mt-2.5 grid grid-cols-4 gap-1.5">
                  {[0, 1, 2, 3].map((stepIdx) => (
                    <div
                      key={stepIdx}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        stepIdx <= activeStage
                          ? "bg-gradient-to-r from-[#1E5EFF] to-[#22D3EE]"
                          : "bg-white/10"
                      )}
                    />
                  ))}
                </div>

                <p className="mt-2.5 text-xs text-slate-300">
                  {activeConfig.summary}
                </p>
              </div>

              {/* Connected Stage Navigator Nodes */}
              <div className="mt-6 space-y-2.5 border-l border-white/15 pl-4">
                {WHY_ZOOMBRIDGE_STAGES.map((stage, idx) => {
                  const active = activeStage === idx;
                  const cfg = STAGE_CONFIGS[idx];
                  const Icon = cfg.icon;

                  return (
                    <button
                      key={stage.step}
                      type="button"
                      onClick={() => {
                        setActiveStage(idx);
                        const el = document.getElementById(
                          `why-stage-${stage.step}`
                        );
                        el?.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                      }}
                      className={cn(
                        "group flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-all duration-200",
                        active
                          ? "border border-[#22D3EE]/50 bg-[#0F1E38] text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
                          : "border border-transparent text-slate-400 hover:bg-white/5 hover:text-slate-200"
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={cn(
                            "flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold transition-colors",
                            active
                              ? "bg-[#22D3EE]/20 text-[#22D3EE]"
                              : "bg-white/5 text-slate-400 group-hover:text-white"
                          )}
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        <span className="font-display text-sm font-semibold">
                          {stage.step}. {stage.title}
                        </span>
                      </span>

                      <span
                        className={cn(
                          "h-2 w-2 rounded-full transition-all",
                          active
                            ? "scale-125 shadow-[0_0_12px_#22D3EE]"
                            : "bg-slate-600"
                        )}
                        style={{
                          backgroundColor: active ? cfg.accentColor : undefined,
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Scrolling Stages + Scroll-Driven Laser Energy Spine */}
          <div className="why-stages-list relative lg:col-span-7">
            {/* Scroll-Controlled Laser Spine Line */}
            <div
              aria-hidden="true"
              className="absolute bottom-10 left-6 top-10 hidden w-[2px] bg-white/10 sm:block"
            >
              <div
                ref={progressLineRef}
                className="h-full w-full bg-gradient-to-b from-[#1E5EFF] via-[#22D3EE] to-[#10B981] shadow-[0_0_8px_rgba(34,211,238,0.65)]"
              />
            </div>

            <div className="space-y-8 sm:pl-16">
              {WHY_ZOOMBRIDGE_STAGES.map((stage, idx) => {
                const cfg = STAGE_CONFIGS[idx];
                const Icon = cfg.icon;
                const isActive = activeStage === idx;

                return (
                  <article
                    id={`why-stage-${stage.step}`}
                    key={stage.step}
                    onMouseEnter={() => setActiveStage(idx)}
                    className={cn(
                      "why-stage-card relative rounded-2xl border p-6 transition-all duration-300 sm:p-7",
                      isActive
                        ? "border-[#22D3EE]/60 bg-[#0F1E38] shadow-[0_20px_54px_rgba(0,0,0,0.48)]"
                        : "border-white/10 bg-[#0F1E38]/60 hover:border-white/25"
                    )}
                    style={{
                      boxShadow: isActive
                        ? `0 18px 48px -12px ${cfg.glowColor}`
                        : undefined,
                    }}
                  >
                    {/* Concentric Node Beacon on Spine */}
                    <div
                      aria-hidden="true"
                      className="absolute -left-[49px] top-8 hidden items-center sm:flex"
                    >
                      <div className="relative flex h-4 w-4 items-center justify-center">
                        {isActive && (
                          <span
                            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                            style={{ backgroundColor: cfg.accentColor }}
                          />
                        )}
                        <span
                          className={cn(
                            "relative inline-flex h-3.5 w-3.5 rounded-full border-2 transition-all",
                            isActive
                              ? "scale-125 border-white bg-[#0A1628]"
                              : "border-slate-500 bg-[#0A1628]"
                          )}
                          style={{
                            borderColor: isActive ? cfg.accentColor : undefined,
                            boxShadow: isActive
                              ? `0 0 14px ${cfg.accentColor}`
                              : undefined,
                          }}
                        />
                      </div>

                      {/* Connection beam to active card */}
                      {isActive && (
                        <div
                          className="h-[2px] w-8 bg-gradient-to-r from-transparent to-[#22D3EE]/80"
                          style={{
                            backgroundImage: `linear-gradient(to right, transparent, ${cfg.accentColor})`,
                          }}
                        />
                      )}
                    </div>

                    {/* Card Header */}
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <span
                          className="flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-md transition-transform duration-300 group-hover:scale-110"
                          style={{
                            backgroundColor: `${cfg.accentColor}25`,
                            border: `1px solid ${cfg.accentColor}55`,
                            color: cfg.accentColor,
                            boxShadow: `0 0 16px ${cfg.glowColor}`,
                          }}
                        >
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div>
                          <span
                            className="font-mono-metric text-xs font-semibold tracking-wider uppercase"
                            style={{ color: cfg.accentColor }}
                          >
                            Stage {stage.step}
                          </span>
                          <h3 className="font-display text-2xl font-semibold text-white">
                            {stage.title}
                          </h3>
                        </div>
                      </div>

                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
                        {stage.subtitle}
                      </span>
                    </div>

                    {/* Interactive Telemetry Visualizer inside each Card */}
                    <div className="mt-5">
                      <StageMicroVisualizer index={idx} isActive={isActive} />
                    </div>

                    {/* Key Attributes / Bullets */}
                    <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {stage.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="group/item flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#0A1628]/80 px-3.5 py-2.5 text-xs font-medium text-slate-200 transition-all duration-200 hover:border-white/25 hover:bg-[#0A1628]"
                        >
                          <span
                            className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-white"
                            style={{
                              backgroundColor: `${cfg.accentColor}30`,
                              color: cfg.accentColor,
                            }}
                          >
                            <Check className="h-3 w-3" aria-hidden="true" />
                          </span>
                          <span className="transition-colors group-hover/item:text-white">
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
