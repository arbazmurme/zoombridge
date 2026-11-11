"use client";

import React, { Component, Suspense, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { useMotionConfig } from "@/components/providers/MotionProvider";

const HeroNetworkCanvas = dynamic(() => import("./HeroNetworkCanvas"), {
  ssr: false,
});

const subscribeNoop = () => () => {};
let cachedWebglSupport: boolean | null = null;

function getWebglSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  if (cachedWebglSupport !== null) return cachedWebglSupport;
  try {
    const canvas = document.createElement("canvas");
    cachedWebglSupport = Boolean(
      canvas.getContext("webgl2") || canvas.getContext("webgl")
    );
  } catch {
    cachedWebglSupport = false;
  }
  return cachedWebglSupport;
}

function HeroStaticFallback() {
  return (
    <svg
      viewBox="0 0 460 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="mx-auto h-full w-full max-w-[440px]"
    >
      <defs>
        <radialGradient id="hero-fallback-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.3" />
          <stop offset="55%" stopColor="#1E5EFF" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#0A1628" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="230" cy="210" r="175" fill="url(#hero-fallback-glow)" />
      <ellipse
        cx="230"
        cy="210"
        rx="165"
        ry="68"
        transform="rotate(-22 230 210)"
        stroke="#3B7BFF"
        strokeOpacity="0.55"
        strokeWidth="1.6"
      />
      <ellipse
        cx="230"
        cy="210"
        rx="165"
        ry="68"
        transform="rotate(34 230 210)"
        stroke="#22D3EE"
        strokeOpacity="0.55"
        strokeWidth="1.6"
      />
      <polygon
        points="230,115 312,165 282,270 178,270 148,165"
        fill="#1E5EFF"
        fillOpacity="0.2"
        stroke="#22D3EE"
        strokeWidth="1.8"
      />
      <circle cx="230" cy="210" r="24" fill="#1E5EFF" />
      <circle cx="230" cy="210" r="10" fill="#22D3EE" />
      {[
        [230, 115],
        [312, 165],
        [282, 270],
        [178, 270],
        [148, 165],
      ].map(([cx, cy], idx) => (
        <circle
          key={idx}
          cx={cx}
          cy={cy}
          r="5"
          fill={idx % 2 === 0 ? "#22D3EE" : "#8B5CF6"}
        />
      ))}
    </svg>
  );
}

class WebGLErrorBoundary extends Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

export function HeroNetworkWrapper() {
  const { prefersReducedMotion, isDesktop } = useMotionConfig();
  const webglReady = useSyncExternalStore(
    subscribeNoop,
    getWebglSnapshot,
    () => false
  );

  if (!webglReady || prefersReducedMotion || !isDesktop) {
    return (
      <div className="flex h-[320px] w-full items-center justify-center sm:h-[380px]">
        <HeroStaticFallback />
      </div>
    );
  }

  return (
    <div className="relative h-[400px] w-full lg:h-[520px]">
      <WebGLErrorBoundary fallback={<HeroStaticFallback />}>
        <Suspense fallback={<HeroStaticFallback />}>
          <HeroNetworkCanvas />
        </Suspense>
      </WebGLErrorBoundary>
    </div>
  );
}
