"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMotionConfig } from "@/components/providers/MotionProvider";

export function CustomCursor() {
  const { prefersReducedMotion, isDesktop, isTouchDevice } = useMotionConfig();
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);

  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || !isDesktop || isTouchDevice) {
      return;
    }

    const finePointer = window.matchMedia("(pointer: fine) and (hover: hover)");
    if (!finePointer.matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${mouseX - 180}px, ${mouseY - 180}px, 0)`;
      }

      const target = e.target as HTMLElement | null;
      const isHoverTarget = Boolean(
        target?.closest(
          'a, button, input, textarea, select, [role="button"], [data-cursor="interactive"]'
        )
      );
      setInteractive(isHoverTarget);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${
          interactive ? 1.55 : 1
        })`;
      }
      rafId = window.requestAnimationFrame(animateRing);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    rafId = window.requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion, isDesktop, isTouchDevice, interactive]);

  if (prefersReducedMotion || !isDesktop || isTouchDevice) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9990] hidden md:block"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 180ms ease" }}
    >
      {/* Subtle cursor-following radial glow */}
      <div
        ref={glowRef}
        className="fixed left-0 top-0 h-[360px] w-[360px] rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(30,94,255,0.22) 0%, rgba(34,211,238,0.1) 45%, transparent 72%)",
        }}
      />
      {/* Trailing ring */}
      <div
        ref={ringRef}
        className="fixed left-0 top-0 -ml-4 -mt-4 h-8 w-8 rounded-full border transition-[border-color,background-color] duration-150"
        style={{
          borderColor: interactive
            ? "rgba(34, 211, 238, 0.85)"
            : "rgba(59, 123, 255, 0.55)",
          backgroundColor: interactive
            ? "rgba(34, 211, 238, 0.08)"
            : "transparent",
        }}
      />
      {/* Precision center dot */}
      <div
        ref={dotRef}
        className="fixed left-0 top-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-[#22D3EE]"
      />
    </div>
  );
}
