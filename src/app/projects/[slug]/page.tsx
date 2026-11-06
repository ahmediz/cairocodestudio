import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HomeSection } from '@/components/HomeSection';
import { PortfolioCard } from '@/components/PortfolioCard';
import { ProjectGallery } from '@/components/ProjectGallery';
import { ProjectHero } from '@/components/ProjectHero';
import { ProjectMetaStrip } from '@/components/ProjectMetaStrip';
import { ProjectQuote } from '@/components/ProjectQuote';
import { ProjectSplitSection } from '@/components/ProjectSplitSection';
import { ProjectTechPills } from '@/components/ProjectTechPills';
import {
  getProjectBySlug,
  getRelatedProjects,
} from '@/features/projects/projects.service';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project || !project.isActive) {
    return { title: 'Project not found | Cairo Code Studio' };
  }
  return {
    title: `${project.title} | Cairo Code Studio`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.image ? [{ url: project.image }] : undefined,
      type: 'website',
    },
  };
}

export const revalidate = 60;

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const [project, related] = await Promise.all([
    getProjectBySlug(slug),
    getRelatedProjects(slug, 3),
  ]);

  if (!project || !project.isActive) {
    notFound();
  }

  return (
    <div className="flex flex-col overflow-hidden">
      <ProjectHero project={project} />
      <ProjectMetaStrip
        client={project.client}
        industry={project.industry}
        year={project.year}
        role={project.role}
      />

      {project.challengeBody && (
        <ProjectSplitSection
          title={project.challengeTitle}
          body={project.challengeBody}
          image={project.challengeImage || undefined}
        />
      )}

      {project.solutionBody && (
        <div className="bg-gray-50 border-y border-gray-100">
          <ProjectSplitSection
            title={project.solutionTitle}
            body={project.solutionBody}
            image={project.solutionImage || undefined}
            bullets={project.solutionBullets}
            imageFirst
          />
        </div>
      )}

      <ProjectGallery items={project.gallery} />
      <ProjectTechPills items={project.techStack} />

      {project.stats.length > 0 && (
        <HomeSection title="Results">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {project.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border bg-white p-8 text-center shadow-sm"
              >
                <p className="text-4xl md:text-5xl font-extrabold font-antonio text-primary">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-medium text-gray-600">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </HomeSection>
      )}

      <ProjectQuote
        quote={project.quote}
        author={project.quoteAuthor}
        role={project.quoteRole}
      />

      {related.length > 0 && (
        <HomeSection
          title="More work"
          subtitle="Other projects from the studio."
          className={project.quote ? '' : 'bg-gray-50 border-y border-gray-100'}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {related.map((item) => (
              <PortfolioCard key={item.id} project={item} />
            ))}
          </div>
        </HomeSection>
      )}

      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Link
            href="/projects"
            className="text-sm font-semibold text-primary hover:underline"
          >
            ← Back to portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
