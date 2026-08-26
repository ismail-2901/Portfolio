import { Trash2, Upload } from "lucide-react";

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
      <p className="font-mono text-sm uppercase text-cyan-300">Media</p>
      <h1 className="mt-2 text-3xl font-semibold text-zinc-50">Project image management</h1>

      <form action={uploadProjectImageAction} className="mt-8 grid gap-5 rounded-lg border border-white/10 bg-zinc-900/60 p-6 md:grid-cols-2">
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
        <label className="flex items-center gap-3 text-sm text-zinc-200">
          <input name="isCover" type="checkbox" className="size-4 accent-indigo-500" />
          Cover image
        </label>
        <div>
          <SubmitButton pendingLabel="Uploading">
            <Upload aria-hidden="true" className="size-4" />
            Upload image
          </SubmitButton>
        </div>
      </form>

      <div className="mt-8 grid gap-4">
        {images.map((image) => (
          <article key={image.id} className="rounded-lg border border-white/10 bg-zinc-900/60 p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex flex-wrap gap-2">
                  <Badge>{image.project.title}</Badge>
                  {image.isCover ? <Badge className="border-cyan-300/30 text-cyan-200">Cover</Badge> : null}
                </div>
                <p className="mt-4 text-zinc-100">{image.alt}</p>
                <p className="mt-2 break-all font-mono text-xs text-zinc-500">{image.url}</p>
              </div>
              <form action={deleteProjectImageAction.bind(null, image.id)}>
                <SubmitButton variant="danger" pendingLabel="Deleting">
                  <Trash2 aria-hidden="true" className="size-4" />
                  Delete
                </SubmitButton>
              </form>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
