import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/site/motion";
import { getPublishedArticles } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description: "Technical essays, architecture notes, and security-minded engineering writing."
};

export default async function BlogPage() {
  const articles = await getPublishedArticles();

  return (
    <main className="pt-32">
      <section className="container-shell py-16">
        <Reveal>
          <p className="font-mono text-sm uppercase text-cyan-300">Blog</p>
          <h1 className="mt-3 max-w-4xl text-balance text-5xl font-semibold leading-[1.05] text-zinc-50 md:text-7xl">
            Notes on architecture, security, and product craft.
          </h1>
        </Reveal>

        <div className="mt-12 grid gap-4">
          {articles.map((article, index) => (
            <Reveal key={article.id} delay={index * 0.04}>
              <Link
                href={`/blog/${article.slug}`}
                className="focus-ring group grid gap-5 rounded-lg border border-white/10 bg-zinc-900/60 p-6 transition hover:border-cyan-300/50 md:grid-cols-[1fr_auto]"
              >
                <div>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <Badge key={tag.slug}>{tag.name}</Badge>
                    ))}
                  </div>
                  <h2 className="mt-5 text-2xl font-semibold text-zinc-50">{article.title}</h2>
                  <p className="mt-3 max-w-2xl leading-7 text-zinc-400">{article.excerpt}</p>
                </div>
                <div className="flex items-start gap-3 font-mono text-sm text-zinc-400">
                  {article.readingMinutes} min read
                  <ArrowUpRight aria-hidden="true" className="size-5 text-cyan-300 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
