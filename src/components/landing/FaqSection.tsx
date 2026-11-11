"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { CORE_FAQS, FaqItem } from "@/data/site";
import { cn } from "@/lib/utils";

export function FaqSection({
  items = CORE_FAQS,
  heading = "Frequently asked questions.",
  subheading = "Verified answers on data accuracy, human validation, compliance, turnaround, and ABM scoring.",
}: {
  items?: Array<{ question: string; answer: string; category?: FaqItem["category"] }>;
  heading?: string;
  subheading?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section aria-labelledby="faq-heading" className="zbr-section bg-[#F8FAFC] text-[#0F172A]">
      <div className="zbr-container">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#1E5EFF]/20 bg-white px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#1E5EFF]">
            <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
            FAQ &amp; Pricing Clarity
          </span>
          <h2 id="faq-heading" className="type-h2 mt-4 text-[#0A1628]">
            {heading}
          </h2>
          <p className="type-body-lg mt-4 text-slate-600">{subheading}</p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-3.5">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;
            const panelId = `faq-panel-${idx}`;
            const buttonId = `faq-button-${idx}`;
            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_16px_rgba(10,22,40,0.04)]"
              >
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex min-h-[60px] w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-slate-50"
                >
                  <span className="font-display text-base font-semibold text-[#0A1628] sm:text-lg">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-[#1E5EFF] transition-transform duration-200",
                      isOpen ? "rotate-180" : ""
                    )}
                    aria-hidden="true"
                  />
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
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-slate-100 px-6 py-4 text-sm leading-relaxed text-slate-600">
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

