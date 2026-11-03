import { ArticleForm } from "@/components/admin/article-form";

export default function NewArticlePage() {
  return (
    <div className="mx-auto max-w-6xl">
      <p className="font-mono text-metadata uppercase text-accent">Articles</p>
      <h1 className="mt-2 text-heading font-semibold text-copy">Create article</h1>
      <div className="mt-8">
        <ArticleForm />
      </div>
    </div>
  );
}
