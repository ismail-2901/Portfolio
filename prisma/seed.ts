import { PrismaClient, ContentStatus, SkillLevel } from "@prisma/client";
import bcrypt from "bcryptjs";
import readingTime from "reading-time";

const prisma = new PrismaClient();

const seedProfile = {
  id: "singleton",
  name: "Md Ismail Hossain",
  role: "Full-Stack Software Engineering Student",
  location: "Dhaka, Bangladesh",
  shortBio:
    "Undergraduate Software Engineering student at Daffodil International University (DIU), building production-ready full-stack web applications with modern technologies. Passionate about clean architecture, meaningful user experiences, and AI-integrated systems.",
  email: "ismailsajinabusaleh@gmail.com",
  githubUrl: "https://github.com/ismail-2901",
  linkedinUrl: "https://www.linkedin.com/in/md-ismail-hossain-2001",
  resumeUrl: "/resume"
};

const fixMyCampusBody = `## Overview

FixMyCampus is a campus issue reporting and management platform built for Daffodil International University (DIU). It streamlines how students report infrastructure and academic problems, and how administrators respond, assign, and resolve them.

## Problem

Before FixMyCampus, campus issues were reported informally through WhatsApp groups, emails, or in-person visits. There was no accountability, no tracking, and no transparency. Issues often fell through the cracks.

## Engineering Approach

The system is built on a React frontend and an Express/Node.js backend, backed by MySQL. Role-based access control separates student reporters, department administrators, and super-admins.

Key engineering decisions:

- **Anonymous reporting**: Students can file reports without exposing their identity, encouraging honest feedback.
- **Assignment workflow**: Admins can assign issues to responsible staff with deadline tracking.
- **AI chatbot**: An integrated chatbot helps students find answers to common questions and guides them through the reporting flow.
- **Transparency board**: A public-facing board shows aggregated, anonymised issue statistics to build trust.
- **Group discussions**: Students can comment and discuss related issues, reducing duplicate reports.

## Technical Stack

- **Frontend**: React, React Router, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Auth**: JWT-based role system (Student / Admin / SuperAdmin)
- **AI**: Integrated chatbot for student guidance

## Impact

Provides a transparent, accountable issue management loop for a university campus, improving both student experience and administrative efficiency.`;

const elarisBody = `## Overview

ELARIS is a modern fashion e-commerce platform with a full customer storefront and an integrated admin management system. The project was built to explore full-stack e-commerce architecture — from product catalog to order fulfilment.

## Problem

Building an e-commerce platform that handles both the customer experience and the operational backend in a single cohesive system is a non-trivial engineering challenge. ELARIS addresses this by separating concerns while keeping data consistent across both surfaces.

## Engineering Approach

ELARIS is a full-stack Next.js application. The storefront and admin panel share the same database and API layer, ensuring real-time consistency between inventory, orders, and customer data.

Key engineering decisions:

- **Product catalog**: Dynamic category and subcategory hierarchy with filtering and search.
- **Shopping cart**: Persistent cart state with both guest and authenticated sessions.
- **Order management**: Full order lifecycle — creation, payment, fulfilment, and history — accessible to both customers and admins.
- **Admin panel**: Dashboard for product, inventory, and order management with role-protected routes.
- **Responsive UI**: Mobile-first responsive design for the full shopping experience.

## Technical Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL via Prisma ORM
- **Auth**: Next-Auth

## Outcome

A production-architecture e-commerce platform demonstrating full-stack Next.js development, database design, and admin/customer separation.`;

const articleBody = `# Building FixMyCampus: Engineering a Campus Issue Reporting System

A technical retrospective on designing FixMyCampus — an anonymous issue reporting and management platform for Daffodil International University.

## The Problem

University infrastructure issues — broken equipment, maintenance requests, academic concerns — were handled through ad-hoc WhatsApp groups and in-person escalation. No tracking, no accountability, no data.

## Architecture Decisions

### Role-Based Access

Three distinct roles required different views and permissions: students who report, admins who manage, and super-admins who oversee. This was implemented with JWT tokens carrying role claims, validated at every API boundary.

### Anonymity by Design

Anonymous reporting required careful thought. The system stores reports without attaching user identity to the public-facing data, while maintaining a private audit trail for moderation purposes. This is a balance between trust and accountability.

### Transparency Board

Aggregated, anonymised statistics build institutional trust. The board shows resolution rates, common categories, and average response times — without exposing individual reports.

## Lessons Learned

- Workflow design is harder than code. Getting the assignment → resolution loop right required multiple iterations based on stakeholder feedback.
- Security at the boundary matters. Every mutation is validated server-side — client-side validation is only UX, not security.
- AI features need a clear scope. The chatbot is scoped to guidance and FAQ — not attempting to replace human administration.`;

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL?.trim();
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME?.trim() || "Ismail Admin";

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

  const tags = [
    "full-stack",
    "campus-tech",
    "e-commerce",
    "react",
    "node",
    "next-js",
    "ai-integration",
    "open-source"
  ];

  for (const tag of tags) {
    await prisma.tag.upsert({
      where: { slug: tag },
      update: { name: tag.replace(/-/g, " ") },
      create: { slug: tag, name: tag.replace(/-/g, " ") }
    });
  }

  const projects = [
    {
      title: "FixMyCampus",
      slug: "fixmycampus",
      summary:
        "A campus issue reporting and management platform for Daffodil International University. Features anonymous reporting, role-based admin workflows, an AI chatbot, and a transparency board.",
      techTags: ["React", "Node.js", "Express.js", "MySQL", "JWT", "Tailwind CSS"],
      githubUrl: "https://github.com/ismail-2901",
      liveUrl: null,
      featured: true,
      order: 1,
      body: fixMyCampusBody,
      tagSlugs: ["full-stack", "campus-tech", "react", "node", "ai-integration"]
    },
    {
      title: "ELARIS",
      slug: "elaris",
      summary:
        "A modern fashion e-commerce platform with a full customer storefront, shopping cart, order management, and an integrated admin dashboard. Built with Next.js and PostgreSQL.",
      techTags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS", "Next-Auth"],
      githubUrl: "https://github.com/ismail-2901",
      liveUrl: null,
      featured: true,
      order: 2,
      body: elarisBody,
      tagSlugs: ["full-stack", "e-commerce", "next-js"]
    }
  ];

  for (const { tagSlugs, ...project } of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {
        ...project,
        status: ContentStatus.PUBLISHED,
        publishedAt: new Date()
      },
      create: {
        ...project,
        status: ContentStatus.PUBLISHED,
        publishedAt: new Date(),
        tags: {
          connect: tagSlugs.map((slug) => ({ slug }))
        }
      }
    });
  }

  const articleMinutes = Math.max(1, Math.ceil(readingTime(articleBody).minutes));
  await prisma.article.upsert({
    where: { slug: "building-fixmycampus" },
    update: {
      title: "Building FixMyCampus: Engineering a Campus Issue Reporting System",
      excerpt:
        "A technical retrospective on designing FixMyCampus — the campus issue reporting and management platform I built for Daffodil International University.",
      body: articleBody,
      seoTitle: "Building FixMyCampus — Full-Stack Campus Platform",
      seoDescription:
        "Engineering decisions behind FixMyCampus: anonymous reporting, role-based workflows, and AI integration for a university platform.",
      status: ContentStatus.PUBLISHED,
      readingMinutes: articleMinutes,
      publishedAt: new Date()
    },
    create: {
      title: "Building FixMyCampus: Engineering a Campus Issue Reporting System",
      slug: "building-fixmycampus",
      excerpt:
        "A technical retrospective on designing FixMyCampus — the campus issue reporting and management platform I built for Daffodil International University.",
      body: articleBody,
      seoTitle: "Building FixMyCampus — Full-Stack Campus Platform",
      seoDescription:
        "Engineering decisions behind FixMyCampus: anonymous reporting, role-based workflows, and AI integration for a university platform.",
      status: ContentStatus.PUBLISHED,
      readingMinutes: articleMinutes,
      publishedAt: new Date(),
      tags: {
        connect: [{ slug: "full-stack" }, { slug: "campus-tech" }]
      }
    }
  });

  const skills = [
    // Frontend
    ["JavaScript", "Frontend", SkillLevel.ADVANCED, true, 1],
    ["TypeScript", "Frontend", SkillLevel.WORKING, true, 2],
    ["React", "Frontend", SkillLevel.ADVANCED, true, 3],
    ["Next.js", "Frontend", SkillLevel.WORKING, true, 4],
    ["Tailwind CSS", "Frontend", SkillLevel.ADVANCED, true, 5],
    // Backend
    ["Node.js", "Backend", SkillLevel.ADVANCED, true, 6],
    ["Express.js", "Backend", SkillLevel.ADVANCED, true, 7],
    ["PHP", "Backend", SkillLevel.WORKING, false, 8],
    // Database
    ["MySQL", "Database", SkillLevel.ADVANCED, true, 9],
    ["PostgreSQL", "Database", SkillLevel.WORKING, false, 10],
    ["Prisma", "Database", SkillLevel.WORKING, false, 11],
    ["Supabase", "Database", SkillLevel.WORKING, false, 12],
    // Tools
    ["Git", "Tools", SkillLevel.ADVANCED, false, 13],
    ["GitHub", "Tools", SkillLevel.ADVANCED, false, 14]
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
    where: { id: "seed-diu" },
    update: {
      company: "Daffodil International University",
      role: "B.Sc. in Software Engineering",
      location: "Dhaka, Bangladesh",
      summary:
        "Pursuing a Bachelor of Science in Software Engineering, building production-ready full-stack applications as academic and personal projects. Focused on web technologies, database design, and software architecture.",
      startDate: new Date("2023-01-01T00:00:00.000Z"),
      current: true,
      order: 1,
      status: ContentStatus.PUBLISHED
    },
    create: {
      id: "seed-diu",
      company: "Daffodil International University",
      role: "B.Sc. in Software Engineering",
      location: "Dhaka, Bangladesh",
      summary:
        "Pursuing a Bachelor of Science in Software Engineering, building production-ready full-stack applications as academic and personal projects. Focused on web technologies, database design, and software architecture.",
      startDate: new Date("2023-01-01T00:00:00.000Z"),
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
        seededAt: new Date().toISOString(),
        version: "v2-ismail-identity"
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
