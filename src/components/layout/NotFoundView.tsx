import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export function NotFoundView() {
  return (
    <section className="flex min-h-[78vh] items-center bg-[#0A1628] px-6 py-32 text-white">
      <div className="zbr-container mx-auto max-w-2xl text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#22D3EE]/30 bg-[#22D3EE]/10 text-[#22D3EE]">
          <Compass className="h-7 w-7" aria-hidden="true" />
        </div>
        <p className="mt-6 font-mono-metric text-sm font-bold tracking-widest text-[#22D3EE]">
          404 • ROUTE NOT FOUND
        </p>
        <h1 className="type-h2 mt-3 text-white">
          We couldn&apos;t locate that page.
        </h1>
        <p className="type-body-lg mt-4 text-slate-300">
          The page you requested may have been moved or does not exist. Return
          to the ZoomBridge Research homepage or explore our demand generation
          services.
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
            href="/services"
            className="inline-flex min-h-[44px] items-center rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Explore Services
          </Link>
        </div>
      </div>
    </section>
  );
}

