"use server";

import { headers } from "next/headers";
import { Resend } from "resend";

import { prisma } from "@/lib/prisma";
import { withPublicData } from "@/lib/public-data";
import { assertRateLimit } from "@/lib/rate-limit";
import { assertSameOrigin, hashSensitive } from "@/lib/security";
import { contactSchema } from "@/lib/validation";

export type ContactState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
  values?: ContactValues;
};

export type ContactValues = {
  name: string;
  email: string;
  company: string;
  message: string;
};

function readContactValues(formData: FormData): ContactValues {
  const getString = (key: keyof ContactValues) => {
    const value = formData.get(key);
    return typeof value === "string" ? value : "";
  };

  return {
    name: getString("name"),
    email: getString("email"),
    company: getString("company"),
    message: getString("message")
  };
}

export async function sendContactMessage(
  _previousState: ContactState,
  formData: FormData
): Promise<ContactState> {
  await assertSameOrigin();
  const values = readContactValues(formData);

  const parsed = contactSchema.safeParse({
    ...values,
    website: formData.get("website")
  });

  if (!parsed.success) {
    const submittedFieldErrors = parsed.error.flatten().fieldErrors;
    const fieldErrors = Object.fromEntries(
      (["name", "email", "company", "message"] as const)
        .filter((field) => submittedFieldErrors[field]?.length)
        .map((field) => [field, submittedFieldErrors[field] ?? []])
    );

    return {
      ok: false,
      message: Object.keys(fieldErrors).length
        ? "Please review the errors below and update the marked fields."
        : "We could not process this submission. Please try again or use one of the direct contact links.",
      fieldErrors,
      values
    };
  }

  const headerStore = await headers();
  const ipHash = hashSensitive(
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ?? headerStore.get("x-real-ip")
  );

  try {
    await assertRateLimit({
      key: `contact:${ipHash ?? parsed.data.email.toLowerCase()}`,
      limit: 4,
      windowSeconds: 60 * 10
    });
  } catch (error) {
    const isRateLimited = error instanceof Error && error.message.startsWith("Too many requests.");

    return {
      ok: false,
      message: isRateLimited
        ? "You have reached the message limit. Please wait 10 minutes and try again."
        : "We could not check your request right now. Your details are still here; please try again shortly.",
      values
    };
  }

  const recentDuplicate = await withPublicData(() =>
    prisma.contactMessage.findFirst({
      where: {
        email: parsed.data.email.toLowerCase(),
        message: parsed.data.message,
        createdAt: {
          gte: new Date(Date.now() - 60_000)
        }
      },
      select: { id: true }
    })
  ).catch(() => ({ available: false as const, data: null }));

  if (recentDuplicate.available && recentDuplicate.data) {
    return {
      ok: true,
      message: `Message received. Reference: ${recentDuplicate.data.id.slice(0, 8)}`
    };
  }

  const messageResult = await withPublicData(() =>
    prisma.contactMessage.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email.toLowerCase(),
        company: parsed.data.company || null,
        message: parsed.data.message,
        ipHash,
        userAgent: headerStore.get("user-agent")
      }
    })
  ).catch(() => ({ available: false as const, data: null }));

  if (!messageResult.available) {
    return {
      ok: false,
      message: "The contact service is temporarily unavailable. Your details are still here; please try again shortly.",
      values
    };
  }

  const message = messageResult.data;
  let emailNotificationFailed = false;

  if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL && process.env.CONTACT_FROM_EMAIL) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const result = await resend.emails.send({
        from: process.env.CONTACT_FROM_EMAIL,
        to: process.env.CONTACT_TO_EMAIL,
        subject: `Portfolio inquiry from ${parsed.data.name}`,
        text: `${parsed.data.name} <${parsed.data.email}>\n${parsed.data.company ?? ""}\n\n${parsed.data.message}`
      });
      emailNotificationFailed = Boolean(result.error);
    } catch {
      emailNotificationFailed = true;
    }
  }

  return {
    ok: true,
    message: emailNotificationFailed
      ? `Your message was saved. The email notification could not be sent, so you do not need to submit it again. Reference: ${message.id.slice(0, 8)}`
      : `Message received. Reference: ${message.id.slice(0, 8)}`
  };
}
