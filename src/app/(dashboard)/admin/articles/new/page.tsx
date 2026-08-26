import { ArticleForm } from "@/components/admin/article-form";

export default function NewArticlePage() {
  return (
    <div className="mx-auto max-w-6xl">
      <p className="font-mono text-sm uppercase text-cyan-300">Articles</p>
      <h1 className="mt-2 text-3xl font-semibold text-zinc-50">Create article</h1>
      <div className="mt-8">
        <ArticleForm />
      </div>
    </div>
  );
}
