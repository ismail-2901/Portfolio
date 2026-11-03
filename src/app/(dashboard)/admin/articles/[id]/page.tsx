import { notFound } from "next/navigation";

import { ArticleForm } from "@/components/admin/article-form";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditArticlePage({ params }: PageProps) {
  const { id } = await params;
  const article = await prisma.article.findUnique({
    where: { id },
    include: { tags: true }
  });

  if (!article) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl">
      <p className="font-mono text-metadata uppercase text-accent">Articles</p>
      <h1 className="mt-2 text-heading font-semibold text-copy">Edit {article.title}</h1>
      <div className="mt-8">
        <ArticleForm article={article} />
      </div>
    </div>
  );
}
