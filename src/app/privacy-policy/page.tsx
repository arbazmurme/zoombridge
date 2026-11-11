import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "ZoomBridge Research Privacy Notice explaining how we collect, use, store, protect, and honour individual rights over personal and business data.",
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
        badge="Privacy Policy • Last updated: 6th Oct 2026"
        title="Privacy Policy"
        description="This notice explains everything you need to know about the way ZoomBridge Research collects, uses, stores, and shares personal data, what your legal rights are, and how to exercise them."
        breadcrumbLabel="Privacy Policy"
        sections={[
          {
            heading: "1. Introduction & Data Controller",
            paragraphs: [
              "ZoomBridge Research takes its responsibility for protecting your data very seriously and conducts all data-protection and research practices transparently.",
              "The Data Controller is ZoomBridge Research (wearezbr.com). For opt-out, privacy inquiries, or rights requests, contact info@wearezbr.com or sales@wearezbr.com.",
            ],
          },
          {
            heading: "2. What Kinds of Personal Data We Process",
            paragraphs: [
              "Depending on your relationship with ZoomBridge Research (Customer / Client, Professional Contact, Supplier / Trader, or Partner), we may process business contact details such as Name, business address, work telephone number, work email address, and job title, as well as relevant financial details for active suppliers or commercial partners.",
              "When you submit our Strategy Call or Contact forms, we collect only the details you provide to respond to your inquiry and prepare requested sample data or consultations.",
            ],
          },
          {
            heading: "3. Lawful Basis: Contractual & Legitimate Interests",
            paragraphs: [
              "We process personal data to fulfil contractual obligations, satisfy statutory, financial, and regulatory compliance requirements, carry out business due diligence, and prevent fraud.",
              "Under legitimate business interests, ZoomBridge Research processes professional B2B contact intelligence to deliver requested goods and services, conduct structured B2B market research, inform opted-in contacts about relevant services, and continuously improve research quality.",
            ],
          },
          {
            heading: "4. Where Data Comes From & International Safeguards",
            paragraphs: [
              "We obtain personal data directly from you (such as form submissions or direct conversations) as well as from publicly accessible professional sources validated through multi-layer quality checks.",
              "Where personal data is transferred internationally across regions not subject to an adequacy decision, ZoomBridge Research ensures appropriate contractual safeguards and data-protection standards are in place.",
            ],
          },
          {
            heading: "5. Cookies, Retention & Your Legal Rights",
            paragraphs: [
              "We retain personal data only as long as necessary to satisfy regulatory, legal, contractual, and research purposes, or until you request erasure where no overriding statutory obligation requires retention.",
              "Optional analytics or marketing cookies remain blocked until you explicitly consent via our Cookie Preferences banner. Under applicable data-protection laws, you hold the Right of Access, Right to Rectification, Right to Erasure, Right to Object, and Right to Complain to your local supervisory authority. Write to info@wearezbr.com at any time to exercise these rights.",
            ],
          },
        ]}
      />
    </>
  );
}
