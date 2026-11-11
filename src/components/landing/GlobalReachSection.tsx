"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe2, MapPin, UserCheck } from "lucide-react";
import { GLOBAL_REACH } from "@/data/site";
import { GlobalGlobeWrapper } from "@/components/three/GlobalGlobeWrapper";
import { useMotionConfig } from "@/components/providers/MotionProvider";

gsap.registerPlugin(ScrollTrigger);

const DEPTH_PARTICLES = [
  { top: "12%", left: "8%", size: 5, depth: 36, color: "#22D3EE" },
  { top: "28%", left: "44%", size: 4, depth: 56, color: "#3B7BFF" },
  { top: "64%", left: "16%", size: 6, depth: 44, color: "#8B5CF6" },
  { top: "78%", left: "52%", size: 4, depth: 62, color: "#22D3EE" },
  { top: "20%", left: "88%", size: 5, depth: 34, color: "#3B7BFF" },
  { top: "72%", left: "84%", size: 6, depth: 52, color: "#8B5CF6" },
];

export function GlobalReachSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { prefersReducedMotion } = useMotionConfig();
  const [counts, setCounts] = useState<number[]>(
    GLOBAL_REACH.metrics.map(() => 0)
  );
  const displayCounts = prefersReducedMotion
    ? GLOBAL_REACH.metrics.map((m) => m.value)
    : counts;

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Particle Parallax (each particle moves at its own depth velocity)
      const particles = gsap.utils.toArray<HTMLElement>(".reach-particle");
      particles.forEach((el) => {
        const depth = Number(el.dataset.depth || 40);
        gsap.fromTo(
          el,
          { y: depth },
          {
            y: -depth,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      // Animated counters
      ScrollTrigger.create({
        trigger: ".reach-counters",
        start: "top 85%",
        once: true,
        onEnter: () => {
          const tracker = { progress: 0 };
          gsap.to(tracker, {
            progress: 1,
            duration: 1.4,
            ease: "power2.out",
            onUpdate: () => {
              setCounts(
                GLOBAL_REACH.metrics.map((m) =>
                  Math.round(m.value * tracker.progress)
                )
              );
            },
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="global-reach-heading"
      className="zbr-section relative overflow-hidden bg-[#0A1628] text-white"
    >
      {/* Multi-depth Particle Parallax Layer */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {DEPTH_PARTICLES.map((p, idx) => (
          <span
            key={idx}
            data-depth={p.depth}
            className="reach-particle absolute rounded-full opacity-50 blur-[0.5px]"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
            }}
          />
        ))}
      </div>

      <div className="zbr-container relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        {/* Left Intelligence & Decision-Maker Breakdown */}
        <div className="lg:col-span-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#22D3EE]/30 bg-[#22D3EE]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#22D3EE]">
            <Globe2 className="h-3.5 w-3.5" aria-hidden="true" />
            Global Decision-Maker Reach
          </span>
          <h2 id="global-reach-heading" className="type-h2 mt-4 text-white">
            {GLOBAL_REACH.heading}
          </h2>

          {/* Counters */}
          <div className="reach-counters mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {GLOBAL_REACH.metrics.map((metric, idx) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-white/10 bg-[#0F1E38]/90 p-5"
              >
                <p className="font-mono-metric text-4xl font-bold text-[#22D3EE]">
                  {displayCounts[idx]}
                  {metric.suffix}
                </p>
                <p className="mt-1.5 text-sm font-medium text-slate-200">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>

          {/* Target Decision-Makers */}
          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Target Decision-Makers
            </p>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {GLOBAL_REACH.decisionMakers.map((role) => (
                <span
                  key={role}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-slate-200 transition hover:border-[#22D3EE]/50 hover:text-white"
                >
                  <UserCheck className="h-3.5 w-3.5 text-[#22D3EE]" aria-hidden="true" />
                  {role}
                </span>
              ))}
            </div>
          </div>

          {/* Regional Hub Indicators */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            {GLOBAL_REACH.regions.map((region) => (
              <div
                key={region.code}
                className="rounded-xl border border-white/10 bg-[#0F1E38]/60 p-3.5"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <MapPin className="h-3.5 w-3.5 text-[#3B7BFF]" aria-hidden="true" />
                  <span>{region.name}</span>
                </div>
                <p className="mt-1 text-[11px] text-slate-400">{region.hubs}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right 3D Low-Poly Globe */}
        <div className="lg:col-span-6">
          <div className="relative rounded-3xl border border-white/10 bg-[#0F1E38]/40 p-4 backdrop-blur-sm">
            <GlobalGlobeWrapper />
            <div className="mt-2 flex items-center justify-between border-t border-white/10 px-2 pt-3 text-xs text-slate-400">
              <span>4 Global Regions Active</span>
              <span className="font-mono-metric text-[#22D3EE]">
                NAM • EMEA • APAC • LATAM
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
