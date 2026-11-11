import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "How ZoomBridge Research collects, processes, protects, and honours rights over business and website contact information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy-policy" },
        ])}
      />
      <LegalPageLayout
        badge="Legal & Privacy"
        title="Privacy Policy"
        description="ZoomBridge Research is built privacy-first, by default. This notice explains how we handle website inquiries and B2B intelligence data."
        breadcrumbLabel="Privacy Policy"
        sections={[
          {
            heading: "1. Information You Provide Directly",
            paragraphs: [
              "When you submit our Strategy Call or Contact forms, we collect your name, work email address, company name, optional phone number, and project message solely to respond to your inquiry and provide requested sample data or consultations.",
              "We do not load optional analytics or marketing scripts on this website until you explicitly grant consent through our Cookie Preferences controls.",
            ],
          },
          {
            heading: "2. B2B Market Intelligence & Lawful Processing",
            paragraphs: [
              "ZoomBridge Research provides research-led B2B demand generation and contact intelligence. Professional contact records undergo multi-layer validation including triple-verified contact checks, job-title and industry checks, deduplication, and deliverability testing.",
              "We process EU and UK personal data on a lawful basis, honour consent and legitimate-interest requirements, and support data-subject rights including access, correction, and erasure.",
            ],
          },
          {
            heading: "3. Cookies & Analytics Consent",
            paragraphs: [
              "Essential storage is used strictly for security protections and remembering your cookie consent preferences. Optional analytics (GA4/GTM) remain blocked unless you select Accept All or enable Analytics in Manage Preferences.",
            ],
          },
          {
            heading: "4. Contact & Data Rights Requests",
            paragraphs: [
              "You may request access, correction, deletion, or opt-out of personal information processing at any time by contacting sales@wearezbr.com.",
            ],
          },
        ]}
      />
    </>
  );
}

