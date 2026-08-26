import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MarkdownRenderer } from "@/lib/markdown";
import { getProjectBySlug } from "@/lib/queries";

export const dynamic = "force-dynamic";

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
    openGraph: {
      title: project.title,
      description: project.summary,
      images: project.images[0]?.url ? [{ url: project.images[0].url, alt: project.images[0].alt }] : undefined
    }
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const cover = project.images.find((image) => image.isCover) ?? project.images[0];

  return (
    <main className="pt-32">
      <article className="container-shell py-16">
        <Button asChild variant="ghost">
          <Link href="/projects">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Projects
          </Link>
        </Button>

        <header className="mt-10 max-w-4xl">
          <div className="flex flex-wrap gap-2">
            {project.techTags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
          <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.05] text-zinc-50 md:text-7xl">
            {project.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-300">{project.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
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

        {cover ? (
          <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-lg border border-white/10 bg-zinc-950">
            <Image
              src={cover.url}
              alt={cover.alt}
              fill
              priority
              sizes="(max-width: 1160px) 100vw, 1160px"
              className="object-cover"
            />
          </div>
        ) : null}

        <div className="mt-12 max-w-3xl">
          <MarkdownRenderer source={project.body} />
        </div>
      </article>
    </main>
  );
}
