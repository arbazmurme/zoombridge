"use client";

import React, {
  Component,
  Suspense,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import dynamic from "next/dynamic";
import { useMotionConfig } from "@/components/providers/MotionProvider";

const HeroNetworkCanvas = dynamic(() => import("./HeroNetworkCanvas"), {
  ssr: false,
});

const emptySubscribe = () => () => {};

function getWebglSupportedSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") || canvas.getContext("webgl")
    );
  } catch {
    return false;
  }
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
          <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.32" />
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

export function HeroNetworkWrapper({ compact = false }: { compact?: boolean }) {
  const { prefersReducedMotion, isDesktop } = useMotionConfig();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(true);

  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const webglSupported = useSyncExternalStore(
    emptySubscribe,
    getWebglSupportedSnapshot,
    () => false
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setInView(entry.isIntersecting);
        }
      },
      { rootMargin: "120px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isClient]);

  // Enable 3D on both desktop and mobile; on mobile use lowPower mode for silky 60fps
  const isMobile = !isDesktop;
  const useLowPower = isMobile;

  if (!isClient || !webglSupported || prefersReducedMotion) {
    return (
      <div
        className={`flex w-full items-center justify-center ${
          compact ? "h-[260px] sm:h-[300px]" : "h-[320px] sm:h-[380px]"
        }`}
      >
        <HeroStaticFallback />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${
        compact
          ? "h-[280px] sm:h-[340px] lg:h-[400px]"
          : "h-[340px] sm:h-[440px] lg:h-[520px] xl:h-[550px]"
      }`}
    >
      {/* Soft luminous atmospheric aura behind the 3D globe */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-4 sm:inset-6 rounded-full opacity-75 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 56%, rgba(56,189,248,0.22) 0%, rgba(30,94,255,0.16) 45%, transparent 72%)",
        }}
      />
      <WebGLErrorBoundary fallback={<HeroStaticFallback />}>
        <Suspense fallback={<HeroStaticFallback />}>
          <HeroNetworkCanvas inView={inView} lowPower={useLowPower} />
        </Suspense>
      </WebGLErrorBoundary>
    </div>
  );
}
