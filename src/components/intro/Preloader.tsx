"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMotionConfig } from "@/components/providers/MotionProvider";

const PRELOADER_SESSION_KEY = "zbr_preloader_shown_v1";

export function Preloader() {
  const { prefersReducedMotion } = useMotionConfig();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    try {
      const alreadyShown = window.sessionStorage.getItem(PRELOADER_SESSION_KEY);
      if (alreadyShown) {
        return;
      }
      window.sessionStorage.setItem(PRELOADER_SESSION_KEY, "1");
    } catch {
      // Proceed cleanly if sessionStorage is unavailable
    }

    if (prefersReducedMotion) {
      return;
    }

    const startTime = performance.now();
    const maxDuration = 2300; // Hard cap <= 2.5s
    let rafId = 0;

    const tick = (now: number) => {
      setVisible(true);
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.round((elapsed / maxDuration) * 100));
      setProgress(pct);

      if (elapsed >= maxDuration || (document.readyState === "complete" && elapsed >= 1500)) {
        setProgress(100);
        window.setTimeout(() => setVisible(false), 220);
        return;
      }
      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    // Safety hard-fail & skip trigger (> 3s fallback requirement)
    const skipTimer = window.setTimeout(() => setShowSkip(true), 3000);
    const hardStopTimer = window.setTimeout(() => setVisible(false), 3200);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(skipTimer);
      window.clearTimeout(hardStopTimer);
    };
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="zbr-preloader"
          role="status"
          aria-busy="true"
          aria-label="Loading ZoomBridge Research"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#0A1628] px-6 text-white"
        >
          {/* Animated gradient background */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(circle at 30% 25%, rgba(30,94,255,0.28), transparent 50%), radial-gradient(circle at 75% 70%, rgba(34,211,238,0.18), transparent 45%), radial-gradient(circle at 50% 50%, rgba(139,92,246,0.14), transparent 60%)",
            }}
          />

          <div className="relative z-10 flex max-w-md flex-col items-center text-center">
            {/* SVG Path Drawing ZBR Monogram + Scale Reveal */}
            <motion.div
              initial={{ scale: 0.84, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6"
            >
              <svg
                width="76"
                height="76"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient
                    id="preloader-grad"
                    x1="8"
                    y1="8"
                    x2="56"
                    y2="56"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#1E5EFF" />
                    <stop offset="50%" stopColor="#22D3EE" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
                <motion.rect
                  x="4"
                  y="4"
                  width="56"
                  height="56"
                  rx="16"
                  stroke="url(#preloader-grad)"
                  strokeWidth="2"
                  fill="#0F1E38"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.path
                  d="M18 20H42L21 44H45"
                  stroke="url(#preloader-grad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.0, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.circle
                  cx="46"
                  cy="20"
                  r="3.2"
                  fill="#22D3EE"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.35, delay: 0.85 }}
                />
              </svg>
            </motion.div>

            {/* Brand Name & Staggered Tagline Reveal */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.25 }}
              className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-[#22D3EE]"
            >
              ZoomBridge Research
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-3 font-display text-xl font-semibold tracking-tight text-white sm:text-2xl"
            >
              Smarter Revenue Growth for B2B Teams.
            </motion.p>

            {/* Smooth Progress Indicator */}
            <div className="mt-7 w-56">
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#1E5EFF] via-[#22D3EE] to-[#8B5CF6] transition-[width] duration-150 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-2 flex items-center justify-between font-mono-metric text-[11px] text-slate-400">
                <span>Initializing Intelligence</span>
                <span>{progress}%</span>
              </div>
            </div>

            {showSkip ? (
              <button
                type="button"
                onClick={() => setVisible(false)}
                className="mt-6 rounded-lg border border-white/20 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10"
              >
                Skip Intro
              </button>
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
