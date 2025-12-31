"use client";

import { Project } from "@/data/projects";

interface ProjectGalleryProps {
  project: Project;
}

export default function ProjectGallery({ project }: ProjectGalleryProps) {
  return (
    <div className="relative">
      {project.images.map((image, index) => (
        <section
          key={index}
          className="h-screen w-full relative"
          style={{ zIndex: index }}
        >
          {/* Fixed background image */}
          <div
            className="fixed inset-0 w-full h-screen bg-cover bg-center"
            style={{
              backgroundImage: `url('${image}')`,
              zIndex: -1,
            }}
          />

          {/* Title on first image */}
          {index === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-light uppercase tracking-wider text-center px-4 drop-shadow-lg">
                {project.title}
              </h1>
            </div>
          )}

          {/* Overlay for visual separation */}
          <div
            className="absolute inset-0 bg-black/10 pointer-events-none"
            style={{ zIndex: 1 }}
          />
        </section>
      ))}

      {/* Spacer for scroll effect */}
      <div className="h-screen relative bg-white" style={{ zIndex: project.images.length }} />
    </div>
  );
}
