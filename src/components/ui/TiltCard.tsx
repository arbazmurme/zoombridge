"use client";

import React, { useRef, useState } from "react";
import { useMotionConfig } from "@/components/providers/MotionProvider";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  maxTilt?: number; // Hard-capped <= 8deg
  dark?: boolean;
}

export function TiltCard({
  children,
  className = "",
  glowColor = "rgba(34, 211, 238, 0.16)",
  maxTilt = 8,
  dark = false,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const { prefersReducedMotion, isTouchDevice } = useMotionConfig();
  const clampedTilt = Math.min(8, Math.max(1, maxTilt));

  const [transform, setTransform] = useState(
    "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)"
  );
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, active: false });

  const interactive = !prefersReducedMotion && !isTouchDevice;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const rotateY = (px - 0.5) * clampedTilt * 2;
    const rotateX = (0.5 - py) * clampedTilt * 2;

    setTransform(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(
        2
      )}deg) scale3d(1.015, 1.015, 1.015)`
    );
    setSpotlight({
      x: Math.round(px * 100),
      y: Math.round(py * 100),
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setTransform(
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)"
    );
    setSpotlight((prev) => ({ ...prev, active: false }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="interactive"
      style={{
        transform: interactive ? transform : undefined,
        transition:
          "transform 260ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 260ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border transition-colors duration-200",
        dark
          ? "border-white/10 bg-[#0F1E38]/90 hover:border-[#3B7BFF]/50"
          : "border-slate-200/90 bg-white hover:border-[#1E5EFF]/40",
        "card-elevated",
        className
      )}
    >
      {/* Dynamic cursor-responsive lighting effect */}
      {interactive ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-200"
          style={{
            opacity: spotlight.active ? 1 : 0,
            background: `radial-gradient(420px circle at ${spotlight.x}% ${spotlight.y}%, ${glowColor}, transparent 65%)`,
          }}
        />
      ) : null}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

