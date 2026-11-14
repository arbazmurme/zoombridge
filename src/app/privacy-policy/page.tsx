import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Mail, Lock, CheckCircle2, Building, ExternalLink } from "lucide-react";
import { InnerHero } from "@/components/layout/InnerHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "ZoomBridge Research Privacy Notice: Learn how we collect, process, store, and protect personal data, and how to exercise your GDPR and privacy rights.",
  path: "/privacy-policy",
  keywords: [
    "Privacy Policy",
    "ZoomBridge Research Privacy",
    "ZBR Privacy Notice",
    "GDPR Compliance",
    "B2B Data Protection",
    "info@wearezbr.com",
    "wearezbr privacy",
  ],
});

export default function PrivacyPolicyPage() {
  const tableOfContents = [
    { label: "Introduction", href: "#introduction" },
    { label: "Data controller", href: "#controller" },
    { label: "Data we process", href: "#data-we-process" },
    { label: "Why we collect it", href: "#why-we-collect" },
    { label: "Where it comes from", href: "#sources" },
    { label: "Who we share it with", href: "#sharing" },
    { label: "Where it is stored", href: "#storage" },
    { label: "How long we keep it", href: "#retention" },
    { label: "Your rights", href: "#rights" },
    { label: "Contact us", href: "#contact" },
  ];

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy-policy" },
        ])}
      />

      <InnerHero
        badge="Privacy • Last updated: 6th Oct 2026"
        title="Privacy Policy"
        description="Welcome to the ZoomBridge Research Privacy Notice. This document explains how ZoomBridge Research collects, uses, and shares personal data, what your legal rights are, and how to exercise them."
        breadcrumbs={[{ label: "Privacy Policy" }]}
      />

      <section id="privacy-content" className="zbr-section bg-white text-[#0F172A] py-12 sm:py-16">
        <div className="zbr-container max-w-4xl mx-auto px-4 sm:px-6">

          {/* Back to Home & Meta Bar */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to home</span>
            </Link>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-mono">Last updated: 6th Oct 2026</span>
              <span>&bull;</span>
              <a href="mailto:info@wearezbr.com" className="text-blue-600 font-semibold hover:underline">
                info@wearezbr.com
              </a>
            </div>
          </div>

          {/* Quick Anchor Navigation Box as requested */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6 mb-10 shadow-2xs">
            <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wider mb-3">On this page</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs sm:text-sm">
              {tableOfContents.map((item, idx) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1.5 py-0.5"
                >
                  <span className="text-slate-400 font-mono text-[11px]">{idx + 1}.</span>
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-12 text-slate-700 leading-relaxed text-sm sm:text-base">

            {/* 1. Introduction */}
            <article id="introduction" className="scroll-mt-24 border-b border-slate-200 pb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600 font-mono text-lg">1.</span>
                <span>Introduction</span>
              </h2>
              <div className="space-y-3 text-slate-600 leading-relaxed">
                <p>
                  We hope you’ll take some time to read this document; we’ve tried to keep it all as simple as possible and to avoid jargon, and we’ll make our best efforts to keep you informed if there are any changes to the way we process your personal data in the future.
                </p>
                <p>
                  ZoomBridge Research takes its responsibility for protecting your data very seriously and we do advise you get to know our practices. If there’s anything here you don’t understand, or if you want to ask any questions, please feel free to contact us.
                </p>
              </div>
            </article>

            {/* 2. Who is the data controller? */}
            <article id="controller" className="scroll-mt-24 border-b border-slate-200 pb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600 font-mono text-lg">2.</span>
                <span>Who is the data controller?</span>
              </h2>
              <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-5 space-y-2 text-slate-700">
                <p className="font-bold text-slate-900">ZoomBridge Research</p>
                <p className="text-xs sm:text-sm">
                  Opt-out using:{" "}
                  <a href="mailto:info@wearezbr.com" className="text-blue-600 underline font-semibold">
                    info@wearezbr.com
                  </a>
                </p>
                <p className="text-xs text-slate-500 pt-1">
                  In this document ZoomBridge Research may be referred to as &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;.
                </p>
              </div>
            </article>

            {/* 3. What kinds of personal data does ZoomBridge Research process? */}
            <article id="data-we-process" className="scroll-mt-24 border-b border-slate-200 pb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600 font-mono text-lg">3.</span>
                <span>What kinds of personal data does ZoomBridge Research process?</span>
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                ZoomBridge Research collects personal data for various purposes; with that in mind we have created a list of the types of personal data that we may collect, either directly from yourself or from other sources, in order to achieve those purposes.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">The kinds of personal data we may collect include:</p>

              {/* Data Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                    <tr>
                      <th className="py-3 px-4 w-1/3">Category</th>
                      <th className="py-3 px-4">Personal data</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    <tr>
                      <td className="py-3 px-4 font-semibold text-slate-900">Customer / Client</td>
                      <td className="py-3 px-4 text-slate-600">Name, address, telephone, email, job title</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-slate-900">Professional Contact</td>
                      <td className="py-3 px-4 text-slate-600">Name, address, telephone, email, job title</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-slate-900">Supplier / Trader</td>
                      <td className="py-3 px-4 text-slate-600">Name, address, telephone, email, job title, financial data</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold text-slate-900">Partners</td>
                      <td className="py-3 px-4 text-slate-600">Name, address, telephone, email, job title, financial data</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>

            {/* 4. What are the reasons ZoomBridge Research collects personal data? */}
            <article id="why-we-collect" className="scroll-mt-24 border-b border-slate-200 pb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600 font-mono text-lg">4.</span>
                <span>What are the reasons ZoomBridge Research collects personal data?</span>
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">Legal obligations</h3>
                  <p className="text-slate-600 leading-relaxed mb-3">
                    ZoomBridge Research uses personal data firstly to fulfil any contractual obligations that exist between us and yourself. Where we request personal data be provided to enter into, or meet the terms of any such contract, you will be required to provide the relevant personal data or we will not be able to deliver the goods or services you want. In such cases the lawful basis of us processing the personal data is that it is necessary for the performance of a contract.
                  </p>
                  <p className="text-slate-600 leading-relaxed mb-3">
                    We are required by law to process personal data for purposes relating to our legal obligations, these include:
                  </p>
                  <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                    <li>To provide for our financial commitments, or to relevant financial authorities.</li>
                    <li>To comply with regulatory requirements and any self-regulatory schemes.</li>
                    <li>To carry out required business operations and due diligence.</li>
                    <li>To cooperate with relevant authorities for reporting criminal activity, or to detect and prevent fraud.</li>
                    <li>To investigate any insurance claims, claims of unfair dismissal, claims of any kind of harassment or of discrimination, or any other claim whereby the organisation may have to defend itself.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">Legitimate interests</h3>
                  <p className="text-slate-600 leading-relaxed mb-3">
                    ZoomBridge Research may process personal data for any of the following purposes, which are considered to be within our legitimate business interests:
                  </p>
                  <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                    <li>To provide goods and services where it has been requested.</li>
                    <li>To inform customers of goods and services we provide or offers that may interest them.</li>
                    <li>To send notification on subjects to individuals who have asked to be kept informed.</li>
                    <li>To invite people to participate in research in fields and disciplines they are interested in.</li>
                    <li>To improve the quality of the services we offer, and to better understand customers’ needs by requesting feedback, or reviews of the services provided, or sending survey forms.</li>
                    <li>To recognise when people re-engage with our organisation.</li>
                    <li>To allow the organisation to support and maintain our products in active service.</li>
                    <li>To provide reference information to third party organisations when necessary.</li>
                    <li>To protect the organisation’s assets.</li>
                  </ul>
                </div>
              </div>
            </article>

            {/* 5. Where does ZoomBridge Research obtain personal data from? */}
            <article id="sources" className="scroll-mt-24 border-b border-slate-200 pb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600 font-mono text-lg">5.</span>
                <span>Where does ZoomBridge Research obtain personal data from?</span>
              </h2>
              <div className="space-y-3 text-slate-600 leading-relaxed">
                <p>
                  We will collect personal data directly from you in various ways. This could include when you complete an online form, or if you provide the data directly to a representative of ZoomBridge Research.
                </p>
                <p>
                  We collect some personal data from publicly accessible sources such as LinkedIn and Crunchbase.
                </p>
              </div>
            </article>

            {/* 6. Who will ZoomBridge Research share your personal data with? */}
            <article id="sharing" className="scroll-mt-24 border-b border-slate-200 pb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600 font-mono text-lg">6.</span>
                <span>Who will ZoomBridge Research share your personal data with?</span>
              </h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                To achieve the above stated purposes for which we process your personal data, we may have to share your personal data with certain third parties.
              </p>
              <p className="text-slate-600 leading-relaxed mb-3">
                We shall make all reasonable efforts to ensure that any third party we share your personal data with is also compliant with data protection law.
              </p>
              <p className="text-slate-600 leading-relaxed mb-3">
                The kinds of third parties we may share your personal data with include:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-slate-600 mb-6">
                <li>Organisations where it is necessary to provide goods or services.</li>
                <li>Organisations that are acting as our marketing agents.</li>
              </ul>

              {/* Third Party Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                    <tr>
                      <th className="py-3 px-4 w-1/3">Third party</th>
                      <th className="py-3 px-4">Function</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {[
                      { party: "Vitality", func: "Health provider" },
                      { party: "HR provider", func: "HR support" },
                      { party: "IT support", func: "IT support" },
                      { party: "Payroll", func: "Payroll function" },
                      { party: "Salesloft", func: "IT system" },
                      { party: "Salesforce", func: "IT system" },
                      { party: "DocuSign", func: "Management system" },
                      { party: "Ignite", func: "IT solution" },
                    ].map((row) => (
                      <tr key={row.party}>
                        <td className="py-2.5 px-4 font-semibold text-slate-900">{row.party}</td>
                        <td className="py-2.5 px-4 text-slate-600">{row.func}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            {/* 7. Where will ZoomBridge Research store your personal data? */}
            <article id="storage" className="scroll-mt-24 border-b border-slate-200 pb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600 font-mono text-lg">7.</span>
                <span>Where will ZoomBridge Research store your personal data?</span>
              </h2>
              <div className="space-y-3 text-slate-600 leading-relaxed">
                <p>
                  As a part of our standard business practices, we may transfer your personal data to organisations based in countries that have not been granted an adequacy decision under the General Data Protection Regulation.
                </p>
                <p>
                  Where data is transferred to such countries, we shall ensure that specific safeguards or derogations have been established.
                </p>
                <p>
                  These might include where the data transfer is necessary in order to fulfil a contract between us and yourself, where we have received your specific consent after having made you aware of any risks involved, or where contracts are in place between us and the third parties involved that ensure the recipient organisation has a suitable standard of data protection in place.
                </p>
              </div>
            </article>

            {/* 8. How long will ZoomBridge Research keep your personal data? */}
            <article id="retention" className="scroll-mt-24 border-b border-slate-200 pb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600 font-mono text-lg">8.</span>
                <span>How long will ZoomBridge Research keep your personal data?</span>
              </h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                We will keep your personal data only for as long as required to achieve the purposes for which it was collected, in line with this privacy notice.
              </p>
              <p className="text-slate-600 leading-relaxed mb-3">
                The following criteria are what determine the period for which we will keep your personal data:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                <li>Until we are no longer required to do so to comply with regulatory requirements or financial obligations.</li>
                <li>Until we are no longer required to do so by any law we are subject to.</li>
                <li>Until all purposes for which the data was originally gathered have become irrelevant or obsolete.</li>
                <li>Until it has been requested that we no longer process the data and that it is erased; in some cases, where there is a remaining relevant or legal reason why we are required to keep this data, we may opt to restrict the amount of processing being conducted to what is absolutely necessary rather than erase it.</li>
              </ul>
            </article>

            {/* 9. Your rights, our responsibility */}
            <article id="rights" className="scroll-mt-24 border-b border-slate-200 pb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600 font-mono text-lg">9.</span>
                <span>Your rights, our responsibility</span>
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                There are several rights granted to you immediately upon providing us with your personal information; some of these are mentioned above. We’d like you to know that at ZoomBridge Research we take your rights seriously and will always conduct ourselves in a way that is considerate of our responsibility to serve your legal rights.
              </p>

              <div className="space-y-4">
                <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/50">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Right of access</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    This grants you the right to confirm whether or not your personal data is being processed, and to be provided with relevant details of what those processing operations are and what personal data of yours is being processed. If you would like access to the personal data we have about you, we ask that you contact us using the details below.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/50">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Right to rectification</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    This one is fairly straightforward; if you notice that the data we have about you is inaccurate or incomplete, you may request we rectify the mistake. We will make every effort to respond to requests of this type immediately.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/50">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Right to erasure</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Otherwise known as the ‘right to be forgotten’, this gives you the right to request your personal data be deleted. This is not an absolute right; if you were to request that we erase your personal data, we would erase as much of that data as we could but may have to retain some information if it is necessary. Where we have received a request for personal data to be erased, if it is necessary for us to retain some of that information we shall ensure that the remaining data is used only when and where it is absolutely necessary.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/50">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Right to object</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    The right to object is a basic freedom all democracies enjoy. If you wish to object to the way we use, or have used, your personal data you may do so freely.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 p-4 bg-slate-50/50">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Right to complain</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    We will always try to maintain the highest standards and encourage the confidence our customers have in us as an organisation. To achieve this, we request that any complaints be first brought to our attention so we can properly investigate matters. If you would like to complain about ZoomBridge Research to a regulatory body, you may do so by contacting your local data protection supervisory authority.
                  </p>
                </div>
              </div>
            </article>

            {/* 10. ZoomBridge Research contact details */}
            <article id="contact" className="scroll-mt-24 pb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="text-blue-600 font-mono text-lg">10.</span>
                <span>ZoomBridge Research contact details</span>
              </h2>
              <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50/60 p-5 sm:p-6 space-y-3">
                <p className="text-slate-700 leading-relaxed">
                  For access, rectification, erasure, objection or opt-out requests, write to us at:
                </p>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-blue-600 shrink-0" />
                  <a
                    href="mailto:info@wearezbr.com"
                    className="text-base sm:text-lg font-bold text-blue-700 hover:underline"
                  >
                    info@wearezbr.com
                  </a>
                </div>
                <p className="text-xs text-slate-500 pt-2 border-t border-blue-200/60">
                  You may also reach our enterprise desk at: <a href="mailto:sales@wearezbr.com" className="text-blue-600 font-semibold underline">sales@wearezbr.com</a>
                </p>
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
