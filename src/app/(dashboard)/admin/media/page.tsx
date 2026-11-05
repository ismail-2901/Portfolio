import Image from "next/image";
import { Trash2, Upload } from "lucide-react";

import { CopyUrlButton } from "@/components/admin/copy-url-button";
import { SubmitButton } from "@/components/admin/submit-button";
import { Badge } from "@/components/ui/badge";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { deleteProjectImageAction, uploadProjectImageAction } from "@/lib/actions/media-actions";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  const [projects, images] = await Promise.all([
    prisma.project.findMany({
      select: { id: true, title: true },
      orderBy: [{ order: "asc" }, { title: "asc" }]
    }),
    prisma.projectImage.findMany({
      include: {
        project: {
          select: { title: true }
        }
      },
      orderBy: [{ createdAt: "desc" }]
    })
  ]);

  return (
    <div className="mx-auto max-w-6xl">
      <p className="font-mono text-metadata uppercase text-accent">Media</p>
      <h1 className="mt-2 text-heading font-semibold text-copy">Project image management</h1>

      <form action={uploadProjectImageAction} className="mt-8 grid gap-5 rounded-panel border border-rule bg-surface-raised p-6 md:grid-cols-2">
        <input type="hidden" name="returnTo" value="/admin/media" />
        <Field>
          <Label htmlFor="projectId">Project</Label>
          <Select id="projectId" name="projectId" required>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.title}
              </option>
            ))}
          </Select>
        </Field>
        <Field>
          <Label htmlFor="file">Image</Label>
          <Input id="file" name="file" type="file" accept="image/avif,image/jpeg,image/png,image/webp" required />
        </Field>
        <Field>
          <Label htmlFor="alt">Alt Text</Label>
          <Input id="alt" name="alt" required />
        </Field>
        <Field>
          <Label htmlFor="order">Order</Label>
          <Input id="order" name="order" type="number" min="0" defaultValue="0" required />
        </Field>
        <label className="flex min-h-11 cursor-pointer items-center gap-3 text-label text-copy">
          <input name="isCover" type="checkbox" className="focus-ring size-4 accent-accent-secondary" />
          Cover image
        </label>
        <div>
          <SubmitButton pendingLabel="Uploading">
            <Upload aria-hidden="true" className="size-4" />
            Upload image
          </SubmitButton>
        </div>
      </form>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <article key={image.id} className="group rounded-panel border border-rule bg-surface-raised overflow-hidden flex flex-col">
            <div className="relative aspect-video bg-surface">
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover transition-opacity duration-200 group-hover:opacity-90"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>
            <div className="p-3 flex flex-col gap-2 flex-1">
              <div className="flex flex-wrap gap-1.5">
                <Badge>{image.project.title}</Badge>
                {image.isCover ? <Badge className="border-accent/30 text-accent">Cover</Badge> : null}
              </div>
              <p className="text-label text-copy line-clamp-1">{image.alt}</p>
              <div className="mt-auto flex items-center gap-2 pt-1">
                <CopyUrlButton url={image.url} />
                <form action={deleteProjectImageAction.bind(null, image.id)}>
                  <SubmitButton variant="danger" pendingLabel="…" aria-label={`Delete ${image.alt}`}>
                    <Trash2 aria-hidden="true" className="size-3.5" />
                  </SubmitButton>
                </form>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
