import type { MetadataRoute } from "next";

import { getPublishedArticles, getPublishedProjects } from "@/lib/queries";
import { getSiteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const [projects, articles] = await Promise.all([getPublishedProjects(), getPublishedArticles()]);
  const staticRoutes = ["", "/about", "/projects", "/blog", "/contact", "/privacy"].map((route) => ({
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
