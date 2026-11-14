"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  BarChart3,
  ChevronRight,
  Globe,
  Move3d,
} from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useMotionConfig } from "@/components/providers/MotionProvider";
import { trackEvent } from "@/lib/analytics";

gsap.registerPlugin(ScrollTrigger);

export function AboutHeroSection() {
  const heroRef = useRef<HTMLElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const gridSpotlightRef = useRef<HTMLDivElement | null>(null);
  const illustrationRef = useRef<HTMLDivElement | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const { prefersReducedMotion, isDesktop, isTouchDevice } = useMotionConfig();

  useEffect(() => {
    if (prefersReducedMotion || !heroRef.current) return;

    const ctx = gsap.context(() => {
      // Staggered entrance for editorial copy
      gsap.from(".about-hero-reveal", {
        opacity: 0,
        y: 24,
        duration: 0.75,
        stagger: 0.09,
        ease: "power3.out",
      });

      // Illustration pop-in with smooth scale
      if (illustrationRef.current) {
        gsap.from(illustrationRef.current, {
          opacity: 0,
          scale: 0.92,
          y: 20,
          duration: 0.9,
          delay: 0.2,
          ease: "back.out(1.2)",
        });
      }

      // Parallax scroll on atmospheric glow
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          y: 60,
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

  // Mouse Parallax & Interactive 3D Depth Tracking
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

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-[90vh] items-center overflow-hidden bg-[#0A1628] pb-16 pt-24 text-white lg:pb-24 lg:pt-32"
    >
      {/* Cybernetic Background Image Layer with Wave Ribbons & Pedestal */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cover bg-bottom bg-no-repeat opacity-95"
        style={{
          backgroundImage: "url('/images/about/about-hero-bg.png')",
        }}
      />

      {/* Layered Aurora Glows & Subtle Cyber Grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          ref={glowRef}
          className="animate-zbr-aurora absolute -top-20 right-[8%] h-[520px] w-[520px] rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(30,94,255,0.45) 0%, rgba(34,211,238,0.25) 50%, transparent 75%)",
          }}
        />
        <div
          className="animate-zbr-aurora absolute -bottom-24 left-[5%] h-[420px] w-[420px] rounded-full opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.35) 0%, rgba(30,94,255,0.18) 55%, transparent 75%)",
          }}
        />

        {/* Ambient Grid */}
        <div
          className="absolute inset-0 opacity-[0.11]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(148,163,184,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.18) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Mouse Spotlight Accent */}
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
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="about-hero-reveal mb-5">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
              <li>
                <Link href="/" className="transition hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
              </li>
              <li>
                <span className="font-medium text-[#22D3EE]" aria-current="page">
                  About Us
                </span>
              </li>
            </ol>
          </nav>

          {/* Badge */}
          <span className="about-hero-reveal inline-flex items-center rounded-full border border-[#22D3EE]/30 bg-[#22D3EE]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#22D3EE]">
            About ZoomBridge Research
          </span>

          {/* Heading */}
          <h1 className="about-hero-reveal mt-5 font-display text-[clamp(2.2rem,3.8vw,3.6rem)] font-bold leading-[1.08] tracking-[-0.025em] text-white">
            Powering smarter B2B growth through AI, data &amp; human intelligence.
          </h1>

          {/* Description */}
          <p className="about-hero-reveal type-body-lg zbr-prose-limit mt-6 text-slate-300">
            At ZoomBridge Research, we help businesses identify, engage, and convert
            the right prospects through AI-powered research, verified data, and
            human expertise across 120+ countries.
          </p>

          {/* CTA Buttons */}
          <div className="about-hero-reveal mt-8 flex flex-wrap items-center gap-4">
            <MagneticButton
              href="/why-zbr"
              variant="primary"
              onClick={() =>
                trackEvent("cta_click", {
                  cta_location: "about_hero",
                  cta_label: "Why ZoomBridge",
                })
              }
            >
              <span>Why ZoomBridge</span>
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </MagneticButton>

            <MagneticButton
              href="/services"
              variant="secondary"
              onClick={() =>
                trackEvent("cta_click", {
                  cta_location: "about_hero",
                  cta_label: "Explore Services",
                })
              }
            >
              <span>Explore Services</span>
            </MagneticButton>
          </div>
        </div>

        {/* Right Interactive 3D Team & Global Intelligence Stage */}
        <div className="about-hero-reveal relative flex justify-center lg:col-span-6">
          <div
            ref={illustrationRef}
            style={{
              transform:
                !prefersReducedMotion && isDesktop && !isTouchDevice
                  ? `perspective(1000px) rotateY(${mouseOffset.x * 0.04}deg) rotateX(${-mouseOffset.y * 0.04}deg) translate3d(${mouseOffset.x * 0.25}px, ${mouseOffset.y * 0.25}px, 0)`
                  : undefined,
              transition: "transform 260ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
            className="relative mx-auto w-full max-w-[580px]"
          >
            {/* Luminous Core Glow behind character & globe */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-6 rounded-full opacity-65 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(34,211,238,0.36) 0%, rgba(30,94,255,0.26) 50%, transparent 75%)",
              }}
            />

            {/* Floating 3D Team Illustration */}
            <div className="animate-zbr-float-slow relative z-10 w-full drop-shadow-[0_20px_50px_rgba(30,94,255,0.35)]">
              <Image
                src="/images/about/about-hero-team.png"
                alt="ZoomBridge Research AI, Data and Human Intelligence Team"
                width={1024}
                height={682}
                priority
                className="h-auto w-full select-none object-contain"
              />
            </div>

            {/* Floating Telemetry Hint Pill (Top Left / Center) */}
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
                <span>Drag to Orbit</span>
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
                  <span>INDUSTRY EXPERIENCE</span>
                </div>
                <p className="mt-0.5 font-mono-metric text-lg font-bold text-white">
                  15+ Years
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
                  <p className="text-xs font-semibold text-white">Global B2B Intelligence</p>
                  <p className="text-[11px] text-slate-300">120+ Countries &amp; Regions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
