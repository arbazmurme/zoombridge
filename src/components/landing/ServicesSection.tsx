"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  DatabaseZap,
  Mail,
  Share2,
  Target,
  TrendingUp,
  UserSearch,
} from "lucide-react";
import { SERVICES, ServiceDetail } from "@/data/services";
import { TiltCard } from "@/components/ui/TiltCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useMotionConfig } from "@/components/providers/MotionProvider";
import { trackEvent } from "@/lib/analytics";

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP: Record<ServiceDetail["iconName"], React.ComponentType<{ className?: string }>> = {
  Mail,
  Target,
  Share2,
  UserSearch,
  TrendingUp,
  DatabaseZap,
};

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { prefersReducedMotion } = useMotionConfig();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Mask Reveal Parallax on service card visual frames
      const masks = gsap.utils.toArray<HTMLElement>(".service-mask-visual");
      masks.forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(14% 0% 14% 0% round 12px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 12px)",
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 55%",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="services-heading"
      className="zbr-section relative overflow-hidden bg-gradient-to-b from-[#F4F7FE] via-white to-[#F4F7FE] text-[#0F172A]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(rgba(30, 94, 255, 0.14) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 80% 75% at 50% 45%, #000 50%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 75% at 50% 45%, #000 50%, transparent 100%)",
        }}
      />
      <div className="zbr-container relative z-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-[#1E5EFF]/20 bg-[#1E5EFF]/8 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#1E5EFF]">
              Services
            </span>
            <h2 id="services-heading" className="type-h2 mt-4 text-[#0A1628]">
              Demand generation services, human-verified.
            </h2>
          </div>
          <MagneticButton
            href="/services"
            variant="ghost"
            onClick={() =>
              trackEvent("cta_click", {
                cta_location: "services_header",
                cta_label: "See every service in full detail.",
              })
            }
          >
            <span>See every service in full detail.</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </MagneticButton>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, idx) => {
            const Icon = ICON_MAP[service.iconName];
            return (
              <TiltCard
                key={service.slug}
                glowColor="rgba(30, 94, 255, 0.14)"
                className="flex flex-col p-6"
              >
                {/* Mask Reveal + Hover Image/Graphic Zoom Visual */}
                <div className="service-mask-visual relative h-36 overflow-hidden rounded-xl border border-slate-200/80 bg-[#0A1628] p-4">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-110"
                    style={{
                      background: `radial-gradient(circle at 80% 25%, ${service.accentColor}45, transparent 60%), linear-gradient(135deg, #0A1628 0%, #0F1E38 100%)`,
                    }}
                  />
                  {/* Subtle vector data matrix inside card visual */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 240 100"
                    className="relative z-10 h-full w-full opacity-60 transition-transform duration-500 ease-out group-hover:scale-105"
                  >
                    <path
                      d={`M10 ${78 - idx * 4} Q 75 ${32 + idx * 5}, 140 ${
                        55 - idx * 3
                      } T 230 ${26 + idx * 4}`}
                      fill="none"
                      stroke={service.accentColor}
                      strokeWidth="2"
                    />
                    <circle cx="75" cy={45 + idx * 2} r="3.5" fill="#22D3EE" />
                    <circle cx="155" cy={48 - idx * 2} r="3.5" fill="#FFFFFF" />
                    <circle cx="215" cy={30 + idx * 3} r="4" fill={service.accentColor} />
                  </svg>

                  <div className="absolute left-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white backdrop-blur-sm transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                </div>

                <div className="mt-6 flex flex-1 flex-col">
                  <h3 className="font-display text-2xl font-semibold text-[#0A1628]">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-600">
                    {service.summary}
                  </p>

                  <Link
                    href={`/services/${service.slug}`}
                    onClick={() =>
                      trackEvent("service_card_click", {
                        service_slug: service.slug,
                        service_title: service.title,
                      })
                    }
                    className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-[#1E5EFF] transition-colors hover:text-[#0A1628]"
                  >
                    <span>Learn More</span>
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1.5"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

