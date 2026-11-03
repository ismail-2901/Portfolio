import type { MetadataRoute } from "next";

import { getPublishedArticles, getPublishedProjects } from "@/lib/queries";
import { getSiteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const [projectsResult, articlesResult] = await Promise.all([getPublishedProjects(), getPublishedArticles()]);
  const projects = projectsResult.available ? projectsResult.data : [];
  const articles = articlesResult.available ? articlesResult.data : [];
  const staticRoutes = ["", "/about", "/projects", "/blog", "/contact", "/resume", "/privacy"].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date()
  }));

  return [
    ...staticRoutes,
    ...projects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: project.updatedAt
    })),
    ...articles.map((article) => ({
      url: `${siteUrl}/blog/${article.slug}`,
      lastModified: article.updatedAt
    }))
  ];
}
