"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Building2 } from "lucide-react";
import { TRUSTED_BY_PLACEHOLDERS } from "@/data/site";
import { useMotionConfig } from "@/components/providers/MotionProvider";

gsap.registerPlugin(ScrollTrigger);

export function TrustedBySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const { prefersReducedMotion } = useMotionConfig();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !stripRef.current) return;
    const ctx = gsap.context(() => {
      // Vertical Parallax subtle lift on scroll
      gsap.fromTo(
        stripRef.current,
        { y: 18 },
        {
          y: -18,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const items = [...TRUSTED_BY_PLACEHOLDERS, ...TRUSTED_BY_PLACEHOLDERS];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="trusted-by-heading"
      className="border-y border-slate-200/80 bg-[#F8FAFC] py-14"
    >
      <div className="zbr-container mb-8 flex flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">
        <div>
          <p
            id="trusted-by-heading"
            className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-[#0A1628]"
          >
            Trusted By Revenue Teams
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Representative enterprise profile placeholders across core B2B verticals
          </p>
        </div>
        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium text-slate-500">
          Placeholder Brand Showcase
        </span>
      </div>

      <div ref={stripRef} className="marquee-wrapper relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#F8FAFC] to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#F8FAFC] to-transparent"
        />

        <div className="animate-zbr-marquee gap-5 px-4">
          {items.map((brand, idx) => (
            <div
              key={`${brand.name}-${idx}`}
              className="group flex min-w-[220px] items-center gap-3.5 rounded-xl border border-slate-200/90 bg-white px-5 py-4 shadow-[0_2px_12px_rgba(10,22,40,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1E5EFF]/40 hover:shadow-[0_10px_28px_rgba(10,22,40,0.08)]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0A1628]/5 text-[#1E5EFF] transition-colors group-hover:bg-[#1E5EFF] group-hover:text-white">
                <Building2 className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-base font-bold tracking-tight text-[#0A1628]">
                  {brand.name}
                </p>
                <p className="text-[11px] font-medium text-slate-500">
                  {brand.sector}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

