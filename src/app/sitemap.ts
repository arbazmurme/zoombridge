import type { MetadataRoute } from "next";
import { SERVICES } from "@/data/services";
import { BLOG_TEMPLATES } from "@/data/resources";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.85, changeFrequency: "monthly" as const },
    { path: "/why-zbr", priority: 0.85, changeFrequency: "monthly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/abm-scoring", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/book-a-call", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.85, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/resources", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/case-studies", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/privacy-policy", priority: 0.4, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.4, changeFrequency: "yearly" as const },
    { path: "/gdpr", priority: 0.5, changeFrequency: "yearly" as const },
    { path: "/ccpa", priority: 0.5, changeFrequency: "yearly" as const },
  ];

  const serviceRoutes = SERVICES.map((service) => ({
    url: absoluteUrl(`/services/${service.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const blogRoutes = BLOG_TEMPLATES.map((article) => ({
    url: absoluteUrl(`/blog/${article.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes.map((r) => ({
      url: absoluteUrl(r.path),
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...serviceRoutes,
    ...blogRoutes,
  ];
}

