"use client";

import React, { useEffect, useRef } from "react";
import { isLowEndDevice } from "@/lib/preloadHomeAssets";

export function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const isLowDevice = isLowEndDevice();

    let animationId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    let step = 0;
    const lines = isLowDevice ? 2 : 3;
    const xStep = isLowDevice ? 12 : 6;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render sine-wave ribbon layers along the bottom
      const baseY = height * 0.88;

      for (let l = 0; l < lines; l++) {
        ctx.beginPath();
        const amplitude = 28 + l * 12;
        const wavelength = 0.0035 - l * 0.0006;
        const speed = 0.016 + l * 0.005;

        // Gradient from Cyan (#00D4FF) to Purple (#873BFF)
        const gradient = ctx.createLinearGradient(0, baseY - amplitude, width, baseY + amplitude);
        if (l === 0) {
          gradient.addColorStop(0, "rgba(0, 212, 255, 0.28)");
          gradient.addColorStop(0.5, "rgba(30, 94, 255, 0.20)");
          gradient.addColorStop(1, "rgba(135, 59, 255, 0.30)");
        } else if (l === 1) {
          gradient.addColorStop(0, "rgba(135, 59, 255, 0.18)");
          gradient.addColorStop(0.5, "rgba(0, 212, 255, 0.22)");
          gradient.addColorStop(1, "rgba(0, 212, 255, 0.15)");
        } else {
          gradient.addColorStop(0, "rgba(0, 212, 255, 0.12)");
          gradient.addColorStop(0.7, "rgba(135, 59, 255, 0.16)");
          gradient.addColorStop(1, "rgba(30, 94, 255, 0.18)");
        }

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;

        for (let x = 0; x <= width; x += xStep) {
          const y =
            baseY +
            Math.sin(x * wavelength + step * speed) * amplitude +
            Math.cos(x * 0.5 * wavelength + step * speed * 0.7) * (amplitude * 0.4);

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      step++;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-80 will-change-transform"
    />
  );
}
