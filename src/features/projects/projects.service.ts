import { fetchServer } from '@/lib/api';
import { ProjectOutputDTO } from './dtos/projectsOutputDTO';

export async function getProjects(featuredOnly = false): Promise<ProjectOutputDTO[]> {
  try {
    const query = featuredOnly
      ? '/api/projects?activeOnly=true&featuredOnly=true'
      : '/api/projects?activeOnly=true';
    return await fetchServer<ProjectOutputDTO[]>(query, {
      revalidate: 60,
      tags: ['projects'],
    });
  } catch (error) {
    console.error('Failed to get projects from API:', error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<ProjectOutputDTO | null> {
  try {
    return await fetchServer<ProjectOutputDTO>(`/api/projects/${slug}`, {
      revalidate: 60,
      tags: ['projects', slug],
    });
  } catch (error) {
    console.error(`Failed to get project by slug (${slug}) from API:`, error);
    return null;
  }
}
