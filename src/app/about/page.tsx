import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { InnerHero } from "@/components/layout/InnerHero";
import { WhoWeAreSection } from "@/components/landing/WhoWeAreSection";
import { MissionVisionSection } from "@/components/landing/MissionVisionSection";
import { GlobalReachSection } from "@/components/landing/GlobalReachSection";
import { ComplianceSection } from "@/components/landing/ComplianceSection";
import { BookCallSection } from "@/components/landing/BookCallSection";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "About Us",
  description:
    "Learn how ZoomBridge Research combines AI, data intelligence, and human expertise across 120+ countries to power smarter B2B revenue growth.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ])}
      />

      <InnerHero
        badge="About ZoomBridge Research"
        title="Research-led B2B demand generation & market intelligence."
        description="At ZoomBridge Research, we help organizations accelerate revenue growth by combining Artificial Intelligence, data intelligence, and human expertise—identifying high-value accounts, uncovering decision-makers, enriching business data, and delivering targeted demand generation."
        breadcrumbs={[{ label: "About Us" }]}
      >
        <div className="flex flex-wrap gap-4">
          <MagneticButton href="/why-zbr" variant="primary">
            <span>Why ZoomBridge</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </MagneticButton>
          <MagneticButton href="/services" variant="secondary">
            <span>Explore Services</span>
          </MagneticButton>
        </div>
      </InnerHero>

      <WhoWeAreSection />
      <MissionVisionSection />
      <GlobalReachSection />
      <ComplianceSection />
      <BookCallSection />
    </>
  );
}

