import React from "react";
import Link from "next/link";
import { InnerHero } from "@/components/layout/InnerHero";
import { SITE_INFO } from "@/data/site";

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export function LegalPageLayout({
  badge,
  title,
  description,
  breadcrumbLabel,
  sections,
}: {
  badge: string;
  title: string;
  description: string;
  breadcrumbLabel: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <InnerHero
        badge={badge}
        title={title}
        description={description}
        breadcrumbs={[{ label: breadcrumbLabel }]}
      />

      <section className="zbr-section bg-white text-[#0F172A]">
        <div className="zbr-container">
          <div className="mx-auto max-w-3xl space-y-10">
            {sections.map((section) => (
              <article
                key={section.heading}
                className="border-b border-slate-200 pb-8 last:border-b-0"
              >
                <h2 className="font-display text-2xl font-semibold text-[#0A1628]">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-3 text-base leading-relaxed text-slate-600">
                  {section.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </article>
            ))}

            <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 text-sm text-slate-600">
              <p>
                Questions or privacy requests can be sent directly to{" "}
                <a
                  href={`mailto:${SITE_INFO.email}`}
                  className="font-semibold text-[#1E5EFF] underline underline-offset-4"
                >
                  {SITE_INFO.email}
                </a>{" "}
                or submitted via our{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-[#1E5EFF] underline underline-offset-4"
                >
                  Contact Form
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

