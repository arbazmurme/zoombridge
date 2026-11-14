"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionConfig } from "@/components/providers/MotionProvider";

gsap.registerPlugin(ScrollTrigger);

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { prefersReducedMotion } = useMotionConfig();

  // Crucial: Always reset window scroll position to top on every route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={() => {
          ScrollTrigger.refresh();
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

