import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ServiceTalkButton } from '@/components/ServiceTalkButton';
import { ProjectOutputDTO } from '@/features/projects/dtos/projectsOutputDTO';

interface ProjectHeroProps {
  project: ProjectOutputDTO;
}

const isSafeUrl = (url?: string | null): boolean => {
  if (!url) return false;
  return /^https?:\/\//i.test(url.trim());
};

export function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <section className="relative">
      <div className="relative w-full h-[52vh] md:h-[70vh] overflow-hidden bg-gray-100">
        <Image
          src={project.image}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
          aria-hidden
        />
      </div>
      <div className="md:absolute md:inset-x-0 md:bottom-0">
        <div className="max-w-7xl mx-auto px-4 py-10 md:pb-14 md:pt-0 space-y-4">
          <Link
            href="/projects"
            className="text-xs font-semibold uppercase tracking-wide text-primary md:text-white/80 hover:underline"
          >
            Portfolio
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-antonio leading-[1.1] text-gray-900 md:text-white title-with-dash md:after:bg-white">
            {project.title}
          </h1>
          <p className="text-lg md:text-xl max-w-xl leading-relaxed text-gray-600 md:text-white/85">
            {project.description}
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <ServiceTalkButton />
            {isSafeUrl(project.link) && (
              <Button
                asChild
                variant="secondary"
                className="gap-2 font-semibold md:bg-white/95"
              >
                <a
                  href={project.link ?? ''}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Check Live <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
