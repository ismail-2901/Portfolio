import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";

import { ProjectMediaFrame } from "@/components/site/project-media-frame";
import { Button } from "@/components/ui/button";
import { MarkdownRenderer } from "@/lib/markdown";
import { getProjectBySlug } from "@/lib/queries";
import { serializeStructuredData } from "@/lib/structured-data";
import { getSiteUrl } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.summary,
      url: `/projects/${project.slug}`,
      images: project.images[0]?.url ? [{ url: project.images[0].url, alt: project.images[0].alt }] : undefined
    },
    twitter: {
      card: project.images[0]?.url ? "summary_large_image" : "summary",
      title: project.title,
      description: project.summary,
      images: project.images[0]?.url ? [project.images[0].url] : undefined
    }
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: `${getSiteUrl()}/projects/${project.slug}`,
    datePublished: project.publishedAt?.toISOString(),
    image: project.images.map((image) => image.url),
    keywords: [...project.techTags, ...project.tags.map((tag) => tag.name)]
  };

  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeStructuredData(projectJsonLd) }} />
      <article className="container-shell pb-24 pt-10 md:pb-32 md:pt-16">
        <Button asChild variant="ghost" className="px-0">
          <Link href="/projects">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Projects
          </Link>
        </Button>

        <header className="mt-12 grid gap-8 border-b border-rule pb-10 md:grid-cols-[1fr_0.55fr] md:items-end md:pb-14">
          <div className="min-w-0">
            <p className="eyebrow">Case study <span className="px-2 text-muted">/</span> {project.tags.slice(0, 2).map((tag) => tag.name).join(" / ") || "Project"}</p>
            <h1 className="mt-5 text-balance text-4xl font-medium leading-[1.04] text-copy sm:text-5xl md:text-7xl">
            {project.title}
            </h1>
          </div>
          <div className="min-w-0">
            <p className="text-lg leading-8 text-muted">{project.summary}</p>
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-copy" aria-label="Project technologies">
              {project.techTags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-2">
            {project.liveUrl ? (
              <Button asChild>
                <Link href={project.liveUrl} target="_blank" rel="noreferrer">
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                  Live project
                </Link>
              </Button>
            ) : null}
            {project.githubUrl ? (
              <Button asChild variant="secondary">
                <Link href={project.githubUrl} target="_blank" rel="noreferrer">
                  <Github aria-hidden="true" className="size-4" />
                  Source
                </Link>
              </Button>
            ) : null}
          </div>
        </header>

        <ProjectMediaFrame
          project={project}
          index={1}
          priority
          sizes="(max-width: 1160px) 100vw, 1160px"
          className="mt-12 aspect-video"
        />

        <div className="project-content mt-16 max-w-3xl md:mt-20">
          <MarkdownRenderer source={project.body} />
        </div>
      </article>
    </main>
  );
}
