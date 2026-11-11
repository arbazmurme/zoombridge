"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, HelpCircle, ShieldCheck } from "lucide-react";
import { CORE_FAQS, FaqItem } from "@/data/site";
import { useMotionConfig } from "@/components/providers/MotionProvider";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function FaqSection({
  items = CORE_FAQS,
  heading = "Frequently asked questions.",
  subheading = "Verified answers on data accuracy, human validation, compliance, turnaround, and ABM scoring.",
}: {
  items?: Array<{ question: string; answer: string; category?: FaqItem["category"] }>;
  heading?: string;
  subheading?: string;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { prefersReducedMotion } = useMotionConfig();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".faq-reveal", {
        opacity: 0,
        y: 18,
        duration: 0.52,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 84%",
          once: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="faq-heading"
      className="relative overflow-hidden border-t border-slate-200/80 bg-gradient-to-b from-[#F4F7FE] via-[#F8FAFC] to-[#EEF3FC] py-12 text-[#0F172A] lg:py-16"
    >
      {/* Subtle Blueprint Dot Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(rgba(30, 94, 255, 0.14) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(ellipse 80% 75% at 50% 50%, #000 45%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 75% at 50% 50%, #000 45%, transparent 100%)",
        }}
      />

      <div className="zbr-container relative z-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Left Sticky Header + Direct Consultation Card */}
        <div className="faq-reveal lg:sticky lg:top-28 lg:col-span-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#1E5EFF]/20 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#1E5EFF] shadow-xs">
            <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
            FAQ &amp; Pricing Clarity
          </span>

          <h2 id="faq-heading" className="type-h2 mt-3 text-[#0A1628]">
            {heading}
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            {subheading}
          </p>

          {/* Compact Action Callout Card */}
          <div className="mt-6 rounded-2xl border border-[#1E5EFF]/15 bg-[#0A1628] p-5 text-white shadow-[0_14px_36px_rgba(10,22,40,0.14)]">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#22D3EE]">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              <span>Need Segment Sample Data?</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate-300">
              Share your target industries and decision-maker roles — our
              research team replies within one business day (&lt; 24h).
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Link
                href="/contact?intent=sample-data"
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#1E5EFF] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#3B7BFF]"
              >
                <span>Request Sample Data</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <Link
                href="/book-a-call"
                className="text-xs font-semibold text-[#22D3EE] transition hover:text-white"
              >
                Book a Strategy Call →
              </Link>
            </div>
          </div>
        </div>

        {/* Right Compact Interactive Accordion List */}
        <div className="space-y-2.5 lg:col-span-7">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            const panelId = `faq-panel-${idx}`;
            const buttonId = `faq-button-${idx}`;
            const stepLabel = String(idx + 1).padStart(2, "0");

            return (
              <div
                key={item.question}
                className={cn(
                  "faq-reveal overflow-hidden rounded-2xl border transition-all duration-200",
                  isOpen
                    ? "border-[#1E5EFF]/40 bg-white shadow-[0_12px_32px_rgba(10,22,40,0.08)]"
                    : "border-slate-200/90 bg-white/90 hover:border-slate-300 hover:bg-white"
                )}
              >
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-3.5 text-left"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-mono-metric text-[11px] font-bold transition-colors",
                        isOpen
                          ? "bg-[#1E5EFF] text-white"
                          : "bg-[#1E5EFF]/10 text-[#1E5EFF]"
                      )}
                    >
                      {stepLabel}
                    </span>
                    <div className="min-w-0">
                      {item.category ? (
                        <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                          {item.category}
                        </span>
                      ) : null}
                      <span className="block font-display text-[15px] font-semibold leading-snug text-[#0A1628] sm:text-base">
                        {item.question}
                      </span>
                    </div>
                  </div>

                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors",
                      isOpen
                        ? "border-[#1E5EFF]/30 bg-[#1E5EFF]/10 text-[#1E5EFF]"
                        : "border-slate-200 bg-slate-50 text-slate-500"
                    )}
                  >
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        isOpen ? "rotate-180" : ""
                      )}
                      aria-hidden="true"
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-slate-100 px-5 pb-4 pt-3 pl-[60px] text-sm leading-relaxed text-slate-600">
                        {item.answer}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
