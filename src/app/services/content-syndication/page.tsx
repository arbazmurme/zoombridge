import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/data/services";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";
import { buildPageMetadata } from "@/lib/seo";

const service = getServiceBySlug("content-syndication")!;

export const metadata: Metadata = buildPageMetadata({
  title: service.title,
  description: service.summary,
  path: `/services/${service.slug}`,
});

export default function ContentSyndicationPage() {
  if (!service) notFound();
  return <ServicePageTemplate service={service} />;
}

