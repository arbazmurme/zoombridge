"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe, Mail, MessageSquare } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/SocialIcons";
import { SITE_INFO } from "@/data/site";
import { ContactForm } from "@/components/forms/ContactForm";
import { useMotionConfig } from "@/components/providers/MotionProvider";

gsap.registerPlugin(ScrollTrigger);

export function ContactSection({
  initialIntent = "",
}: {
  initialIntent?: string;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { prefersReducedMotion } = useMotionConfig();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".contact-reveal", {
        opacity: 0,
        y: 24,
        duration: 0.65,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          once: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="contact-us"
      aria-labelledby="contact-heading"
      className="zbr-section relative overflow-hidden bg-gradient-to-b from-[#F4F7FE] via-[#F8FAFC] to-white text-[#0F172A]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.14) 0%, rgba(30,94,255,0.06) 55%, transparent 75%)",
        }}
      />
      <div className="zbr-container relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="contact-reveal lg:col-span-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#1E5EFF]/20 bg-[#1E5EFF]/8 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#1E5EFF]">
              <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
              Contact Us
            </span>
            <h2 id="contact-heading" className="type-h2 mt-4 text-[#0A1628]">
              Client, agency, or exploring a career — let&apos;s connect.
            </h2>
            <p className="type-body-lg mt-4 text-slate-600">
              Tell us what you need and we&apos;ll get back to you within one
              business day.
            </p>

            <div className="mt-8 space-y-4 rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6">
              <a
                href={`mailto:${SITE_INFO.email}`}
                className="flex min-h-[44px] items-center gap-3 text-sm font-medium text-[#0A1628] transition hover:text-[#1E5EFF]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#1E5EFF] shadow-sm">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </span>
                <span>{SITE_INFO.email}</span>
              </a>

              <a
                href="https://wearezbr.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[44px] items-center gap-3 text-sm font-medium text-[#0A1628] transition hover:text-[#1E5EFF]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#1E5EFF] shadow-sm">
                  <Globe className="h-4 w-4" aria-hidden="true" />
                </span>
                <span>{SITE_INFO.domain}</span>
              </a>

              <a
                href={SITE_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[44px] items-center gap-3 text-sm font-medium text-[#0A1628] transition hover:text-[#1E5EFF]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#1E5EFF] shadow-sm">
                  <LinkedInIcon className="h-4 w-4" />
                </span>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          <div className="contact-reveal rounded-3xl border border-slate-200 bg-[#F8FAFC] p-6 shadow-[0_8px_32px_rgba(10,22,40,0.05)] sm:p-8 lg:col-span-7">
            <ContactForm idPrefix="home-contact" initialIntent={initialIntent} />
          </div>
        </div>
      </div>
    </section>
  );
}
