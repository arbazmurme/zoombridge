"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  AppWindow,
  Briefcase,
  Cloud,
  Cpu,
  Factory,
  GraduationCap,
  HeartPulse,
  Landmark,
  Layers3,
  Radio,
  Server,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Users,
} from "lucide-react";
import { SUPPORTED_INDUSTRIES } from "@/data/site";
import { useMotionConfig } from "@/components/providers/MotionProvider";

gsap.registerPlugin(ScrollTrigger);

interface IndustryStyle {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bg: string;
  border: string;
}

const INDUSTRY_STYLES: Record<string, IndustryStyle> = {
  SaaS: {
    icon: AppWindow,
    color: "#1E5EFF",
    bg: "rgba(30, 94, 255, 0.10)",
    border: "rgba(30, 94, 255, 0.24)",
  },
  "Information Technology": {
    icon: Server,
    color: "#0284C7",
    bg: "rgba(2, 132, 199, 0.10)",
    border: "rgba(2, 132, 199, 0.24)",
  },
  Cybersecurity: {
    icon: ShieldCheck,
    color: "#7C3AED",
    bg: "rgba(124, 58, 237, 0.10)",
    border: "rgba(124, 58, 237, 0.24)",
  },
  "Cloud Computing": {
    icon: Cloud,
    color: "#0891B2",
    bg: "rgba(8, 145, 178, 0.10)",
    border: "rgba(8, 145, 178, 0.24)",
  },
  "Artificial Intelligence": {
    icon: Cpu,
    color: "#4F46E5",
    bg: "rgba(79, 70, 229, 0.10)",
    border: "rgba(79, 70, 229, 0.24)",
  },
  Manufacturing: {
    icon: Factory,
    color: "#D97706",
    bg: "rgba(217, 119, 6, 0.10)",
    border: "rgba(217, 119, 6, 0.24)",
  },
  Healthcare: {
    icon: HeartPulse,
    color: "#E11D48",
    bg: "rgba(225, 29, 72, 0.10)",
    border: "rgba(225, 29, 72, 0.24)",
  },
  "Financial Services": {
    icon: Landmark,
    color: "#059669",
    bg: "rgba(5, 150, 105, 0.10)",
    border: "rgba(5, 150, 105, 0.24)",
  },
  Telecommunications: {
    icon: Radio,
    color: "#2563EB",
    bg: "rgba(37, 99, 235, 0.10)",
    border: "rgba(37, 99, 235, 0.24)",
  },
  "Professional Services": {
    icon: Briefcase,
    color: "#0D9488",
    bg: "rgba(13, 148, 136, 0.10)",
    border: "rgba(13, 148, 136, 0.24)",
  },
  Education: {
    icon: GraduationCap,
    color: "#9333EA",
    bg: "rgba(147, 51, 234, 0.10)",
    border: "rgba(147, 51, 234, 0.24)",
  },
  "Retail & eCommerce": {
    icon: ShoppingBag,
    color: "#EA580C",
    bg: "rgba(234, 88, 12, 0.10)",
    border: "rgba(234, 88, 12, 0.24)",
  },
  Logistics: {
    icon: Truck,
    color: "#0369A1",
    bg: "rgba(3, 105, 161, 0.10)",
    border: "rgba(3, 105, 161, 0.24)",
  },
  "HR Technology": {
    icon: Users,
    color: "#DB2777",
    bg: "rgba(219, 39, 119, 0.10)",
    border: "rgba(219, 39, 119, 0.24)",
  },
};

function IndustryCard({
  item,
  isDuplicate = false,
}: {
  item: (typeof SUPPORTED_INDUSTRIES)[number];
  isDuplicate?: boolean;
}) {
  const style = INDUSTRY_STYLES[item.name] ?? {
    icon: Layers3,
    color: "#1E5EFF",
    bg: "rgba(30, 94, 255, 0.10)",
    border: "rgba(30, 94, 255, 0.24)",
  };
  const Icon = style.icon;

  return (
    <div
      aria-hidden={isDuplicate || undefined}
      className="group relative flex min-w-[258px] items-center gap-4 overflow-hidden rounded-2xl border border-slate-200/90 bg-white/95 px-5 py-4 shadow-[0_4px_18px_rgba(10,22,40,0.04)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_14px_30px_rgba(10,22,40,0.08)]"
    >
      {/* Subtle colored top accent bar */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] opacity-60 transition-opacity duration-200 group-hover:opacity-100"
        style={{ backgroundColor: style.color }}
      />

      {/* Colored per-industry icon badge */}
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-transform duration-200 group-hover:scale-105"
        style={{
          backgroundColor: style.bg,
          borderColor: style.border,
          color: style.color,
        }}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>

      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="truncate font-display text-[15px] font-bold tracking-tight text-[#0A1628]">
            {item.name}
          </p>
        </div>
        <p className="mt-0.5 truncate text-xs font-medium text-slate-500">
          {item.sector}
        </p>
      </div>
    </div>
  );
}

export function TrustedBySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stripRef = useRef<HTMLDivElement | null>(null);
  const { prefersReducedMotion } = useMotionConfig();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !stripRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".trusted-reveal", {
        opacity: 0,
        y: 18,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 86%",
          once: true,
        },
      });

      gsap.fromTo(
        stripRef.current,
        { y: 14 },
        {
          y: -14,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="trusted-by-heading"
      className="relative overflow-hidden border-y border-slate-200/80 bg-gradient-to-b from-[#F8FAFC] via-[#F2F6FD] to-[#EEF3FC] py-10"
    >
      {/* Subtle blueprint dot accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-45"
        style={{
          backgroundImage:
            "radial-gradient(rgba(30, 94, 255, 0.14) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(ellipse 85% 80% at 50% 50%, #000 45%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 80% at 50% 50%, #000 45%, transparent 100%)",
        }}
      />

      <div className="trusted-reveal zbr-container relative z-10 mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#1E5EFF]/20 bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#1E5EFF] shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#1E5EFF]" />
            Vertical Intelligence
          </span>
          <h2
            id="trusted-by-heading"
            className="mt-2 font-display text-xl font-bold tracking-tight text-[#0A1628] sm:text-2xl"
          >
            Industries We Support
          </h2>
          <p className="mt-0.5 text-xs text-slate-600 sm:text-sm">
            Research depth across the global B2B sectors that matter most
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-slate-200 bg-white/95 px-3 py-1 font-mono-metric text-xs font-semibold text-[#0A1628] shadow-xs">
            14 Core Sectors
          </span>
          <span className="rounded-full border border-[#1E5EFF]/25 bg-[#0A1628] px-3 py-1 font-mono-metric text-xs font-semibold text-[#22D3EE] shadow-xs">
            50M+ Records • 120+ Countries
          </span>
        </div>
      </div>

      <div ref={stripRef} className="marquee-wrapper relative z-10 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#F4F7FE] to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#F4F7FE] to-transparent"
        />
        <div
          className="animate-zbr-marquee gap-4 px-4 py-1"
          style={{ animationDuration: "46s" }}
        >
          {SUPPORTED_INDUSTRIES.map((item) => (
            <IndustryCard key={`s-a-${item.name}`} item={item} />
          ))}
          {SUPPORTED_INDUSTRIES.map((item) => (
            <IndustryCard key={`s-b-${item.name}`} item={item} isDuplicate />
          ))}
        </div>
      </div>
    </section>
  );
}
