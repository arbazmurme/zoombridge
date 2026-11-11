import type { Metadata } from "next";
import { InnerHero } from "@/components/layout/InnerHero";
import { BlogDirectoryClient } from "@/components/resources/BlogDirectoryClient";
import { BookCallSection } from "@/components/landing/BookCallSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Insights & Methodology",
  description:
    "ZoomBridge Research perspectives on B2B demand generation, ABM account scoring, multi-layer data verification, and GDPR/CCPA privacy compliance.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/blog" },
        ])}
      />

      <InnerHero
        badge="Insights & Methodology"
        title="Research-led B2B demand perspectives."
        description="Guides on combining AI-assisted signal detection with human verification, Fit/Intent/Engagement ABM scoring, and privacy-first data execution."
        breadcrumbs={[{ label: "Insights" }]}
      />

      <BlogDirectoryClient />
      <BookCallSection />
    </>
  );
}
