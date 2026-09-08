import React from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { ProjectOutputDTO } from '@/features/projects/dtos/projectsOutputDTO';
import { Button } from './ui/button';

interface PortfolioCardProps {
  project: ProjectOutputDTO;
}

export function PortfolioCard({ project }: PortfolioCardProps) {
  const imageSrc = project.image.startsWith('/')
    ? project.image
    : `/${project.image}`;

  return (
    <div className="h-full flex flex-col bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100">
        <Image
          src={imageSrc}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>

      <h3 className="mt-5 text-xl font-bold font-antonio text-gray-900">
        {project.title}
      </h3>

      <p className="mt-2 mb-6 text-sm text-gray-600 line-clamp-3">
        {project.description}
      </p>

      <div className="mt-auto pt-2 flex items-center">
        {project.link ? (
          <Button
            asChild
            variant="secondary"
            size="sm"
            className="w-full gap-2 text-xs font-semibold"
          >
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Check Live <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
        ) : (
          <div className="h-9" />
        )}
      </div>
    </div>
  );
}
