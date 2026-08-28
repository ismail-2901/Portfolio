"use server";

import { SkillLevel } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/admin";
import { writeAuditLog } from "@/lib/audit";
import { prisma } from "@/lib/prisma";
import { assertSameOrigin } from "@/lib/security";
import { skillSchema } from "@/lib/validation";

function skillDataFromForm(formData: FormData) {
  const parsed = skillSchema.parse({
    name: formData.get("name"),
    category: formData.get("category"),
    level: formData.get("level"),
    order: formData.get("order"),
    featured: formData.get("featured") === "on"
  });

  return {
    ...parsed,
    level: parsed.level as SkillLevel
  };
}

export async function createSkillAction(formData: FormData) {
  const session = await requireAdmin();
  await assertSameOrigin();

  const data = skillDataFromForm(formData);
  const skill = await prisma.skill.create({ data });

  await writeAuditLog({
    actorId: session.user.id,
    action: "create",
    entity: "skill",
    entityId: skill.id,
    metadata: { name: skill.name }
  });

  revalidatePath("/");
  revalidatePath("/about");
  redirect("/admin/skills?notice=created");
}

export async function updateSkillAction(id: string, formData: FormData) {
  const session = await requireAdmin();
  await assertSameOrigin();

  const data = skillDataFromForm(formData);
  const skill = await prisma.skill.update({
    where: { id },
    data
  });

  await writeAuditLog({
    actorId: session.user.id,
    action: "update",
    entity: "skill",
    entityId: skill.id,
    metadata: { name: skill.name }
  });

  revalidatePath("/");
  revalidatePath("/about");
  redirect("/admin/skills?notice=saved");
}

export async function deleteSkillAction(id: string) {
  const session = await requireAdmin();
  await assertSameOrigin();

  const skill = await prisma.skill.delete({ where: { id } });

  await writeAuditLog({
    actorId: session.user.id,
    action: "delete",
    entity: "skill",
    entityId: id,
    metadata: { name: skill.name }
  });

  revalidatePath("/");
  revalidatePath("/about");
  redirect("/admin/skills?notice=deleted");
}
