import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MarkdownRenderer } from "@/lib/markdown";
import { getArticleBySlug } from "@/lib/queries";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return { title: "Article Not Found" };
  }

  return {
    title: article.seoTitle ?? article.title,
    description: article.seoDescription ?? article.excerpt,
    openGraph: {
      title: article.seoTitle ?? article.title,
      description: article.seoDescription ?? article.excerpt,
      type: "article"
    }
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="pt-32">
      <article className="container-shell py-16">
        <Button asChild variant="ghost">
          <Link href="/blog">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Blog
          </Link>
        </Button>

        <header className="mt-10 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag.slug}>{tag.name}</Badge>
            ))}
            <Badge>{article.readingMinutes} min read</Badge>
          </div>
          <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.05] text-zinc-50 md:text-7xl">
            {article.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-300">{article.excerpt}</p>
        </header>

        <div className="mt-12 max-w-3xl">
          <MarkdownRenderer source={article.body} />
        </div>
      </article>
    </main>
  );
}
