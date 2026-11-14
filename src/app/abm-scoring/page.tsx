import type { Metadata } from "next";
import { AbmScoringClient } from "@/components/abm/AbmScoringClient";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "ABM Scoring Engine — Enterprise Admin Portal",
  description:
    "Predictive target account scoring platform with Fit, Intent, and Engagement scoring for enterprise revenue teams. Administrator access only.",
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
      <AbmScoringClient />
    </>
  );
}

