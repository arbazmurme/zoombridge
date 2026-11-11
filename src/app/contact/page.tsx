import React, { Suspense } from "react";
import type { Metadata } from "next";
import { InnerHero } from "@/components/layout/InnerHero";
import { ContactPageClient } from "@/components/contact/ContactPageClient";
import { ContactSection } from "@/components/landing/ContactSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Us",
  description:
    "Client, agency, or exploring a career — connect with ZoomBridge Research at sales@wearezbr.com. We respond within one business day.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <InnerHero
        badge="Direct Inquiries"
        title="Client, agency, or exploring a career — let's connect."
        description="Tell us what you need and we'll get back to you within one business day. Turnaround: < 24h."
        breadcrumbs={[{ label: "Contact" }]}
      />

      <Suspense fallback={<ContactSection />}>
        <ContactPageClient />
      </Suspense>
    </>
  );
}

