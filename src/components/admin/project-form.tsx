import Link from "next/link";
import { Trash2, Upload } from "lucide-react";

import { SubmitButton } from "@/components/admin/submit-button";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createProjectAction, deleteProjectAction, updateProjectAction } from "@/lib/actions/project-actions";
import { deleteProjectImageAction, uploadProjectImageAction } from "@/lib/actions/media-actions";

type ProjectFormValue = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  body: string;
  techTags: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  featured: boolean;
  order: number;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  tags: Array<{ name: string }>;
  images: Array<{
    id: string;
    url: string;
    alt: string;
    isCover: boolean;
    order: number;
  }>;
};

export function ProjectForm({ project }: { project?: ProjectFormValue }) {
  const action = project ? updateProjectAction.bind(null, project.id) : createProjectAction;

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <form action={action} className="space-y-6 rounded-lg border border-white/10 bg-zinc-900/60 p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <Field>
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" defaultValue={project?.title} required />
          </Field>
          <Field>
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" name="slug" defaultValue={project?.slug} placeholder="generated-from-title" />
          </Field>
        </div>

        <Field>
          <Label htmlFor="summary">Summary</Label>
          <Textarea id="summary" name="summary" defaultValue={project?.summary} required className="min-h-28" />
        </Field>

        <Field>
          <Label htmlFor="body">Markdown / MDX Body</Label>
          <Textarea id="body" name="body" defaultValue={project?.body} required className="min-h-80 font-mono" />
        </Field>

        <div className="grid gap-5 md:grid-cols-2">
          <Field>
            <Label htmlFor="techTags">Tech Tags</Label>
            <Input id="techTags" name="techTags" defaultValue={project?.techTags.join(", ")} placeholder="Next.js, Prisma" />
          </Field>
          <Field>
            <Label htmlFor="tagNames">Content Tags</Label>
            <Input id="tagNames" name="tagNames" defaultValue={project?.tags.map((tag) => tag.name).join(", ")} placeholder="security, platform" />
          </Field>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Field>
            <Label htmlFor="githubUrl">GitHub URL</Label>
            <Input id="githubUrl" name="githubUrl" type="url" defaultValue={project?.githubUrl ?? ""} />
          </Field>
          <Field>
            <Label htmlFor="liveUrl">Live URL</Label>
            <Input id="liveUrl" name="liveUrl" type="url" defaultValue={project?.liveUrl ?? ""} />
          </Field>
        </div>

        <div className="grid gap-5 md:grid-cols-[160px_1fr_1fr]">
          <Field>
            <Label htmlFor="order">Order</Label>
            <Input id="order" name="order" type="number" min="0" defaultValue={project?.order ?? 0} required />
          </Field>
          <Field>
            <Label htmlFor="status">Status</Label>
            <Select id="status" name="status" defaultValue={project?.status ?? "DRAFT"}>
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </Select>
          </Field>
          <label className="flex items-end gap-3 rounded-lg border border-white/10 bg-zinc-950/60 p-3 text-sm text-zinc-200">
            <input name="featured" type="checkbox" defaultChecked={project?.featured} className="size-4 accent-indigo-500" />
            Featured project
          </label>
        </div>

        <div className="flex flex-wrap gap-3">
          <SubmitButton>{project ? "Save project" : "Create project"}</SubmitButton>
          <Button asChild variant="secondary">
            <Link href="/admin/projects">Cancel</Link>
          </Button>
        </div>
      </form>

      <aside className="space-y-6">
        {project ? (
          <>
            <section className="rounded-lg border border-white/10 bg-zinc-900/60 p-5">
              <h2 className="text-lg font-semibold text-zinc-50">Project Images</h2>
              <form action={uploadProjectImageAction} className="mt-5 space-y-4">
                <input type="hidden" name="projectId" value={project.id} />
                <Field>
                  <Label htmlFor="file">Image</Label>
                  <Input id="file" name="file" type="file" accept="image/avif,image/jpeg,image/png,image/webp" required />
                </Field>
                <Field>
                  <Label htmlFor="alt">Alt Text</Label>
                  <Input id="alt" name="alt" required />
                </Field>
                <Field>
                  <Label htmlFor="imageOrder">Order</Label>
                  <Input id="imageOrder" name="order" type="number" min="0" defaultValue="0" required />
                </Field>
                <label className="flex items-center gap-3 text-sm text-zinc-200">
                  <input name="isCover" type="checkbox" className="size-4 accent-indigo-500" />
                  Cover image
                </label>
                <SubmitButton pendingLabel="Uploading">
                  <Upload aria-hidden="true" className="size-4" />
                  Upload
                </SubmitButton>
              </form>

              <div className="mt-6 space-y-3">
                {project.images.map((image) => (
                  <div key={image.id} className="rounded-lg border border-white/10 bg-zinc-950/60 p-3">
                    <p className="text-sm text-zinc-200">{image.alt}</p>
                    <p className="mt-1 break-all font-mono text-xs text-zinc-500">{image.url}</p>
                    <form action={deleteProjectImageAction.bind(null, image.id)} className="mt-3">
                      <SubmitButton variant="danger" pendingLabel="Deleting">
                        <Trash2 aria-hidden="true" className="size-4" />
                        Delete
                      </SubmitButton>
                    </form>
                  </div>
                ))}
              </div>
            </section>

            <form action={deleteProjectAction.bind(null, project.id)} className="rounded-lg border border-red-400/20 bg-red-500/5 p-5">
              <h2 className="text-lg font-semibold text-red-100">Delete Project</h2>
              <p className="mt-2 text-sm leading-6 text-red-200/80">This removes the project, its images, and related tags.</p>
              <SubmitButton variant="danger" pendingLabel="Deleting" className="mt-4">
                <Trash2 aria-hidden="true" className="size-4" />
                Delete project
              </SubmitButton>
            </form>
          </>
        ) : (
          <section className="rounded-lg border border-white/10 bg-zinc-900/60 p-5">
            <h2 className="text-lg font-semibold text-zinc-50">Images</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-400">Create the project first, then upload cover and gallery images.</p>
          </section>
        )}
      </aside>
    </div>
  );
}
