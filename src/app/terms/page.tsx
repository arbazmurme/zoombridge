import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Service",
  description:
    "Website terms of use and engagement guidelines for ZoomBridge Research (wearezbr.com).",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Terms of Service", path: "/terms" },
        ])}
      />
      <LegalPageLayout
        badge="Legal & Governance"
        title="Terms of Service"
        description="Terms governing use of the ZoomBridge Research website, interactive tools, and inquiry channels."
        breadcrumbLabel="Terms of Service"
        sections={[
          {
            heading: "1. Website & Evaluation Tools",
            paragraphs: [
              "Content on wearezbr.com—including our interactive ABM Scoring Engine simulator and service overviews—is provided for informational and evaluation purposes.",
              "Sample accounts and scores shown in the ABM Scoring Engine demonstrate our scoring methodology and do not represent live client campaigns or guaranteed outcomes.",
            ],
          },
          {
            heading: "2. Custom Engagement Agreements",
            paragraphs: [
              "All ZoomBridge Research demand generation, data enrichment, and contact discovery engagements are governed by mutually executed Master Services Agreements (MSA) and Statements of Work (SOW). Pricing is scoped individually (Contact for Pricing).",
            ],
          },
          {
            heading: "3. Acceptable Use & Security",
            paragraphs: [
              "Automated scraping, rate-limit circumvention, or abusive submissions against our API endpoints or website forms are prohibited.",
            ],
          },
          {
            heading: "4. Intellectual Property",
            paragraphs: [
              "All ZoomBridge Research branding, visual assets, and copy on this website remain the property of ZoomBridge Research.",
            ],
          },
        ]}
      />
    </>
  );
}

