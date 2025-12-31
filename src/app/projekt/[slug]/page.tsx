import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import ProjectGallery from "@/components/ProjectGallery";
import PortfolioGrid from "@/components/PortfolioGrid";

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

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Projekt nenájdený",
    };
  }

  return {
    title: `${project.title} | TRISTAN studio`,
    description: `Projekt ${project.title} - TRISTAN studio, architektonické štúdio v Prešove.`,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main>
      <ProjectGallery project={project} />
      <PortfolioGrid />
    </main>
  );
}
