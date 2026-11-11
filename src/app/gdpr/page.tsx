import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "GDPR Standards",
  description:
    "How ZoomBridge Research aligns with the General Data Protection Regulation (GDPR) for EU and UK personal data.",
  path: "/gdpr",
});

export default function GdprPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "GDPR Standards", path: "/gdpr" },
        ])}
      />
      <LegalPageLayout
        badge="GDPR Alignment"
        title="General Data Protection Regulation (GDPR)"
        description="We process EU and UK personal data on a lawful basis, honour consent and legitimate-interest requirements, and support data-subject rights including access, correction, and erasure."
        breadcrumbLabel="GDPR Standards"
        sections={[
          {
            heading: "1. Lawful Basis for Processing",
            paragraphs: [
              "ZoomBridge Research processes EU and UK professional data strictly under applicable lawful bases, including documented legitimate business interest for B2B outreach or explicit consent where required.",
            ],
          },
          {
            heading: "2. Data-Subject Rights",
            paragraphs: [
              "We support the rights of individuals under GDPR, including the right of access, the right to rectification (correction), the right to erasure ('right to be forgotten'), the right to restrict processing, and the right to object.",
            ],
          },
          {
            heading: "3. Cookie & Telemetry Consent",
            paragraphs: [
              "Website visitors control non-essential cookies before any analytics tags are loaded. You can inspect or revise your consent choice at any time via the Cookie Preferences button in the footer.",
            ],
          },
          {
            heading: "4. Exercising Your GDPR Rights",
            paragraphs: [
              "To submit an access, correction, or erasure request, please email sales@wearezbr.com with 'GDPR Request' in the subject line.",
            ],
          },
        ]}
      />
    </>
  );
}

