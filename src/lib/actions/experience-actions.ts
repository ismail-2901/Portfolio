"use server";

import { ContentStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/admin";
import { writeAuditLog } from "@/lib/audit";
import { prisma } from "@/lib/prisma";
import { assertSameOrigin } from "@/lib/security";
import { experienceSchema } from "@/lib/validation";

function experienceDataFromForm(formData: FormData) {
  const current = formData.get("current") === "on" || formData.get("current") === "true";
  const parsed = experienceSchema.parse({
    company: formData.get("company"),
    role: formData.get("role"),
    location: formData.get("location") || "",
    summary: formData.get("summary"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate") || "",
    current,
    order: formData.get("order") || 0,
    status: formData.get("status") || "PUBLISHED"
  });

  return {
    company: parsed.company,
    role: parsed.role,
    location: parsed.location || null,
    summary: parsed.summary,
    startDate: new Date(parsed.startDate),
    endDate: current || !parsed.endDate ? null : new Date(parsed.endDate),
    current,
    order: parsed.order,
    status: parsed.status as ContentStatus
  };
}

export async function createExperienceAction(formData: FormData) {
  const session = await requireAdmin();
  await assertSameOrigin();

  const data = experienceDataFromForm(formData);
  const experience = await prisma.experience.create({ data });

  await writeAuditLog({
    actorId: session.user.id,
    action: "create",
    entity: "experience",
    entityId: experience.id,
    metadata: { company: experience.company, role: experience.role }
  });

  revalidatePath("/");
  revalidatePath("/experience");
  revalidatePath("/admin/experience");
  redirect("/admin/experience?notice=created");
}

export async function updateExperienceAction(id: string, formData: FormData) {
  const session = await requireAdmin();
  await assertSameOrigin();

  const data = experienceDataFromForm(formData);
  const experience = await prisma.experience.update({
    where: { id },
    data
  });

  await writeAuditLog({
    actorId: session.user.id,
    action: "update",
    entity: "experience",
    entityId: experience.id,
    metadata: { company: experience.company, role: experience.role }
  });

  revalidatePath("/");
  revalidatePath("/experience");
  revalidatePath("/admin/experience");
  redirect("/admin/experience?notice=saved");
}

export async function deleteExperienceAction(id: string) {
  const session = await requireAdmin();
  await assertSameOrigin();

  const experience = await prisma.experience.delete({ where: { id } });

  await writeAuditLog({
    actorId: session.user.id,
    action: "delete",
    entity: "experience",
    entityId: id,
    metadata: { company: experience.company, role: experience.role }
  });

  revalidatePath("/");
  revalidatePath("/experience");
  revalidatePath("/admin/experience");
  redirect("/admin/experience?notice=deleted");
}
