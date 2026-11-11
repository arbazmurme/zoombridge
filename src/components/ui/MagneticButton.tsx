"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useMotionConfig } from "@/components/providers/MotionProvider";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  ariaLabel?: string;
  trackingName?: string;
}

export function MagneticButton({
  href,
  onClick,
  type = "button",
  disabled = false,
  children,
  variant = "primary",
  className = "",
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { prefersReducedMotion, isTouchDevice } = useMotionConfig();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const canMagnet = !prefersReducedMotion && !isTouchDevice && !disabled;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canMagnet || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = (e.clientX - (rect.left + rect.width / 2)) * 0.22;
    const relY = (e.clientY - (rect.top + rect.height / 2)) * 0.22;
    setOffset({
      x: Math.max(-10, Math.min(10, relX)),
      y: Math.max(-10, Math.min(10, relY)),
    });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const variantClasses =
    variant === "primary"
      ? "bg-[#1E5EFF] text-white hover:bg-[#3B7BFF] shadow-[0_8px_28px_rgba(30,94,255,0.34)]"
      : variant === "secondary"
      ? "border border-white/25 bg-white/8 text-white hover:border-[#22D3EE]/60 hover:bg-white/14"
      : "border border-slate-300 bg-white text-[#0F172A] hover:border-[#1E5EFF] hover:text-[#1E5EFF]";

  const baseClasses = cn(
    "group relative inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22D3EE] disabled:cursor-not-allowed disabled:opacity-55",
    variantClasses,
    className
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 280, damping: 20, mass: 0.5 }}
      className="inline-block"
      data-cursor="interactive"
    >
      {href ? (
        <Link href={href} aria-label={ariaLabel} className={baseClasses} onClick={onClick}>
          {children}
        </Link>
      ) : (
        <button
          type={type}
          disabled={disabled}
          onClick={onClick}
          aria-label={ariaLabel}
          className={baseClasses}
        >
          {children}
        </button>
      )}
    </motion.div>
  );
}

