import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { InnerHero } from "@/components/layout/InnerHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Service",
  description:
    "Terms of Service governing the use of ZoomBridge Research (ZBR) website, services, and B2B research engagements.",
  path: "/terms",
  keywords: [
    "Terms of Service",
    "ZBR Terms",
    "ZoomBridge Research Legal",
    "B2B Demand Generation Terms",
    "wearezbr terms",
  ],
});

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Terms of Service", path: "/terms" },
        ])}
      />

      <InnerHero
        badge="Legal • Last updated: 14th November 2026"
        title="Terms of Service"
        description="Please read these terms carefully before accessing our website or engaging ZoomBridge Research for B2B demand generation and market intelligence services."
        breadcrumbs={[{ label: "Terms of Service" }]}
      />

      <section id="terms-content" className="zbr-section bg-white text-[#0F172A] py-12 sm:py-16">
        <div className="zbr-container max-w-4xl mx-auto px-4 sm:px-6">

          {/* Back to Home Link as requested */}
          <div className="mb-8 flex items-center justify-between pb-6 border-b border-slate-200">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to home</span>
            </Link>
            <span className="text-xs text-slate-500 font-mono">Last updated: 14th November 2026</span>
          </div>

          <div className="space-y-10 text-slate-700 leading-relaxed text-sm sm:text-base">

            {/* Template Notice / Scope */}
            <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-5 sm:p-6 text-xs sm:text-sm text-blue-950 flex items-start gap-3">
              <Shield className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-blue-900 mb-1">Notice of Agreement</p>
                <p className="leading-relaxed text-blue-800">
                  By accessing this website or engaging ZoomBridge Research (&ldquo;ZBR&rdquo;) for services, you agree to these Terms. If you do not agree, do not use the site or our services.
                </p>
              </div>
            </div>

            {/* 1. Acceptance of terms */}
            <article className="border-b border-slate-200 pb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600 font-mono text-lg">1.</span>
                <span>Acceptance of terms</span>
              </h2>
              <p className="text-slate-600 leading-relaxed">
                By accessing this website (<a href="https://www.wearezbr.com" className="text-blue-600 underline font-medium">wearezbr.com</a>) or engaging ZoomBridge Research (&ldquo;ZBR&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) for services, you agree to these Terms. If you do not agree, do not use the site or our services.
              </p>
            </article>

            {/* 2. Our services */}
            <article className="border-b border-slate-200 pb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600 font-mono text-lg">2.</span>
                <span>Our services</span>
              </h2>
              <p className="text-slate-600 leading-relaxed">
                ZBR provides B2B demand-generation, account-based marketing, and market-research services as described on this site and in any separate written agreement. Specific deliverables, fees, and timelines are governed by that agreement, which prevails if it conflicts with these Terms.
              </p>
            </article>

            {/* 3. Use of the website */}
            <article className="border-b border-slate-200 pb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600 font-mono text-lg">3.</span>
                <span>Use of the website</span>
              </h2>
              <p className="text-slate-600 leading-relaxed">
                You agree not to misuse the site, attempt unauthorised access, scrape data at scale without consent, or use it for unlawful purposes. We may suspend or terminate access for conduct that harms the site, our systems, or other users.
              </p>
            </article>

            {/* 4. Intellectual property */}
            <article className="border-b border-slate-200 pb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600 font-mono text-lg">4.</span>
                <span>Intellectual property</span>
              </h2>
              <p className="text-slate-600 leading-relaxed">
                The site, its content, research methodologies, and the ZBR brand are owned by ZoomBridge Research or its licensors and may not be copied, modified, or reused without prior written permission, except as explicitly allowed by law.
              </p>
            </article>

            {/* 5. No guarantee of results */}
            <article className="border-b border-slate-200 pb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600 font-mono text-lg">5.</span>
                <span>No guarantee of results</span>
              </h2>
              <p className="text-slate-600 leading-relaxed">
                While we work with rigorous data verification protocols to deliver highly qualified outcomes, we do not guarantee specific commercial results such as a fixed number of closed deals, specific revenue conversions, or market performance, unless expressly stated in a mutually executed, signed Master Services Agreement.
              </p>
            </article>

            {/* 6. Disclaimers & limitation of liability */}
            <article className="border-b border-slate-200 pb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600 font-mono text-lg">6.</span>
                <span>Disclaimers &amp; limitation of liability</span>
              </h2>
              <p className="text-slate-600 leading-relaxed">
                The site is provided &ldquo;as is&rdquo; without warranties of any kind to the extent permitted by law. To the maximum extent permitted under applicable law, ZoomBridge Research is not liable for indirect, incidental, special, or consequential losses or lost profits arising from the use of or inability to use the site or our informational tools.
              </p>
            </article>

            {/* 7. Third-party links */}
            <article className="border-b border-slate-200 pb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600 font-mono text-lg">7.</span>
                <span>Third-party links</span>
              </h2>
              <p className="text-slate-600 leading-relaxed">
                The site may link to third-party sites or external tools that we do not control and are not responsible for. Inclusion of any link does not imply endorsement by ZoomBridge Research.
              </p>
            </article>

            {/* 8. Governing law */}
            <article className="border-b border-slate-200 pb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600 font-mono text-lg">8.</span>
                <span>Governing law</span>
              </h2>
              <p className="text-slate-600 leading-relaxed">
                These Terms are governed by and construed in accordance with the applicable laws governing commercial enterprise contracts, and any disputes shall be subject to the exclusive jurisdiction of the competent courts having jurisdiction over ZoomBridge Research.
              </p>
            </article>

            {/* 9. Changes */}
            <article className="border-b border-slate-200 pb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600 font-mono text-lg">9.</span>
                <span>Changes</span>
              </h2>
              <p className="text-slate-600 leading-relaxed">
                We may update these Terms periodically and will revise the &ldquo;last updated&rdquo; date at the top of this document. Continued use of the site after any changes signifies your acceptance of the updated Terms.
              </p>
            </article>

            {/* 10. Contact */}
            <article className="pb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="text-blue-600 font-mono text-lg">10.</span>
                <span>Contact</span>
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Questions about these Terms of Service may be directed to our legal and compliance desk:
              </p>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-1.5 text-xs sm:text-sm">
                <p className="font-bold text-slate-900">ZoomBridge Research Compliance Desk</p>
                <p className="text-slate-600">
                  Email:{" "}
                  <a href="mailto:info@wearezbr.com" className="text-blue-600 underline font-medium">
                    info@wearezbr.com
                  </a>{" "}
                  /{" "}
                  <a href="mailto:sales@wearezbr.com" className="text-blue-600 underline font-medium">
                    sales@wearezbr.com
                  </a>
                </p>
                <p className="text-slate-500">Website: https://www.wearezbr.com</p>
              </div>
            </article>

            {/* Footer Back Link & Copyright */}
            <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 font-semibold text-blue-600 hover:text-blue-700"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>← Back to home</span>
              </Link>
              <p>&copy; 2026 ZoomBridge Research. All rights reserved.</p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
