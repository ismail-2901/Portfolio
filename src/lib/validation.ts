import { z } from "zod";
import { slugify } from "@/lib/slug";

const nullableUrl = z
  .string()
  .trim()
  .optional()
  .transform((value) => (value ? value : null))
  .pipe(z.string().url().nullable());

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(12, "Password must be at least 12 characters.")
});

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().min(20).max(4000),
  website: z.string().max(0).optional()
});

export const projectSchema = z.object({
  title: z.string().trim().min(3).max(160),
  slug: z
    .string()
    .trim()
    .max(180)
    .optional()
    .transform((value, context) => {
      const slug = value ? slugify(value) : "";
      if (value && !slug) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Slug must contain letters or numbers."
        });
      }
      return slug;
    }),
  summary: z.string().trim().min(20).max(600),
  body: z.string().trim().min(20).max(30_000),
  techTags: z.array(z.string().trim().min(1).max(40)).max(20),
  tagNames: z.array(z.string().trim().min(1).max(40)).max(20),
  githubUrl: nullableUrl,
  liveUrl: nullableUrl,
  featured: z.boolean(),
  order: z.coerce.number().int().min(0).max(9999),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"])
});

export const articleSchema = z.object({
  title: z.string().trim().min(3).max(180),
  slug: z
    .string()
    .trim()
    .max(200)
    .optional()
    .transform((value, context) => {
      const slug = value ? slugify(value) : "";
      if (value && !slug) {
        context.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Slug must contain letters or numbers."
        });
      }
      return slug;
    }),
  excerpt: z.string().trim().min(20).max(500),
  body: z.string().trim().min(20).max(50_000),
  seoTitle: z.string().trim().max(180).optional().or(z.literal("")),
  seoDescription: z.string().trim().max(240).optional().or(z.literal("")),
  tagNames: z.array(z.string().trim().min(1).max(40)).max(20),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"])
});

export const skillSchema = z.object({
  name: z.string().trim().min(2).max(80),
  category: z.string().trim().min(2).max(80),
  level: z.enum(["WORKING", "ADVANCED", "EXPERT"]),
  order: z.coerce.number().int().min(0).max(9999),
  featured: z.boolean()
});

const publicUrlOrPath = z
  .string()
  .trim()
  .min(1)
  .refine((value) => value.startsWith("/") || z.string().url().safeParse(value).success || value.startsWith("["), {
    message: "Use a public URL, a local public path, or keep the placeholder."
  });

export const profileSchema = z.object({
  name: z.string().trim().min(2).max(120),
  role: z.string().trim().min(2).max(160),
  location: z.string().trim().min(2).max(160),
  shortBio: z.string().trim().min(20).max(1000),
  email: z.string().trim().email().max(180),
  githubUrl: publicUrlOrPath,
  linkedinUrl: publicUrlOrPath,
  resumeUrl: publicUrlOrPath
});

export const imageUploadSchema = z.object({
  projectId: z.string().cuid(),
  alt: z.string().trim().min(4).max(180),
  isCover: z.boolean(),
  order: z.coerce.number().int().min(0).max(9999)
});
