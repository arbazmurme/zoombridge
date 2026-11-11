import type { Metadata } from "next";
import { InnerHero } from "@/components/layout/InnerHero";
import { BlogDirectoryClient } from "@/components/resources/BlogDirectoryClient";
import { BookCallSection } from "@/components/landing/BookCallSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog & Insights",
  description:
    "CMS-ready editorial hub for B2B demand generation, ABM scoring, data verification, and privacy-first compliance.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />

      <InnerHero
        badge="Insights & Editorial"
        title="Research-led B2B demand perspectives."
        description="CMS-ready article architecture featuring category filtering, reading-time metadata, social sharing, and structured SEO layouts."
        breadcrumbs={[{ label: "Blog" }]}
      />

      <BlogDirectoryClient />
      <BookCallSection />
    </>
  );
}

