"use server";

import { ContentStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/admin";
import { writeAuditLog } from "@/lib/audit";
import { prisma } from "@/lib/prisma";
import { slugify, splitCsv } from "@/lib/slug";
import { assertSameOrigin } from "@/lib/security";
import { projectSchema } from "@/lib/validation";

function tagsPayload(tagNames: string[]) {
  return tagNames.map((name) => ({
    where: { slug: slugify(name) },
    create: { name, slug: slugify(name) }
  }));
}

function projectDataFromForm(formData: FormData) {
  const parsed = projectSchema.parse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    summary: formData.get("summary"),
    body: formData.get("body"),
    techTags: splitCsv(formData.get("techTags")),
    tagNames: splitCsv(formData.get("tagNames")),
    githubUrl: formData.get("githubUrl"),
    liveUrl: formData.get("liveUrl"),
    featured: formData.get("featured") === "on",
    order: formData.get("order"),
    status: formData.get("status")
  });

  return {
    ...parsed,
    slug: parsed.slug || slugify(parsed.title),
    status: parsed.status as ContentStatus
  };
}

export async function createProjectAction(formData: FormData) {
  const session = await requireAdmin();
  await assertSameOrigin();

  const data = projectDataFromForm(formData);
  const project = await prisma.project.create({
    data: {
      title: data.title,
      slug: data.slug,
      summary: data.summary,
      body: data.body,
      techTags: data.techTags,
      githubUrl: data.githubUrl,
      liveUrl: data.liveUrl,
      featured: data.featured,
      order: data.order,
      status: data.status,
      publishedAt: data.status === ContentStatus.PUBLISHED ? new Date() : null,
      tags: {
        connectOrCreate: tagsPayload(data.tagNames)
      }
    }
  });

  await writeAuditLog({
    actorId: session.user.id,
    action: "create",
    entity: "project",
    entityId: project.id,
    metadata: { slug: project.slug }
  });

  revalidatePath("/");
  revalidatePath("/projects");
  redirect(`/admin/projects/${project.id}?notice=created`);
}

export async function updateProjectAction(id: string, formData: FormData) {
  const session = await requireAdmin();
  await assertSameOrigin();

  const data = projectDataFromForm(formData);
  const project = await prisma.project.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug,
      summary: data.summary,
      body: data.body,
      techTags: data.techTags,
      githubUrl: data.githubUrl,
      liveUrl: data.liveUrl,
      featured: data.featured,
      order: data.order,
      status: data.status,
      publishedAt: data.status === ContentStatus.PUBLISHED ? new Date() : null,
      tags: {
        set: [],
        connectOrCreate: tagsPayload(data.tagNames)
      }
    }
  });

  await writeAuditLog({
    actorId: session.user.id,
    action: "update",
    entity: "project",
    entityId: project.id,
    metadata: { slug: project.slug }
  });

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${project.slug}`);
  redirect(`/admin/projects/${project.id}?notice=saved`);
}

export async function deleteProjectAction(id: string) {
  const session = await requireAdmin();
  await assertSameOrigin();

  const project = await prisma.project.delete({ where: { id } });

  await writeAuditLog({
    actorId: session.user.id,
    action: "delete",
    entity: "project",
    entityId: id,
    metadata: { slug: project.slug }
  });

  revalidatePath("/");
  revalidatePath("/projects");
  redirect("/admin/projects?notice=deleted");
}
