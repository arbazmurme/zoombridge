import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { InnerHero } from "@/components/layout/InnerHero";
import { AbmScoringInteractive } from "@/components/abm/AbmScoringInteractive";
import { BookCallSection } from "@/components/landing/BookCallSection";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "ABM Scoring Engine — Score Every Account",
  description:
    "Score every account and prioritize every dollar with Fit Scoring, Intent Scoring, Engagement Scoring, and Tier 1 / Tier 2 / Tier 3 classification.",
  path: "/abm-scoring",
});

export default function AbmScoringPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "ABM Scoring", path: "/abm-scoring" },
        ])}
      />

      <InnerHero
        badge="ABM Scoring Engine"
        title="Score every account. Prioritize every dollar."
        description="Combine Fit Scoring, Intent Scoring, and Engagement Scoring into actionable Tier 1, Tier 2, and Tier 3 account prioritization backed by human-verified research."
        breadcrumbs={[{ label: "ABM Scoring" }]}
      >
        <div className="flex flex-wrap items-center gap-4">
          <MagneticButton href="/contact?intent=abm-scores" variant="primary">
            <span>See your sample scores.</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </MagneticButton>
          <MagneticButton href="/book-a-call" variant="secondary">
            <span>Book a Strategy Call</span>
          </MagneticButton>
        </div>
      </InnerHero>

      <AbmScoringInteractive />
      <BookCallSection />
    </>
  );
}

