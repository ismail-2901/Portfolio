"use server";

import { del, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/admin";
import { writeAuditLog } from "@/lib/audit";
import { prisma } from "@/lib/prisma";
import { fallbackProfile } from "@/lib/queries";
import { assertRateLimit } from "@/lib/rate-limit";
import { assertSameOrigin } from "@/lib/security";
import { imageUploadSchema } from "@/lib/validation";

const acceptedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
const maxUploadBytes = 4 * 1024 * 1024;

function getBlobToken() {
  return process.env.BLOB_READ_WRITE_TOKEN?.trim() || process.env.PORTFOLIO_BLOB_READ_WRITE_TOKEN?.trim() || "";
}

function assertUploadTokenConfigured() {
  const blobToken = getBlobToken();

  if (!blobToken) {
    throw new Error("Set BLOB_READ_WRITE_TOKEN (or PORTFOLIO_BLOB_READ_WRITE_TOKEN) before enabling image uploads.");
  }
}

export async function uploadProjectImageAction(formData: FormData) {
  const session = await requireAdmin();
  await assertSameOrigin();
  const blobToken = getBlobToken();

  assertUploadTokenConfigured();

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
  const blobToken = getBlobToken();

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

export async function uploadProfileImageAction(formData: FormData) {
  const session = await requireAdmin();
  await assertSameOrigin();
  const blobToken = getBlobToken();

  assertUploadTokenConfigured();

  await assertRateLimit({
    key: `profile-upload:${session.user.id}`,
    limit: 6,
    windowSeconds: 60
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

  const existing = await prisma.profile.findUnique({ where: { id: "singleton" } });
  const blob = await put(`profile-images/${session.user.id}/${file.name}`, file, {
    access: "public",
    token: blobToken,
    addRandomSuffix: true
  });

  if (existing?.imageUrl && existing.imageUrl !== blob.url) {
    await del(existing.imageUrl, { token: blobToken }).catch(() => undefined);
  }

  const profileData = existing ?? {
    id: "singleton",
    name: fallbackProfile.name,
    role: fallbackProfile.role,
    location: fallbackProfile.location,
    shortBio: fallbackProfile.shortBio,
    email: fallbackProfile.email,
    githubUrl: fallbackProfile.githubUrl,
    linkedinUrl: fallbackProfile.linkedinUrl,
    resumeUrl: fallbackProfile.resumeUrl,
    imageUrl: null,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  if (existing) {
    await prisma.profile.update({
      where: { id: "singleton" },
      data: {
        ...profileData,
        imageUrl: blob.url
      }
    });
  } else {
    await prisma.profile.create({
      data: {
        ...profileData,
        imageUrl: blob.url
      }
    });
  }

  await writeAuditLog({
    actorId: session.user.id,
    action: "upload",
    entity: "profileImage",
    entityId: "singleton"
  });

  revalidatePath("/");
  revalidatePath("/about");
  redirect("/admin/profile?notice=uploaded");
}

export async function deleteProfileImageAction() {
  const session = await requireAdmin();
  await assertSameOrigin();
  const blobToken = getBlobToken();
  const existing = await prisma.profile.findUnique({ where: { id: "singleton" } });

  if (existing?.imageUrl) {
    if (blobToken) {
      await del(existing.imageUrl, { token: blobToken }).catch(() => undefined);
    }

    await prisma.profile.update({
      where: { id: "singleton" },
      data: { imageUrl: null }
    });
  }

  await writeAuditLog({
    actorId: session.user.id,
    action: "delete",
    entity: "profileImage",
    entityId: "singleton"
  });

  revalidatePath("/");
  revalidatePath("/about");
  redirect("/admin/profile?notice=deleted");
}
