"use server";

import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

import { signIn, signOut } from "@/auth";
import { assertRateLimit } from "@/lib/rate-limit";
import { assertSameOrigin } from "@/lib/security";
import { loginSchema } from "@/lib/validation";

export type LoginState = {
  ok: boolean;
  message?: string;
};

export async function loginAction(_previousState: LoginState, formData: FormData): Promise<LoginState> {
  await assertSameOrigin();

  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Use a valid email and a password of at least 12 characters."
    };
  }

  await assertRateLimit({
    key: `login:${parsed.data.email.toLowerCase()}`,
    limit: 5,
    windowSeconds: 60
  });

  try {
    await signIn("credentials", {
      email: parsed.data.email.toLowerCase(),
      password: parsed.data.password,
      redirectTo: "/admin"
    });
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof AuthError) {
      return {
        ok: false,
        message: "Invalid email or password."
      };
    }

    return {
      ok: false,
      message: "Unable to sign in. Make sure the admin database is running and seeded."
    };
  }

  return { ok: true };
}

export async function logoutAction() {
  await signOut({ redirectTo: "/" });
}
