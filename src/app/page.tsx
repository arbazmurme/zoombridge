import type { Metadata } from "next";
import { HeroSection } from "@/components/landing/HeroSection";
import { TrustedBySection } from "@/components/landing/TrustedBySection";
import { WhoWeAreSection } from "@/components/landing/WhoWeAreSection";
import { WhyZoomBridgeSection } from "@/components/landing/WhyZoomBridgeSection";
import { MissionVisionSection } from "@/components/landing/MissionVisionSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { AdvantageSection } from "@/components/landing/AdvantageSection";
import { GlobalReachSection } from "@/components/landing/GlobalReachSection";
import { ComplianceSection } from "@/components/landing/ComplianceSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { BookCallSection } from "@/components/landing/BookCallSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { CORE_FAQS } from "@/data/site";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  buildFaqJsonLd,
  buildPageMetadata,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: `${SITE_NAME} — ${SITE_TAGLINE}`,
  description: SITE_DESCRIPTION,
  path: "/",
  keywords: [
    "ZoomBridge Research",
    "B2B demand generation",
    "ABM scoring",
    "buying committee discovery",
    "human-verified B2B data",
  ],
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={buildFaqJsonLd(CORE_FAQS)} />
      <HeroSection />
      <TrustedBySection />
      <WhoWeAreSection />
      <WhyZoomBridgeSection />
      <MissionVisionSection />
      <ServicesSection />
      <AdvantageSection />
      <GlobalReachSection />
      <ComplianceSection />
      <FaqSection />
      <BookCallSection />
      <ContactSection />
    </>
  );
}

