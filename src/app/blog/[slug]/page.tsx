import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { BLOG_ARTICLES, getBlogBySlug } from "@/data/resources";
import { InnerHero } from "@/components/layout/InnerHero";
import { SocialShareBar } from "@/components/resources/SocialShareBar";
import { BookCallSection } from "@/components/landing/BookCallSection";
import { JsonLd } from "@/components/ui/JsonLd";
import { buildBreadcrumbJsonLd, buildPageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

export function generateStaticParams() {
  return BLOG_ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogBySlug(slug);
  if (!article) {
    return buildPageMetadata({
      title: "Article Not Found",
      description: "The requested guide could not be found.",
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }
  return buildPageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/blog/${article.slug}`,
  });
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getBlogBySlug(slug);
  if (!article) {
    notFound();
  }

  const related = BLOG_ARTICLES.filter((a) => a.slug !== article.slug);
  const articleUrl = absoluteUrl(`/blog/${article.slug}`);

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/blog" },
          { label: article.title, name: article.title, path: `/blog/${article.slug}` },
        ].map(({ name, path }) => ({ name, path })))}
      />

      <InnerHero
        badge={article.category}
        title={article.title}
        description={article.excerpt}
        breadcrumbs={[
          { label: "Insights", href: "/blog" },
          { label: article.category },
        ]}
      >
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
          <span>{article.authorLabel}</span>
          <span>•</span>
          <span className="inline-flex items-center gap-1 font-mono-metric text-[#22D3EE]">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {article.readingTime}
          </span>
          <span>•</span>
          <span className="rounded-full border border-[#22D3EE]/30 bg-[#22D3EE]/10 px-3 py-1 text-[#22D3EE]">
            {article.status}
          </span>
        </div>
      </InnerHero>

      <article className="zbr-section bg-white text-[#0F172A]">
        <div className="zbr-container">
          <div className="mx-auto max-w-3xl">
            <div className="mb-8 flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E5EFF] hover:underline"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to Insights
              </Link>
              <SocialShareBar title={article.title} url={articleUrl} />
            </div>

            <div className="space-y-8">
              {article.sections.map((sec) => (
                <section key={sec.heading}>
                  <h2 className="font-display text-2xl font-semibold text-[#0A1628]">
                    {sec.heading}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-slate-600">
                    {sec.body}
                  </p>
                </section>
              ))}
            </div>

            {/* Related Content */}
            <div className="mt-14 border-t border-slate-200 pt-10">
              <h2 className="font-display text-xl font-semibold text-[#0A1628]">
                Related Methodology Guides
              </h2>
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="group rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5 transition hover:border-[#1E5EFF]/40 hover:bg-white"
                  >
                    <span className="text-[11px] font-semibold text-[#1E5EFF]">
                      {rel.category}
                    </span>
                    <h3 className="mt-2 font-display text-base font-semibold text-[#0A1628] group-hover:text-[#1E5EFF]">
                      {rel.title}
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#1E5EFF]">
                      Read Guide
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>

      <BookCallSection />
    </>
  );
}
