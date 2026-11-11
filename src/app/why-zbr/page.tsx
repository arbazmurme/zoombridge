import type { Metadata } from "next";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { InnerHero } from "@/components/layout/InnerHero";
import { WhyZoomBridgeSection } from "@/components/landing/WhyZoomBridgeSection";
import { AdvantageSection } from "@/components/landing/AdvantageSection";
import { ComplianceSection } from "@/components/landing/ComplianceSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { BookCallSection } from "@/components/landing/BookCallSection";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TiltCard } from "@/components/ui/TiltCard";
import { JsonLd } from "@/components/ui/JsonLd";
import { CORE_FAQS } from "@/data/site";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Why ZoomBridge Research (Why ZBR)",
  description:
    "AI finds it. Humans verify it. Discover why enterprise B2B teams choose ZoomBridge Research over traditional static data vendors.",
  path: "/why-zbr",
});

const VALIDATION_STEPS = [
  {
    title: "Triple-Verified Contacts",
    detail: "Every contact record passes multi-source confirmation before release.",
  },
  {
    title: "Job-Title & Industry Checks",
    detail: "Human analysts verify functional relevance and buying-committee seniority.",
  },
  {
    title: "Deduplication",
    detail: "Clean entity resolution eliminates duplicate CRM records and wasted outreach.",
  },
  {
    title: "Deliverability Testing",
    detail: "Pre-delivery verification protects sender domain reputation and campaign reach.",
  },
];

export default function WhyZbrPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Why ZBR", path: "/why-zbr" },
        ])}
      />
      <JsonLd data={buildFaqJsonLd(CORE_FAQS)} />

      <InnerHero
        badge="Why ZoomBridge Research"
        title="AI finds it. Humans verify it."
        description="Static databases decay. Automated exports miss buying-committee context. ZoomBridge Research unifies AI-driven signal detection with human verification to support a 95% accuracy goal."
        breadcrumbs={[{ label: "Why ZBR" }]}
      >
        <div className="flex flex-wrap gap-4">
          <MagneticButton href="/book-a-call" variant="primary">
            <span>Book a Strategy Call</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </MagneticButton>
          <MagneticButton href="/contact?intent=sample-data" variant="secondary">
            <span>Request Sample Data</span>
          </MagneticButton>
        </div>
      </InnerHero>

      <WhyZoomBridgeSection />
      <AdvantageSection />

      {/* Multi-Layer Data Validation Anchor Section */}
      <section id="validation" className="zbr-section bg-white text-[#0F172A]">
        <div className="zbr-container">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1E5EFF]">
              Human Quality Assurance
            </span>
            <h2 className="type-h2 mt-3 text-[#0A1628]">
              Multi-layer data validation built into every engagement.
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALIDATION_STEPS.map((step) => (
              <TiltCard key={step.title} className="p-6">
                <CheckCircle2
                  className="h-6 w-6 text-[#1E5EFF]"
                  aria-hidden="true"
                />
                <h3 className="mt-4 font-display text-lg font-semibold text-[#0A1628]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {step.detail}
                </p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      <ComplianceSection />
      <FaqSection />
      <BookCallSection />
    </>
  );
}

