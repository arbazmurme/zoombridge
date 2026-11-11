import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SERVICES } from "@/data/services";
import { SITE_INFO } from "@/data/site";
import { InnerHero } from "@/components/layout/InnerHero";
import { TiltCard } from "@/components/ui/TiltCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BookCallSection } from "@/components/landing/BookCallSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "B2B Demand Generation Services",
  description:
    "Explore ZoomBridge Research's human-verified B2B demand generation services: Email Marketing, ABM, Content Syndication, Contact Discovery, Lead Generation, and Data Enrichment.",
  path: "/services",
});

export default function ServicesOverviewPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />

      <InnerHero
        badge="Services Overview"
        title="Demand generation services, human-verified."
        description="Every service combines AI-powered account intelligence with human researcher validation—connecting enterprise teams directly to verified decision-makers."
        breadcrumbs={[{ label: "Services" }]}
      >
        <div className="flex flex-wrap items-center gap-4">
          <MagneticButton href="/book-a-call" variant="primary">
            <span>Book a Strategy Call</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </MagneticButton>
          <MagneticButton href="/abm-scoring" variant="secondary">
            <span>Explore ABM Scoring Engine</span>
          </MagneticButton>
          <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200">
            {SITE_INFO.pricingLabel}
          </span>
        </div>
      </InnerHero>

      <section className="zbr-section bg-white text-[#0F172A]">
        <div className="zbr-container grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, idx) => (
            <TiltCard key={service.slug} className="flex flex-col p-7">
              <div className="flex items-center justify-between">
                <span className="font-mono-metric text-xs font-semibold text-[#1E5EFF]">
                  0{idx + 1}
                </span>
                <span className="rounded-full border border-slate-200 bg-[#F8FAFC] px-3 py-1 text-[11px] font-medium text-slate-600">
                  {SITE_INFO.pricingLabel}
                </span>
              </div>

              <h2 className="mt-4 font-display text-2xl font-semibold text-[#0A1628]">
                {service.title}
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                {service.summary}
              </p>

              <ul className="mt-5 flex-1 space-y-2 border-t border-slate-100 pt-4">
                {service.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs font-medium text-slate-700"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1E5EFF]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/services/${service.slug}`}
                className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-[#1E5EFF] hover:text-[#0A1628]"
              >
                <span>Explore {service.shortTitle}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </TiltCard>
          ))}
        </div>
      </section>

      <BookCallSection />
    </>
  );
}

