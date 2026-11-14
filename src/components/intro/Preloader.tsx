"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useMotionConfig } from "@/components/providers/MotionProvider";
import { AnimatedGlobe } from "@/components/intro/AnimatedGlobe";
import { ProgressBar } from "@/components/intro/ProgressBar";
import { LoadingStages } from "@/components/intro/LoadingStages";
import { ParticleBackground } from "@/components/intro/ParticleBackground";
import { WaveBackground } from "@/components/intro/WaveBackground";
import { preloadHomeAssets } from "@/lib/preloadHomeAssets";

const PRELOADER_SESSION_KEY = "zbr_preloader_shown_v5";

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

    // Play on any fresh visit to "/", and on first visit per session for subpages
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

    // Kick off homepage asset preloading (critical images, 3D model, 3D chunk)
    // so everything is already warm in memory and cache when preloader lifts
    preloadHomeAssets();

    // Exactly 3.0 Seconds Animation Duration
    const animationDurationMs = 3000;
    const startTime = performance.now();
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
      const t = Math.min(1, elapsed / animationDurationMs);

      // Smooth cubic ease out progression for natural pacing
      const eased = 1 - Math.pow(1 - t, 2.6);
      const pct = Math.min(100, Math.round(eased * 100));
      setProgress(pct);

      if (elapsed >= animationDurationMs) {
        setProgress(100);
        closeTimer = window.setTimeout(finish, 260);
        return;
      }
      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    const skipTimer = window.setTimeout(() => setShowSkip(true), 2000);
    const hardStopTimer = window.setTimeout(finish, 3600);

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
      document.body.style.overflow = prevOverflow || "";
    };
  }, [visible]);

  const phaseLabel =
    progress < 36
      ? "Stage 1: Identifying Target Accounts..."
      : progress < 76
      ? "Stage 2: Analyzing Intent Signals & Research..."
      : progress < 100
      ? "Stage 3: Preparing Market Intelligence..."
      : "Enterprise Intelligence Ready • Welcome";

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
            transition: { duration: 0.72, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-between overflow-hidden bg-[#071426] p-4 sm:p-8 text-white will-change-transform select-none"
        >
          {/* 1. Background Layers: Architectural Grid + Depth Radial Glows */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.09]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(0,212,255,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,212,255,0.25) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage:
                "radial-gradient(ellipse 70% 70% at 50% 50%, #000 30%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 70% at 50% 50%, #000 30%, transparent 100%)",
            }}
          />

          {/* Ambient Radial Depth Glows */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 40%, rgba(0,212,255,0.18), transparent 50%), radial-gradient(circle at 65% 55%, rgba(135,59,255,0.16), transparent 45%), radial-gradient(circle at 35% 60%, rgba(30,94,255,0.15), transparent 45%)",
            }}
          />

          {/* Canvas Star Particles & Bottom Flowing Particle Waves */}
          <ParticleBackground />
          <WaveBackground />

          {/* 2. Top Header Bar: Coordinates matching reference */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative z-10 w-full flex items-center justify-between font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-slate-400 max-w-6xl mx-auto"
          >
            <span className="text-slate-300 font-semibold">WEAREZBR.COM</span>
            <span className="text-[#00D4FF] font-semibold drop-shadow-[0_0_8px_rgba(0,212,255,0.4)]">
              50M+ RECORDS • 120+ COUNTRIES
            </span>
          </motion.div>

          {/* 3. Center Cinematic Composition */}
          <div className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center my-auto px-2">
            {/* Interactive 3D Digital Globe + Logo Container */}
            <div className="relative flex flex-col items-center justify-center">
              {/* 3D Three.js Globe rendered above/behind */}
              <div className="relative h-44 w-44 sm:h-52 sm:w-52 -mb-10">
                <AnimatedGlobe size={208} />
              </div>

              {/* Orbital Halo Rings framing Official ZBR Wordmark Badge */}
              <div className="relative flex items-center justify-center">
                {/* Rotating SVG Halo Ring 1 */}
                <motion.svg
                  aria-hidden="true"
                  viewBox="0 0 240 240"
                  className="pointer-events-none absolute h-52 w-52 sm:h-60 sm:w-60"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                >
                  <defs>
                    <linearGradient id="halo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.85" />
                      <stop offset="50%" stopColor="#873BFF" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.85" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="120"
                    cy="120"
                    r="114"
                    fill="none"
                    stroke="url(#halo-gradient)"
                    strokeOpacity="0.4"
                    strokeWidth="1"
                    strokeDasharray="6 8"
                  />
                  <circle cx="120" cy="6" r="3" fill="#00D4FF" />
                  <circle cx="218" cy="170" r="2.5" fill="#873BFF" />
                </motion.svg>

                {/* Rotating SVG Halo Ring 2 (Counter-clockwise) */}
                <motion.svg
                  aria-hidden="true"
                  viewBox="0 0 240 240"
                  className="pointer-events-none absolute h-44 w-44 sm:h-52 sm:w-52"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                >
                  <circle
                    cx="120"
                    cy="120"
                    r="108"
                    fill="none"
                    stroke="#00D4FF"
                    strokeOpacity="0.3"
                    strokeWidth="1.2"
                    strokeDasharray="90 280"
                    strokeLinecap="round"
                  />
                </motion.svg>

                {/* Glassmorphic Logo Card matching screenshot */}
                <motion.div
                  initial={{ scale: 0.92, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10 flex w-56 sm:w-64 items-center justify-center rounded-2xl border border-white/12 bg-[#091526]/95 px-5 py-3.5 shadow-[0_0_50px_rgba(0,212,255,0.25)] backdrop-blur-md"
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
            </div>

            {/* Hairline Divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 h-px w-36 bg-gradient-to-r from-transparent via-[#00D4FF]/70 to-transparent"
            />

            {/* Eyebrow Label */}
            <div className="mt-3 overflow-hidden">
              <motion.p
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.45, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.26em] text-[#00D4FF]"
              >
                AI Identifies • Humans Verify
              </motion.p>
            </div>

            {/* Main Tagline */}
            <div className="mt-1.5 overflow-hidden max-w-lg">
              <motion.p
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-base sm:text-xl font-semibold tracking-tight text-white"
              >
                Smarter Revenue Growth for B2B Teams.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="text-xs text-slate-400 mt-0.5"
              >
                Research-led B2B demand generation &amp; market intelligence.
              </motion.p>
            </div>

            {/* 4. Live Progress Bar Component */}
            <div className="mt-6 w-full">
              <ProgressBar progress={progress} phaseLabel={phaseLabel} />
            </div>

            {/* 5. Three Loading Stages Component */}
            <LoadingStages progress={progress} />

            {/* Skip Intro Button */}
            {showSkip && (
              <motion.button
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                type="button"
                onClick={() => {
                  try {
                    window.sessionStorage.setItem(PRELOADER_SESSION_KEY, "1");
                  } catch {
                    // Ignore
                  }
                  setVisible(false);
                }}
                className="mt-5 rounded-full border border-white/15 bg-white/5 px-4 py-1 text-[11px] font-medium text-slate-300 transition hover:border-[#00D4FF]/40 hover:bg-white/10"
              >
                Skip Intro &rarr;
              </motion.button>
            )}
          </div>

          {/* 6. Bottom Luminous Horizon Line */}
          <div
            aria-hidden="true"
            className="pointer-events-none relative z-10 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00D4FF]/40 to-transparent"
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
