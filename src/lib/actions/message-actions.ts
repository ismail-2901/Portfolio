"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/admin";
import { writeAuditLog } from "@/lib/audit";
import { prisma } from "@/lib/prisma";
import { assertSameOrigin } from "@/lib/security";

export async function markMessageReadAction(id: string) {
  const session = await requireAdmin();
  await assertSameOrigin();

  await prisma.contactMessage.update({
    where: { id },
    data: { readAt: new Date() }
  });

  await writeAuditLog({
    actorId: session.user.id,
    action: "read",
    entity: "contactMessage",
    entityId: id
  });

  revalidatePath("/admin/messages");
}

export async function archiveMessageAction(id: string) {
  const session = await requireAdmin();
  await assertSameOrigin();

  await prisma.contactMessage.update({
    where: { id },
    data: { archivedAt: new Date() }
  });

  await writeAuditLog({
    actorId: session.user.id,
    action: "archive",
    entity: "contactMessage",
    entityId: id
  });

  revalidatePath("/admin/messages");
}
