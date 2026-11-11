import type { Metadata } from "next";
import { absoluteUrl, getSiteUrl } from "./utils";

export const SITE_NAME = "ZoomBridge Research";
export const SITE_TAGLINE = "Smarter Revenue Growth for B2B Teams.";
export const SITE_DESCRIPTION =
  "Research-led B2B demand generation & market intelligence. Identify the right accounts, discover buying committees, enrich data, and launch highly targeted campaigns backed by human-verified research.";

export interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const ogTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return {
    title: title === `${SITE_NAME} — ${SITE_TAGLINE}` ? { absolute: title } : title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: ogTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
  };
}

export function buildOrganizationJsonLd() {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: "ZBR",
    url,
    email: "sales@wearezbr.com",
    description: SITE_DESCRIPTION,
    sameAs: ["https://www.linkedin.com/company/zoombridge-research/"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "sales@wearezbr.com",
      availableLanguage: ["English"],
    },
  };
}

export function buildServiceJsonLd(input: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: getSiteUrl(),
    },
    areaServed: "Worldwide",
    serviceType: "B2B Demand Generation & Market Intelligence",
  };
}

export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildFaqJsonLd(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

