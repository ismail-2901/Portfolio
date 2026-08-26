import { describe, expect, it } from "vitest";

import { slugify, splitCsv } from "@/lib/slug";

describe("slugify", () => {
  it("normalizes titles into URL-safe slugs", () => {
    expect(slugify("Zero Trust SaaS Platform!")).toBe("zero-trust-saas-platform");
  });

  it("splits comma-separated values without empty entries", () => {
    expect(splitCsv("Next.js, Prisma, , Auth.js")).toEqual(["Next.js", "Prisma", "Auth.js"]);
  });
});
