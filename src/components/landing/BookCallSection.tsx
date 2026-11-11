"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CalendarCheck2, CheckCircle2 } from "lucide-react";
import { StrategyCallForm } from "@/components/forms/StrategyCallForm";
import { useMotionConfig } from "@/components/providers/MotionProvider";

gsap.registerPlugin(ScrollTrigger);

const BENEFITS = [
  "A no-obligation strategy call with our team.",
  "Sample data for your target segment, on request.",
  "A clear view of how research-led pipeline would work for you.",
];

export function BookCallSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { prefersReducedMotion } = useMotionConfig();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 28,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="book-strategy-call"
      aria-labelledby="book-call-heading"
      className="zbr-section relative overflow-hidden bg-[#0A1628] text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 top-10 h-96 w-96 rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(30,94,255,0.5) 0%, rgba(34,211,238,0.18) 60%, transparent 80%)",
        }}
      />

      <div className="zbr-container relative z-10">
        <div
          ref={cardRef}
          className="grid grid-cols-1 gap-10 rounded-3xl border border-white/12 bg-[#0F1E38]/90 p-7 shadow-[0_24px_64px_rgba(0,0,0,0.35)] sm:p-10 lg:grid-cols-12 lg:p-14"
        >
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#22D3EE]/30 bg-[#22D3EE]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#22D3EE]">
                <CalendarCheck2 className="h-3.5 w-3.5" aria-hidden="true" />
                Strategy &amp; Sample Data
              </span>
              <h2 id="book-call-heading" className="type-h2 mt-4 text-white">
                Book a strategy call.
              </h2>
              <p className="type-body-lg mt-4 text-slate-300">
                Tell us your targets and we&apos;ll set up a no-obligation
                strategy call. We can also share sample data for your ideal
                customer profile, so you can judge the quality first-hand.
              </p>

              <ul className="mt-8 space-y-4">
                {BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#22D3EE]"
                      aria-hidden="true"
                    />
                    <span className="text-sm leading-relaxed text-slate-200">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-[#0A1628]/70 p-4 text-xs text-slate-300">
              <strong className="text-white">Pricing:</strong> Contact for
              Pricing. Custom scoped to your ICP complexity, target regions, and
              volume goals.
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0A1628]/60 p-6 sm:p-8 lg:col-span-6">
            <StrategyCallForm idPrefix="home-strategy" dark />
          </div>
        </div>
      </div>
    </section>
  );
}

