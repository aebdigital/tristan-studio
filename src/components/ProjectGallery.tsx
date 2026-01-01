"use client";

import { Project } from "@/data/projects";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface ProjectGalleryProps {
  project: Project;
}

export default function ProjectGallery({ project }: ProjectGalleryProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -100]); // 10% parallax
  const overlayOpacity = useTransform(scrollY, [0, 600], [0.2, 0.8]);
  const textOpacity = useTransform(scrollY, [0, 600], [1, 0.4]);

  return (
    <div className="flex flex-col">
      {project.images.map((image, index) => {
        if (index === 0) {
          return (
            <section
              key={index}
              className="sticky top-0 relative h-screen w-full overflow-hidden"
              style={{ zIndex: index + 1 }}
            >
              {/* Parallax Background for first image */}
              <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${image}')`,
                  y,
                }}
              />
              
              {/* Overlay */}
              <motion.div
                className="absolute inset-0 bg-black"
                style={{
                  opacity: overlayOpacity,
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                }}
              />

              {/* Title */}
              <motion.div className="absolute inset-0 flex items-center justify-center"
                style={{ opacity: textOpacity }}
              >
                <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-light uppercase tracking-wider text-center px-4 drop-shadow-lg">
                  {project.title}
                </h1>
              </motion.div>

              {/* Scroll Indicator */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
                <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2">
                  <div className="w-1 h-3 bg-white rounded-full animate-bounce" />
                </div>
              </div>
            </section>
          );
        }

        return (
          <section
            key={index}
            className="sticky top-0 h-screen w-full relative"
            style={{ zIndex: index + 1 }}
          >
            {/* Regular full-screen image */}
            <Image
              src={image}
              alt={`${project.title} - ${index + 1}`}
              fill
              className="object-cover"
              priority={false}
            />
          </section>
        );
      })}
    </div>
  );
}
