import Link from "next/link";
import { Trash2 } from "lucide-react";

import { SubmitButton } from "@/components/admin/submit-button";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createArticleAction, deleteArticleAction, updateArticleAction } from "@/lib/actions/article-actions";

type ArticleFormValue = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  seoTitle: string | null;
  seoDescription: string | null;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  tags: Array<{ name: string }>;
};

export function ArticleForm({ article }: { article?: ArticleFormValue }) {
  const action = article ? updateArticleAction.bind(null, article.id) : createArticleAction;

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
      <form action={action} className="space-y-6 rounded-lg border border-white/10 bg-zinc-900/60 p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <Field>
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" defaultValue={article?.title} required />
          </Field>
          <Field>
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" name="slug" defaultValue={article?.slug} placeholder="generated-from-title" />
          </Field>
        </div>

        <Field>
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea id="excerpt" name="excerpt" defaultValue={article?.excerpt} required className="min-h-28" />
        </Field>

        <Field>
          <Label htmlFor="body">Markdown / MDX Body</Label>
          <Textarea id="body" name="body" defaultValue={article?.body} required className="min-h-96 font-mono" />
        </Field>

        <div className="grid gap-5 md:grid-cols-2">
          <Field>
            <Label htmlFor="seoTitle">SEO Title</Label>
            <Input id="seoTitle" name="seoTitle" defaultValue={article?.seoTitle ?? ""} />
          </Field>
          <Field>
            <Label htmlFor="seoDescription">SEO Description</Label>
            <Input id="seoDescription" name="seoDescription" defaultValue={article?.seoDescription ?? ""} />
          </Field>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field>
            <Label htmlFor="tagNames">Tags</Label>
            <Input id="tagNames" name="tagNames" defaultValue={article?.tags.map((tag) => tag.name).join(", ")} placeholder="security, architecture" />
          </Field>
          <Field>
            <Label htmlFor="status">Status</Label>
            <Select id="status" name="status" defaultValue={article?.status ?? "DRAFT"}>
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </Select>
          </Field>
        </div>

        <div className="flex flex-wrap gap-3">
          <SubmitButton>{article ? "Save article" : "Create article"}</SubmitButton>
          <Button asChild variant="secondary">
            <Link href="/admin/articles">Cancel</Link>
          </Button>
        </div>
      </form>

      {article ? (
        <form action={deleteArticleAction.bind(null, article.id)} className="h-fit rounded-lg border border-red-400/20 bg-red-500/5 p-5">
          <h2 className="text-lg font-semibold text-red-100">Delete Article</h2>
          <p className="mt-2 text-sm leading-6 text-red-200/80">This removes the article and detaches its tags.</p>
          <SubmitButton variant="danger" pendingLabel="Deleting" className="mt-4">
            <Trash2 aria-hidden="true" className="size-4" />
            Delete article
          </SubmitButton>
        </form>
      ) : null}
    </div>
  );
}
