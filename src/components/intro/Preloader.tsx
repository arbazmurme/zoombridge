"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useMotionConfig } from "@/components/providers/MotionProvider";

const PRELOADER_SESSION_KEY = "zbr_preloader_shown_v3";

export function Preloader() {
  const pathname = usePathname() || "/";
  const { prefersReducedMotion } = useMotionConfig();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSkip, setShowSkip] = useState(false);
  const [initialPath] = useState(pathname);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    // Play on any fresh visit / URL paste to "/", and on first visit per session for subpages.
    // Client-side <Link> navigation keeps RootLayout mounted, so this effect never re-triggers on route changes.
    let skipForSubpage = false;
    try {
      if (
        initialPath !== "/" &&
        window.sessionStorage.getItem(PRELOADER_SESSION_KEY) === "1"
      ) {
        skipForSubpage = true;
      }
    } catch {
      skipForSubpage = false;
    }

    if (skipForSubpage) {
      return;
    }

    const startTime = performance.now();
    const minDisplayMs = 1750;
    const maxDuration = 2200;
    let rafId = 0;
    let closeTimer = 0;

    const finish = () => {
      try {
        window.sessionStorage.setItem(PRELOADER_SESSION_KEY, "1");
      } catch {
        // Ignore storage errors
      }
      setVisible(false);
    };

    const tick = (now: number) => {
      setVisible(true);
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / maxDuration);
      const eased = 1 - Math.pow(1 - t, 2.6);
      const pct = Math.min(100, Math.round(eased * 100));
      setProgress(pct);

      if (
        elapsed >= maxDuration ||
        (document.readyState === "complete" && elapsed >= minDisplayMs)
      ) {
        setProgress(100);
        closeTimer = window.setTimeout(finish, 280);
        return;
      }
      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    const skipTimer = window.setTimeout(() => setShowSkip(true), 2400);
    const hardStopTimer = window.setTimeout(finish, 3200);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(closeTimer);
      window.clearTimeout(skipTimer);
      window.clearTimeout(hardStopTimer);
    };
  }, [prefersReducedMotion, initialPath]);

  // Lock page scroll smoothly only while the preloader curtain is active
  useEffect(() => {
    if (!visible) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [visible]);

  const phaseLabel =
    progress < 38
      ? "Mapping Global Accounts"
      : progress < 78
      ? "Human-Verified Intelligence"
      : "Ready";

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="zbr-preloader"
          role="status"
          aria-busy="true"
          aria-label="Loading ZoomBridge Research"
          initial={{ y: 0, opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.78, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#060D1A] px-6 text-white will-change-transform"
        >
          {/* Subtle Architectural Blueprint Grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.11]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(148,163,184,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.22) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage:
                "radial-gradient(ellipse 68% 68% at 50% 50%, #000 32%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 68% 68% at 50% 50%, #000 32%, transparent 100%)",
            }}
          />

          {/* Ambient Radial Depth Glow */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0.45, scale: 0.94 }}
            animate={{ opacity: 0.85, scale: 1.05 }}
            transition={{
              duration: 2.2,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 45%, rgba(30,94,255,0.24), transparent 52%), radial-gradient(circle at 64% 56%, rgba(34,211,238,0.16), transparent 44%), radial-gradient(circle at 36% 58%, rgba(139,92,246,0.14), transparent 46%)",
            }}
          />

          {/* Top Corner Brand Coordinates */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="pointer-events-none absolute inset-x-6 top-6 flex items-center justify-between font-mono-metric text-[10px] uppercase tracking-[0.24em] text-slate-500 sm:inset-x-10"
          >
            <span>WEAREZBR.COM</span>
            <span className="text-[#22D3EE]/80">50M+ RECORDS • 120+ COUNTRIES</span>
          </motion.div>

          {/* Center Classic Composition */}
          <div className="relative z-10 flex w-full max-w-lg flex-col items-center text-center">
            {/* Orbital Precision Halo framing Official ZBR Wordmark */}
            <div className="relative flex h-44 w-full max-w-[340px] items-center justify-center">
              <motion.svg
                aria-hidden="true"
                viewBox="0 0 220 220"
                className="pointer-events-none absolute h-44 w-44"
                animate={{ rotate: 360 }}
                transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
              >
                <defs>
                  <linearGradient
                    id="zbr-classic-ring"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#1E5EFF" stopOpacity="0.85" />
                    <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                <circle
                  cx="110"
                  cy="110"
                  r="102"
                  fill="none"
                  stroke="url(#zbr-classic-ring)"
                  strokeOpacity="0.35"
                  strokeWidth="1"
                  strokeDasharray="5 7"
                />
                <circle cx="110" cy="8" r="2.8" fill="#22D3EE" />
                <circle cx="198" cy="161" r="2.4" fill="#8B5CF6" />
              </motion.svg>

              <motion.svg
                aria-hidden="true"
                viewBox="0 0 220 220"
                className="pointer-events-none absolute h-36 w-36"
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              >
                <circle
                  cx="110"
                  cy="110"
                  r="100"
                  fill="none"
                  stroke="#22D3EE"
                  strokeOpacity="0.28"
                  strokeWidth="1.2"
                  strokeDasharray="110 260"
                  strokeLinecap="round"
                />
              </motion.svg>

              {/* Editorial Curtain Reveal around Official ZBR Logo */}
              <motion.div
                initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0.6 }}
                animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
                transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 flex w-60 items-center justify-center rounded-2xl border border-white/12 bg-[#0A1628]/92 px-6 py-4 shadow-[0_0_54px_rgba(30,94,255,0.28)] backdrop-blur-md sm:w-64"
              >
                <Image
                  src="/assets/ZBR-logo-footer.webp"
                  alt="ZoomBridge Research"
                  width={425}
                  height={56}
                  priority
                  className="h-auto w-full object-contain"
                />
              </motion.div>
            </div>

            {/* Classic Hairline Divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-2 h-px w-32 bg-gradient-to-r from-transparent via-[#22D3EE]/70 to-transparent"
            />

            {/* Masked Line Typography Reveal */}
            <div className="mt-4 overflow-hidden">
              <motion.p
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="font-mono-metric text-[11px] font-semibold uppercase tracking-[0.28em] text-[#22D3EE]"
              >
                AI Identifies • Humans Verify
              </motion.p>
            </div>

            <div className="mt-2 overflow-hidden">
              <motion.p
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.55, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-lg font-medium tracking-tight text-slate-100 sm:text-xl"
              >
                Smarter Revenue Growth for B2B Teams.
              </motion.p>
            </div>

            {/* Precision Progress Rail & Classic Tabular Counter */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="mt-7 w-72"
            >
              <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-white/12">
                <div
                  className="h-full origin-left rounded-full bg-gradient-to-r from-[#1E5EFF] via-[#22D3EE] to-[#8B5CF6]"
                  style={{
                    transform: `scaleX(${Math.max(0.02, progress / 100)})`,
                  }}
                />
              </div>

              <div className="mt-3 flex items-baseline justify-between">
                <span className="font-mono-metric text-[11px] tracking-wide text-slate-400">
                  {phaseLabel}
                </span>
                <span className="font-mono-metric text-lg font-semibold tabular-nums text-white">
                  {String(progress).padStart(2, "0")}
                  <span className="ml-0.5 text-xs text-[#22D3EE]">%</span>
                </span>
              </div>
            </motion.div>

            {showSkip ? (
              <button
                type="button"
                onClick={() => {
                  try {
                    window.sessionStorage.setItem(PRELOADER_SESSION_KEY, "1");
                  } catch {
                    // Ignore
                  }
                  setVisible(false);
                }}
                className="mt-5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-200 transition hover:border-[#22D3EE]/40 hover:bg-white/10"
              >
                Skip Intro
              </button>
            ) : null}
          </div>

          {/* Bottom Luminous Curtain Edge Line */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#22D3EE]/45 to-transparent"
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
