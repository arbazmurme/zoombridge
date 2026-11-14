import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { ConsentAnalyticsProvider } from "@/components/providers/ConsentAnalyticsProvider";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { Preloader } from "@/components/intro/Preloader";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { JsonLd } from "@/components/ui/JsonLd";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  DEFAULT_KEYWORDS,
  buildOrganizationJsonLd,
} from "@/lib/seo";
import { absoluteUrl, getSiteUrl } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const displayFace = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display-face",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const siteUrl = getSiteUrl();
const ogImage = absoluteUrl("/images/og-image.png");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  applicationName: "ZoomBridge Research",
  authors: [{ name: "ZoomBridge Research", url: siteUrl }],
  creator: "ZoomBridge Research",
  publisher: "ZoomBridge Research",
  category: "B2B Marketing & Sales Intelligence",
  alternates: {
    canonical: siteUrl,
  },
  robots: {
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
  openGraph: {
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    url: siteUrl,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — ${SITE_TAGLINE}`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [ogImage],
    creator: "@wearezbr",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${displayFace.variable} ${jetbrainsMono.variable} min-h-screen antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-white text-[#0F172A]">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <JsonLd data={buildOrganizationJsonLd()} />

        <ConsentAnalyticsProvider>
          <MotionProvider>
            <Preloader />
            <CustomCursor />
            <Header />
            <main id="main-content" className="flex-1">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </MotionProvider>
        </ConsentAnalyticsProvider>
      </body>
    </html>
  );
}

