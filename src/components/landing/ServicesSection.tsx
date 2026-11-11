"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Check,
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
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP: Record<
  ServiceDetail["iconName"],
  React.ComponentType<{ className?: string }>
> = {
  Mail,
  Target,
  Share2,
  UserSearch,
  TrendingUp,
  DatabaseZap,
};

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const bgDotsRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const cardSlotRefs = useRef<Array<HTMLDivElement | null>>([]);
  const waveLayerRefs = useRef<Array<SVGSVGElement | null>>([]);
  const wavePathRefs = useRef<Array<SVGPathElement | null>>([]);
  const iconBadgeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  const { prefersReducedMotion, isDesktop } = useMotionConfig();
  const [activeIndex, setActiveIndex] = useState(0);

  const usePinnedHorizontal = isDesktop && !prefersReducedMotion;

  useEffect(() => {
    scrollTriggerRef.current = null;

    if (
      !usePinnedHorizontal ||
      !sectionRef.current ||
      !viewportRef.current ||
      !trackRef.current
    ) {
      return;
    }

    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const cardSlots = cardSlotRefs.current;
    const waveLayers = waveLayerRefs.current;
    const wavePaths = wavePathRefs.current;
    const iconBadges = iconBadgeRefs.current;

    const getScrollDistance = () =>
      Math.max(0, track.scrollWidth - viewport.clientWidth);

    const pathLengths = wavePaths.map((p) => {
      if (!p) return 260;
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len}`;
      return len;
    });

    const skewTracker = { val: 0 };
    const skewQuickTo = gsap.quickTo(skewTracker, "val", {
      duration: 0.35,
      ease: "power3.out",
    });

    const applyDepthTransforms = (progress: number, velocity = 0) => {
      const vpWidth = viewport.clientWidth || 1280;
      const clampedVel = gsap.utils.clamp(-3.2, 3.2, velocity / 460);
      skewQuickTo(clampedVel);

      const focalCenter = progress * (SERVICES.length - 1);

      cardSlots.forEach((slot, idx) => {
        if (!slot) return;
        const delta = idx - focalCenter;
        const absDelta = Math.min(2.2, Math.abs(delta));
        const normalizedDelta = gsap.utils.clamp(-1.5, 1.5, delta / 1.4);

        const scale = 1.035 - absDelta * 0.068;
        const translateY = Math.pow(absDelta, 1.35) * 16;
        const rotateY = -normalizedDelta * 9.5;
        const rotateZ = normalizedDelta * 1.1;
        const skewY = skewTracker.val * 0.4;
        const opacity = Math.max(0.68, 1 - absDelta * 0.16);

        slot.style.transform = `perspective(1050px) translate3d(0, ${translateY.toFixed(
          2
        )}px, 0) scale(${scale.toFixed(4)}) rotateY(${rotateY.toFixed(
          2
        )}deg) rotateZ(${rotateZ.toFixed(2)}deg) skewY(${skewY.toFixed(2)}deg)`;
        slot.style.opacity = opacity.toFixed(3);

        const wave = waveLayers[idx];
        if (wave) {
          const shiftX = gsap.utils.clamp(
            -26,
            26,
            -delta * 12 * (vpWidth / 1280)
          );
          wave.style.transform = `translate3d(${shiftX.toFixed(
            1
          )}px, 0, 0) scale(1.08)`;
        }

        const path = wavePaths[idx];
        if (path) {
          const totalLen = pathLengths[idx] || 260;
          const focusProximity = Math.max(0.28, 1 - absDelta * 0.42);
          path.style.strokeDashoffset = `${(
            totalLen *
            (1 - focusProximity)
          ).toFixed(1)}`;
        }

        const badge = iconBadges[idx];
        if (badge) {
          const badgeShift = gsap.utils.clamp(-10, 10, delta * 4);
          badge.style.transform = `translate3d(${badgeShift.toFixed(1)}px, 0, 0)`;
        }
      });
    };

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardSlots.filter(Boolean),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        }
      );

      const tween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(1080, getScrollDistance() + 260)}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: (self) => {
            gsap.killTweensOf(cardSlots.filter(Boolean));
            applyDepthTransforms(self.progress, 0);
          },
          onUpdate: (self) => {
            scrollTriggerRef.current = self;
            applyDepthTransforms(self.progress, self.getVelocity());

            if (progressBarRef.current) {
              progressBarRef.current.style.transform = `scaleX(${Math.max(
                0.05,
                self.progress
              )})`;
            }

            const nextIdx = Math.min(
              SERVICES.length - 1,
              Math.round(self.progress * (SERVICES.length - 1))
            );
            setActiveIndex((prev) => (prev === nextIdx ? prev : nextIdx));
          },
          onRefresh: (self) => applyDepthTransforms(self.progress, 0),
        },
      });

      scrollTriggerRef.current = tween.scrollTrigger ?? null;

      if (bgDotsRef.current) {
        gsap.to(bgDotsRef.current, {
          x: -160,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${Math.max(1080, getScrollDistance() + 260)}`,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }
    }, sectionRef);

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 180);

    return () => {
      window.clearTimeout(refreshId);
      scrollTriggerRef.current = null;
      cardSlots.forEach((slot) => {
        if (slot) {
          slot.style.transform = "";
          slot.style.opacity = "";
        }
      });
      waveLayers.forEach((wave) => {
        if (wave) wave.style.transform = "";
      });
      wavePaths.forEach((path) => {
        if (path) {
          path.style.strokeDasharray = "";
          path.style.strokeDashoffset = "";
        }
      });
      iconBadges.forEach((badge) => {
        if (badge) badge.style.transform = "";
      });
      ctx.revert();
    };
  }, [usePinnedHorizontal]);

  const handleJumpToService = (idx: number) => {
    const st = scrollTriggerRef.current;
    if (st && usePinnedHorizontal) {
      const ratio = SERVICES.length > 1 ? idx / (SERVICES.length - 1) : 0;
      const targetY = st.start + (st.end - st.start) * ratio;
      window.scrollTo({ top: targetY, behavior: "smooth" });
      return;
    }

    const card = trackRef.current?.children[idx] as HTMLElement | undefined;
    card?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
    setActiveIndex(idx);
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="services-heading"
      className={cn(
        "relative overflow-hidden bg-gradient-to-b from-[#F4F7FE] via-white to-[#F4F7FE] text-[#0F172A]",
        usePinnedHorizontal ? "pb-6 pt-14 lg:pt-16" : "zbr-section"
      )}
    >
      {/* Dynamic Dot Matrix Background */}
      <div
        ref={bgDotsRef}
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-24 inset-y-0 opacity-50 will-change-transform"
        style={{
          backgroundImage:
            "radial-gradient(rgba(30, 94, 255, 0.16) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 80% 75% at 50% 45%, #000 50%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 75% at 50% 45%, #000 50%, transparent 100%)",
        }}
      />

      {/* Ambient corner glow following active card accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-10 h-72 w-72 rounded-full opacity-25 blur-3xl transition-colors duration-700"
        style={{
          background: `radial-gradient(circle, ${
            SERVICES[activeIndex]?.accentColor ?? "#1E5EFF"
          }44 0%, transparent 70%)`,
        }}
      />

      {/* Top Section Header */}
      <div className="zbr-container relative z-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#1E5EFF]/20 bg-[#1E5EFF]/8 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-[#1E5EFF]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#1E5EFF]" />
          Services
        </span>
        <div className="mt-2 flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <h2
            id="services-heading"
            className="font-display text-2xl font-bold leading-tight tracking-tight text-[#0A1628] sm:text-3xl lg:whitespace-nowrap lg:text-[34px] xl:text-[38px]"
          >
            Demand generation services,{" "}
            <span className="text-[#1E5EFF]">human-verified.</span>
          </h2>

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
            <span>See every service</span>
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </MagneticButton>
        </div>
      </div>

      {/* Horizontal Cards Viewport */}
      <div
        ref={viewportRef}
        className={cn(
          "relative z-10 mt-5 w-full",
          usePinnedHorizontal
            ? "overflow-hidden"
            : prefersReducedMotion
            ? "zbr-container"
            : "overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        )}
      >
        <div
          ref={trackRef}
          className={cn(
            prefersReducedMotion
              ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              : usePinnedHorizontal
              ? "flex w-max items-stretch gap-5 py-5 will-change-transform"
              : "flex snap-x snap-mandatory gap-5 px-5 py-3"
          )}
          style={
            usePinnedHorizontal
              ? {
                  paddingInline: "max(2rem, calc((100vw - 1280px) / 2 + 2rem))",
                }
              : undefined
          }
        >
          {SERVICES.map((service, idx) => {
            const Icon = ICON_MAP[service.iconName];
            const isActive = idx === activeIndex;
            const stepLabel = String(idx + 1).padStart(2, "0");

            return (
              <div
                key={service.slug}
                ref={(el) => {
                  cardSlotRefs.current[idx] = el;
                }}
                className={cn(
                  "flex will-change-transform",
                  !prefersReducedMotion &&
                    "w-[300px] shrink-0 snap-start sm:w-[340px] lg:w-[365px]"
                )}
              >
                <TiltCard
                  glowColor={`${service.accentColor}28`}
                  maxTilt={5}
                  className={cn(
                    "flex w-full flex-col p-5 transition-all duration-300",
                    usePinnedHorizontal && isActive
                      ? "border-[#1E5EFF]/45 shadow-[0_18px_42px_rgba(10,22,40,0.12)]"
                      : "border-slate-200/90"
                  )}
                >
                  {/* Visual Header with Internal Parallax Wave */}
                  <div className="relative h-24 overflow-hidden rounded-xl border border-slate-200/80 bg-[#0A1628] p-3.5">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-110"
                      style={{
                        background: `radial-gradient(circle at 80% 25%, ${service.accentColor}48, transparent 62%), linear-gradient(135deg, #0A1628 0%, #0F1E38 100%)`,
                      }}
                    />

                    <svg
                      ref={(el) => {
                        waveLayerRefs.current[idx] = el;
                      }}
                      aria-hidden="true"
                      viewBox="0 0 240 100"
                      className="relative z-10 h-full w-full opacity-75 will-change-transform"
                    >
                      <path
                        ref={(el) => {
                          wavePathRefs.current[idx] = el;
                        }}
                        d={`M10 ${78 - idx * 4} Q 75 ${32 + idx * 5}, 140 ${
                          55 - idx * 3
                        } T 230 ${26 + idx * 4}`}
                        fill="none"
                        stroke={service.accentColor}
                        strokeWidth="2.4"
                        strokeLinecap="round"
                      />
                      <circle cx="75" cy={45 + idx * 2} r="3.5" fill="#22D3EE" />
                      <circle cx="155" cy={48 - idx * 2} r="3.5" fill="#FFFFFF" />
                      <circle
                        cx="215"
                        cy={30 + idx * 3}
                        r="4"
                        fill={service.accentColor}
                      />
                    </svg>

                    <div
                      ref={(el) => {
                        iconBadgeRefs.current[idx] = el;
                      }}
                      className="absolute left-3.5 top-3.5 z-20 flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white backdrop-blur-sm transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 will-change-transform"
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>

                    <span className="absolute right-3 top-3 z-20 rounded-full border border-white/15 bg-[#0A1628]/80 px-2.5 py-0.5 font-mono-metric text-[11px] font-semibold text-[#22D3EE] backdrop-blur-sm">
                      {stepLabel}
                    </span>
                  </div>

                  {/* Card Copy */}
                  <div className="mt-4 flex flex-1 flex-col">
                    <h3 className="font-display text-lg font-semibold text-[#0A1628] lg:text-xl">
                      {service.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:text-[13px]">
                      {service.summary}
                    </p>

                    {/* Key Deliverables Preview */}
                    <ul className="mt-3 space-y-1 border-t border-slate-100 pt-2.5">
                      {service.highlights.slice(0, 2).map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2 text-xs font-medium text-slate-700"
                        >
                          <Check
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1E5EFF]"
                            aria-hidden="true"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/services/${service.slug}`}
                      onClick={() =>
                        trackEvent("service_card_click", {
                          service_slug: service.slug,
                          service_title: service.title,
                        })
                      }
                      className="mt-auto inline-flex min-h-[38px] items-center gap-2 pt-3 text-sm font-semibold text-[#1E5EFF] transition-colors hover:text-[#0A1628]"
                    >
                      <span>Explore Service</span>
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>
      </div>

      {/* Horizontal Progress Track & Quick-Jump Service Pills */}
      {!prefersReducedMotion && (
        <div className="zbr-container relative z-10 mt-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Progress Rail */}
            <div className="h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-slate-200/90">
              <div
                ref={progressBarRef}
                className="h-full w-full origin-left rounded-full bg-gradient-to-r from-[#1E5EFF] via-[#22D3EE] to-[#8B5CF6] transition-transform duration-100 ease-out"
                style={{
                  transform: `scaleX(${Math.max(
                    0.08,
                    (activeIndex + 1) / SERVICES.length
                  )})`,
                }}
              />
            </div>

            {/* Interactive Service Dots */}
            <div
              className="flex flex-wrap items-center gap-1.5"
              role="tablist"
              aria-label="Service cards navigation"
            >
              {SERVICES.map((s, idx) => {
                const active = idx === activeIndex;
                return (
                  <button
                    key={s.slug}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => handleJumpToService(idx)}
                    className={cn(
                      "rounded-full px-3 py-1 text-[11px] font-semibold transition-all duration-200",
                      active
                        ? "bg-[#0A1628] text-white shadow-xs"
                        : "border border-slate-200 bg-white/80 text-slate-600 hover:border-[#1E5EFF]/40 hover:text-[#0A1628]"
                    )}
                  >
                    {String(idx + 1).padStart(2, "0")} · {s.shortTitle}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
