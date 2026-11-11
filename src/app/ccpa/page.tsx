import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "CCPA Rights",
  description:
    "California Consumer Privacy Act (CCPA) rights and privacy disclosures for ZoomBridge Research.",
  path: "/ccpa",
});

export default function CcpaPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "CCPA Rights", path: "/ccpa" },
        ])}
      />
      <LegalPageLayout
        badge="CCPA Alignment"
        title="California Consumer Privacy Act (CCPA)"
        description="We respect California residents' rights to know what data is held, to request deletion, and to opt out of the sale or sharing of personal information."
        breadcrumbLabel="CCPA Rights"
        sections={[
          {
            heading: "1. Right to Know",
            paragraphs: [
              "California residents may request disclosure of the categories and specific pieces of personal information held, the sources of collection, and the business purpose for processing.",
            ],
          },
          {
            heading: "2. Right to Deletion",
            paragraphs: [
              "California residents may request deletion of personal information held by ZoomBridge Research, subject to applicable statutory exceptions.",
            ],
          },
          {
            heading: "3. Right to Opt Out of Sale or Sharing",
            paragraphs: [
              "California residents may submit an opt-out request directing that their personal information not be sold or shared.",
            ],
          },
          {
            heading: "4. Submitting a CCPA Request",
            paragraphs: [
              "To exercise any California privacy right, email sales@wearezbr.com with 'CCPA Privacy Request' in the subject line or reach out through our Contact page.",
            ],
          },
        ]}
      />
    </>
  );
}

