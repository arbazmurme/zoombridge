export function cn(...classes: Array<string | undefined | null | false>): string {
  return classes.filter(Boolean).join(" ");
}

export function getSiteUrl(): string {
  // If explicitly configured in production with a custom verified domain
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (
    explicit &&
    !explicit.includes("localhost") &&
    !explicit.includes("wearezbr.com")
  ) {
    const withProto = explicit.startsWith("http") ? explicit : `https://${explicit}`;
    return withProto.replace(/\/+$/, "");
  }

  // Vercel auto-injected deployment URLs (e.g. zoombridge.vercel.app or production alias)
  const vercelProjectProd = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProjectProd) {
    const withProto = vercelProjectProd.startsWith("http")
      ? vercelProjectProd
      : `https://${vercelProjectProd}`;
    return withProto.replace(/\/+$/, "");
  }

  const vercelUrl =
    process.env.NEXT_PUBLIC_VERCEL_URL?.trim() ||
    process.env.VERCEL_URL?.trim();
  if (vercelUrl) {
    const withProto = vercelUrl.startsWith("http")
      ? vercelUrl
      : `https://${vercelUrl}`;
    return withProto.replace(/\/+$/, "");
  }

  // Active production Vercel deployment where the site is currently live
  return "https://zoombridge.vercel.app";
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
