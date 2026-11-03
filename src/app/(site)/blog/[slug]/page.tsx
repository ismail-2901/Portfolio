import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DatabaseUnavailableNotice } from "@/components/site/database-unavailable-notice";
import { MarkdownRenderer } from "@/lib/markdown";
import { getArticleBySlug } from "@/lib/queries";
import { serializeStructuredData } from "@/lib/structured-data";
import { getSiteUrl } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const articleResult = await getArticleBySlug(slug);

  if (!articleResult.available) {
    return { title: "Article temporarily unavailable" };
  }

  const article = articleResult.data;

  if (!article) {
    return { title: "Article Not Found" };
  }

  return {
    title: article.seoTitle ?? article.title,
    description: article.seoDescription ?? article.excerpt,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      title: article.seoTitle ?? article.title,
      description: article.seoDescription ?? article.excerpt,
      url: `/blog/${article.slug}`,
      type: "article"
    },
    twitter: {
      card: "summary",
      title: article.seoTitle ?? article.title,
      description: article.seoDescription ?? article.excerpt
    }
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const articleResult = await getArticleBySlug(slug);

  if (!articleResult.available) {
    return (
      <main id="main-content" tabIndex={-1}>
        <section className="container-shell max-w-3xl pb-24 pt-16 md:pb-32 md:pt-24">
          <Button asChild variant="ghost" className="px-0">
            <Link href="/blog">
              <ArrowLeft aria-hidden="true" className="size-4" />
              Blog
            </Link>
          </Button>
          <h1 className="mt-8 text-display-compact font-medium text-copy md:text-display">Article details temporarily unavailable.</h1>
          <DatabaseUnavailableNotice className="mt-6" />
        </section>
      </main>
    );
  }

  const article = articleResult.data;

  if (!article) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.seoDescription ?? article.excerpt,
    url: `${getSiteUrl()}/blog/${article.slug}`,
    datePublished: (article.publishedAt ?? article.createdAt).toISOString(),
    dateModified: article.updatedAt.toISOString(),
    keywords: article.tags.map((tag) => tag.name)
  };

  return (
    <main id="main-content" tabIndex={-1}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData(articleJsonLd) }} />
      <article className="container-shell pb-24 pt-10 md:pb-32 md:pt-16">
        <Button asChild variant="ghost" className="px-0">
          <Link href="/blog">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Blog
          </Link>
        </Button>

        <header className="mt-12 max-w-4xl border-b border-rule pb-10 md:pb-14">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-metadata text-muted">
            {article.tags.map((tag) => (
              <Badge key={tag.slug}>{tag.name}</Badge>
            ))}
            <span>{article.readingMinutes} min read</span>
          </div>
          <h1 className="mt-6 text-balance text-display font-medium text-copy md:text-display-xl">
            {article.title}
          </h1>
          <p className="copy-measure mt-6 text-body-large text-muted">{article.excerpt}</p>
        </header>

        <div className="project-content mt-12 max-w-3xl">
          <MarkdownRenderer source={article.body} />
        </div>
      </article>
    </main>
  );
}
