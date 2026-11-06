"use server";

import { ContentStatus } from "@prisma/client";
import { put } from "@vercel/blob";
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

async function uploadProjectImagesFromFormData(projectId: string, projectTitle: string, formData: FormData) {
  const files = formData.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length === 0) {
    const singleFile = formData.get("file");
    if (singleFile instanceof File && singleFile.size > 0) {
      files.push(singleFile);
    }
  }
  if (files.length === 0) return;

  const blobToken =
    process.env.BLOB_READ_WRITE_TOKEN?.trim() ||
    process.env.PORTFOLIO_BLOB_READ_WRITE_TOKEN?.trim() ||
    "";
  if (!blobToken) return;

  const fileAlts = formData.getAll("fileAlts").map(String);
  const fileOrders = formData.getAll("fileOrders").map(Number);
  const coverIndex = Number(formData.get("coverIndex") ?? 0);

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const isCover = i === coverIndex;
    const alt = fileAlts[i] || `${projectTitle} screenshot ${i + 1}`;
    const order = !isNaN(fileOrders[i]) ? fileOrders[i] : i;

    if (isCover) {
      await prisma.projectImage.updateMany({
        where: { projectId },
        data: { isCover: false }
      });
    }

    const blob = await put(`project-images/${projectId}/${file.name}`, file, {
      access: "public",
      token: blobToken,
      addRandomSuffix: true
    });

    await prisma.projectImage.create({
      data: {
        projectId,
        url: blob.url,
        alt,
        isCover,
        order
      }
    });
  }
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

  await uploadProjectImagesFromFormData(project.id, project.title, formData);

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  redirect("/admin/projects?notice=created");
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

  await uploadProjectImagesFromFormData(project.id, project.title, formData);

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${project.slug}`);
  revalidatePath("/admin/projects");
  redirect("/admin/projects?notice=saved");
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
