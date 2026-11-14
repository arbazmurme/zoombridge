"use client";

import React, { Component, Suspense, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { useMotionConfig } from "@/components/providers/MotionProvider";

const GlobalGlobeCanvas = dynamic(() => import("./GlobalGlobeCanvas"), {
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

function GlobeFallback() {
  return (
    <svg
      viewBox="0 0 360 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="mx-auto h-full w-full max-w-[320px]"
    >
      <circle
        cx="180"
        cy="180"
        r="130"
        fill="#0F1E38"
        stroke="#1E5EFF"
        strokeOpacity="0.5"
        strokeWidth="1.5"
      />
      <ellipse
        cx="180"
        cy="180"
        rx="68"
        ry="130"
        stroke="#3B7BFF"
        strokeOpacity="0.4"
      />
      <ellipse
        cx="180"
        cy="180"
        rx="130"
        ry="52"
        stroke="#3B7BFF"
        strokeOpacity="0.4"
      />
      <path
        d="M95 140 Q 180 85 265 145"
        stroke="#22D3EE"
        strokeWidth="1.6"
        strokeDasharray="4 4"
      />
      <path
        d="M110 225 Q 185 160 250 215"
        stroke="#8B5CF6"
        strokeWidth="1.6"
        strokeDasharray="4 4"
      />
      <circle cx="95" cy="140" r="5" fill="#22D3EE" />
      <circle cx="265" cy="145" r="5" fill="#22D3EE" />
      <circle cx="110" cy="225" r="5" fill="#8B5CF6" />
      <circle cx="250" cy="215" r="5" fill="#22D3EE" />
    </svg>
  );
}

class GlobeErrorBoundary extends Component<
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

export function GlobalGlobeWrapper() {
  const { prefersReducedMotion, isDesktop } = useMotionConfig();
  const webglReady = useSyncExternalStore(
    subscribeNoop,
    getWebglSnapshot,
    () => false
  );

  if (!webglReady || prefersReducedMotion || !isDesktop) {
    return (
      <div className="flex h-[260px] sm:h-[300px] lg:h-[340px] items-center justify-center">
        <GlobeFallback />
      </div>
    );
  }

  return (
    <div className="h-[260px] w-full sm:h-[300px] lg:h-[340px]">
      <GlobeErrorBoundary fallback={<GlobeFallback />}>
        <Suspense fallback={<GlobeFallback />}>
          <GlobalGlobeCanvas />
        </Suspense>
      </GlobeErrorBoundary>
    </div>
  );
}
