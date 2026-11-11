import type { Metadata } from "next";
import { NotFoundView } from "@/components/layout/NotFoundView";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "404 — Page Not Found",
  description: "The requested ZoomBridge Research page could not be found.",
  path: "/404",
  noIndex: true,
});

export default function Explicit404Page() {
  return <NotFoundView />;
}

