import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "500 — Server Error",
  description: "ZoomBridge Research system error recovery page.",
  path: "/500",
  noIndex: true,
});

export default function ServerError500Page() {
  return (
    <section className="flex min-h-[78vh] items-center bg-[#0A1628] px-6 py-32 text-white">
      <div className="zbr-container mx-auto max-w-2xl text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-rose-400/30 bg-rose-500/10 text-rose-400">
          <AlertTriangle className="h-7 w-7" aria-hidden="true" />
        </div>
        <p className="mt-6 font-mono-metric text-sm font-bold tracking-widest text-rose-400">
          500 • SERVER ERROR
        </p>
        <h1 className="type-h2 mt-3 text-white">
          Temporary service interruption.
        </h1>
        <p className="type-body-lg mt-4 text-slate-300">
          Something went wrong on our end. Please return home or reach out to
          sales@wearezbr.com if you need immediate assistance.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#1E5EFF] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#3B7BFF]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-[44px] items-center rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </section>
  );
}

