import type { Metadata } from "next";
import { ArrowRight, FileCheck2 } from "lucide-react";
import { InnerHero } from "@/components/layout/InnerHero";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BookCallSection } from "@/components/landing/BookCallSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Case Studies",
  description:
    "Verified client case studies from ZoomBridge Research. Request segment-specific sample data for your Ideal Customer Profile.",
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
        badge="Customer Evidence"
        title="Case Studies"
        description="ZoomBridge Research publishes only verified, client-approved customer studies and performance outcomes."
        breadcrumbs={[{ label: "Case Studies" }]}
      />

      <section className="zbr-section bg-white text-[#0F172A]">
        <div className="zbr-container">
          <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-[#F8FAFC] p-10 text-center shadow-sm sm:p-14">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1E5EFF]/10 text-[#1E5EFF]">
              <FileCheck2 className="h-7 w-7" aria-hidden="true" />
            </div>
            <span className="mt-5 inline-block rounded-full border border-slate-300 bg-white px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-slate-600">
              CMS-Ready Empty State
            </span>
            <h2 className="type-h3 mt-4 text-[#0A1628]">
              Verified case studies are pending publication.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              We never fabricate customer logos, testimonials, or campaign ROI
              figures. While approved client studies are being prepared for
              public release, you can evaluate our data quality directly with
              sample records built for your Ideal Customer Profile.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <MagneticButton href="/contact?intent=sample-data" variant="primary">
                <span>Request Sample Data</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </MagneticButton>
              <MagneticButton href="/abm-scoring" variant="ghost">
                <span>Try Interactive ABM Scoring Demo</span>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      <BookCallSection />
    </>
  );
}

