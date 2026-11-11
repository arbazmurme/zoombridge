"use client";

import React, { useEffect, useRef } from "react";
import { useMotionConfig } from "@/components/providers/MotionProvider";

// Lightweight programmatic Lottie JSON vector pulse (zero external network fetch)
const PULSE_LOTTIE_DATA = {
  v: "5.7.4",
  fr: 30,
  ip: 0,
  op: 60,
  w: 48,
  h: 48,
  nm: "ZBR Signal Pulse",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Outer Ring",
      sr: 1,
      ks: {
        o: {
          a: 1,
          k: [
            { t: 0, s: [80], e: [0] },
            { t: 55, s: [0] },
          ],
        },
        s: {
          a: 1,
          k: [
            { t: 0, s: [35, 35, 100], e: [100, 100, 100] },
            { t: 55, s: [100, 100, 100] },
          ],
        },
        p: { a: 0, k: [24, 24, 0] },
      },
      shapes: [
        {
          ty: "el",
          p: { a: 0, k: [0, 0] },
          s: { a: 0, k: [36, 36] },
          nm: "Circle",
        },
        {
          ty: "st",
          c: { a: 0, k: [0.133, 0.827, 0.933, 1] },
          o: { a: 0, k: 100 },
          w: { a: 0, k: 3 },
          nm: "Stroke",
        },
      ],
      ip: 0,
      op: 60,
      st: 0,
    },
    {
      ddd: 0,
      ind: 2,
      ty: 4,
      nm: "Core Dot",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        s: { a: 0, k: [100, 100, 100] },
        p: { a: 0, k: [24, 24, 0] },
      },
      shapes: [
        {
          ty: "el",
          p: { a: 0, k: [0, 0] },
          s: { a: 0, k: [12, 12] },
          nm: "Core",
        },
        {
          ty: "fl",
          c: { a: 0, k: [0.133, 0.827, 0.933, 1] },
          o: { a: 0, k: 100 },
          nm: "Fill",
        },
      ],
      ip: 0,
      op: 60,
      st: 0,
    },
  ],
};

export function LottieSignal({ className = "h-5 w-5" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { prefersReducedMotion } = useMotionConfig();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    let destroyed = false;
    let anim: { destroy: () => void } | null = null;

    import("lottie-web").then((lottieModule) => {
      if (destroyed || !containerRef.current) return;
      const lottie = lottieModule.default;
      anim = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: PULSE_LOTTIE_DATA,
      });
    });

    return () => {
      destroyed = true;
      anim?.destroy();
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <span
        aria-hidden="true"
        className={`inline-flex items-center justify-center ${className}`}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-[#22D3EE]" />
      </span>
    );
  }

  return <div ref={containerRef} aria-hidden="true" className={className} />;
}

