"use server";

import { ContentStatus } from "@prisma/client";
import readingTime from "reading-time";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/admin";
import { writeAuditLog } from "@/lib/audit";
import { prisma } from "@/lib/prisma";
import { slugify, splitCsv } from "@/lib/slug";
import { assertSameOrigin } from "@/lib/security";
import { articleSchema } from "@/lib/validation";

function tagsPayload(tagNames: string[]) {
  return tagNames.map((name) => ({
    where: { slug: slugify(name) },
    create: { name, slug: slugify(name) }
  }));
}

function articleDataFromForm(formData: FormData) {
  const parsed = articleSchema.parse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    body: formData.get("body"),
    seoTitle: formData.get("seoTitle"),
    seoDescription: formData.get("seoDescription"),
    tagNames: splitCsv(formData.get("tagNames")),
    status: formData.get("status")
  });

  return {
    ...parsed,
    slug: parsed.slug || slugify(parsed.title),
    seoTitle: parsed.seoTitle || null,
    seoDescription: parsed.seoDescription || null,
    status: parsed.status as ContentStatus,
    readingMinutes: Math.max(1, Math.ceil(readingTime(parsed.body).minutes))
  };
}

export async function createArticleAction(formData: FormData) {
  const session = await requireAdmin();
  await assertSameOrigin();

  const data = articleDataFromForm(formData);
  const article = await prisma.article.create({
    data: {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      body: data.body,
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
      status: data.status,
      publishedAt: data.status === ContentStatus.PUBLISHED ? new Date() : null,
      readingMinutes: data.readingMinutes,
      tags: {
        connectOrCreate: tagsPayload(data.tagNames)
      }
    }
  });

  await writeAuditLog({
    actorId: session.user.id,
    action: "create",
    entity: "article",
    entityId: article.id,
    metadata: { slug: article.slug }
  });

  revalidatePath("/");
  revalidatePath("/blog");
  redirect(`/admin/articles/${article.id}`);
}

export async function updateArticleAction(id: string, formData: FormData) {
  const session = await requireAdmin();
  await assertSameOrigin();

  const data = articleDataFromForm(formData);
  const article = await prisma.article.update({
    where: { id },
    data: {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      body: data.body,
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
      status: data.status,
      publishedAt: data.status === ContentStatus.PUBLISHED ? new Date() : null,
      readingMinutes: data.readingMinutes,
      tags: {
        set: [],
        connectOrCreate: tagsPayload(data.tagNames)
      }
    }
  });

  await writeAuditLog({
    actorId: session.user.id,
    action: "update",
    entity: "article",
    entityId: article.id,
    metadata: { slug: article.slug }
  });

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${article.slug}`);
  redirect(`/admin/articles/${article.id}`);
}

export async function deleteArticleAction(id: string) {
  const session = await requireAdmin();
  await assertSameOrigin();

  const article = await prisma.article.delete({ where: { id } });

  await writeAuditLog({
    actorId: session.user.id,
    action: "delete",
    entity: "article",
    entityId: id,
    metadata: { slug: article.slug }
  });

  revalidatePath("/");
  revalidatePath("/blog");
  redirect("/admin/articles");
}
