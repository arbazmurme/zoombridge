"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Compass, Eye } from "lucide-react";
import { MISSION_VISION } from "@/data/site";
import { useMotionConfig } from "@/components/providers/MotionProvider";

gsap.registerPlugin(ScrollTrigger);

export function MissionVisionSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const rightColRef = useRef<HTMLDivElement | null>(null);
  const reticleRef = useRef<SVGSVGElement | null>(null);
  const { prefersReducedMotion, isDesktop } = useMotionConfig();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Split-Screen Parallax (left and right columns move independently on desktop)
      if (isDesktop && leftColRef.current && rightColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          { y: 36 },
          {
            y: -36,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
        gsap.fromTo(
          rightColRef.current,
          { y: -36 },
          {
            y: 36,
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

      // Rotation Parallax on decorative geometric reticle
      if (reticleRef.current) {
        gsap.fromTo(
          reticleRef.current,
          { rotate: -22 },
          {
            rotate: 38,
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
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, isDesktop]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="mission-vision-heading"
      className="zbr-section relative overflow-hidden bg-[#F8FAFC] text-[#0F172A]"
    >
      {/* Subtle Rotation Parallax Reticle */}
      <svg
        ref={reticleRef}
        aria-hidden="true"
        viewBox="0 0 400 400"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 opacity-[0.07]"
      >
        <circle
          cx="200"
          cy="200"
          r="175"
          stroke="#1E5EFF"
          strokeWidth="1.5"
          strokeDasharray="8 10"
          fill="none"
        />
        <circle
          cx="200"
          cy="200"
          r="125"
          stroke="#0A1628"
          strokeWidth="1"
          fill="none"
        />
        <line x1="200" y1="10" x2="200" y2="390" stroke="#1E5EFF" strokeWidth="1" />
        <line x1="10" y1="200" x2="390" y2="200" stroke="#1E5EFF" strokeWidth="1" />
      </svg>

      <div className="zbr-container relative z-10">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center rounded-full border border-[#1E5EFF]/20 bg-white px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#1E5EFF]">
            Purpose &amp; Direction
          </span>
          <h2
            id="mission-vision-heading"
            className="type-h2 mt-4 text-[#0A1628]"
          >
            Built for measurable enterprise impact.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Mission Left Split Column */}
          <div
            ref={leftColRef}
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_12px_40px_rgba(10,22,40,0.06)] lg:p-10"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1E5EFF]/10 text-[#1E5EFF]">
              <Compass className="h-6 w-6" aria-hidden="true" />
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#1E5EFF]">
              {MISSION_VISION.mission.label}
            </p>
            <h3 className="type-h4 mt-3 text-[#0A1628]">
              {MISSION_VISION.mission.statement}
            </h3>
          </div>

          {/* Vision Right Split Column */}
          <div
            ref={rightColRef}
            className="rounded-3xl border border-white/10 bg-[#0A1628] p-8 text-white shadow-[0_16px_48px_rgba(10,22,40,0.18)] lg:p-10"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#22D3EE]/15 text-[#22D3EE]">
              <Eye className="h-6 w-6" aria-hidden="true" />
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#22D3EE]">
              {MISSION_VISION.vision.label}
            </p>
            <h3 className="type-h4 mt-3 text-white">
              {MISSION_VISION.vision.statement}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}

