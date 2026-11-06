"use client";

import { useEffect, useState } from "react";
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
  const images = (project.images && project.images.length > 0)
    ? [...project.images].sort((a, b) => (b.isCover ? 1 : 0) - (a.isCover ? 1 : 0) || a.order - b.order)
    : [];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className={cn("project-media-frame relative overflow-hidden", className)}>
      {images.length > 0 ? (
        <div className="relative size-full">
          {images.map((img, imgIdx) => (
            <div
              key={img.id || imgIdx}
              className={cn(
                "absolute inset-0 transition-opacity duration-700 ease-in-out",
                imgIdx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              )}
            >
              <Image
                src={img.url}
                alt={img.alt || project.title}
                fill
                sizes={sizes}
                priority={priority && imgIdx === 0}
                quality={priority ? 75 : 70}
                className="object-cover transition-transform duration-slow group-hover:scale-[1.025]"
              />
            </div>
          ))}

          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
              {images.map((_, dotIdx) => (
                <span
                  key={dotIdx}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    dotIdx === currentSlide ? "w-5 bg-white" : "w-1.5 bg-white/40"
                  )}
                />
              ))}
            </div>
          )}
        </div>
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
