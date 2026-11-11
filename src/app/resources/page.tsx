import type { Metadata } from "next";
import { InnerHero } from "@/components/layout/InnerHero";
import { ResourcesDirectoryClient } from "@/components/resources/ResourcesDirectoryClient";
import { BookCallSection } from "@/components/landing/BookCallSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Resources & Playbooks",
  description:
    "CMS-ready B2B demand generation playbooks, data validation specifications, and privacy compliance briefs from ZoomBridge Research.",
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
        description="Structured CMS-ready slots for downloadable playbooks, technical specifications, and governance documentation."
        breadcrumbs={[{ label: "Resources" }]}
      />

      <ResourcesDirectoryClient />
      <BookCallSection />
    </>
  );
}

