"use client";

import React from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number;
  phaseLabel: string;
}

export function ProgressBar({ progress, phaseLabel }: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto space-y-2.5">
      {/* Progress Track and Fill */}
      <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/10 p-[1px] shadow-[0_0_12px_rgba(0,212,255,0.15)]">
        {/* Glow ambient trail */}
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#00D4FF] via-[#1E5EFF] to-[#873BFF] blur-[2px] opacity-75 transition-all duration-150 ease-out"
          style={{ width: `${clampedProgress}%` }}
        />

        {/* Crisp progress bar line */}
        <div
          className="relative h-full rounded-full bg-gradient-to-r from-[#00D4FF] via-[#22D3EE] to-[#873BFF] transition-all duration-150 ease-out"
          style={{ width: `${clampedProgress}%` }}
        >
          {/* Leading-edge glowing dot */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-white shadow-[0_0_8px_#00D4FF]" />
        </div>
      </div>

      {/* Status Label and Percentage Counter */}
      <div className="flex items-center justify-between text-xs">
        <motion.span
          key={phaseLabel}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
          className="font-mono text-[11px] font-medium tracking-wider text-slate-400"
        >
          {phaseLabel}
        </motion.span>

        <span className="font-mono text-sm sm:text-base font-bold tabular-nums text-white">
          {clampedProgress}
          <span className="ml-0.5 text-xs font-semibold text-[#00D4FF]">%</span>
        </span>
      </div>
    </div>
  );
}
