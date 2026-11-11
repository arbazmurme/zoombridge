import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, Compass, ShieldCheck } from "lucide-react";
import { InnerHero } from "@/components/layout/InnerHero";
import { WhyZoomBridgeSection } from "@/components/landing/WhyZoomBridgeSection";
import { AdvantageSection } from "@/components/landing/AdvantageSection";
import { ComplianceSection } from "@/components/landing/ComplianceSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { BookCallSection } from "@/components/landing/BookCallSection";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TiltCard } from "@/components/ui/TiltCard";
import { JsonLd } from "@/components/ui/JsonLd";
import { CORE_FAQS, WHY_ZBR_CONTENT } from "@/data/site";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Why ZoomBridge Research (Why ZBR)",
  description:
    "Turning intelligence into opportunity. Discover why enterprise B2B teams choose ZoomBridge Research over traditional static data vendors.",
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
        badge="Why ZBR"
        title="Turning intelligence into opportunity."
        description="In today's competitive B2B landscape, growth isn't driven by access to more data — it's driven by access to the right intelligence. We combine strategic thinking, AI-powered research, and human expertise."
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

      {/* The ZBR Difference & Four-Step Approach (from wearezbr.com/why-zbr) */}
      <section className="zbr-section bg-white text-[#0F172A]">
        <div className="zbr-container">
          <blockquote className="mb-14 rounded-3xl border border-[#1E5EFF]/20 bg-[#0A1628] p-8 text-white sm:p-10">
            <p className="font-mono-metric text-xs font-semibold uppercase tracking-wider text-[#22D3EE]">
              The ZBR Philosophy
            </p>
            <p className="mt-3 font-display text-xl font-medium leading-relaxed sm:text-2xl">
              &ldquo;{WHY_ZBR_CONTENT.quote}&rdquo;
            </p>
          </blockquote>

          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1E5EFF]">
              The ZBR Difference
            </span>
            <h2 className="type-h2 mt-3 text-[#0A1628]">
              What sets our approach apart.
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {WHY_ZBR_CONTENT.difference.map((item) => (
              <TiltCard key={item.title} className="p-7">
                <ShieldCheck
                  className="h-5 w-5 text-[#1E5EFF]"
                  aria-hidden="true"
                />
                <h3 className="mt-4 font-display text-lg font-semibold text-[#0A1628]">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </TiltCard>
            ))}
          </div>

          {/* Four Steps, Every Engagement */}
          <div className="mt-16 border-t border-slate-200 pt-14">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#1E5EFF]">
                Our Approach
              </span>
              <h2 className="type-h2 mt-3 text-[#0A1628]">
                Four steps, every engagement.
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {WHY_ZBR_CONTENT.approach.map((step) => (
                <div
                  key={step.step}
                  className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6"
                >
                  <span className="font-mono-metric text-xs font-bold text-[#1E5EFF]">
                    STEP {step.step}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-semibold text-[#0A1628]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AdvantageSection />

      {/* Guiding Principles & Multi-Layer Data Validation */}
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

          {/* Guiding Principles + The ZBR Promise */}
          <div className="mt-16 grid grid-cols-1 gap-8 border-t border-slate-200 pt-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1E5EFF]">
                <Compass className="h-4 w-4" aria-hidden="true" />
                Guiding Principles
              </span>
              <h2 className="type-h3 mt-3 text-[#0A1628]">
                The principles behind every engagement.
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {WHY_ZBR_CONTENT.principles.map((p) => (
                  <div
                    key={p.title}
                    className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5"
                  >
                    <h3 className="font-display text-base font-semibold text-[#0A1628]">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                      {p.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="flex h-full flex-col justify-between rounded-3xl border border-[#1E5EFF]/20 bg-[#0A1628] p-8 text-white">
                <div>
                  <span className="font-mono-metric text-xs font-semibold uppercase tracking-wider text-[#22D3EE]">
                    The ZBR Promise
                  </span>
                  <h3 className="type-h3 mt-3 text-white">
                    More than research. Clarity and strategic insight.
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-slate-300">
                    {WHY_ZBR_CONTENT.promise}
                  </p>
                </div>
                <div className="mt-8">
                  <MagneticButton href="/book-a-call" variant="primary">
                    <span>Book a Strategy Call</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ComplianceSection />
      <FaqSection />
      <BookCallSection />
    </>
  );
}
