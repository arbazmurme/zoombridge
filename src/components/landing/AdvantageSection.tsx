"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, XCircle } from "lucide-react";
import { ADVANTAGE_COMPARISON } from "@/data/site";
import { useMotionConfig } from "@/components/providers/MotionProvider";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function AdvantageSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const { prefersReducedMotion, isDesktop } = useMotionConfig();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".adv-row", {
        opacity: 0,
        y: 18,
        duration: 0.55,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // Horizontal Parallax subtle drift on comparison rows as scroll progresses
      if (isDesktop) {
        const rows = gsap.utils.toArray<HTMLElement>(".adv-row");
        rows.forEach((row, idx) => {
          const dir = idx % 2 === 0 ? -16 : 16;
          gsap.fromTo(
            row,
            { x: dir },
            {
              x: 0,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top 92%",
                end: "top 60%",
                scrub: true,
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, isDesktop]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="advantage-heading"
      className="zbr-section bg-[#F8FAFC] text-[#0F172A]"
    >
      <div className="zbr-container">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Sticky Header Column */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <span className="inline-flex items-center rounded-full border border-[#1E5EFF]/20 bg-white px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#1E5EFF]">
                Competitive Edge
              </span>
              <h2 id="advantage-heading" className="type-h2 mt-4 text-[#0A1628]">
                The ZoomBridge advantage.
              </h2>
              <p className="type-body-lg mt-4 text-slate-600">
                Compare automated static exports against research-led,
                human-verified demand intelligence.
              </p>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_12px_40px_rgba(10,22,40,0.06)]">
              <div className="grid grid-cols-12 border-b border-slate-200 bg-[#0A1628] px-6 py-4 text-xs font-semibold uppercase tracking-wider text-white">
                <div className="col-span-4 text-slate-300">Capability</div>
                <div className="col-span-4 text-slate-400">
                  Traditional Data Vendor
                </div>
                <div className="col-span-4 text-[#22D3EE]">
                  ZoomBridge Research
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {ADVANTAGE_COMPARISON.map((row, idx) => {
                  const active = hoveredRow === idx;
                  return (
                    <div
                      key={row.dimension}
                      onMouseEnter={() => setHoveredRow(idx)}
                      onMouseLeave={() => setHoveredRow(null)}
                      className={cn(
                        "adv-row grid grid-cols-1 gap-3 px-6 py-5 transition-colors duration-200 sm:grid-cols-12 sm:items-center sm:gap-4",
                        active ? "bg-[#1E5EFF]/[0.04]" : "bg-white"
                      )}
                    >
                      <div className="sm:col-span-4">
                        <span className="font-display text-sm font-semibold text-[#0A1628]">
                          {row.dimension}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500 sm:col-span-4">
                        <XCircle
                          className="h-4 w-4 shrink-0 text-slate-400"
                          aria-hidden="true"
                        />
                        <span>{row.traditional}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-[#0A1628] sm:col-span-4">
                        <CheckCircle2
                          className="h-4 w-4 shrink-0 text-[#1E5EFF]"
                          aria-hidden="true"
                        />
                        <span>{row.zbr}</span>
                      </div>
                    </div>
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

