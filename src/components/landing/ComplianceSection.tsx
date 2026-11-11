"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, CheckCircle2, Lock, ShieldCheck } from "lucide-react";
import { COMPLIANCE_PILLARS } from "@/data/site";
import { TiltCard } from "@/components/ui/TiltCard";
import { useMotionConfig } from "@/components/providers/MotionProvider";

gsap.registerPlugin(ScrollTrigger);

export function ComplianceSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const shieldPathRef = useRef<SVGPathElement | null>(null);
  const orbitalRingRef = useRef<SVGCircleElement | null>(null);
  const { prefersReducedMotion } = useMotionConfig();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // SVG Shield Path Drawing Reveal
      if (shieldPathRef.current) {
        const len = shieldPathRef.current.getTotalLength();
        gsap.set(shieldPathRef.current, {
          strokeDasharray: len,
          strokeDashoffset: len,
        });
        gsap.to(shieldPathRef.current, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        });
      }

      // Rotation Parallax on Shield Ring
      if (orbitalRingRef.current) {
        gsap.fromTo(
          orbitalRingRef.current,
          { rotate: 0, transformOrigin: "50% 50%" },
          {
            rotate: 90,
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
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="compliance-heading"
      className="zbr-section relative overflow-hidden bg-gradient-to-b from-[#EFF4FC] via-[#F7F9FE] to-[#FFFFFF] text-[#0F172A]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-12 h-80 w-80 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(30,94,255,0.12) 0%, transparent 70%)",
        }}
      />
      <div className="zbr-container relative z-10">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#1E5EFF]/20 bg-[#1E5EFF]/8 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#1E5EFF]">
              <Lock className="h-3.5 w-3.5" aria-hidden="true" />
              Data &amp; Compliance
            </span>
            <h2 id="compliance-heading" className="type-h2 mt-4 text-[#0A1628]">
              Built privacy-first, by default.
            </h2>
            <p className="type-body-lg mt-4 text-slate-600">
              Enterprise demand generation demands rigorous governance across
              regional privacy frameworks and multi-layer contact validation.
            </p>
          </div>

          {/* Animated SVG Shield Emblem */}
          <div className="flex shrink-0 items-center justify-center">
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <circle
                ref={orbitalRingRef}
                cx="60"
                cy="60"
                r="54"
                stroke="#1E5EFF"
                strokeOpacity="0.28"
                strokeWidth="1.5"
                strokeDasharray="6 6"
              />
              <path
                ref={shieldPathRef}
                d="M60 18L92 31V57C92 77 78.4 94.8 60 101C41.6 94.8 28 77 28 57V31L60 18Z"
                stroke="#1E5EFF"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="#1E5EFF"
                fillOpacity="0.06"
              />
              <path
                d="M48 60L56.5 68.5L74 51"
                stroke="#22D3EE"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-7 lg:grid-cols-3">
          {COMPLIANCE_PILLARS.map((pillar) => (
            <TiltCard
              key={pillar.id}
              glowColor="rgba(34, 211, 238, 0.14)"
              className="flex flex-col p-7"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#0A1628] px-3 py-1 font-mono-metric text-xs font-semibold text-[#22D3EE]">
                  {pillar.badge}
                </span>
                <ShieldCheck
                  className="h-5 w-5 text-[#1E5EFF]"
                  aria-hidden="true"
                />
              </div>

              <h3 className="mt-5 font-display text-xl font-semibold text-[#0A1628]">
                {pillar.title}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                {pillar.description}
              </p>

              {"bullets" in pillar && pillar.bullets ? (
                <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                  {pillar.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-center gap-2 text-xs font-medium text-[#0F172A]"
                    >
                      <CheckCircle2
                        className="h-3.5 w-3.5 shrink-0 text-[#1E5EFF]"
                        aria-hidden="true"
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              ) : null}

              <Link
                href={pillar.href}
                className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-[#1E5EFF] hover:text-[#0A1628]"
              >
                <span>Review Standards</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

