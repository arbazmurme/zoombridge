"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface MotionContextValue {
  prefersReducedMotion: boolean;
  isDesktop: boolean;
  isTouchDevice: boolean;
  scrollToTop: () => void;
}

const MotionContext = createContext<MotionContextValue>({
  prefersReducedMotion: false,
  isDesktop: true,
  isTouchDevice: false,
  scrollToTop: () => {},
});

export function useMotionConfig() {
  return useContext(MotionContext);
}

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopMq = window.matchMedia("(min-width: 768px)");
    const touchMq = window.matchMedia("(pointer: coarse)");

    const updateFlags = () => {
      setPrefersReducedMotion(motionMq.matches);
      setIsDesktop(desktopMq.matches);
      setIsTouchDevice(
        touchMq.matches || navigator.maxTouchPoints > 0
      );
    };

    updateFlags();
    motionMq.addEventListener("change", updateFlags);
    desktopMq.addEventListener("change", updateFlags);
    touchMq.addEventListener("change", updateFlags);

    return () => {
      motionMq.removeEventListener("change", updateFlags);
      desktopMq.removeEventListener("change", updateFlags);
      touchMq.removeEventListener("change", updateFlags);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    const handleScroll = () => ScrollTrigger.update();
    lenis.on("scroll", handleScroll);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.off("scroll", handleScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  // Refresh ScrollTrigger & reset scroll position on internal route changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.location.hash) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
    const timer = window.setTimeout(() => {
      ScrollTrigger.refresh();
    }, 180);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  const scrollToTop = useCallback(() => {
    if (lenisRef.current && !prefersReducedMotion) {
      lenisRef.current.scrollTo(0, { duration: 1.1 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }
  }, [prefersReducedMotion]);

  return (
    <MotionContext.Provider
      value={{
        prefersReducedMotion,
        isDesktop,
        isTouchDevice,
        scrollToTop,
      }}
    >
      {children}
    </MotionContext.Provider>
  );
}

