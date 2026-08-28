"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/admin";
import { writeAuditLog } from "@/lib/audit";
import { prisma } from "@/lib/prisma";
import { assertSameOrigin } from "@/lib/security";
import { profileSchema } from "@/lib/validation";

export async function updateProfileAction(formData: FormData) {
  const session = await requireAdmin();
  await assertSameOrigin();

  const data = profileSchema.parse({
    name: formData.get("name"),
    role: formData.get("role"),
    location: formData.get("location"),
    shortBio: formData.get("shortBio"),
    email: formData.get("email"),
    githubUrl: formData.get("githubUrl"),
    linkedinUrl: formData.get("linkedinUrl"),
    resumeUrl: formData.get("resumeUrl")
  });

  await prisma.profile.upsert({
    where: { id: "singleton" },
    update: data,
    create: {
      id: "singleton",
      ...data
    }
  });

  await writeAuditLog({
    actorId: session.user.id,
    action: "update",
    entity: "profile",
    entityId: "singleton"
  });

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/contact");
  redirect("/admin/profile?notice=saved");
}
