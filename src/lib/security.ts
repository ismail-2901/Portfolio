import { createHash, timingSafeEqual } from "node:crypto";
import { headers } from "next/headers";

export function hashSensitive(value: string | null | undefined) {
  if (!value) {
    return undefined;
  }

  return createHash("sha256").update(value).digest("hex");
}

export async function assertSameOrigin() {
  const headerStore = await headers();
  const origin = headerStore.get("origin");
  const host = headerStore.get("host");

  if (!origin || !host) {
    return;
  }

  const originHost = new URL(origin).host;
  if (originHost !== host) {
    throw new Error("Invalid request origin.");
  }
}

export function safeCompare(value: string, expected: string) {
  const left = Buffer.from(value);
  const right = Buffer.from(expected);

  if (left.byteLength !== right.byteLength) {
    return false;
  }

  return timingSafeEqual(left, right);
}

export function getClientFingerprint(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip");
  return hashSensitive(forwardedFor ?? realIp ?? "unknown");
}
