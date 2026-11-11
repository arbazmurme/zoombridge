"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, FileText } from "lucide-react";
import {
  BLOG_CATEGORIES,
  BLOG_TEMPLATES,
  ContentCategory,
} from "@/data/resources";
import { TiltCard } from "@/components/ui/TiltCard";
import { cn } from "@/lib/utils";

export function BlogDirectoryClient() {
  const [selectedCategory, setSelectedCategory] =
    useState<ContentCategory>("All");

  const filtered = useMemo(() => {
    if (selectedCategory === "All") return BLOG_TEMPLATES;
    return BLOG_TEMPLATES.filter((a) => a.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section className="zbr-section bg-white text-[#0F172A]">
      <div className="zbr-container">
        {/* Transparent CMS Notice */}
        <div className="mb-10 flex flex-col justify-between gap-4 rounded-2xl border border-amber-200 bg-amber-50/80 p-5 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <FileText
              className="mt-0.5 h-5 w-5 shrink-0 text-amber-700"
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-semibold text-amber-950">
                CMS-Ready Editorial Structure (Placeholder Templates)
              </p>
              <p className="mt-0.5 text-xs text-amber-900">
                No fabricated articles or unverified claims are published. The
                cards below represent structured CMS templates ready for live
                editorial content.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="shrink-0 rounded-lg bg-[#0A1628] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1E5EFF]"
          >
            Request Research Brief
          </Link>
        </div>

        {/* Category Filter */}
        <div
          role="tablist"
          aria-label="Filter articles by category"
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

        {/* Article Grid */}
        {filtered.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-slate-200 bg-[#F8FAFC] p-12 text-center">
            <BookOpen className="mx-auto h-8 w-8 text-slate-400" aria-hidden="true" />
            <h2 className="mt-4 font-display text-xl font-semibold text-[#0A1628]">
              No articles in this category yet
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Select another category or connect your headless CMS to publish
              new insights.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((article) => (
              <TiltCard key={article.slug} className="flex flex-col p-6">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-[#1E5EFF]/10 px-3 py-1 text-[11px] font-semibold text-[#1E5EFF]">
                    {article.category}
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono-metric text-[11px] text-slate-500">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {article.readingTime}
                  </span>
                </div>

                <span className="mt-4 inline-block text-[11px] font-medium uppercase tracking-wider text-amber-700">
                  {article.status}
                </span>

                <h2 className="mt-2 font-display text-xl font-semibold text-[#0A1628]">
                  {article.title}
                </h2>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                  {article.excerpt}
                </p>

                <Link
                  href={`/blog/${article.slug}`}
                  className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-[#1E5EFF] hover:text-[#0A1628]"
                >
                  <span>Inspect Article Layout</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </TiltCard>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

