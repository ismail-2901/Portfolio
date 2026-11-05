import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { DatabaseUnavailableNotice } from "@/components/site/database-unavailable-notice";
import { Reveal } from "@/components/site/motion";
import { getPublishedArticles } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Blog",
  description: "Technical essays, architecture notes, and security-minded engineering writing.",
  alternates: { canonical: "/blog" },
  openGraph: { title: "Blog", description: "Technical essays on architecture, security, and product craft.", url: "/blog" },
  twitter: { card: "summary", title: "Blog", description: "Technical essays on architecture, security, and product craft." }
};

export default async function BlogPage() {
  const articlesResult = await getPublishedArticles();
  const articles = articlesResult.available ? articlesResult.data : [];

  return (
    <main id="main-content" tabIndex={-1} className="w-full">
      <section className="container-shell pb-24 pt-16 md:pb-32 md:pt-24">
        {/* Hairline Divider & Giant Title */}
        <div className="hairline-divider mb-8" />
        <h1 className="section-giant-title select-none leading-none mb-6">
          WRITING
        </h1>

        {/* Sub-bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-rule/60 mb-12">
          <p className="text-xs md:text-sm text-muted max-w-xl leading-relaxed">
            Notes on software architecture, full-stack systems, security practices, and product engineering.
          </p>
        </div>

        {!articlesResult.available ? <DatabaseUnavailableNotice className="mb-8" /> : null}

        <div className="divide-y divide-rule/60 border-y border-rule/60">
          {articles.length === 0 ? (
            <p className="py-12 text-center text-xs md:text-sm text-muted">
              Technical essays and engineering notes are being written.
            </p>
          ) : (
            articles.map((article, index) => (
              <Reveal key={article.id} delay={index * 0.04}>
                <Link
                  href={`/blog/${article.slug}`}
                  className="focus-ring group grid gap-4 py-8 transition-colors hover:bg-surface-raised/40 md:grid-cols-[1fr_auto] md:py-9 px-2"
                >
                  <div>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <Badge key={tag.slug}>{tag.name}</Badge>
                      ))}
                    </div>
                    <h2 className="mt-4 text-xl md:text-2xl font-black uppercase tracking-tight text-copy group-hover:opacity-80 transition-opacity">
                      {article.title}
                    </h2>
                    <p className="mt-2.5 max-w-2xl text-xs md:text-sm text-muted leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 font-mono text-xs text-muted md:self-start md:pt-2">
                    <span>{article.readingMinutes} min read</span>
                    <ArrowUpRight aria-hidden="true" className="size-4 text-copy transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              </Reveal>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
