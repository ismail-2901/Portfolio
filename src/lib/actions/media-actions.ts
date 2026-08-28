"use server";

import { del, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/admin";
import { writeAuditLog } from "@/lib/audit";
import { prisma } from "@/lib/prisma";
import { assertRateLimit } from "@/lib/rate-limit";
import { assertSameOrigin } from "@/lib/security";
import { imageUploadSchema } from "@/lib/validation";

const acceptedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
const maxUploadBytes = 4 * 1024 * 1024;
const blobToken = process.env.BLOB_READ_WRITE_TOKEN ?? process.env.PORTFOLIO_BLOB_READ_WRITE_TOKEN;

export async function uploadProjectImageAction(formData: FormData) {
  const session = await requireAdmin();
  await assertSameOrigin();

  if (!blobToken) {
    throw new Error("BLOB_READ_WRITE_TOKEN is required before image uploads are enabled.");
  }

  await assertRateLimit({
    key: `upload:${session.user.id}`,
    limit: 12,
    windowSeconds: 60
  });

  const parsed = imageUploadSchema.parse({
    projectId: formData.get("projectId"),
    alt: formData.get("alt"),
    isCover: formData.get("isCover") === "on",
    order: formData.get("order")
  });
  const file = formData.get("file");

  if (!(file instanceof File)) {
    throw new Error("Select an image file.");
  }

  if (!acceptedTypes.has(file.type)) {
    throw new Error("Only JPEG, PNG, WebP, and AVIF images are accepted.");
  }

  if (file.size > maxUploadBytes) {
    throw new Error("Image uploads must be 4 MB or smaller.");
  }

  if (parsed.isCover) {
    await prisma.projectImage.updateMany({
      where: { projectId: parsed.projectId },
      data: { isCover: false }
    });
  }

  const blob = await put(`project-images/${parsed.projectId}/${file.name}`, file, {
    access: "public",
    token: blobToken,
    addRandomSuffix: true
  });

  const image = await prisma.projectImage.create({
    data: {
      projectId: parsed.projectId,
      url: blob.url,
      alt: parsed.alt,
      isCover: parsed.isCover,
      order: parsed.order
    }
  });

  await writeAuditLog({
    actorId: session.user.id,
    action: "upload",
    entity: "projectImage",
    entityId: image.id,
    metadata: { projectId: parsed.projectId }
  });

  revalidatePath("/");
  revalidatePath("/projects");
  redirect(`/admin/projects/${parsed.projectId}?notice=uploaded`);
}

export async function deleteProjectImageAction(id: string) {
  const session = await requireAdmin();
  await assertSameOrigin();

  const image = await prisma.projectImage.delete({ where: { id } });

  if (blobToken) {
    await del(image.url, { token: blobToken });
  }

  await writeAuditLog({
    actorId: session.user.id,
    action: "delete",
    entity: "projectImage",
    entityId: id,
    metadata: { projectId: image.projectId }
  });

  revalidatePath("/");
  revalidatePath("/projects");
  redirect(`/admin/projects/${image.projectId}?notice=deleted`);
}
