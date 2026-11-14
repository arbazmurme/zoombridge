import type { Metadata } from "next";
import { absoluteUrl, getSiteUrl } from "./utils";

export const SITE_NAME = "ZoomBridge Research";
export const SITE_TAGLINE = "Smarter Revenue Growth for B2B Teams.";
export const SITE_DESCRIPTION =
  "Research-led B2B demand generation & market intelligence. Identify the right accounts, discover buying committees, enrich data, and launch highly targeted campaigns backed by human-verified research.";

export const DEFAULT_KEYWORDS = [
  "ZoomBridge Research",
  "ZBR",
  "wearezbr",
  "wearezbr.com",
  "B2B Demand Generation",
  "Account Based Marketing",
  "ABM Scoring",
  "B2B Contact Discovery",
  "Data Enrichment Services",
  "Content Syndication B2B",
  "Lead Generation Services",
  "Market Intelligence Platform",
  "B2B Buyer Intent Data",
  "Buying Committee Discovery",
  "Enterprise Sales Pipeline",
  "Verified Decision Makers",
  "Cold Email Outreach",
  "B2B Growth Strategy",
  "RevOps Intelligence",
  "GDPR CCPA Compliant B2B Data",
  "Intent Data Scoring",
  "Target Account List",
  "B2B Sales Development",
];

export interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noIndex?: boolean;
  ogImage?: string;
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords,
  noIndex = false,
  ogImage = "/images/og-image.png",
}: PageMetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const ogTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const ogImageUrl = absoluteUrl(ogImage);

  const mergedKeywords = Array.from(
    new Set([...(keywords || []), ...DEFAULT_KEYWORDS])
  );

  return {
    title: title === `${SITE_NAME} — ${SITE_TAGLINE}` ? { absolute: title } : title,
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      title: ogTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — ${SITE_TAGLINE}`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [ogImageUrl],
      creator: "@wearezbr",
    },
    icons: {
      icon: [
        { url: "/assets/favicon.png", sizes: "32x32", type: "image/png" },
        { url: "/assets/favicon.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [
        { url: "/assets/favicon.png", sizes: "180x180", type: "image/png" },
      ],
      shortcut: "/assets/favicon.png",
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
    logo: absoluteUrl("/assets/ZBR-logo-final-v1.9.webp"),
    image: absoluteUrl("/images/og-image.png"),
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
