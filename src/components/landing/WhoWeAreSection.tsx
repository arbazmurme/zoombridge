"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WHO_WE_ARE_METRICS } from "@/data/site";
import { useMotionConfig } from "@/components/providers/MotionProvider";
import { TiltCard } from "@/components/ui/TiltCard";

gsap.registerPlugin(ScrollTrigger);

export function WhoWeAreSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgMeshRef = useRef<HTMLDivElement | null>(null);
  const { prefersReducedMotion } = useMotionConfig();
  const [counts, setCounts] = useState<number[]>(
    WHO_WE_ARE_METRICS.map(() => 0)
  );
  const displayCounts = prefersReducedMotion
    ? WHO_WE_ARE_METRICS.map((m) => m.value)
    : counts;

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Background Parallax (moves slower than foreground)
      if (bgMeshRef.current) {
        gsap.fromTo(
          bgMeshRef.current,
          { y: -45 },
          {
            y: 45,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // Staggered text reveal
      gsap.from(".who-reveal", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // Scale Parallax on metric cards grid
      gsap.fromTo(
        ".who-metrics-grid",
        { scale: 0.94 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".who-metrics-grid",
            start: "top 90%",
            end: "top 45%",
            scrub: true,
          },
        }
      );

      // Number count-up animation triggered at viewport entry
      ScrollTrigger.create({
        trigger: ".who-metrics-grid",
        start: "top 82%",
        once: true,
        onEnter: () => {
          const tracker = { progress: 0 };
          gsap.to(tracker, {
            progress: 1,
            duration: 1.4,
            ease: "power2.out",
            onUpdate: () => {
              setCounts(
                WHO_WE_ARE_METRICS.map((m) =>
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
      aria-labelledby="who-we-are-heading"
      className="zbr-section relative overflow-hidden bg-gradient-to-b from-[#EDF2FC] via-[#F5F8FF] to-[#EAF1FC] text-[#0F172A]"
    >
      {/* Architectural Blueprint Grid + Soft Vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-65"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(30, 94, 255, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(30, 94, 255, 0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 85% 80% at 50% 50%, #000 55%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 80% at 50% 50%, #000 55%, transparent 100%)",
        }}
      />

      {/* Background Parallax Layer: Soft Aurora Orbs + Data Network Arcs */}
      <div
        ref={bgMeshRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="absolute -right-24 -top-24 h-[440px] w-[440px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(30,94,255,0.16) 0%, rgba(139,92,246,0.08) 55%, transparent 75%)",
          }}
        />
        <div
          className="absolute -bottom-24 -left-20 h-[420px] w-[420px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.18) 0%, rgba(30,94,255,0.08) 55%, transparent 75%)",
          }}
        />
        <svg
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full opacity-35"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M-40 460 C 260 320, 560 520, 880 310 C 1100 165, 1290 210, 1480 90"
            stroke="#1E5EFF"
            strokeOpacity="0.28"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
          <path
            d="M-60 220 C 280 90, 620 260, 960 150 C 1180 80, 1340 160, 1500 260"
            stroke="#22D3EE"
            strokeOpacity="0.35"
            strokeWidth="1.5"
          />
          <circle cx="280" cy="390" r="4" fill="#1E5EFF" fillOpacity="0.4" />
          <circle cx="880" cy="310" r="5" fill="#22D3EE" fillOpacity="0.55" />
          <circle cx="960" cy="150" r="4" fill="#8B5CF6" fillOpacity="0.45" />
        </svg>
      </div>

      <div className="zbr-container relative z-10">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="who-reveal inline-flex items-center rounded-full border border-[#1E5EFF]/20 bg-[#1E5EFF]/8 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#1E5EFF]">
              Who We Are
            </span>
            <h2
              id="who-we-are-heading"
              className="who-reveal type-h2 mt-4 text-[#0A1628]"
            >
              Powering smarter revenue growth.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="who-reveal type-body-lg text-slate-600">
              At ZoomBridge Research, we help organizations accelerate revenue
              growth by combining Artificial Intelligence, data intelligence,
              and human expertise — identifying high-value accounts, uncovering
              decision-makers, enriching business data, and delivering targeted
              demand generation.
            </p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="who-metrics-grid mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHO_WE_ARE_METRICS.map((metric, idx) => (
            <TiltCard
              key={metric.label}
              glowColor="rgba(30, 94, 255, 0.12)"
              className="p-7"
            >
              <div className="flex items-baseline gap-1">
                <span className="font-mono-metric text-4xl font-bold tracking-tight text-[#0A1628] lg:text-5xl">
                  {displayCounts[idx]}
                </span>
                <span className="font-mono-metric text-3xl font-bold text-[#1E5EFF]">
                  {metric.suffix}
                </span>
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold text-[#0F172A]">
                {metric.label}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                {metric.detail}
              </p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
