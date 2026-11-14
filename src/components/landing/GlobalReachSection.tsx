"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe2, MapPin, Move3d, UserCheck } from "lucide-react";
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
      gsap.from(".reach-reveal", {
        opacity: 0,
        y: 22,
        duration: 0.65,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".reach-pill", {
        opacity: 0,
        scale: 0.92,
        y: 12,
        duration: 0.45,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".reach-pills-wrap",
          start: "top 88%",
          once: true,
        },
      });

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
      className="relative overflow-hidden bg-[#0A1628] py-10 lg:py-14 text-white"
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

      <div className="zbr-container relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Left Intelligence & Decision-Maker Breakdown */}
        <div className="lg:col-span-6">
          <span className="reach-reveal inline-flex items-center gap-2 rounded-full border border-[#22D3EE]/30 bg-[#22D3EE]/10 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-[#22D3EE]">
            <Globe2 className="h-3.5 w-3.5" aria-hidden="true" />
            Global Decision-Maker Reach
          </span>
          <h2 id="global-reach-heading" className="reach-reveal type-h2 mt-3 text-white">
            {GLOBAL_REACH.heading}
          </h2>

          {/* Counters */}
          <div className="reach-counters mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {GLOBAL_REACH.metrics.map((metric, idx) => (
              <div
                key={metric.label}
                className="rounded-xl border border-white/10 bg-[#0F1E38]/90 p-4"
              >
                <p className="font-mono-metric text-2xl sm:text-3xl font-bold text-[#22D3EE]">
                  {displayCounts[idx]}
                  {metric.suffix}
                </p>
                <p className="mt-1 text-xs font-medium text-slate-200">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>

          {/* Target Decision-Makers */}
          <div className="mt-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Target Decision-Makers
            </p>
            <div className="reach-pills-wrap mt-2 flex flex-wrap gap-2">
              {GLOBAL_REACH.decisionMakers.map((role) => (
                <span
                  key={role}
                  className="reach-pill inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-200 transition hover:border-[#22D3EE]/50 hover:text-white"
                >
                  <UserCheck className="h-3 w-3 text-[#22D3EE]" aria-hidden="true" />
                  {role}
                </span>
              ))}
            </div>
          </div>

          {/* Regional Hub Indicators */}
          <div className="mt-5 grid grid-cols-2 gap-2.5">
            {GLOBAL_REACH.regions.map((region) => (
              <div
                key={region.code}
                className="reach-reveal rounded-lg border border-white/10 bg-[#0F1E38]/60 p-2.5"
              >
                <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                  <MapPin className="h-3 w-3 text-[#3B7BFF]" aria-hidden="true" />
                  <span>{region.name}</span>
                </div>
                <p className="mt-0.5 text-[10px] text-slate-400">{region.scope}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right 3D Global Intelligence Network Stage */}
        <div className="lg:col-span-6">
          <div className="relative rounded-2xl border border-white/15 bg-[#0F1E38]/85 p-3.5 shadow-2xl backdrop-blur-md">
            {/* Top Telemetry Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-1 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22D3EE] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22D3EE]" />
                </span>
                <span className="font-mono-metric text-[11px] font-semibold uppercase tracking-wider text-[#22D3EE]">
                  Live Global Corridors • 120+ Countries
                </span>
              </div>

              <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-slate-300">
                <Move3d className="h-2.5 w-2.5 text-[#22D3EE]" />
                <span>Drag to Spin</span>
              </div>
            </div>

            {/* 3D Earth Data Matrix Globe */}
            <GlobalGlobeWrapper />

            {/* Bottom Regional Coverage Chips */}
            <div className="mt-2 border-t border-white/10 pt-2.5">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  { code: "AMER", label: "Americas", value: "24M+", color: "#22D3EE" },
                  { code: "EMEA", label: "Europe & ME", value: "16M+", color: "#3B7BFF" },
                  { code: "APAC", label: "Asia-Pacific", value: "8.5M+", color: "#8B5CF6" },
                  { code: "LATAM", label: "Latin Amer", value: "3.5M+", color: "#10B981" },
                ].map((hub) => (
                  <div
                    key={hub.code}
                    className="group rounded-lg border border-white/8 bg-[#0A1628]/80 p-1.5 text-center transition-all duration-200 hover:border-white/20 hover:bg-[#0A1628]"
                  >
                    <p
                      className="font-mono-metric text-xs font-bold"
                      style={{ color: hub.color }}
                    >
                      {hub.value}
                    </p>
                    <p className="text-[10px] font-medium text-slate-400 group-hover:text-slate-200">
                      {hub.code} • {hub.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
