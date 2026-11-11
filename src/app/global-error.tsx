"use client";

import React from "react";
import Link from "next/link";

export default function GlobalError({
  retry,
  reset,
}: {
  error: unknown;
  retry?: () => void;
  reset?: () => void;
}) {
  const handleRetry = () => {
    if (typeof retry === "function") retry();
    else if (typeof reset === "function") reset();
  };

  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-[#0A1628] px-6 text-white">
        <div className="max-w-lg text-center">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#22D3EE]">
            500 • System Recovery
          </p>
          <h1 className="mt-3 text-3xl font-bold">
            ZoomBridge Research encountered an unexpected error.
          </h1>
          <p className="mt-4 text-sm text-slate-300">
            Please retry or return to the homepage. If the issue persists, reach
            us at sales@wearezbr.com.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={handleRetry}
              className="rounded-xl bg-[#1E5EFF] px-6 py-3 text-sm font-semibold text-white"
            >
              Retry
            </button>
            <Link
              href="/"
              className="rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white"
            >
              Return Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
