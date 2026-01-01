import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import ProjectGallery from "@/components/ProjectGallery";
import PortfolioGrid from "@/components/PortfolioGrid";
import { Metadata } from "next";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Projekt nenájdený",
    };
  }

  const title = `${project.title} | TRISTAN studio`;
  const description = `Prezrite si projekt ${project.title} od TRISTAN studio. Architektonický návrh a realizácia v kategórii architektúra a dizajn.`;
  const url = `https://tristanstudio.sk/projekt/${project.slug}`;
  const images = project.images.length > 0 ? [{ url: project.images[0], width: 1200, height: 630, alt: project.title }] : [];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "TRISTAN studio",
      locale: "sk_SK",
      type: "article",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.map(i => i.url),
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    headline: project.title,
    image: project.images.length > 0 ? project.images[0] : undefined,
    author: {
      "@type": "Organization",
      name: "TRISTAN studio",
    },
    genre: "Architecture",
    url: `https://tristanstudio.sk/projekt/${project.slug}`,
    description: `Projekt ${project.title} - TRISTAN studio.`,
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectGallery project={project} />
      <PortfolioGrid />
    </main>
  );
}

