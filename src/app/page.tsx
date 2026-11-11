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
import { BookCallSection } from "@/components/landing/BookCallSection";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
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
      <HeroSection />
      <TrustedBySection />
      <WhoWeAreSection />
      <WhyZoomBridgeSection />
      <MissionVisionSection />
      <ServicesSection />
      <AdvantageSection />
      <GlobalReachSection />
      <ComplianceSection />
      <BookCallSection />
    </>
  );
}
