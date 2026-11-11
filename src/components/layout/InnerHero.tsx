"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight } from "lucide-react";
import { useMotionConfig } from "@/components/providers/MotionProvider";

gsap.registerPlugin(ScrollTrigger);

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function InnerHero({
  badge,
  title,
  description,
  breadcrumbs,
  children,
}: {
  badge: string;
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  children?: React.ReactNode;
}) {
  const heroRef = useRef<HTMLElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const { prefersReducedMotion } = useMotionConfig();

  useEffect(() => {
    if (prefersReducedMotion || !heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".inner-hero-reveal", {
        opacity: 0,
        y: 20,
        duration: 0.65,
        stagger: 0.08,
        ease: "power3.out",
      });

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          y: 50,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, heroRef);
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-[#0A1628] pb-16 pt-32 text-white lg:pb-24 lg:pt-40"
    >
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-[420px] w-[540px] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(30,94,255,0.45) 0%, rgba(34,211,238,0.2) 55%, transparent 75%)",
        }}
      />

      <div className="zbr-container relative z-10">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="inner-hero-reveal mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={crumb.label}>
                <li aria-hidden="true">
                  <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
                </li>
                <li>
                  {crumb.href && idx < breadcrumbs.length - 1 ? (
                    <Link href={crumb.href} className="hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="font-medium text-[#22D3EE]" aria-current="page">
                      {crumb.label}
                    </span>
                  )}
                </li>
              </React.Fragment>
            ))}
          </ol>
        </nav>

        <span className="inner-hero-reveal inline-flex items-center rounded-full border border-[#22D3EE]/30 bg-[#22D3EE]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#22D3EE]">
          {badge}
        </span>

        <h1 className="inner-hero-reveal type-h1 mt-4 max-w-4xl text-white">
          {title}
        </h1>

        <p className="inner-hero-reveal type-body-lg zbr-prose-limit mt-5 text-slate-300">
          {description}
        </p>

        {children ? (
          <div className="inner-hero-reveal mt-8">{children}</div>
        ) : null}
      </div>
    </section>
  );
}

