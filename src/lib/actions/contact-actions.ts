"use server";

import { headers } from "next/headers";
import { Resend } from "resend";

import { prisma } from "@/lib/prisma";
import { assertRateLimit } from "@/lib/rate-limit";
import { assertSameOrigin, hashSensitive } from "@/lib/security";
import { contactSchema } from "@/lib/validation";

export type ContactState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function sendContactMessage(
  _previousState: ContactState,
  formData: FormData
): Promise<ContactState> {
  await assertSameOrigin();

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    message: formData.get("message"),
    website: formData.get("website")
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please check the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors
    };
  }

  const headerStore = await headers();
  const ipHash = hashSensitive(
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ?? headerStore.get("x-real-ip")
  );

  await assertRateLimit({
    key: `contact:${ipHash ?? parsed.data.email.toLowerCase()}`,
    limit: 4,
    windowSeconds: 60 * 10
  });

  const message = await prisma.contactMessage.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email.toLowerCase(),
      company: parsed.data.company || null,
      message: parsed.data.message,
      ipHash,
      userAgent: headerStore.get("user-agent")
    }
  });

  if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL && process.env.CONTACT_FROM_EMAIL) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL,
      to: process.env.CONTACT_TO_EMAIL,
      subject: `Portfolio inquiry from ${parsed.data.name}`,
      text: `${parsed.data.name} <${parsed.data.email}>\n${parsed.data.company ?? ""}\n\n${parsed.data.message}`
    });
  }

  return {
    ok: true,
    message: `Message received. Reference: ${message.id.slice(0, 8)}`
  };
}
