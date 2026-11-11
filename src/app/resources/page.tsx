import type { Metadata } from "next";
import { InnerHero } from "@/components/layout/InnerHero";
import { ResourcesDirectoryClient } from "@/components/resources/ResourcesDirectoryClient";
import { BookCallSection } from "@/components/landing/BookCallSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Resources & Playbooks",
  description:
    "B2B demand generation playbooks, data validation specifications, and GDPR/CCPA governance briefs from ZoomBridge Research.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
        ])}
      />

      <InnerHero
        badge="Resources Hub"
        title="Guides, briefs, and demand intelligence frameworks."
        description="Playbooks, multi-layer validation specifications, and privacy governance documentation prepared by the ZoomBridge Research team."
        breadcrumbs={[{ label: "Resources" }]}
      />

      <ResourcesDirectoryClient />
      <BookCallSection />
    </>
  );
}
