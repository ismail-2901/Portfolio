import Image from "next/image";

import type { PublicProject } from "@/lib/queries";
import { cn } from "@/lib/utils";

type ProjectMediaFrameProps = {
  project: PublicProject;
  index: number;
  className?: string;
  sizes: string;
  priority?: boolean;
};

export function ProjectMediaFrame({ project, index, className, sizes, priority = false }: ProjectMediaFrameProps) {
  const cover = project.images.find((image) => image.isCover) ?? project.images[0];

  return (
    <div className={cn("project-media-frame", className)}>
      {cover ? (
        <Image
          src={cover.url}
          alt={cover.alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={priority ? 75 : 70}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
        />
      ) : (
        <div className="project-media-placeholder">
          <span className="project-media-index" aria-hidden="true">FIELD NOTE / {String(index).padStart(2, "0")}</span>
          <span className="project-media-title">{project.title}</span>
          <span className="project-media-tags" aria-hidden="true">{project.techTags.slice(0, 3).join(" / ")}</span>
          <span className="project-media-mark" aria-hidden="true" />
        </div>
      )}
    </div>
  );
}