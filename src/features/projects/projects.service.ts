import { fetchServer } from '@/lib/api';
import {
  ProjectGalleryItem,
  ProjectOutputDTO,
  ProjectStat,
} from './dtos/projectsOutputDTO';

function asString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function asStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (item): item is string => typeof item === 'string' && item.trim().length > 0
  );
}

function asRecordArray(value: unknown): Record<string, unknown>[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (item): item is Record<string, unknown> =>
      Boolean(item) && typeof item === 'object'
  );
}

function asGallery(value: unknown): ProjectGalleryItem[] {
  return asRecordArray(value).flatMap((item) => {
    const image = asString(item.image);
    if (!image) return [];
    return [{ image, alt: asString(item.alt) }];
  });
}

function asStats(value: unknown): ProjectStat[] {
  return asRecordArray(value).flatMap((item) => {
    const statValue = asString(item.value);
    const label = asString(item.label);
    if (!statValue || !label) return [];
    return [{ value: statValue, label }];
  });
}

function normalizeProject(project: ProjectOutputDTO): ProjectOutputDTO {
  return {
    ...project,
    link: project.link || null,
    client: project.client || '',
    industry: project.industry || '',
    year: project.year || '',
    role: project.role || '',
    challengeTitle: project.challengeTitle || 'The challenge',
    challengeBody: project.challengeBody || '',
    challengeImage: project.challengeImage || '',
    solutionTitle: project.solutionTitle || 'What we built',
    solutionBody: project.solutionBody || '',
    solutionImage: project.solutionImage || '',
    solutionBullets: asStringList(project.solutionBullets),
    gallery: asGallery(project.gallery),
    techStack: asStringList(project.techStack),
    stats: asStats(project.stats),
    quote: project.quote || '',
    quoteAuthor: project.quoteAuthor || '',
    quoteRole: project.quoteRole || '',
  };
}

export async function getProjects(featuredOnly = false): Promise<ProjectOutputDTO[]> {
  try {
    const query = featuredOnly
      ? '/api/projects?activeOnly=true&featuredOnly=true'
      : '/api/projects?activeOnly=true';
    const projects = await fetchServer<ProjectOutputDTO[]>(query, {
      revalidate: 60,
      tags: ['projects'],
    });
    return projects.map(normalizeProject);
  } catch (error) {
    console.error('Failed to get projects from API:', error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<ProjectOutputDTO | null> {
  try {
    const project = await fetchServer<ProjectOutputDTO>(`/api/projects/${slug}`, {
      revalidate: 60,
      tags: ['projects', slug],
    });
    return normalizeProject(project);
  } catch (error) {
    console.error(`Failed to get project by slug (${slug}):`, error);
    return null;
  }
}

export async function getRelatedProjects(
  slug: string,
  limit = 3
): Promise<ProjectOutputDTO[]> {
  const projects = await getProjects(false);
  return projects.filter((project) => project.slug !== slug).slice(0, limit);
}
