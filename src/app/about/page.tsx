import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, Layers3, Sparkles } from "lucide-react";
import { InnerHero } from "@/components/layout/InnerHero";
import { WhoWeAreSection } from "@/components/landing/WhoWeAreSection";
import { MissionVisionSection } from "@/components/landing/MissionVisionSection";
import { GlobalReachSection } from "@/components/landing/GlobalReachSection";
import { ComplianceSection } from "@/components/landing/ComplianceSection";
import { BookCallSection } from "@/components/landing/BookCallSection";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TiltCard } from "@/components/ui/TiltCard";
import { JsonLd } from "@/components/ui/JsonLd";
import {
  ABOUT_CORE_VALUES,
  ABOUT_DIFFERENCE,
  ABOUT_STORY,
  SUPPORTED_INDUSTRIES,
} from "@/data/site";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About Us",
  description:
    "Powering smarter B2B growth through AI, data & human intelligence across 120+ countries with 15+ years of industry experience.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ])}
      />

      <InnerHero
        badge="About ZoomBridge Research"
        title="Powering smarter B2B growth through AI, data & human intelligence."
        description="At ZoomBridge Research, we help businesses identify, engage, and convert the right prospects through AI-powered research, verified data, and human expertise across 120+ countries."
        breadcrumbs={[{ label: "About Us" }]}
      >
        <div className="flex flex-wrap gap-4">
          <MagneticButton href="/why-zbr" variant="primary">
            <span>Why ZoomBridge</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </MagneticButton>
          <MagneticButton href="/services" variant="secondary">
            <span>Explore Services</span>
          </MagneticButton>
        </div>
      </InnerHero>

      <WhoWeAreSection />

      {/* Our Story & What Makes Us Different (from wearezbr.com/about) */}
      <section className="zbr-section bg-white text-[#0F172A]">
        <div className="zbr-container">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1E5EFF]/20 bg-[#1E5EFF]/8 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#1E5EFF]">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                {ABOUT_STORY.badge}
              </span>
              <h2 className="type-h2 mt-4 text-[#0A1628]">
                {ABOUT_STORY.heading}
              </h2>
              <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-600">
                {ABOUT_STORY.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <blockquote className="mt-6 rounded-2xl border-l-4 border-[#1E5EFF] bg-[#F8FAFC] p-5 font-display text-base font-medium italic text-[#0A1628]">
                &ldquo;{ABOUT_STORY.missionQuote}&rdquo;
              </blockquote>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-6">
              {ABOUT_DIFFERENCE.map((item) => (
                <TiltCard key={item.title} className="p-6">
                  <CheckCircle2
                    className="h-5 w-5 text-[#1E5EFF]"
                    aria-hidden="true"
                  />
                  <h3 className="mt-4 font-display text-lg font-semibold text-[#0A1628]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      <MissionVisionSection />

      {/* Our Core Values */}
      <section className="zbr-section bg-white text-[#0F172A]">
        <div className="zbr-container">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#1E5EFF]">
              Our Core Values
            </span>
            <h2 className="type-h2 mt-3 text-[#0A1628]">
              What guides every project we take on.
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ABOUT_CORE_VALUES.map((value) => (
              <TiltCard key={value.title} className="p-7">
                <p className="font-mono-metric text-xs font-semibold uppercase tracking-wider text-[#1E5EFF]">
                  {value.title}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-[#0A1628]">
                  {value.tagline}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {value.description}
                </p>
              </TiltCard>
            ))}
          </div>

          {/* Industries We Support */}
          <div className="mt-16 rounded-3xl border border-slate-200 bg-[#F8FAFC] p-8 sm:p-10">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1E5EFF]">
                  <Layers3 className="h-4 w-4" aria-hidden="true" />
                  Industries We Support
                </span>
                <h3 className="type-h3 mt-2 text-[#0A1628]">
                  Research depth across the sectors that matter most.
                </h3>
              </div>
              <MagneticButton href="/contact?intent=sample-data" variant="ghost">
                <span>Request Segment Sample</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </MagneticButton>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {SUPPORTED_INDUSTRIES.map((industry) => (
                <div
                  key={industry.name}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-[#0A1628]"
                >
                  {industry.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <GlobalReachSection />
      <ComplianceSection />
      <BookCallSection />
    </>
  );
}
