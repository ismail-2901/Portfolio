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
    <main id="main-content">
      <section className="container-shell pb-24 pt-16 md:pb-32 md:pt-24">
        <Reveal>
          <p className="eyebrow">Writing / field notes</p>
          <h1 className="mt-5 max-w-4xl text-balance text-display font-medium text-copy md:text-display-xl">
            Notes on architecture, security, and product craft.
          </h1>
        </Reveal>

        {!articlesResult.available ? <DatabaseUnavailableNotice className="mt-8" /> : null}

        <div className="mt-12 divide-y divide-rule border-y border-rule">
          {articles.map((article, index) => (
            <Reveal key={article.id} delay={index * 0.04}>
              <Link
                href={`/blog/${article.slug}`}
                className="focus-ring group grid gap-5 py-7 transition-colors hover:bg-copy/1.5 md:grid-cols-[1fr_auto] md:py-8"
              >
                <div>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <Badge key={tag.slug}>{tag.name}</Badge>
                    ))}
                  </div>
                  <h2 className="mt-5 text-heading-small font-medium text-copy">{article.title}</h2>
                  <p className="mt-3 max-w-2xl text-body text-muted">{article.excerpt}</p>
                </div>
                <div className="flex items-start gap-3 font-mono text-metadata text-muted">
                  {article.readingMinutes} min read
                  <ArrowUpRight aria-hidden="true" className="size-5 text-accent transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
