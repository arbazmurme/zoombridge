"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, FolderOpen } from "lucide-react";
import {
  BLOG_CATEGORIES,
  ContentCategory,
  RESOURCE_ITEMS,
} from "@/data/resources";
import { TiltCard } from "@/components/ui/TiltCard";
import { cn } from "@/lib/utils";

export function ResourcesDirectoryClient() {
  const [selectedCategory, setSelectedCategory] =
    useState<ContentCategory>("All");

  const filtered = useMemo(() => {
    if (selectedCategory === "All") return RESOURCE_ITEMS;
    return RESOURCE_ITEMS.filter((r) => r.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section className="zbr-section bg-white text-[#0F172A]">
      <div className="zbr-container">
        <div
          role="tablist"
          aria-label="Filter resources by category"
          className="flex flex-wrap gap-2.5"
        >
          {BLOG_CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={active}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "min-h-[44px] rounded-full border px-4 py-2 text-xs font-semibold transition",
                  active
                    ? "border-[#1E5EFF] bg-[#1E5EFF] text-white"
                    : "border-slate-200 bg-[#F8FAFC] text-slate-700 hover:border-[#1E5EFF]/40"
                )}
              >
                {category}
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-slate-200 bg-[#F8FAFC] p-12 text-center">
            <FolderOpen className="mx-auto h-8 w-8 text-slate-400" aria-hidden="true" />
            <h2 className="mt-4 font-display text-xl font-semibold text-[#0A1628]">
              No resources in this category yet
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Contact our team if you need tailored compliance or ABM brief
              materials.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-7 md:grid-cols-3">
            {filtered.map((item) => (
              <TiltCard key={item.id} className="flex flex-col p-6">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-[#1E5EFF]/10 px-3 py-1 text-[11px] font-semibold text-[#1E5EFF]">
                    {item.category}
                  </span>
                  <span className="text-[11px] font-medium text-[#1E5EFF]">
                    {item.status}
                  </span>
                </div>
                <p className="mt-4 font-mono-metric text-xs text-slate-500">
                  {item.format}
                </p>
                <h2 className="mt-2 font-display text-xl font-semibold text-[#0A1628]">
                  {item.title}
                </h2>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-600">
                  {item.summary}
                </p>
                <Link
                  href="/contact?intent=resource-request"
                  className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-[#1E5EFF] hover:text-[#0A1628]"
                >
                  <span>Request Brief Directly</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </TiltCard>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
