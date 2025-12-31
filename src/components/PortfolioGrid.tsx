import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";

export default function PortfolioGrid() {
  return (
    <section id="portfolio" className="py-20 px-6 md:px-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-light text-center mb-16 uppercase tracking-wider">
          Naše projekty
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projekt/${project.slug}`}
              className="portfolio-item aspect-[4/3] relative block group"
            >
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <span className="portfolio-title">{project.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
