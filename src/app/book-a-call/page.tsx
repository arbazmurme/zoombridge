import type { Metadata } from "next";
import { InnerHero } from "@/components/layout/InnerHero";
import { BookCallSection } from "@/components/landing/BookCallSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Book a Strategy Call",
  description:
    "Tell us your targets and schedule a no-obligation strategy call with ZoomBridge Research. Sample data for your Ideal Customer Profile available on request.",
  path: "/book-a-call",
});

export default function BookACallPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Book a Strategy Call", path: "/book-a-call" },
        ])}
      />

      <InnerHero
        badge="Strategy Consultation"
        title="Book a strategy call."
        description="Tell us your targets and we'll set up a no-obligation strategy call. We can also share sample data for your ideal customer profile, so you can judge the quality first-hand."
        breadcrumbs={[{ label: "Book a Strategy Call" }]}
      />

      <BookCallSection />
      <FaqSection />
    </>
  );
}

