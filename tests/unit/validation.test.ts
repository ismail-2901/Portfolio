import { describe, expect, it } from "vitest";

import { contactSchema, projectSchema } from "@/lib/validation";

describe("validation schemas", () => {
  it("rejects short contact messages", () => {
    const result = contactSchema.safeParse({
      name: "Ada",
      email: "ada@example.com",
      message: "Too short",
      website: ""
    });

    expect(result.success).toBe(false);
  });

  it("accepts a publishable project payload", () => {
    const result = projectSchema.safeParse({
      title: "Secure Portal",
      slug: "secure-portal",
      summary: "A secure platform case study with enough detail for validation.",
      body: "## Body\n\nThis is enough body copy to describe the implementation.",
      techTags: ["Next.js", "Prisma"],
      tagNames: ["security"],
      githubUrl: "",
      liveUrl: "",
      featured: true,
      order: 1,
      status: "PUBLISHED"
    });

    expect(result.success).toBe(true);
  });
});
