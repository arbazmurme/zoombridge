import type { Metadata } from "next";
import { ArrowRight, FileCheck2 } from "lucide-react";
import { InnerHero } from "@/components/layout/InnerHero";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BookCallSection } from "@/components/landing/BookCallSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Case Studies & Sample Evaluation",
  description:
    "Evaluate ZoomBridge Research data accuracy directly with sample records tailored to your Ideal Customer Profile.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
        ])}
      />

      <InnerHero
        badge="Proof & Evaluation"
        title="Verify Quality First-Hand"
        description="ZoomBridge Research publishes only client-approved outcomes. Evaluate our contact verification and buying-committee precision directly on your target segment."
        breadcrumbs={[{ label: "Case Studies" }]}
      />

      <section className="zbr-section bg-white text-[#0F172A]">
        <div className="zbr-container">
          <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-[#F8FAFC] p-10 text-center shadow-sm sm:p-14">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1E5EFF]/10 text-[#1E5EFF]">
              <FileCheck2 className="h-7 w-7" aria-hidden="true" />
            </div>
            <span className="mt-5 inline-block rounded-full border border-[#1E5EFF]/20 bg-[#1E5EFF]/8 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#1E5EFF]">
              Zero Fabricated Claims
            </span>
            <h2 className="type-h3 mt-4 text-[#0A1628]">
              Judge our data quality with a custom ICP sample.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              We never invent client logos, testimonials, or unverified ROI
              numbers. Instead, tell us your target industries, geographies, and
              decision-maker roles — and our team will prepare sample records
              for direct inspection before any engagement.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <MagneticButton href="/contact?intent=sample-data" variant="primary">
                <span>Request Sample Data</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </MagneticButton>
              <MagneticButton href="/abm-scoring" variant="ghost">
                <span>Explore ABM Scoring Engine</span>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      <BookCallSection />
    </>
  );
}
