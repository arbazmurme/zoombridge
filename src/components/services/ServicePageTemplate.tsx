import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Info, Layers } from "lucide-react";
import { SERVICES, ServiceDetail } from "@/data/services";
import { SITE_INFO } from "@/data/site";
import { InnerHero } from "@/components/layout/InnerHero";
import { TiltCard } from "@/components/ui/TiltCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FaqSection } from "@/components/landing/FaqSection";
import { BookCallSection } from "@/components/landing/BookCallSection";
import { JsonLd } from "@/components/ui/JsonLd";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  buildServiceJsonLd,
} from "@/lib/seo";

export function ServicePageTemplate({ service }: { service: ServiceDetail }) {
  const relatedServices = SERVICES.filter((s) =>
    service.relatedSlugs.includes(s.slug)
  );

  return (
    <>
      <JsonLd
        data={buildServiceJsonLd({
          name: service.title,
          description: service.summary,
          path: `/services/${service.slug}`,
        })}
      />
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />
      <JsonLd data={buildFaqJsonLd(service.faqs)} />

      <InnerHero
        badge="ZBR Demand Generation Service"
        title={service.title}
        description={service.tagline}
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      >
        <div className="flex flex-wrap items-center gap-4">
          <MagneticButton href="/book-a-call" variant="primary">
            <span>Book a Strategy Call</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </MagneticButton>
          <MagneticButton
            href={`/contact?intent=${service.slug}`}
            variant="secondary"
          >
            <span>Request Sample Data</span>
          </MagneticButton>
          <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200">
            Pricing: {SITE_INFO.pricingLabel}
          </span>
        </div>
      </InnerHero>

      {/* Overview & Key Benefits */}
      <section className="zbr-section bg-white text-[#0F172A]">
        <div className="zbr-container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#1E5EFF]">
                Service Overview
              </span>
              <h2 className="type-h3 mt-3 text-[#0A1628]">
                Research-led precision from brief to delivery.
              </h2>
              <p className="type-body-lg mt-4 text-slate-600">
                {service.overview}
              </p>

              <ul className="mt-6 space-y-3">
                {service.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2.5 text-sm font-medium text-[#0A1628]">
                    <CheckCircle2
                      className="h-4 w-4 shrink-0 text-[#1E5EFF]"
                      aria-hidden="true"
                    />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7">
              {service.benefits.map((benefit, idx) => (
                <TiltCard
                  key={benefit.title}
                  className={idx === 2 ? "p-6 sm:col-span-2" : "p-6"}
                >
                  <p className="font-mono-metric text-xs font-semibold text-[#1E5EFF]">
                    0{idx + 1} • Key Benefit
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-[#0A1628]">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {benefit.description}
                  </p>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Process */}
      <section className="zbr-section bg-[#0A1628] text-white">
        <div className="zbr-container">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#22D3EE]">
              Execution Workflow
            </span>
            <h2 className="type-h2 mt-3 text-white">
              How we deliver {service.shortTitle}.
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step) => (
              <TiltCard key={step.step} dark className="p-6">
                <span className="font-mono-metric text-sm font-bold text-[#22D3EE]">
                  Step {step.step}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  {step.description}
                </p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases + Placeholder Transparency Notice */}
      <section className="zbr-section bg-white text-[#0F172A]">
        <div className="zbr-container">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#1E5EFF]">
                Enterprise Use Cases
              </span>
              <h2 className="type-h3 mt-3 text-[#0A1628]">
                Where B2B teams apply {service.title}.
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {service.useCases.map((uc) => (
                  <div
                    key={uc.title}
                    className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6"
                  >
                    <h3 className="font-display text-lg font-semibold text-[#0A1628]">
                      {uc.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                      {uc.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0A1628]">
                  <Info className="h-4 w-4 text-[#1E5EFF]" aria-hidden="true" />
                  <span>Content &amp; Benchmark Notice</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {service.placeholderNote}
                </p>
                <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-700">
                  <strong className="text-[#0A1628]">Pricing:</strong>{" "}
                  {SITE_INFO.pricingLabel}. Reach out to receive a tailored
                  program scope for your target segment.
                </div>
              </div>
            </div>
          </div>

          {/* Related Services & Navigation */}
          <div className="mt-16 border-t border-slate-200 pt-12">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-[#1E5EFF]" aria-hidden="true" />
                <h2 className="font-display text-2xl font-semibold text-[#0A1628]">
                  Related Services
                </h2>
              </div>
              <Link
                href="/services"
                className="text-sm font-semibold text-[#1E5EFF] hover:underline"
              >
                Explore all services →
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedServices.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/services/${rel.slug}`}
                  className="group rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 transition hover:border-[#1E5EFF]/40 hover:bg-white hover:shadow-md"
                >
                  <h3 className="font-display text-lg font-semibold text-[#0A1628] group-hover:text-[#1E5EFF]">
                    {rel.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">{rel.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E5EFF]">
                    View Service
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FaqSection
        items={service.faqs}
        heading={`${service.shortTitle} FAQ`}
        subheading="Verified answers regarding scope, quality assurance, and engagement model."
      />
      <BookCallSection />
    </>
  );
}

