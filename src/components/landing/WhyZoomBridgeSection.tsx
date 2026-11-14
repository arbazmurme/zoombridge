"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Cpu, LineChart, ShieldCheck, Trophy } from "lucide-react";
import { WHY_ZOOMBRIDGE_STAGES } from "@/data/site";
import { useMotionConfig } from "@/components/providers/MotionProvider";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const STAGE_ICONS = [Cpu, LineChart, ShieldCheck, Trophy];

export function WhyZoomBridgeSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsTrackRef = useRef<HTMLDivElement | null>(null);
  const progressLineRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const [activeStage, setActiveStage] = useState(0);
  const [cardHeight, setCardHeight] = useState(250);
  const { prefersReducedMotion, isDesktop } = useMotionConfig();

  // Measure card height dynamically for pixel-perfect internal scrolling
  useEffect(() => {
    const updateCardHeight = () => {
      const firstCard = cardRefs.current[0];
      if (firstCard) {
        setCardHeight(firstCard.offsetHeight + 24); // height + gap-6 (24px)
      }
    };

    updateCardHeight();
    window.addEventListener("resize", updateCardHeight);
    return () => window.removeEventListener("resize", updateCardHeight);
  }, []);

  // Pinned Scroll: Section stays pinned on screen while items scroll inside!
  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (isDesktop) {
        const trigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top+=80",
          end: "+=2200",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            const stageIndex = Math.min(
              WHY_ZOOMBRIDGE_STAGES.length - 1,
              Math.floor(p * WHY_ZOOMBRIDGE_STAGES.length)
            );
            setActiveStage(stageIndex);
            if (progressLineRef.current) {
              progressLineRef.current.style.height = `${p * 100}%`;
            }
          },
        });
        scrollTriggerRef.current = trigger;
      } else {
        // Mobile fallback: simple reveal
        const cards = gsap.utils.toArray<HTMLElement>(".why-stage-card");
        cards.forEach((card, idx) => {
          ScrollTrigger.create({
            trigger: card,
            start: "top 65%",
            end: "bottom 45%",
            onEnter: () => setActiveStage(idx),
            onEnterBack: () => setActiveStage(idx),
          });
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      scrollTriggerRef.current = null;
    };
  }, [prefersReducedMotion, isDesktop]);

  const handleStageClick = (idx: number) => {
    setActiveStage(idx);
    if (isDesktop && scrollTriggerRef.current) {
      const total = scrollTriggerRef.current.end - scrollTriggerRef.current.start;
      const targetScroll =
        scrollTriggerRef.current.start +
        (idx / (WHY_ZOOMBRIDGE_STAGES.length - 1)) * total +
        10;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    } else {
      const el = document.getElementById(`why-stage-${WHY_ZOOMBRIDGE_STAGES[idx].step}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="why-zbr-heading"
      className="zbr-section relative overflow-hidden bg-[#0A1628] text-white"
    >
      {/* Ambient Radial Aurora Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-1/4 h-[520px] w-[520px] rounded-full bg-[#1E5EFF]/18 blur-3xl transition-all duration-700"
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
          {/* Left Narrative Column */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <span className="inline-flex items-center rounded-full border border-[#22D3EE]/30 bg-[#22D3EE]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#22D3EE]">
                Why ZoomBridge?
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

              {/* Connected Stage Navigator Nodes */}
              <div className="mt-8 space-y-3 border-l border-white/15 pl-5">
                {WHY_ZOOMBRIDGE_STAGES.map((stage, idx) => {
                  const active = activeStage === idx;
                  return (
                    <button
                      key={stage.step}
                      type="button"
                      onClick={() => handleStageClick(idx)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-all duration-200",
                        active
                          ? "border border-[#22D3EE]/50 bg-[#0F1E38] text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
                          : "border border-transparent text-slate-400 hover:bg-white/5 hover:text-slate-200"
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={cn(
                            "font-mono-metric text-xs font-bold transition-colors",
                            active ? "text-[#22D3EE]" : "text-slate-500"
                          )}
                        >
                          {stage.step}
                        </span>
                        <span className="font-display text-sm font-semibold">
                          {stage.title}
                        </span>
                      </span>
                      <span
                        className={cn(
                          "h-2 w-2 rounded-full transition-transform",
                          active
                            ? "scale-125 bg-[#22D3EE] shadow-[0_0_12px_#22D3EE]"
                            : "bg-slate-600"
                        )}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Scrolling Stages (Items scroll inside the pinned viewport) */}
          <div className="why-stages-list relative lg:col-span-7">
            {/* Scroll-Controlled Laser Spine Line */}
            <div
              aria-hidden="true"
              className="absolute bottom-10 left-6 top-10 hidden w-[2px] bg-white/10 sm:block"
            >
              <div
                ref={progressLineRef}
                className="w-full bg-gradient-to-b from-[#1E5EFF] via-[#22D3EE] to-[#8B5CF6] shadow-[0_0_8px_rgba(34,211,238,0.65)] transition-all duration-200"
                style={{
                  height: isDesktop
                    ? `${((activeStage + 0.3) / WHY_ZOOMBRIDGE_STAGES.length) * 100}%`
                    : "100%",
                }}
              />
            </div>

            {/* Viewing Window for Items Scrolling */}
            <div
              className={cn(
                "relative sm:pl-16",
                isDesktop && !prefersReducedMotion && "overflow-hidden py-4"
              )}
              style={
                isDesktop && !prefersReducedMotion
                  ? { height: `${cardHeight * 1.85}px` }
                  : undefined
              }
            >
              <div
                ref={cardsTrackRef}
                className={cn(
                  "space-y-6 will-change-transform",
                  isDesktop &&
                    !prefersReducedMotion &&
                    "transition-transform duration-500 ease-out"
                )}
                style={
                  isDesktop && !prefersReducedMotion
                    ? {
                        transform: `translate3d(0, -${activeStage * cardHeight}px, 0)`,
                      }
                    : undefined
                }
              >
                {WHY_ZOOMBRIDGE_STAGES.map((stage, idx) => {
                  const Icon = STAGE_ICONS[idx];
                  const isActive = activeStage === idx;

                  return (
                    <article
                      id={`why-stage-${stage.step}`}
                      key={stage.step}
                      ref={(el) => {
                        cardRefs.current[idx] = el;
                      }}
                      onMouseEnter={() => setActiveStage(idx)}
                      className={cn(
                        "why-stage-card relative rounded-2xl border p-7 transition-all duration-300",
                        isActive
                          ? "border-[#22D3EE]/55 bg-[#0F1E38] shadow-[0_16px_48px_rgba(0,0,0,0.36)] opacity-100 scale-100"
                          : isDesktop && !prefersReducedMotion
                          ? "border-white/10 bg-[#0F1E38]/50 opacity-35 scale-[0.98]"
                          : "border-white/10 bg-[#0F1E38]/65 hover:border-white/25"
                      )}
                    >
                      {/* Node Dot on Spine */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute -left-[49px] top-8 hidden h-4 w-4 rounded-full border-2 transition-all duration-300 sm:block",
                          isActive
                            ? "scale-125 border-[#22D3EE] bg-[#0A1628] shadow-[0_0_16px_rgba(34,211,238,0.7)]"
                            : "border-slate-600 bg-[#0A1628]"
                        )}
                      />

                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                          <span
                            className={cn(
                              "flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300",
                              isActive
                                ? "bg-[#1E5EFF]/25 text-[#22D3EE] shadow-[0_0_14px_rgba(34,211,238,0.3)]"
                                : "bg-white/5 text-slate-400"
                            )}
                          >
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </span>
                          <div>
                            <span className="font-mono-metric text-xs font-semibold text-[#22D3EE]">
                              Stage {stage.step}
                            </span>
                            <h3 className="font-display text-2xl font-semibold text-white">
                              {stage.title}
                            </h3>
                          </div>
                        </div>
                        <span className="text-xs font-medium text-slate-400">
                          {stage.subtitle}
                        </span>
                      </div>

                      <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {stage.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex items-center gap-2.5 rounded-xl border border-white/8 bg-[#0A1628]/70 px-3.5 py-2.5 text-sm text-slate-200 transition-colors duration-200 hover:border-white/20"
                          >
                            <Check
                              className="h-4 w-4 shrink-0 text-[#22D3EE]"
                              aria-hidden="true"
                            />
                            <span>{bullet}</span>
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
      </div>
    </section>
  );
}
