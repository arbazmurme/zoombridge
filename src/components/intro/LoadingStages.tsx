"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Layers, BarChart3, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingStagesProps {
  progress: number;
}

export function LoadingStages({ progress }: LoadingStagesProps) {
  // Determine active stage based on progress
  // Stage 1: 0 - 35%
  // Stage 2: 36 - 75%
  // Stage 3: 76 - 100%
  const getStageStatus = (stageIndex: number): "active" | "completed" | "upcoming" => {
    if (stageIndex === 1) {
      return progress >= 36 ? "completed" : "active";
    }
    if (stageIndex === 2) {
      if (progress < 36) return "upcoming";
      return progress >= 76 ? "completed" : "active";
    }
    if (stageIndex === 3) {
      if (progress < 76) return "upcoming";
      return progress >= 100 ? "completed" : "active";
    }
    return "upcoming";
  };

  const stages = [
    {
      index: 1,
      name: "IDENTIFY",
      desc: "Find target accounts and decision-makers",
      icon: Target,
    },
    {
      index: 2,
      name: "ANALYZE",
      desc: "Analyze research and intent signals",
      icon: Layers,
    },
    {
      index: 3,
      name: "DELIVER",
      desc: "Prepare actionable market intelligence",
      icon: BarChart3,
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
        {stages.map((stage) => {
          const status = getStageStatus(stage.index);
          const Icon = stage.icon;

          return (
            <motion.div
              key={stage.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * stage.index }}
              className={cn(
                "relative rounded-xl border p-3 sm:p-3.5 transition-all duration-300 backdrop-blur-sm flex flex-col justify-between",
                status === "active" &&
                  "border-[#00D4FF]/60 bg-[#0E203C]/90 shadow-[0_0_20px_rgba(0,212,255,0.22)] scale-[1.02]",
                status === "completed" &&
                  "border-emerald-500/40 bg-[#0A1A2E]/75 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.12)]",
                status === "upcoming" &&
                  "border-white/8 bg-[#091526]/50 text-slate-500 opacity-60"
              )}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-lg border text-xs",
                      status === "active" &&
                        "border-[#00D4FF]/50 bg-[#00D4FF]/15 text-[#00D4FF] shadow-[0_0_8px_rgba(0,212,255,0.4)] animate-pulse",
                      status === "completed" &&
                        "border-emerald-500/50 bg-emerald-500/15 text-emerald-400",
                      status === "upcoming" &&
                        "border-white/10 bg-white/5 text-slate-500"
                    )}
                  >
                    {status === "completed" ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <Icon className="h-3.5 w-3.5" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-[11px] font-bold tracking-wider",
                      status === "active" && "text-[#00D4FF]",
                      status === "completed" && "text-emerald-400",
                      status === "upcoming" && "text-slate-400"
                    )}
                  >
                    {stage.name}
                  </span>
                </div>

                {status === "active" && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D4FF] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D4FF]" />
                  </span>
                )}
              </div>

              <p
                className={cn(
                  "text-[10px] leading-snug line-clamp-2",
                  status === "active" && "text-slate-200",
                  status === "completed" && "text-slate-300",
                  status === "upcoming" && "text-slate-500"
                )}
              >
                {stage.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
