import { PrismaClient, ContentStatus, SkillLevel } from "@prisma/client";
import bcrypt from "bcryptjs";
import readingTime from "reading-time";

const prisma = new PrismaClient();

const seedProfile = {
  id: "singleton",
  name: "Ismail",
  role: "Senior Full-Stack Engineer",
  location: "Remote",
  shortBio:
    "I design and ship secure, scalable web platforms with the polish of a product studio and the discipline of a production engineering team.",
  email: "hello@ismail.dev",
  githubUrl: "https://github.com",
  linkedinUrl: "https://www.linkedin.com",
  resumeUrl: "/resume"
};

const projectBody = `## Overview

This project demonstrates secure product engineering with a measurable user experience focus. Replace this seed content with a real case study from the admin dashboard.

## Engineering Notes

- Authenticated workflows are validated at the server boundary.
- UI states are designed for fast scanning and keyboard access.
- Deployment assumes observability, rollback discipline, and least-privilege secrets.`;

const articleBody = `# Production Notes

Great engineering portfolios should show how decisions were made, not only what shipped. Use MDX or Markdown here for technical writeups, architecture notes, and postmortems.

## Security Lens

The strongest signal is a clear threat model, explicit tradeoffs, and evidence that quality gates ran before release.`;

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL?.trim();
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME?.trim() || "Portfolio Admin";

  if (!adminEmail || !adminPassword) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be configured before seeding.");
  }

  if (adminPassword.length < 12) {
    throw new Error("ADMIN_PASSWORD must contain at least 12 characters.");
  }

  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {
      name: adminName,
      passwordHash
    },
    create: {
      email: adminEmail,
      name: adminName,
      passwordHash
    }
  });

  await prisma.profile.upsert({
    where: { id: "singleton" },
    update: seedProfile,
    create: seedProfile
  });

  const tags = ["security", "platform", "frontend", "devops", "ai-systems"];
  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { slug: tag },
      update: { name: tag.replace("-", " ") },
      create: { slug: tag, name: tag.replace("-", " ") }
    });
  }

  const projects = [
    {
      title: "Zero Trust SaaS Platform",
      slug: "zero-trust-saas-platform",
      summary: "A multi-tenant SaaS control plane with hardened auth, audit trails, and low-latency dashboards.",
      techTags: ["Next.js", "PostgreSQL", "Prisma", "Auth.js", "Vercel"],
      featured: true,
      order: 1
    },
    {
      title: "Realtime Operations Console",
      slug: "realtime-operations-console",
      summary: "A command center for operational teams with live state, incident workflows, and accessible data density.",
      techTags: ["React", "TypeScript", "WebSockets", "Playwright"],
      featured: true,
      order: 2
    },
    {
      title: "Secure Developer Portal",
      slug: "secure-developer-portal",
      summary: "A documentation and API onboarding platform with fine-grained roles and automated compliance evidence.",
      techTags: ["MDX", "Node.js", "PostgreSQL", "CI/CD"],
      featured: true,
      order: 3
    }
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {
        ...project,
        body: projectBody,
        status: ContentStatus.PUBLISHED,
        publishedAt: new Date()
      },
      create: {
        ...project,
        body: projectBody,
        status: ContentStatus.PUBLISHED,
        publishedAt: new Date(),
        tags: {
          connect: [{ slug: "security" }, { slug: "platform" }]
        }
      }
    });
  }

  const articleMinutes = Math.max(1, Math.ceil(readingTime(articleBody).minutes));
  await prisma.article.upsert({
    where: { slug: "what-senior-engineering-portfolios-should-prove" },
    update: {
      title: "What Senior Engineering Portfolios Should Prove",
      excerpt: "A concise rubric for showing architecture judgment, delivery maturity, and security awareness.",
      body: articleBody,
      seoTitle: "Senior Engineering Portfolio Rubric",
      seoDescription: "How to structure portfolio writing around technical judgment, not just screenshots.",
      status: ContentStatus.PUBLISHED,
      readingMinutes: articleMinutes,
      publishedAt: new Date()
    },
    create: {
      title: "What Senior Engineering Portfolios Should Prove",
      slug: "what-senior-engineering-portfolios-should-prove",
      excerpt: "A concise rubric for showing architecture judgment, delivery maturity, and security awareness.",
      body: articleBody,
      seoTitle: "Senior Engineering Portfolio Rubric",
      seoDescription: "How to structure portfolio writing around technical judgment, not just screenshots.",
      status: ContentStatus.PUBLISHED,
      readingMinutes: articleMinutes,
      publishedAt: new Date(),
      tags: {
        connect: [{ slug: "devops" }, { slug: "security" }]
      }
    }
  });

  const skills = [
    ["Next.js", "Frontend", SkillLevel.EXPERT, true, 1],
    ["React", "Frontend", SkillLevel.EXPERT, true, 2],
    ["TypeScript", "Language", SkillLevel.EXPERT, true, 3],
    ["PostgreSQL", "Database", SkillLevel.ADVANCED, true, 4],
    ["Prisma", "Database", SkillLevel.ADVANCED, true, 5],
    ["Auth.js", "Security", SkillLevel.ADVANCED, true, 6],
    ["OWASP", "Security", SkillLevel.ADVANCED, true, 7],
    ["Docker", "DevOps", SkillLevel.ADVANCED, false, 8],
    ["Playwright", "Quality", SkillLevel.ADVANCED, false, 9]
  ] as const;

  for (const [name, category, level, featured, order] of skills) {
    await prisma.skill.upsert({
      where: {
        name_category: {
          name,
          category
        }
      },
      update: { level, featured, order },
      create: { name, category, level, featured, order }
    });
  }

  await prisma.experience.upsert({
    where: { id: "seed-current-role" },
    update: {
      company: "Independent Practice",
      role: "Senior Full-Stack Engineer",
      location: "Remote",
      summary:
        "Leading architecture, security, and delivery for production web systems.",
      startDate: new Date("2021-01-01T00:00:00.000Z"),
      current: true,
      order: 1,
      status: ContentStatus.PUBLISHED
    },
    create: {
      id: "seed-current-role",
      company: "Independent Practice",
      role: "Senior Full-Stack Engineer",
      location: "Remote",
      summary:
        "Leading architecture, security, and delivery for production web systems.",
      startDate: new Date("2021-01-01T00:00:00.000Z"),
      current: true,
      order: 1,
      status: ContentStatus.PUBLISHED
    }
  });

  await prisma.auditLog.create({
    data: {
      action: "seed",
      entity: "database",
      metadata: {
        seededAt: new Date().toISOString()
      }
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
