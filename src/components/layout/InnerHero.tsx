"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BarChart3,
  ChevronDown,
  ChevronRight,
  Globe,
  Move3d,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
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
  illustrationSrc: string;
  illustrationAlt: string;
  bgSrc: string;
  hintPill: string;
  nextSectionId?: string;
}

function getHeroMetaForPath(pathname: string): InnerHeroMeta {
  if (pathname.startsWith("/about")) {
    return {
      pill: "Global B2B Intelligence",
      metricLabel: "Industry Experience",
      metricValue: "15+ Years",
      subValue: "120+ Countries • 4 Regions",
      illustrationSrc: "/images/about/about-hero-team.webp",
      illustrationAlt: "ZoomBridge Research Team and Global Intelligence",
      bgSrc: "/images/about/about-hero-bg.webp",
      hintPill: "AI + Human Intelligence",
      nextSectionId: "who-we-are",
    };
  }
  if (pathname.startsWith("/services")) {
    return {
      pill: "Demand Architecture",
      metricLabel: "Core Solutions",
      metricValue: "6 Services",
      subValue: "Human-Validated Delivery",
      illustrationSrc: "/images/services/services-hero-illustration.webp",
      illustrationAlt: "B2B Demand Generation & Pipeline Architecture",
      bgSrc: "/images/services/services-hero-bg.webp",
      hintPill: "Pipeline Architecture",
      nextSectionId: "services-grid",
    };
  }
  if (pathname.startsWith("/why-zbr")) {
    return {
      pill: "Verification Standard",
      metricLabel: "Accuracy Goal",
      metricValue: "95%",
      subValue: "AI Identifies • Humans Verify",
      illustrationSrc: "/images/why-zbr/why-zbr-hero.webp",
      illustrationAlt: "Dual Intelligence Verification Matrix",
      bgSrc: "/images/why-zbr/why-zbr-hero-bg.webp",
      hintPill: "AI Identifies • Humans Verify",
      nextSectionId: "why-zbr-framework",
    };
  }
  if (pathname.startsWith("/abm-scoring")) {
    return {
      pill: "Account Prioritization",
      metricLabel: "Scoring Model",
      metricValue: "Fit + Intent",
      subValue: "Tier 1 • Tier 2 • Tier 3",
      illustrationSrc: "/images/abm-scoring/abm-scoring-hero.webp",
      illustrationAlt: "Predictive Target Account Scoring Radar",
      bgSrc: "/images/abm-scoring/abm-scoring-hero-bg.webp",
      hintPill: "Predictive TAL Scoring",
      nextSectionId: "scoring-engine",
    };
  }
  if (pathname.startsWith("/case-studies")) {
    return {
      pill: "Enterprise Proof",
      metricLabel: "Client Revenue",
      metricValue: "4.8x ROI",
      subValue: "Fortune 500 & High-Growth Tech",
      illustrationSrc: "/images/case-studies/case-studies-hero.webp",
      illustrationAlt: "Enterprise Revenue Growth & Case Studies",
      bgSrc: "/images/case-studies/case-studies-hero-bg.webp",
      hintPill: "Enterprise Performance",
      nextSectionId: "case-studies-list",
    };
  }
  if (pathname.startsWith("/contact") || pathname.startsWith("/book-a-call")) {
    return {
      pill: "Direct Strategy Desk",
      metricLabel: "Inquiry Turnaround",
      metricValue: "< 24h",
      subValue: "Sample Data on Request",
      illustrationSrc: "/images/contact/contact-hero.webp",
      illustrationAlt: "Direct B2B Strategy & Communications Desk",
      bgSrc: "/images/contact/contact-hero-bg.webp",
      hintPill: "Direct Strategy Portal",
      nextSectionId: "contact-us",
    };
  }
  if (pathname.startsWith("/blog") || pathname.startsWith("/resources")) {
    return {
      pill: "B2B Demand Insights",
      metricLabel: "Knowledge Depth",
      metricValue: "Research-Grade",
      subValue: "Playbooks • Case Studies • Guides",
      illustrationSrc: "/images/resources/resources-hero.webp",
      illustrationAlt: "B2B Research Knowledge Vault & Insights Engine",
      bgSrc: "/images/resources/resources-hero-bg.webp",
      hintPill: "Knowledge Vault",
      nextSectionId: "resources-content",
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
      illustrationSrc: "/images/legal/legal-hero.webp",
      illustrationAlt: "Triple-Verified Data Privacy & Compliance Vault",
      bgSrc: "/images/legal/legal-hero-bg.webp",
      hintPill: "Triple-Verified Privacy",
      nextSectionId: "legal-document-content",
    };
  }
  return {
    pill: "Research Intelligence",
    metricLabel: "Verified Records",
    metricValue: "50M+",
    subValue: "Decision-Makers Globally",
    illustrationSrc: "/images/services/services-hero-illustration.webp",
    illustrationAlt: "ZoomBridge Research Intelligence",
    bgSrc: "/images/services/services-hero-bg.webp",
    hintPill: "Interactive 3D Core",
  };
}

export function InnerHero({
  badge,
  title,
  description,
  breadcrumbs,
  illustrationSrc,
  illustrationAlt,
  bgSrc,
  nextSectionId,
  children,
}: {
  badge: string;
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  illustrationSrc?: string;
  illustrationAlt?: string;
  bgSrc?: string;
  nextSectionId?: string;
  children?: React.ReactNode;
}) {
  const pathname = usePathname() || "/";
  const heroRef = useRef<HTMLElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const gridSpotlightRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const { prefersReducedMotion, isDesktop, isTouchDevice } = useMotionConfig();

  const meta = getHeroMetaForPath(pathname);
  const activeBg = bgSrc || meta.bgSrc;
  const activeIllustration = illustrationSrc || meta.illustrationSrc;
  const activeAlt = illustrationAlt || meta.illustrationAlt;
  const targetScrollId = nextSectionId || meta.nextSectionId;

  useEffect(() => {
    if (prefersReducedMotion || !heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".inner-hero-reveal", {
        opacity: 0,
        y: 22,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
      });

      if (stageRef.current) {
        gsap.from(stageRef.current, {
          opacity: 0,
          scale: 0.94,
          y: 20,
          duration: 0.85,
          delay: 0.15,
          ease: "back.out(1.15)",
        });
      }

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          y: 55,
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
      !heroRef.current
    ) {
      return;
    }
    const rect = heroRef.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    if (gridSpotlightRef.current) {
      gridSpotlightRef.current.style.opacity = "1";
      gridSpotlightRef.current.style.setProperty("--mx", `${px}px`);
      gridSpotlightRef.current.style.setProperty("--my", `${py}px`);
    }

    const nx = px / rect.width - 0.5;
    const ny = py / rect.height - 0.5;
    setMouseOffset({ x: nx * 24, y: ny * 18 });
  };

  const handleMouseLeave = () => {
    if (gridSpotlightRef.current) {
      gridSpotlightRef.current.style.opacity = "0";
    }
    setMouseOffset({ x: 0, y: 0 });
  };

  const handleScrollDown = () => {
    if (targetScrollId) {
      const el = document.getElementById(targetScrollId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-[90vh] items-center overflow-hidden bg-[#0A1628] pb-16 pt-24 text-white lg:pb-24 lg:pt-32"
    >
      {/* Layer 1: Dedicated Cybernetic Themed Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-bottom bg-no-repeat opacity-95 transition-opacity duration-700"
        style={{
          backgroundImage: `url('${activeBg}')`,
        }}
      />

      {/* Layered Aurora Glows + Dynamic Mouse Spotlight */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          ref={glowRef}
          className="animate-zbr-aurora absolute -top-20 right-[8%] h-[500px] w-[500px] rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(30,94,255,0.45) 0%, rgba(34,211,238,0.25) 50%, transparent 75%)",
          }}
        />
        <div
          className="animate-zbr-aurora absolute -bottom-24 left-[5%] h-[400px] w-[400px] rounded-full opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.35) 0%, rgba(30,94,255,0.18) 55%, transparent 75%)",
          }}
        />

        {/* Cyber Grid Accent */}
        <div
          className="absolute inset-0 opacity-[0.11]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(148,163,184,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.18) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Mouse Spotlight */}
        <div
          ref={gridSpotlightRef}
          className="absolute inset-0 opacity-0 transition-opacity duration-500"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(34,211,238,0.38) 1px, transparent 1px), linear-gradient(to bottom, rgba(59,123,255,0.38) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), #000 0%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), #000 0%, transparent 75%)",
          }}
        />
      </div>

      <div className="zbr-container relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
        {/* Left Editorial Copy Column */}
        <div className="lg:col-span-6">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="inner-hero-reveal mb-5">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
              <li>
                <Link href="/" className="transition hover:text-white">
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
                      <Link href={crumb.href} className="transition hover:text-white">
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

          <h1 className="inner-hero-reveal mt-5 font-display text-[clamp(2.2rem,3.8vw,3.6rem)] font-bold leading-[1.08] tracking-[-0.025em] text-white">
            {title}
          </h1>

          <p className="inner-hero-reveal type-body-lg zbr-prose-limit mt-6 text-slate-300">
            {description}
          </p>

          {children ? (
            <div className="inner-hero-reveal mt-8">{children}</div>
          ) : null}
        </div>

        {/* Right Stage: Dedicated 3D Illustration Layer with Parallax Tilt */}
        <div className="inner-hero-reveal relative flex justify-center lg:col-span-6">
          <div
            ref={stageRef}
            style={{
              transform:
                !prefersReducedMotion && isDesktop && !isTouchDevice
                  ? `perspective(1000px) rotateY(${mouseOffset.x * 0.04}deg) rotateX(${-mouseOffset.y * 0.04}deg) translate3d(${mouseOffset.x * 0.22}px, ${mouseOffset.y * 0.22}px, 0)`
                  : undefined,
              transition: "transform 260ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            className="relative mx-auto w-full max-w-[560px]"
          >
            {/* Luminous Neon Core Glow behind illustration */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-6 rounded-full opacity-60 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(34,211,238,0.36) 0%, rgba(30,94,255,0.26) 50%, transparent 75%)",
              }}
            />

            {/* Layer 2: Dedicated Themed Illustration with Float Animation & Soft Edge Blend */}
            {activeIllustration ? (
              <div
                className="animate-zbr-float-slow relative z-10 w-full drop-shadow-[0_20px_50px_rgba(30,94,255,0.35)]"
                style={{
                  maskImage:
                    "radial-gradient(ellipse 92% 88% at 50% 50%, #000 70%, transparent 100%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 92% 88% at 50% 50%, #000 70%, transparent 100%)",
                }}
              >
                <Image
                  src={activeIllustration}
                  alt={activeAlt}
                  width={1024}
                  height={682}
                  priority
                  className="h-auto w-full select-none object-contain"
                />
              </div>
            ) : (
              <div className="relative z-10">
                <HeroNetworkWrapper compact />
              </div>
            )}

            {/* Floating Hint Pill (Top Left / Center) */}
            <div
              aria-hidden="true"
              style={{
                transform:
                  !prefersReducedMotion && isDesktop && !isTouchDevice
                    ? `translate3d(${mouseOffset.x * 0.45}px, ${mouseOffset.y * 0.45}px, 0)`
                    : undefined,
                transition: "transform 240ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              className="pointer-events-none absolute left-3 top-2 z-20 hidden sm:inline-flex"
            >
              <div className="animate-zbr-float inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#0F1E38]/85 px-3 py-1.5 text-[11px] font-medium text-slate-200 shadow-xl backdrop-blur-md">
                <Move3d className="h-3.5 w-3.5 text-[#22D3EE]" />
                <span>{meta.hintPill}</span>
              </div>
            </div>

            {/* Floating Metric Badge (Top Right) */}
            <div
              style={{
                transform:
                  !prefersReducedMotion && isDesktop && !isTouchDevice
                    ? `translate3d(${-mouseOffset.x * 0.55}px, ${mouseOffset.y * 0.55}px, 0)`
                    : undefined,
                transition: "transform 240ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              className="pointer-events-none absolute right-2 top-2 z-20 hidden sm:block"
            >
              <div className="animate-zbr-float-slow rounded-2xl border border-white/15 bg-[#0F1E38]/90 px-4 py-2.5 shadow-2xl backdrop-blur-md">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  <BarChart3 className="h-3.5 w-3.5 text-[#22D3EE]" aria-hidden="true" />
                  <span>{meta.metricLabel}</span>
                </div>
                <p className="mt-0.5 font-mono-metric text-lg font-bold text-white">
                  {meta.metricValue}
                </p>
              </div>
            </div>

            {/* Floating Global Proof Pill (Bottom Center) */}
            <div
              style={{
                transform:
                  !prefersReducedMotion && isDesktop && !isTouchDevice
                    ? `translate3d(${mouseOffset.x * 0.35}px, ${-mouseOffset.y * 0.35}px, 0)`
                    : undefined,
                transition: "transform 260ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              className="pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 hidden sm:inline-flex"
            >
              <div className="animate-zbr-float inline-flex items-center gap-2.5 rounded-2xl border border-[#22D3EE]/30 bg-[#0F1E38]/90 px-4 py-2 shadow-2xl backdrop-blur-md">
                <Globe className="h-4 w-4 text-[#22D3EE]" />
                <div>
                  <p className="text-xs font-semibold text-white">{meta.pill}</p>
                  <p className="text-[11px] text-slate-300">{meta.subValue}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Ambient Vignette Fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0A1628]/80 via-[#0A1628]/30 to-transparent"
      />

      {/* Layer 4: Interactive Cybernetic Bottom Scroll Indicator */}
      <div className="inner-hero-reveal absolute bottom-3 sm:bottom-5 left-1/2 z-30 -translate-x-1/2">
        <button
          type="button"
          onClick={handleScrollDown}
          aria-label="Scroll to explore more"
          className="group flex flex-col items-center gap-1.5 transition-transform duration-300 hover:scale-105 focus:outline-none"
        >
          <div className="flex items-center gap-2 rounded-full border border-white/20 bg-[#0F1E38]/90 px-4 py-1.5 shadow-[0_8px_25px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 group-hover:border-[#22D3EE]/60 group-hover:bg-[#0F1E38] group-hover:shadow-[0_0_24px_rgba(34,211,238,0.35)]">
            {/* Animated Cyber Mouse Wheel */}
            <div className="relative flex h-5 w-3.5 items-start justify-center rounded-full border border-white/50 p-0.5 transition-colors group-hover:border-[#22D3EE]">
              <span className="h-1.5 w-1 rounded-full bg-[#22D3EE] animate-bounce" />
            </div>

            <span className="font-mono-metric text-[11px] font-semibold uppercase tracking-wider text-slate-200 transition-colors group-hover:text-white">
              Scroll to explore
            </span>

            <ChevronDown className="h-3.5 w-3.5 text-[#22D3EE] transition-transform duration-300 group-hover:translate-y-0.5" />
          </div>
        </button>
      </div>
    </section>
  );
}
