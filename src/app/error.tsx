"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";

export default function ErrorPage({
  error,
  retry,
  reset,
}: {
  error: unknown;
  retry?: () => void;
  reset?: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const handleRetry = () => {
    if (typeof retry === "function") {
      retry();
    } else if (typeof reset === "function") {
      reset();
    } else {
      window.location.reload();
    }
  };

  return (
    <section className="flex min-h-[78vh] items-center bg-[#0A1628] px-6 py-32 text-white">
      <div className="zbr-container mx-auto max-w-2xl text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-rose-400/30 bg-rose-500/10 text-rose-400">
          <AlertTriangle className="h-7 w-7" aria-hidden="true" />
        </div>
        <p className="mt-6 font-mono-metric text-sm font-bold tracking-widest text-rose-400">
          500 • UNEXPECTED ERROR
        </p>
        <h1 className="type-h2 mt-3 text-white">
          Something interrupted this view.
        </h1>
        <p className="type-body-lg mt-4 text-slate-300">
          We encountered an unexpected application error. You can retry loading
          this segment or return directly to the homepage.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            onClick={handleRetry}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#1E5EFF] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3B7BFF]"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

