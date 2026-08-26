import { redirect } from "next/navigation";

import { auth } from "@/auth";

export async function getAdminSession() {
  return auth();
}

export async function requireAdmin() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/admin/login");
  }

  return session;
}
