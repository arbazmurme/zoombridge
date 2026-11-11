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
  const progressLineRef = useRef<HTMLDivElement | null>(null);
  const [activeStage, setActiveStage] = useState(0);
  const { prefersReducedMotion, isDesktop } = useMotionConfig();

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

      // Crisp Stage Entrance & Active Tracking
      const cards = gsap.utils.toArray<HTMLElement>(".why-stage-card");
      cards.forEach((card, idx) => {
        gsap.from(card, {
          opacity: 0,
          y: 26,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 86%",
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
      className="zbr-section relative bg-[#0A1628] text-white"
    >
      <div className="zbr-container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Sticky Parallax Left Story Column */}
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
                      onClick={() => {
                        setActiveStage(idx);
                        const el = document.getElementById(`why-stage-${stage.step}`);
                        el?.scrollIntoView({ behavior: "smooth", block: "center" });
                      }}
                      className={cn(
                        "flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition-all duration-200",
                        active
                          ? "border border-[#22D3EE]/40 bg-[#0F1E38] text-white shadow-[0_8px_24px_rgba(0,0,0,0.28)]"
                          : "border border-transparent text-slate-400 hover:bg-white/5 hover:text-slate-200"
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={cn(
                            "font-mono-metric text-xs font-bold",
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
                          active ? "scale-125 bg-[#22D3EE]" : "bg-slate-600"
                        )}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Scrolling Stages + Scroll-Driven SVG Spine */}
          <div className="why-stages-list relative lg:col-span-7">
            {/* Scroll-Controlled Progress Line */}
            <div
              aria-hidden="true"
              className="absolute bottom-8 left-6 top-8 hidden w-[2px] bg-white/10 sm:block"
            >
              <div
                ref={progressLineRef}
                className="h-full w-full bg-gradient-to-b from-[#1E5EFF] via-[#22D3EE] to-[#8B5CF6]"
              />
            </div>

            <div className="space-y-6 sm:pl-16">
              {WHY_ZOOMBRIDGE_STAGES.map((stage, idx) => {
                const Icon = STAGE_ICONS[idx];
                const isActive = activeStage === idx;
                return (
                  <article
                    id={`why-stage-${stage.step}`}
                    key={stage.step}
                    onMouseEnter={() => setActiveStage(idx)}
                    className={cn(
                      "why-stage-card relative rounded-2xl border p-7 transition-all duration-300",
                      isActive
                        ? "border-[#22D3EE]/50 bg-[#0F1E38] shadow-[0_16px_48px_rgba(0,0,0,0.36)]"
                        : "border-white/10 bg-[#0F1E38]/65 hover:border-white/25"
                    )}
                  >
                    {/* Node Dot on Spine */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute -left-[49px] top-8 hidden h-4 w-4 rounded-full border-2 sm:block",
                        isActive
                          ? "border-[#22D3EE] bg-[#0A1628] shadow-[0_0_16px_rgba(34,211,238,0.65)]"
                          : "border-slate-600 bg-[#0A1628]"
                      )}
                    />

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1E5EFF]/20 text-[#22D3EE]">
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
                          className="flex items-center gap-2.5 rounded-xl border border-white/8 bg-[#0A1628]/70 px-3.5 py-2.5 text-sm text-slate-200"
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
    </section>
  );
}

