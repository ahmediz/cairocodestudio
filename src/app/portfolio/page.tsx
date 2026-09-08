import React from 'react';
import { Metadata } from 'next';
import { PortfolioCard } from '@/components/PortfolioCard';
import { getProjects } from '@/features/projects/projects.service';

export const metadata: Metadata = {
  title: 'Our Web & App Projects | Cairo Code Studio',
  description:
    'View our portfolio of websites and apps built for clients across industries. See the results we deliver. Explore our work and start your project today.',
};

export const revalidate = 60; // ISR cache revalidation

export default async function PortfolioPage() {
  const projects = await getProjects(false);

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold font-antonio text-primary">
            Our Portfolio
          </h1>
          <p className="text-gray-600 text-lg">
            A curated showcase of recent web and mobile applications delivered
            with engineering excellence and thoughtful design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <PortfolioCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
