import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import galeriaImg from "../app/galeria.png";

export default function PortfolioGrid() {
  return (
    <section id="portfolio" className="py-20 bg-white relative z-20">
      <div className="mx-auto">
        <h2 className="text-4xl md:text-5xl font-light text-left mb-16 uppercase tracking-wider px-6 md:px-10">
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
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <span className="portfolio-title">{project.title}</span>
            </Link>
          ))}

          {/* Galéria MÚR Item */}
          <a
            href="https://www.facebook.com/galeriamur"
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio-item aspect-[4/3] relative block group bg-gray-50"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-1/2 h-1/2">
                <Image
                  src={galeriaImg}
                  alt="Galéria MÚR"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 16vw"
                />
              </div>
            </div>
            <span className="portfolio-title">Galéria MÚR</span>
          </a>
        </div>
      </div>
    </section>
  );
}
