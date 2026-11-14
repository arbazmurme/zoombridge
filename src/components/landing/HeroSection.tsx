"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  CheckCircle2,
  Move3d,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { TRUST_INDICATORS } from "@/data/site";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { LottieSignal } from "@/components/motion/LottieSignal";
import { HeroNetworkWrapper } from "@/components/three/HeroNetworkWrapper";
import { useMotionConfig } from "@/components/providers/MotionProvider";
import { trackEvent } from "@/lib/analytics";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgLayerRef = useRef<HTMLDivElement | null>(null);
  const midLayerRef = useRef<HTMLDivElement | null>(null);
  const modelStageZoomRef = useRef<HTMLDivElement | null>(null);
  const gridSpotlightRef = useRef<HTMLDivElement | null>(null);
  const { prefersReducedMotion, isDesktop, isTouchDevice } = useMotionConfig();
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Staggered Hero Typography Reveal
      gsap.from(".hero-stagger", {
        opacity: 0,
        y: 26,
        duration: 0.72,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Layered Parallax (Background, Mid Halo, Foreground 3D Stage Zoom)
      if (bgLayerRef.current) {
        gsap.to(bgLayerRef.current, {
          y: 90,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (midLayerRef.current) {
        gsap.to(midLayerRef.current, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Zoom Parallax on 3D Model Stage
      if (modelStageZoomRef.current) {
        gsap.fromTo(
          modelStageZoomRef.current,
          { scale: 1, y: 0 },
          {
            scale: 1.07,
            y: -30,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Mouse Parallax (Desktop only)
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (
      prefersReducedMotion ||
      !isDesktop ||
      isTouchDevice ||
      !sectionRef.current
    ) {
      return;
    }
    const rect = sectionRef.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    if (gridSpotlightRef.current) {
      gridSpotlightRef.current.style.opacity = "1";
      gridSpotlightRef.current.style.setProperty("--mx", `${px}px`);
      gridSpotlightRef.current.style.setProperty("--my", `${py}px`);
    }
    const nx = px / rect.width - 0.5;
    const ny = py / rect.height - 0.5;
    setMouseOffset({ x: nx * 22, y: ny * 16 });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[92vh] items-center overflow-hidden bg-[#0A1628] pb-20 pt-32 text-white lg:pb-28 lg:pt-36"
    >
      {/* Layered Background Gradient & Grid (Layer 1) */}
      <div
        ref={bgLayerRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="animate-zbr-aurora absolute -left-24 -top-24 h-[520px] w-[520px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(30,94,255,0.28) 0%, transparent 70%)",
          }}
        />
        <div
          className="animate-zbr-aurora absolute -bottom-24 right-0 h-[540px] w-[540px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(34,211,238,0.22) 0%, rgba(139,92,246,0.18) 50%, transparent 72%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(148,163,184,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.2) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* Interactive Mouse-Tracked Cyan Grid Highlight */}
        <div
          ref={gridSpotlightRef}
          className="absolute inset-0 opacity-0 transition-opacity duration-500"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(34,211,238,0.42) 1px, transparent 1px), linear-gradient(to bottom, rgba(59,123,255,0.42) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), #000 0%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), #000 0%, transparent 75%)",
          }}
        />
      </div>

      {/* Mid Layer Ambient Rotating Orbital Halos */}
      <div
        ref={midLayerRef}
        aria-hidden="true"
        className="pointer-events-none absolute right-[8%] top-1/2 hidden h-[490px] w-[490px] -translate-y-1/2 items-center justify-center lg:flex"
      >
        <div className="animate-zbr-spin-slow h-full w-full rounded-full border border-dashed border-[#22D3EE]/18" />
        <div className="absolute h-[78%] w-[78%] rounded-full border border-[#3B7BFF]/15" />
      </div>

      {/* Foreground Content */}
      <div className="zbr-container relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
        {/* Left Copy Column */}
        <div className="lg:col-span-6">
          <div className="hero-stagger inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/6 px-4 py-1.5 backdrop-blur-sm">
            <LottieSignal className="h-5 w-5" />
            <span className="text-xs font-semibold tracking-wide text-[#22D3EE]">
              Research-Led B2B Demand Intelligence
            </span>
          </div>

          <h1 className="hero-stagger type-h1 mt-6 text-white">
            Smarter Revenue Growth for{" "}
            <span className="animate-zbr-gradient bg-gradient-to-r from-[#3B7BFF] via-[#22D3EE] to-[#8B5CF6] bg-clip-text text-transparent">
              B2B Teams.
            </span>
          </h1>

          <p className="hero-stagger type-body-lg zbr-prose-limit mt-6 text-slate-300">
            Identify the right accounts, discover buying committees, enrich data,
            and launch highly targeted campaigns backed by human-verified
            research.
          </p>

          <div className="hero-stagger mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton
              href="/book-a-call"
              variant="primary"
              onClick={() =>
                trackEvent("cta_click", {
                  cta_location: "hero_primary",
                  cta_label: "Book a Strategy Call",
                })
              }
            >
              <span>Book a Strategy Call</span>
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </MagneticButton>

            <MagneticButton
              href="/contact?intent=sample-data"
              variant="secondary"
              onClick={() =>
                trackEvent("cta_click", {
                  cta_location: "hero_secondary",
                  cta_label: "Request Sample Data",
                })
              }
            >
              <span>Request Sample Data</span>
            </MagneticButton>
          </div>

          {/* Trust Indicators */}
          <ul
            aria-label="Core Trust Indicators"
            className="hero-stagger mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-sm text-slate-300"
          >
            {TRUST_INDICATORS.map((item) => (
              <li key={item} className="inline-flex items-center gap-2">
                <CheckCircle2
                  className="h-4 w-4 text-[#22D3EE]"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Interactive 3D Intelligence Core Stage */}
        <div className="hero-stagger relative lg:col-span-6 lg:-mr-4 xl:-mr-8">
          <div ref={modelStageZoomRef} className="relative w-full">
            {/* Soft radial backdrop glow behind 3D model */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-6 rounded-full opacity-55 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(30,94,255,0.36) 0%, rgba(34,211,238,0.22) 45%, transparent 72%)",
              }}
            />

            {/* Interactive 3D Canvas */}
            <HeroNetworkWrapper />

            {/* Floating Interactive 3D Hint Pill (Top Left) */}
            <div
              aria-hidden="true"
              style={{
                transform:
                  !prefersReducedMotion && isDesktop && !isTouchDevice
                    ? `translate3d(${mouseOffset.x * 0.45}px, ${mouseOffset.y * 0.45}px, 0)`
                    : undefined,
                transition: "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              className="pointer-events-none absolute left-2 top-3 hidden sm:inline-flex"
            >
              <div className="animate-zbr-float inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#0F1E38]/85 px-3.5 py-1.5 text-[11px] font-medium text-slate-200 shadow-lg backdrop-blur-md">
                <Move3d className="h-3.5 w-3.5 text-[#22D3EE]" />
                <span>Interactive 3D Core • Drag to Orbit</span>
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
              className="pointer-events-none absolute right-2 top-3 hidden sm:block"
            >
              <div className="animate-zbr-float-slow rounded-2xl border border-white/15 bg-[#0F1E38]/90 px-4 py-3 shadow-xl backdrop-blur-md">
                <div className="flex items-center gap-2 text-[11px] font-medium text-slate-300">
                  <Users className="h-3.5 w-3.5 text-[#22D3EE]" aria-hidden="true" />
                  <span>Accuracy Goal</span>
                </div>
                <p className="mt-0.5 font-mono-metric text-xl font-bold text-white">
                  95%
                </p>
              </div>
            </div>

            {/* Floating Metric Badge (Bottom Left) */}
            <div
              style={{
                transform:
                  !prefersReducedMotion && isDesktop && !isTouchDevice
                    ? `translate3d(${mouseOffset.x * 0.6}px, ${-mouseOffset.y * 0.6}px, 0)`
                    : undefined,
                transition: "transform 240ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              className="pointer-events-none mt-2 inline-flex lg:absolute lg:bottom-4 lg:left-2 lg:mt-0"
            >
              <div className="animate-zbr-float-slow inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-[#0F1E38]/90 px-4 py-3 shadow-xl backdrop-blur-md">
                <ShieldCheck className="h-5 w-5 text-[#22D3EE]" aria-hidden="true" />
                <div>
                  <p className="font-mono-metric text-sm font-bold text-white">
                    50M+ Records • 120+ Countries
                  </p>
                  <p className="text-[11px] text-slate-300">
                    AI identifies. <strong className="text-white">Humans verify.</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Signal Pill (Bottom Right) */}
            <div
              aria-hidden="true"
              style={{
                transform:
                  !prefersReducedMotion && isDesktop && !isTouchDevice
                    ? `translate3d(${-mouseOffset.x * 0.5}px, ${-mouseOffset.y * 0.5}px, 0)`
                    : undefined,
                transition: "transform 260ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              className="pointer-events-none absolute bottom-4 right-2 hidden sm:inline-flex"
            >
              <div className="animate-zbr-float inline-flex items-center gap-2 rounded-full border border-[#22D3EE]/30 bg-[#0F1E38]/90 px-3.5 py-2 text-xs font-medium text-slate-200 shadow-xl backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-[#22D3EE]" />
                <span>Buying-Committee Graph</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
