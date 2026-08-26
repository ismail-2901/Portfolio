import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminArticlesPage() {
  const articles = await prisma.article.findMany({
    include: { tags: true },
    orderBy: [{ updatedAt: "desc" }]
  });

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-sm uppercase text-cyan-300">Articles</p>
          <h1 className="mt-2 text-3xl font-semibold text-zinc-50">Blog library</h1>
        </div>
        <Button asChild>
          <Link href="/admin/articles/new">
            <Plus aria-hidden="true" className="size-4" />
            New article
          </Link>
        </Button>
      </div>

      <div className="mt-8 grid gap-4">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/admin/articles/${article.id}`}
            className="focus-ring group grid gap-4 rounded-lg border border-white/10 bg-zinc-900/60 p-5 transition hover:border-cyan-300/50 md:grid-cols-[1fr_auto]"
          >
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge>{article.status}</Badge>
                <Badge>{article.readingMinutes} min</Badge>
                {article.tags.map((tag) => (
                  <Badge key={tag.id}>{tag.name}</Badge>
                ))}
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-zinc-50">{article.title}</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-400">{article.excerpt}</p>
            </div>
            <ArrowRight aria-hidden="true" className="size-5 text-cyan-300 transition group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </div>
  );
}
