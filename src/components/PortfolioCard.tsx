import { ProjectOutputDTO } from '@/features/projects/dtos/projectsOutputDTO';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/button';

interface PortfolioCardProps {
  project: ProjectOutputDTO;
}

const isSafeUrl = (url?: string | null): boolean => {
  if (!url) return false;
  return /^https?:\/\//i.test(url.trim());
};

export function PortfolioCard({ project }: PortfolioCardProps) {
  return (
    <div className="h-full flex flex-col bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/projects/${project.slug}`} className="group">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>

        <h3 className="mt-5 text-xl font-bold font-antonio text-gray-900 group-hover:text-primary transition-colors">
          {project.title}
        </h3>

        <p className="mt-2 mb-6 text-sm text-gray-600 line-clamp-3">
          {project.description}
        </p>
      </Link>

      <div className="mt-auto pt-2 flex items-center gap-2">
        <Button asChild size="sm" className="flex-1 text-xs font-semibold">
          <Link href={`/projects/${project.slug}`}>View case study</Link>
        </Button>
        {isSafeUrl(project.link) ? (
          <Button
            asChild
            variant="secondary"
            size="sm"
            className="gap-2 text-xs font-semibold"
          >
            <a href={project.link ?? ''} target="_blank" rel="noopener noreferrer">
              Live <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </Button>
        ) : null}
      </div>
    </div>
  );
}
