"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronRight, Move3d, ShieldCheck, Sparkles } from "lucide-react";
import { HeroNetworkWrapper } from "@/components/three/HeroNetworkWrapper";
import { useMotionConfig } from "@/components/providers/MotionProvider";

gsap.registerPlugin(ScrollTrigger);

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface InnerHeroMeta {
  pill: string;
  metricLabel: string;
  metricValue: string;
  subValue: string;
}

function getHeroMetaForPath(pathname: string): InnerHeroMeta {
  if (pathname.startsWith("/about")) {
    return {
      pill: "Global B2B Intelligence",
      metricLabel: "Industry Experience",
      metricValue: "15+ Years",
      subValue: "120+ Countries • 4 Regions",
    };
  }
  if (pathname.startsWith("/services")) {
    return {
      pill: "Demand Architecture",
      metricLabel: "Core Solutions",
      metricValue: "6 Services",
      subValue: "Human-Validated Delivery",
    };
  }
  if (pathname.startsWith("/why-zbr")) {
    return {
      pill: "Verification Standard",
      metricLabel: "Accuracy Goal",
      metricValue: "95%",
      subValue: "AI Identifies • Humans Verify",
    };
  }
  if (pathname.startsWith("/abm-scoring")) {
    return {
      pill: "Account Prioritization",
      metricLabel: "Scoring Model",
      metricValue: "Fit + Intent",
      subValue: "Tier 1 • Tier 2 • Tier 3",
    };
  }
  if (pathname.startsWith("/contact") || pathname.startsWith("/book-a-call")) {
    return {
      pill: "Direct Strategy Desk",
      metricLabel: "Inquiry Turnaround",
      metricValue: "< 24h",
      subValue: "Sample Data on Request",
    };
  }
  if (
    pathname.startsWith("/gdpr") ||
    pathname.startsWith("/ccpa") ||
    pathname.startsWith("/privacy-policy") ||
    pathname.startsWith("/terms")
  ) {
    return {
      pill: "Privacy-First Default",
      metricLabel: "Governance",
      metricValue: "GDPR & CCPA",
      subValue: "Triple-Verified Compliance",
    };
  }
  return {
    pill: "Research Intelligence",
    metricLabel: "Verified Records",
    metricValue: "50M+",
    subValue: "Decision-Makers Globally",
  };
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
  const pathname = usePathname() || "/";
  const heroRef = useRef<HTMLElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const gridSpotlightRef = useRef<HTMLDivElement | null>(null);
  const { prefersReducedMotion, isDesktop, isTouchDevice } = useMotionConfig();

  const meta = getHeroMetaForPath(pathname);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (
      prefersReducedMotion ||
      !isDesktop ||
      isTouchDevice ||
      !heroRef.current ||
      !gridSpotlightRef.current
    ) {
      return;
    }
    const rect = heroRef.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    gridSpotlightRef.current.style.opacity = "1";
    gridSpotlightRef.current.style.setProperty("--mx", `${px}px`);
    gridSpotlightRef.current.style.setProperty("--my", `${py}px`);
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-[#0A1628] pb-16 pt-28 text-white lg:pb-20 lg:pt-32"
    >
      {/* Layered Background Grid + Aurora Glows + Cursor Spotlight */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          ref={glowRef}
          className="animate-zbr-aurora absolute -top-24 right-0 h-[440px] w-[540px] rounded-full opacity-35 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(30,94,255,0.45) 0%, rgba(34,211,238,0.22) 55%, transparent 75%)",
          }}
        />
        <div
          className="animate-zbr-aurora absolute -bottom-28 -left-20 h-[380px] w-[380px] rounded-full opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.35) 0%, rgba(30,94,255,0.16) 55%, transparent 75%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(148,163,184,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.2) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div
          ref={gridSpotlightRef}
          className="absolute inset-0 opacity-0 transition-opacity duration-500"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(34,211,238,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(59,123,255,0.4) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), #000 0%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), #000 0%, transparent 75%)",
          }}
        />
      </div>

      <div className="zbr-container relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
        {/* Left Editorial Copy */}
        <div className="lg:col-span-7">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="inner-hero-reveal mb-5">
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

          <h1 className="inner-hero-reveal mt-4 font-display text-[clamp(2.15rem,3.6vw,3.35rem)] font-bold leading-[1.08] tracking-[-0.025em] text-white">
            {title}
          </h1>

          <p className="inner-hero-reveal type-body-lg zbr-prose-limit mt-5 text-slate-300">
            {description}
          </p>

          {children ? (
            <div className="inner-hero-reveal mt-7">{children}</div>
          ) : null}
        </div>

        {/* Right Interactive 3D Intelligence Core & Context Telemetry Stage */}
        <div className="inner-hero-reveal relative lg:col-span-5">
          <div className="relative mx-auto max-w-[440px]">
            {/* Rotating Dashed Orbital Frame */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-4 hidden items-center justify-center sm:flex"
            >
              <div className="animate-zbr-spin-slow h-full w-full rounded-full border border-dashed border-[#22D3EE]/18" />
            </div>

            {/* Interactive 3D GLB Intelligence Sphere */}
            <HeroNetworkWrapper compact />

            {/* Top-Left Interactive Hint */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-2 hidden sm:inline-flex"
            >
              <div className="animate-zbr-float inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#0F1E38]/85 px-3 py-1 text-[11px] font-medium text-slate-200 shadow-lg backdrop-blur-md">
                <Move3d className="h-3.5 w-3.5 text-[#22D3EE]" />
                <span>Drag to Orbit</span>
              </div>
            </div>

            {/* Top-Right Context Metric Card */}
            <div className="pointer-events-none absolute right-0 top-2 hidden sm:block">
              <div className="animate-zbr-float-slow rounded-2xl border border-white/15 bg-[#0F1E38]/90 px-4 py-2.5 shadow-xl backdrop-blur-md">
                <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  <Sparkles className="h-3 w-3 text-[#22D3EE]" aria-hidden="true" />
                  <span>{meta.metricLabel}</span>
                </div>
                <p className="mt-0.5 font-mono-metric text-base font-bold text-white">
                  {meta.metricValue}
                </p>
              </div>
            </div>

            {/* Bottom Context Proof Bar */}
            <div className="pointer-events-none mt-2 flex items-center justify-center lg:absolute lg:bottom-2 lg:left-2 lg:mt-0">
              <div className="animate-zbr-float inline-flex items-center gap-2.5 rounded-2xl border border-white/15 bg-[#0F1E38]/90 px-3.5 py-2.5 shadow-xl backdrop-blur-md">
                <ShieldCheck className="h-4 w-4 text-[#22D3EE]" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold text-white">{meta.pill}</p>
                  <p className="text-[11px] text-slate-300">{meta.subValue}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
