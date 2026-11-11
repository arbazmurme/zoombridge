"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUp, Mail, Globe, Clock, SlidersHorizontal } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/SocialIcons";
import { SITE_INFO } from "@/data/site";
import { SERVICES } from "@/data/services";
import { ZbrLogo } from "@/components/ui/ZbrLogo";
import { useMotionConfig } from "@/components/providers/MotionProvider";
import { useCookieConsent } from "@/components/providers/ConsentAnalyticsProvider";
import { trackEvent } from "@/lib/analytics";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);
  const bgGlowRef = useRef<HTMLDivElement | null>(null);
  const { prefersReducedMotion, scrollToTop } = useMotionConfig();
  const { openPreferences } = useCookieConsent();

  useEffect(() => {
    if (prefersReducedMotion || !footerRef.current || !bgGlowRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgGlowRef.current,
        { y: -40 },
        {
          y: 40,
          ease: "none",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );

      gsap.from(".footer-stagger", {
        opacity: 0,
        y: 22,
        duration: 0.65,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
          once: true,
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden border-t border-white/10 bg-[#0A1628] text-slate-300"
    >
      {/* Subtle Background Parallax Glow */}
      <div
        ref={bgGlowRef}
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-96 w-[760px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(30,94,255,0.45) 0%, rgba(139,92,246,0.22) 50%, transparent 75%)",
        }}
      />

      <div className="zbr-container relative z-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="footer-stagger space-y-5 lg:col-span-4">
            <Link href="/" aria-label="ZoomBridge Research Home" className="inline-block">
              <ZbrLogo light size={38} />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-slate-300">
              {SITE_INFO.footerDescription}
            </p>
            <div className="flex flex-wrap gap-2">
              {["50M+ Records", "120+ Countries", "GDPR & CCPA Aligned"].map(
                (badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-white/15 bg-[#0F1E38] px-3 py-1 font-mono-metric text-[11px] font-medium text-[#22D3EE]"
                  >
                    {badge}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Services & Solutions */}
          <div className="footer-stagger lg:col-span-3">
            <h2 className="font-display text-xs font-semibold uppercase tracking-wider text-white">
              Services &amp; Solutions
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="group inline-flex items-center gap-1 text-slate-300 transition hover:text-white"
                  >
                    <span className="border-b border-transparent transition group-hover:border-[#22D3EE]">
                      {service.title}
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/abm-scoring"
                  className="group inline-flex items-center gap-1 font-medium text-[#22D3EE] transition hover:text-white"
                >
                  <span className="border-b border-transparent transition group-hover:border-[#22D3EE]">
                    ABM Scoring Engine
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Compliance */}
          <div className="footer-stagger lg:col-span-2">
            <h2 className="font-display text-xs font-semibold uppercase tracking-wider text-white">
              Company
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-white hover:underline underline-offset-4">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/why-zbr" className="hover:text-white hover:underline underline-offset-4">
                  Why ZBR
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white hover:underline underline-offset-4">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white hover:underline underline-offset-4">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-white hover:underline underline-offset-4">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-white hover:underline underline-offset-4">
                  Case Studies
                </Link>
              </li>
            </ul>

            <h2 className="mt-7 font-display text-xs font-semibold uppercase tracking-wider text-white">
              Compliance
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/gdpr" className="hover:text-white hover:underline underline-offset-4">
                  GDPR Standards
                </Link>
              </li>
              <li>
                <Link href="/ccpa" className="hover:text-white hover:underline underline-offset-4">
                  CCPA Rights
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white hover:underline underline-offset-4">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white hover:underline underline-offset-4">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/why-zbr#validation" className="hover:text-white hover:underline underline-offset-4">
                  Triple-Verified Data
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="footer-stagger space-y-4 lg:col-span-3">
            <h2 className="font-display text-xs font-semibold uppercase tracking-wider text-white">
              Connect
            </h2>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Direct Inquiries
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${SITE_INFO.email}`}
                  className="inline-flex items-center gap-2.5 text-slate-200 transition hover:text-[#22D3EE]"
                >
                  <Mail className="h-4 w-4 text-[#22D3EE]" aria-hidden="true" />
                  {SITE_INFO.email}
                </a>
              </li>
              <li>
                <a
                  href="https://wearezbr.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-slate-200 transition hover:text-[#22D3EE]"
                >
                  <Globe className="h-4 w-4 text-[#22D3EE]" aria-hidden="true" />
                  {SITE_INFO.domain}
                </a>
              </li>
              <li>
                <a
                  href={SITE_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="ZoomBridge Research on LinkedIn"
                  className="inline-flex items-center gap-2.5 text-slate-200 transition hover:text-[#22D3EE]"
                >
                  <LinkedInIcon className="h-4 w-4 text-[#22D3EE]" />
                  LinkedIn
                </a>
              </li>
            </ul>

            <div className="rounded-xl border border-white/10 bg-[#0F1E38] p-4">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                <Clock className="h-3.5 w-3.5 text-[#22D3EE]" aria-hidden="true" />
                <span>Turnaround: </span>
                <span className="font-mono-metric font-semibold text-white">
                  {SITE_INFO.turnaround}
                </span>
              </div>
              <Link
                href="/book-a-call"
                onClick={() =>
                  trackEvent("cta_click", {
                    cta_location: "footer",
                    cta_label: "Book Strategy Call",
                  })
                }
                className="mt-3 inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-[#1E5EFF] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#3B7BFF]"
              >
                Book Strategy Call
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-slate-400 sm:flex-row sm:items-center">
          <p>{SITE_INFO.copyright}</p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={openPreferences}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-slate-300 transition hover:border-white/25 hover:text-white"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
              Cookie Preferences
            </button>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="group inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white transition hover:border-[#22D3EE]/50 hover:bg-white/10"
            >
              <span>Back to Top</span>
              <ArrowUp
                className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
