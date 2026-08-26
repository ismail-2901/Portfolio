import { ContentStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export type PublicProfile = {
  name: string;
  role: string;
  location: string;
  shortBio: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  resumeUrl: string;
};

export type PublicTag = {
  name: string;
  slug: string;
};

export type PublicImage = {
  id: string;
  url: string;
  alt: string;
  width: number | null;
  height: number | null;
  isCover: boolean;
  order: number;
  createdAt: Date;
};

export type PublicProject = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  body: string;
  techTags: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  featured: boolean;
  order: number;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  images: PublicImage[];
  tags: PublicTag[];
};

export type PublicArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  seoTitle: string | null;
  seoDescription: string | null;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  publishedAt: Date | null;
  readingMinutes: number;
  createdAt: Date;
  updatedAt: Date;
  tags: PublicTag[];
};

export type PublicSkill = {
  id: string;
  name: string;
  category: string;
  level: "WORKING" | "ADVANCED" | "EXPERT";
  order: number;
  featured: boolean;
};

export type PublicExperience = {
  id: string;
  company: string;
  role: string;
  location: string | null;
  summary: string;
  startDate: Date;
  endDate: Date | null;
  current: boolean;
  order: number;
};

const now = new Date("2026-01-01T00:00:00.000Z");

export const fallbackProfile: PublicProfile = {
  name: "Ismail",
  role: "Senior Full-Stack Engineer",
  location: "Remote",
  shortBio:
    "I build secure, scalable, and beautiful digital experiences across product strategy, infrastructure, and polished frontend systems.",
  email: "hello@ismail.dev",
  githubUrl: "https://github.com",
  linkedinUrl: "https://www.linkedin.com",
  resumeUrl: "/resume"
};

export const fallbackProjects: PublicProject[] = [
  {
    id: "fallback-zero-trust",
    title: "Zero Trust SaaS Platform",
    slug: "zero-trust-saas-platform",
    summary: "A multi-tenant SaaS control plane with hardened auth, audit trails, and low-latency dashboards.",
    body: "## Overview\n\nA production-grade SaaS platform built around clear tenancy boundaries, observable workflows, and a fast operator experience.\n\n## Highlights\n\n- Role-based access control and audit trails.\n- Server-side validation for all mutations.\n- Observable deployment workflow with rollback discipline.",
    techTags: ["Next.js", "PostgreSQL", "Prisma", "Auth.js"],
    githubUrl: null,
    liveUrl: null,
    featured: true,
    order: 1,
    status: "PUBLISHED",
    publishedAt: now,
    createdAt: now,
    updatedAt: now,
    images: [
      {
        id: "fallback-zero-trust-image",
        url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80",
        alt: "Dark server infrastructure with network lighting",
        width: 1400,
        height: 900,
        isCover: true,
        order: 0,
        createdAt: now
      }
    ],
    tags: [
      { name: "security", slug: "security" },
      { name: "platform", slug: "platform" }
    ]
  },
  {
    id: "fallback-ops-console",
    title: "Realtime Operations Console",
    slug: "realtime-operations-console",
    summary: "A dense but calm command center for incidents, live system state, and operational workflows.",
    body: "## Overview\n\nA realtime operations interface designed for high-pressure teams that need a calm view of changing system state.\n\n## Highlights\n\n- Accessible information density.\n- Optimistic workflows with durable server writes.\n- E2E smoke coverage for critical paths.",
    techTags: ["React", "TypeScript", "WebSockets", "Playwright"],
    githubUrl: null,
    liveUrl: null,
    featured: true,
    order: 2,
    status: "PUBLISHED",
    publishedAt: now,
    createdAt: now,
    updatedAt: now,
    images: [
      {
        id: "fallback-ops-image",
        url: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1400&q=80",
        alt: "Architectural geometric structure with high-contrast lines",
        width: 1400,
        height: 900,
        isCover: true,
        order: 0,
        createdAt: now
      }
    ],
    tags: [
      { name: "frontend", slug: "frontend" },
      { name: "devops", slug: "devops" }
    ]
  },
  {
    id: "fallback-dev-portal",
    title: "Secure Developer Portal",
    slug: "secure-developer-portal",
    summary: "A documentation and API onboarding platform with permissions, MDX publishing, and compliance evidence.",
    body: "## Overview\n\nA developer portal focused on reducing support load and improving integration quality.\n\n## Highlights\n\n- MDX documentation workflow.\n- Fine-grained admin publishing.\n- Security-forward content model.",
    techTags: ["MDX", "Node.js", "PostgreSQL", "CI/CD"],
    githubUrl: null,
    liveUrl: null,
    featured: true,
    order: 3,
    status: "PUBLISHED",
    publishedAt: now,
    createdAt: now,
    updatedAt: now,
    images: [
      {
        id: "fallback-portal-image",
        url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",
        alt: "Laptop showing a web product interface",
        width: 1400,
        height: 900,
        isCover: true,
        order: 0,
        createdAt: now
      }
    ],
    tags: [
      { name: "platform", slug: "platform" },
      { name: "frontend", slug: "frontend" }
    ]
  }
];

const fallbackArticles: PublicArticle[] = [
  {
    id: "fallback-article",
    title: "What Senior Engineering Portfolios Should Prove",
    slug: "what-senior-engineering-portfolios-should-prove",
    excerpt: "A concise rubric for showing architecture judgment, delivery maturity, and security awareness.",
    body: "# What Senior Engineering Portfolios Should Prove\n\nStrong portfolios show decision quality. They make tradeoffs visible, explain constraints, and connect implementation details to product outcomes.\n\n## Signals\n\n- Threat modeling before implementation.\n- Clear release and rollback thinking.\n- Accessibility and performance treated as core quality.",
    seoTitle: "Senior Engineering Portfolio Rubric",
    seoDescription: "A practical rubric for senior engineering portfolio case studies.",
    status: "PUBLISHED",
    publishedAt: now,
    readingMinutes: 2,
    createdAt: now,
    updatedAt: now,
    tags: [
      { name: "security", slug: "security" },
      { name: "devops", slug: "devops" }
    ]
  }
];

const fallbackSkills: PublicSkill[] = [
  { id: "skill-next", name: "Next.js", category: "Frontend", level: "EXPERT", order: 1, featured: true },
  { id: "skill-react", name: "React", category: "Frontend", level: "EXPERT", order: 2, featured: true },
  { id: "skill-ts", name: "TypeScript", category: "Language", level: "EXPERT", order: 3, featured: true },
  { id: "skill-pg", name: "PostgreSQL", category: "Database", level: "ADVANCED", order: 4, featured: true },
  { id: "skill-auth", name: "Auth.js", category: "Security", level: "ADVANCED", order: 5, featured: true },
  { id: "skill-owasp", name: "OWASP", category: "Security", level: "ADVANCED", order: 6, featured: true }
];

const fallbackExperience: PublicExperience[] = [
  {
    id: "fallback-experience",
    company: "Independent Practice",
    role: "Senior Full-Stack Engineer",
    location: "Remote",
    summary:
      "Leading architecture, security reviews, and delivery for production web systems.",
    startDate: new Date("2021-01-01T00:00:00.000Z"),
    endDate: null,
    current: true,
    order: 1
  }
];

const projectSelect = {
  id: true,
  title: true,
  slug: true,
  summary: true,
  body: true,
  techTags: true,
  githubUrl: true,
  liveUrl: true,
  featured: true,
  order: true,
  status: true,
  publishedAt: true,
  createdAt: true,
  updatedAt: true,
  images: {
    select: {
      id: true,
      url: true,
      alt: true,
      width: true,
      height: true,
      isCover: true,
      order: true,
      createdAt: true
    },
    orderBy: [{ isCover: "desc" as const }, { order: "asc" as const }]
  },
  tags: {
    select: {
      name: true,
      slug: true
    }
  }
};

const articleSelect = {
  id: true,
  title: true,
  slug: true,
  excerpt: true,
  body: true,
  seoTitle: true,
  seoDescription: true,
  status: true,
  publishedAt: true,
  readingMinutes: true,
  createdAt: true,
  updatedAt: true,
  tags: {
    select: {
      name: true,
      slug: true
    }
  }
};

export async function getProfile(): Promise<PublicProfile> {
  try {
    return (await prisma.profile.findUnique({ where: { id: "singleton" } })) ?? fallbackProfile;
  } catch {
    return fallbackProfile;
  }
}

export async function getFeaturedProjects(): Promise<PublicProject[]> {
  try {
    const projects = await prisma.project.findMany({
      where: { status: ContentStatus.PUBLISHED, featured: true },
      select: projectSelect,
      orderBy: [{ order: "asc" }, { publishedAt: "desc" }],
      take: 6
    });

    return projects.length > 0 ? projects : fallbackProjects;
  } catch {
    return fallbackProjects;
  }
}

export async function getPublishedProjects(): Promise<PublicProject[]> {
  try {
    const projects = await prisma.project.findMany({
      where: { status: ContentStatus.PUBLISHED },
      select: projectSelect,
      orderBy: [{ order: "asc" }, { publishedAt: "desc" }]
    });

    return projects.length > 0 ? projects : fallbackProjects;
  } catch {
    return fallbackProjects;
  }
}

export async function getProjectBySlug(slug: string): Promise<PublicProject | null> {
  try {
    const project = await prisma.project.findFirst({
      where: { slug, status: ContentStatus.PUBLISHED },
      select: projectSelect
    });

    return project ?? fallbackProjects.find((item) => item.slug === slug) ?? null;
  } catch {
    return fallbackProjects.find((item) => item.slug === slug) ?? null;
  }
}

export async function getPublishedArticles(): Promise<PublicArticle[]> {
  try {
    const articles = await prisma.article.findMany({
      where: { status: ContentStatus.PUBLISHED },
      select: articleSelect,
      orderBy: [{ publishedAt: "desc" }]
    });

    return articles.length > 0 ? articles : fallbackArticles;
  } catch {
    return fallbackArticles;
  }
}

export async function getArticleBySlug(slug: string): Promise<PublicArticle | null> {
  try {
    const article = await prisma.article.findFirst({
      where: { slug, status: ContentStatus.PUBLISHED },
      select: articleSelect
    });

    return article ?? fallbackArticles.find((item) => item.slug === slug) ?? null;
  } catch {
    return fallbackArticles.find((item) => item.slug === slug) ?? null;
  }
}

export async function getFeaturedSkills(): Promise<PublicSkill[]> {
  try {
    const skills = await prisma.skill.findMany({
      where: { featured: true },
      select: {
        id: true,
        name: true,
        category: true,
        level: true,
        order: true,
        featured: true
      },
      orderBy: [{ order: "asc" }, { name: "asc" }]
    });

    return skills.length > 0 ? skills : fallbackSkills;
  } catch {
    return fallbackSkills;
  }
}

export async function getExperienceTimeline(): Promise<PublicExperience[]> {
  try {
    const experience = await prisma.experience.findMany({
      where: { status: ContentStatus.PUBLISHED },
      select: {
        id: true,
        company: true,
        role: true,
        location: true,
        summary: true,
        startDate: true,
        endDate: true,
        current: true,
        order: true
      },
      orderBy: [{ order: "asc" }, { startDate: "desc" }]
    });

    return experience.length > 0 ? experience : fallbackExperience;
  } catch {
    return fallbackExperience;
  }
}

export async function getDashboardStats() {
  const [projects, articles, skills, unreadMessages] = await Promise.all([
    prisma.project.count(),
    prisma.article.count(),
    prisma.skill.count(),
    prisma.contactMessage.count({
      where: {
        readAt: null,
        archivedAt: null
      }
    })
  ]);

  return { projects, articles, skills, unreadMessages };
}
