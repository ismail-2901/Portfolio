import { cache } from "react";
import { ContentStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { withPublicData, type PublicDataResult } from "@/lib/public-data";

export type PublicProfile = {
  name: string;
  role: string;
  location: string;
  shortBio: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string | null;
  resumeUrl: string;
  imageUrl: string | null;
  availabilityStatus: string | null;
  availableForHire: boolean;
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
const useFallbackContent = process.env.NODE_ENV !== "production" && !process.env.DATABASE_URL;

function queryPublicData<T>(
  query: () => Promise<T>,
  developmentFallback?: T
): Promise<PublicDataResult<T>> {
  if (useFallbackContent && developmentFallback !== undefined) {
    return Promise.resolve({ available: true, data: developmentFallback });
  }

  if (!process.env.DATABASE_URL) {
    return Promise.resolve({ available: false, data: null });
  }

  return withPublicData(query);
}

export const fallbackProfile: PublicProfile = {
  name: "Md Ismail Hossain",
  role: "Full-Stack Software Engineering Student",
  location: "Dhaka, Bangladesh",
  shortBio:
    "Undergraduate Software Engineering student at Daffodil International University (DIU), building production-ready full-stack web applications with modern technologies. Passionate about clean architecture, meaningful user experiences, and AI-integrated systems.",
  email: "ismailsajinabusaleh@gmail.com",
  githubUrl: "https://github.com/ismail-2901",
  linkedinUrl: "https://www.linkedin.com/in/md-ismail-hossain-b10073263",
  twitterUrl: null,
  resumeUrl: "/resume",
  imageUrl: null,
  availabilityStatus: "Open to internships",
  availableForHire: true
};

export const fallbackProjects: PublicProject[] = [
  {
    id: "fallback-fixmycampus",
    title: "FixMyCampus",
    slug: "fixmycampus",
    summary:
      "A campus issue reporting and management platform for Daffodil International University. Features anonymous reporting, role-based admin workflows, an AI chatbot, and a transparency board.",
    body: "## Overview\n\nFixMyCampus is a campus issue reporting and management platform built for Daffodil International University (DIU). It streamlines how students report infrastructure and academic problems, and how administrators respond, assign, and resolve them.\n\n## Highlights\n\n- Anonymous issue reporting system.\n- Role-based access control (Student / Admin / SuperAdmin).\n- AI chatbot for student guidance.\n- Transparency board with aggregated statistics.",
    techTags: ["React", "Node.js", "Express.js", "MySQL", "JWT", "Tailwind CSS"],
    githubUrl: "https://github.com/ismail-2901",
    liveUrl: null,
    featured: true,
    order: 1,
    status: "PUBLISHED",
    publishedAt: now,
    createdAt: now,
    updatedAt: now,
    images: [],
    tags: [
      { name: "full stack", slug: "full-stack" },
      { name: "campus tech", slug: "campus-tech" }
    ]
  },
  {
    id: "fallback-elaris",
    title: "ELARIS",
    slug: "elaris",
    summary:
      "A modern fashion e-commerce platform with a full customer storefront, shopping cart, order management, and an integrated admin dashboard. Built with Next.js and PostgreSQL.",
    body: "## Overview\n\nELARIS is a modern fashion e-commerce platform with a full customer storefront and an integrated admin management system.\n\n## Highlights\n\n- Dynamic product catalog with categories and filtering.\n- Persistent shopping cart and checkout flow.\n- Order lifecycle management (creation, fulfilment, history).\n- Admin dashboard for product and inventory management.",
    techTags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS"],
    githubUrl: "https://github.com/ismail-2901",
    liveUrl: null,
    featured: true,
    order: 2,
    status: "PUBLISHED",
    publishedAt: now,
    createdAt: now,
    updatedAt: now,
    images: [],
    tags: [
      { name: "full stack", slug: "full-stack" },
      { name: "e-commerce", slug: "e-commerce" }
    ]
  }
];

const fallbackArticles: PublicArticle[] = [
  {
    id: "fallback-article",
    title: "Building FixMyCampus: A Campus Issue Reporting Platform",
    slug: "building-fixmycampus",
    excerpt: "How I designed and built a full-stack campus issue reporting system for Daffodil International University with role-based access control, anonymous reporting, and an AI chatbot.",
    body: "# Building FixMyCampus\n\nFixMyCampus is a campus issue reporting and management platform built for Daffodil International University. Students can anonymously report problems on campus, track their resolution status, and participate in group discussions.\n\n## Key Features\n\n- Anonymous issue reporting with category tagging.\n- Role-based access control for students, moderators, and admins.\n- Admin assignment and resolution workflow.\n- Group discussion threads per issue.\n- AI chatbot for issue guidance.\n- Transparency board showing resolved issues.\n\n## Technical Decisions\n\nThe frontend is built with React and communicates with a Node.js and Express REST API. MySQL stores all relational data. JWT-based authentication handles role separation cleanly.",
    seoTitle: "Building FixMyCampus — Full-Stack Campus Platform",
    seoDescription: "A case study on building a full-stack campus issue reporting platform with React, Node.js, Express, and MySQL.",
    status: "PUBLISHED",
    publishedAt: now,
    readingMinutes: 4,
    createdAt: now,
    updatedAt: now,
    tags: [
      { name: "full-stack", slug: "full-stack" },
      { name: "campus-tech", slug: "campus-tech" },
      { name: "react", slug: "react" }
    ]
  }
];

const fallbackSkills: PublicSkill[] = [
  { id: "skill-js", name: "JavaScript", category: "Frontend", level: "ADVANCED", order: 1, featured: true },
  { id: "skill-react", name: "React", category: "Frontend", level: "ADVANCED", order: 2, featured: true },
  { id: "skill-next", name: "Next.js", category: "Frontend", level: "WORKING", order: 3, featured: true },
  { id: "skill-ts", name: "TypeScript", category: "Frontend", level: "WORKING", order: 4, featured: true },
  { id: "skill-node", name: "Node.js", category: "Backend", level: "ADVANCED", order: 5, featured: true },
  { id: "skill-mysql", name: "MySQL", category: "Database", level: "ADVANCED", order: 6, featured: true },
  { id: "skill-tailwind", name: "Tailwind CSS", category: "Frontend", level: "ADVANCED", order: 7, featured: false },
  { id: "skill-express", name: "Express.js", category: "Backend", level: "ADVANCED", order: 8, featured: false }
];

const fallbackExperience: PublicExperience[] = [
  {
    id: "fallback-diu",
    company: "Daffodil International University",
    role: "B.Sc. in Software Engineering",
    location: "Dhaka, Bangladesh",
    summary:
      "Pursuing a Bachelor of Science in Software Engineering, building production-ready full-stack applications as academic and personal projects. Focused on web technologies, database design, and software architecture.",
    startDate: new Date("2023-01-01T00:00:00.000Z"),
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

async function fetchProfile(): Promise<PublicProfile> {
  const profile = await prisma.profile.findUnique({ where: { id: "singleton" } });

  if (!profile) {
    throw new Error("Portfolio profile is missing. Run the database seed before serving public pages.");
  }

  return profile;
}

export const getProfile = cache(function getProfile(): Promise<PublicProfile> {
  if (useFallbackContent) {
    return Promise.resolve(fallbackProfile);
  }

  return fetchProfile();
});

export const getPublicProfile = cache(function getPublicProfile(): Promise<PublicDataResult<PublicProfile>> {
  return queryPublicData(fetchProfile, fallbackProfile);
});

export const getFeaturedProjects = cache(function getFeaturedProjects(): Promise<PublicDataResult<PublicProject[]>> {
  return queryPublicData(() => prisma.project.findMany({
    where: { status: ContentStatus.PUBLISHED, featured: true },
    select: projectSelect,
    orderBy: [{ order: "asc" }, { publishedAt: "desc" }],
    take: 6
  }), fallbackProjects);
});

export const getPublishedProjects = cache(function getPublishedProjects(): Promise<PublicDataResult<PublicProject[]>> {
  return queryPublicData(() => prisma.project.findMany({
    where: { status: ContentStatus.PUBLISHED },
    select: projectSelect,
    orderBy: [{ order: "asc" }, { publishedAt: "desc" }]
  }), fallbackProjects);
});

export const getProjectBySlug = cache(function getProjectBySlug(slug: string): Promise<PublicDataResult<PublicProject | null>> {
  return queryPublicData(() => prisma.project.findFirst({
    where: { slug, status: ContentStatus.PUBLISHED },
    select: projectSelect
  }), fallbackProjects.find((item) => item.slug === slug) ?? null);
});

export const getPublishedArticles = cache(function getPublishedArticles(): Promise<PublicDataResult<PublicArticle[]>> {
  return queryPublicData(() => prisma.article.findMany({
    where: { status: ContentStatus.PUBLISHED },
    select: articleSelect,
    orderBy: [{ publishedAt: "desc" }]
  }), fallbackArticles);
});

export const getArticleBySlug = cache(function getArticleBySlug(slug: string): Promise<PublicDataResult<PublicArticle | null>> {
  return queryPublicData(() => prisma.article.findFirst({
    where: { slug, status: ContentStatus.PUBLISHED },
    select: articleSelect
  }), fallbackArticles.find((item) => item.slug === slug) ?? null);
});

export const getFeaturedSkills = cache(function getFeaturedSkills(): Promise<PublicDataResult<PublicSkill[]>> {
  return queryPublicData(() => prisma.skill.findMany({
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
  }), fallbackSkills);
});

export const getExperienceTimeline = cache(function getExperienceTimeline(): Promise<PublicDataResult<PublicExperience[]>> {
  return queryPublicData(() => prisma.experience.findMany({
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
  }), fallbackExperience);
});

export async function getDashboardStats() {
  const [projects, articles, experience, skills, unreadMessages] = await Promise.all([
    prisma.project.count(),
    prisma.article.count(),
    prisma.experience.count(),
    prisma.skill.count(),
    prisma.contactMessage.count({
      where: {
        readAt: null,
        archivedAt: null
      }
    })
  ]);

  return { projects, articles, experience, skills, unreadMessages };
}

export type PublicEducation = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string | null;
  startDate: Date;
  endDate: Date | null;
  current: boolean;
  gpa: string | null;
  summary: string | null;
  order: number;
};

const fallbackEducation: PublicEducation[] = [
  {
    id: "fallback-edu-diu",
    institution: "Daffodil International University",
    degree: "Bachelor of Science",
    field: "Software Engineering",
    location: "Dhaka, Bangladesh",
    startDate: new Date("2023-01-01T00:00:00.000Z"),
    endDate: new Date("2027-01-01T00:00:00.000Z"),
    current: true,
    gpa: null,
    summary:
      "Pursuing a B.Sc. in Software Engineering with a focus on full-stack web development, software architecture, and database design. Building production-ready applications as academic and personal projects.",
    order: 1
  }
];

export const getEducation = cache(function getEducation(): Promise<PublicDataResult<PublicEducation[]>> {
  return queryPublicData(() =>
    prisma.education.findMany({
      select: {
        id: true,
        institution: true,
        degree: true,
        field: true,
        location: true,
        startDate: true,
        endDate: true,
        current: true,
        gpa: true,
        summary: true,
        order: true
      },
      orderBy: [{ order: "asc" }, { startDate: "desc" }]
    }),
    fallbackEducation
  );
});
