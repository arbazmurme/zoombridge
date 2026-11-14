/**
 * Preload critical homepage assets (images, 3D chunks, 3D models)
 * during the 3-second preloader sequence so the landing page renders
 * instantly with zero layout shifts or flash.
 */

const CRITICAL_IMAGES = [
  "/assets/ZBR-logo-final-v1.9.webp",
  "/assets/ZBR-logo-footer.webp",
  "/assets/signal-pipeline.webp",
  "/images/why-zbr/why-zbr-ai-verification.webp",
  "/images/abm-scoring/login-globe.webp",
];

export function isLowEndDevice(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const nav = navigator as Navigator & {
      hardwareConcurrency?: number;
      deviceMemory?: number;
      connection?: { effectiveType?: string; saveData?: boolean };
    };
    const cores = nav.hardwareConcurrency ?? 8;
    const mem = nav.deviceMemory ?? 8;
    const isMobile = window.innerWidth < 768;
    const saveData = Boolean(nav.connection?.saveData);
    const slowNet =
      nav.connection?.effectiveType === "2g" ||
      nav.connection?.effectiveType === "slow-2g";

    return cores <= 4 || mem <= 4 || isMobile || saveData || slowNet;
  } catch {
    return false;
  }
}

let preloadStarted = false;

export function preloadHomeAssets(): void {
  if (typeof window === "undefined" || preloadStarted) return;
  preloadStarted = true;

  try {
    // 1. Preload Critical Images into Browser Image Cache
    CRITICAL_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.decoding = "async";
    });

    // 2. Pre-fetch 3D Sphere GLB Model into HTTP Disk Cache
    if ("fetch" in window) {
      window
        .fetch("/zoombridge_b2b_intelligence_sphere.glb", {
          priority: "low" as RequestPriority,
        })
        .catch(() => {
          // Non-critical fallback
        });
    }

    // 3. Pre-warm / Chunk Preload for the 3D Hero Network Canvas
    import("@/components/three/HeroNetworkCanvas").catch(() => {
      // Lazy chunk prefetch error handled silently
    });
  } catch {
    // Graceful silent fallback
  }
}
