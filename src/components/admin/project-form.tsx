"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Pencil, Trash2, Upload, X } from "lucide-react";

import { SubmitButton } from "@/components/admin/submit-button";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createProjectAction, deleteProjectAction, updateProjectAction } from "@/lib/actions/project-actions";
import { updateProjectImageAction, uploadProjectImagesAction } from "@/lib/actions/media-actions";

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

type PendingImage = {
  id: string;
  file: File;
  previewUrl: string;
  alt: string;
  order: number;
};

export function ProjectForm({ project }: { project?: ProjectFormValue }) {
  const action = project ? updateProjectAction.bind(null, project.id) : createProjectAction;

  const [pendingImages, setPendingImages] = useState<PendingImage[]>([]);
  const [coverIndex, setCoverIndex] = useState<number>(0);
  const [editingImageId, setEditingImageId] = useState<string | null>(null);

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const startOrder = (project?.images?.length ?? 0) + pendingImages.length;
    const newItems: PendingImage[] = files.map((file, idx) => ({
      id: `${file.name}-${Date.now()}-${idx}`,
      file,
      previewUrl: URL.createObjectURL(file),
      alt: file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
      order: startOrder + idx
    }));

    setPendingImages((prev) => [...prev, ...newItems]);
    e.target.value = "";
  };

  const removePendingImage = (id: string) => {
    setPendingImages((prev) => {
      const filtered = prev.filter((item) => item.id !== id);
      if (coverIndex >= filtered.length) {
        setCoverIndex(Math.max(0, filtered.length - 1));
      }
      return filtered;
    });
  };

  const updatePendingAlt = (id: string, alt: string) => {
    setPendingImages((prev) => prev.map((item) => (item.id === id ? { ...item, alt } : item)));
  };

  const updatePendingOrder = (id: string, order: number) => {
    setPendingImages((prev) => prev.map((item) => (item.id === id ? { ...item, order } : item)));
  };

  const handleMainSubmit = async (formData: FormData) => {
    pendingImages.forEach((pi) => {
      formData.append("files", pi.file);
      formData.append("fileAlts", pi.alt);
      formData.append("fileOrders", String(pi.order));
    });
    formData.set("coverIndex", String(coverIndex));
    await action(formData);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
      {/* Left Column: Project Details Form */}
      <form action={handleMainSubmit} className="space-y-6 rounded-panel border border-rule bg-surface-raised p-6">
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
          <Field>
            <Label className="invisible select-none" aria-hidden="true">Featured</Label>
            <label className="flex h-11 cursor-pointer items-center gap-3 rounded-small border border-control-border bg-canvas/60 px-3 text-body-small text-copy transition duration-interactive hover:border-control-hover">
              <input name="featured" type="checkbox" defaultChecked={project?.featured} className="focus-ring size-4 accent-accent-secondary" />
              Featured project
            </label>
          </Field>
        </div>

        <div className="flex flex-wrap gap-3">
          <SubmitButton>{project ? "Save project" : "Create project"}</SubmitButton>
          <Button asChild variant="secondary">
            <Link href="/admin/projects">Cancel</Link>
          </Button>
        </div>
      </form>

      {/* Right Column: Project Images & Actions */}
      <aside className="space-y-6">
        <section className="rounded-panel border border-rule bg-surface-raised p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-heading-compact font-semibold text-copy">Project Images</h2>
            {project?.images && (
              <span className="font-mono text-xs text-muted">
                {project.images.length} uploaded
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-muted">
            Add one or multiple screenshots. Images will auto-slide on the project cards.
          </p>

          {/* Multi-file input drop area */}
          <div className="mt-4">
            <label
              htmlFor="projectImagesInput"
              className="focus-ring flex flex-col items-center justify-center gap-2 rounded-panel border-2 border-dashed border-rule/80 p-5 cursor-pointer bg-canvas/40 hover:border-accent hover:bg-surface transition duration-interactive text-center"
            >
              <Upload aria-hidden="true" className="size-6 text-muted" />
              <div className="text-xs">
                <span className="font-semibold text-copy">Choose image(s)</span>
                <span className="text-muted block text-[11px] mt-0.5">JPEG, PNG, WebP, AVIF</span>
              </div>
              <input
                id="projectImagesInput"
                type="file"
                multiple
                accept="image/avif,image/jpeg,image/png,image/webp"
                className="sr-only"
                onChange={handleFilesSelected}
              />
            </label>
          </div>

          {/* Pending Images Queue */}
          {pendingImages.length > 0 && (
            <div className="mt-5 space-y-3">
              <p className="text-xs font-semibold text-copy uppercase tracking-wider">
                Ready to save ({pendingImages.length})
              </p>
              {pendingImages.map((item, idx) => (
                <div key={item.id} className="rounded-panel border border-rule bg-canvas/60 p-3 space-y-2">
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.previewUrl}
                      alt={item.alt}
                      width={56}
                      height={56}
                      unoptimized
                      className="size-14 rounded object-cover border border-rule bg-surface shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-copy truncate">{item.file.name}</p>
                      <p className="text-[11px] text-muted">{(item.file.size / 1024).toFixed(0)} KB</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removePendingImage(item.id)}
                      className="text-muted hover:text-danger p-1 transition-colors"
                      title="Remove"
                      aria-label="Remove image"
                    >
                      <X className="size-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-[1fr_80px] gap-2">
                    <Input
                      value={item.alt}
                      onChange={(e) => updatePendingAlt(item.id, e.target.value)}
                      placeholder="Alt text"
                      aria-label="Alt text"
                      className="text-xs h-8"
                      required
                    />
                    <Input
                      type="number"
                      min="0"
                      value={item.order}
                      onChange={(e) => updatePendingOrder(item.id, Number(e.target.value))}
                      placeholder="Order"
                      aria-label="Order"
                      className="text-xs h-8"
                      required
                    />
                  </div>

                  <label className="flex items-center gap-2 text-xs text-copy cursor-pointer pt-1">
                    <input
                      type="radio"
                      name="pendingCoverRadio"
                      checked={coverIndex === idx}
                      onChange={() => setCoverIndex(idx)}
                      className="focus-ring size-3.5 accent-accent-secondary"
                    />
                    <span>Set as cover image</span>
                  </label>
                </div>
              ))}

              {/* For existing project: allow uploading immediately without full save if desired */}
              {project && (
                <form
                  action={async () => {
                    const fd = new FormData();
                    fd.set("projectId", project.id);
                    pendingImages.forEach((pi) => {
                      fd.append("files", pi.file);
                      fd.append("fileAlts", pi.alt);
                      fd.append("fileOrders", String(pi.order));
                    });
                    fd.set("coverIndex", String(coverIndex));
                    await uploadProjectImagesAction(fd);
                    setPendingImages([]);
                  }}
                  className="pt-1"
                >
                  <SubmitButton pendingLabel="Uploading">
                    <Upload aria-hidden="true" className="size-4" />
                    Upload selected images
                  </SubmitButton>
                </form>
              )}
            </div>
          )}

          {/* Existing Images List */}
          {project?.images && project.images.length > 0 && (
            <div className="mt-6 space-y-3">
              <p className="text-xs font-semibold text-copy uppercase tracking-wider">
                Existing Images ({project.images.length})
              </p>

              {project.images.map((image) => {
                const isEditing = editingImageId === image.id;

                return (
                  <div key={image.id} className="rounded-panel border border-rule bg-canvas/60 p-3 flex flex-col gap-2">
                    <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-surface">
                      <Image src={image.url} alt={image.alt} fill className="object-cover" sizes="340px" />
                      {image.isCover && (
                        <span className="absolute top-2 left-2 rounded bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow">
                          Cover
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-muted">
                      <span>Order: {image.order}</span>
                      {image.isCover ? (
                        <span className="text-accent font-semibold">Primary Cover</span>
                      ) : (
                        <span>Gallery Slide</span>
                      )}
                    </div>

                    {!isEditing ? (
                      <>
                        <p className="text-body-small text-copy font-medium break-words">{image.alt}</p>
                        {/* Edit Button directly under Alt Text replacing Delete Button */}
                        <button
                          type="button"
                          onClick={() => setEditingImageId(image.id)}
                          className="focus-ring mt-1 inline-flex w-full items-center justify-center gap-1.5 rounded-button border border-rule bg-surface px-3 py-1.5 text-xs font-semibold text-copy transition hover:border-accent hover:text-accent"
                        >
                          <Pencil aria-hidden="true" className="size-3.5" />
                          Edit
                        </button>
                      </>
                    ) : (
                      <form action={updateProjectImageAction.bind(null, image.id)} className="mt-2 space-y-3 border-t border-rule pt-3">
                        <Field>
                          <Label htmlFor={`alt-${image.id}`}>Alt text</Label>
                          <Input id={`alt-${image.id}`} name="alt" defaultValue={image.alt} required />
                        </Field>

                        <Field>
                          <Label htmlFor={`order-${image.id}`}>Order</Label>
                          <Input id={`order-${image.id}`} name="order" type="number" min="0" defaultValue={image.order} required />
                        </Field>

                        <label className="flex min-h-10 cursor-pointer items-center gap-2 text-label text-copy">
                          <input
                            name="isCover"
                            type="checkbox"
                            defaultChecked={image.isCover}
                            className="focus-ring size-4 accent-accent-secondary"
                          />
                          Cover image
                        </label>

                        <Field>
                          <Label htmlFor={`file-${image.id}`}>Replace image (optional)</Label>
                          <Input id={`file-${image.id}`} name="file" type="file" accept="image/avif,image/jpeg,image/png,image/webp" />
                        </Field>

                        <div className="flex items-center gap-2 pt-1">
                          <SubmitButton pendingLabel="Saving">
                            <Check aria-hidden="true" className="size-3.5" />
                            Save
                          </SubmitButton>
                          <Button type="button" variant="secondary" onClick={() => setEditingImageId(null)}>
                            Cancel
                          </Button>
                        </div>
                      </form>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Delete Project Section for existing projects */}
        {project && (
          <form action={deleteProjectAction.bind(null, project.id)} className="rounded-panel border border-danger/30 bg-danger-surface/5 p-5">
            <h2 className="text-heading-compact font-semibold text-danger-strong">Delete Project</h2>
            <p className="mt-2 text-body-small text-danger-soft">This removes the project, its images, and related tags.</p>
            <SubmitButton variant="danger" pendingLabel="Deleting" className="mt-4">
              <Trash2 aria-hidden="true" className="size-4" />
              Delete project
            </SubmitButton>
          </form>
        )}
      </aside>
    </div>
  );
}
