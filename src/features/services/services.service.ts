import { fetchServer } from '@/lib/api';
import {
  ServiceOutputDTO,
  ServiceStep,
  ServicesPageDTO,
} from './dtos/servicesOutputDTO';

const emptyPage = (page: number, limit: number): ServicesPageDTO => ({
  items: [],
  total: 0,
  page,
  limit,
  totalPages: 1,
});

function asStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (item): item is string => typeof item === 'string' && item.trim().length > 0
  );
}

function asSteps(value: unknown): ServiceStep[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== 'object') return [];
    const record = item as Record<string, unknown>;
    if (typeof record.title !== 'string' || typeof record.description !== 'string') {
      return [];
    }
    return [{ title: record.title, description: record.description }];
  });
}

function normalizeService(service: ServiceOutputDTO): ServiceOutputDTO {
  return {
    ...service,
    includedItems: asStringList(service.includedItems),
    howItWorks: asSteps(service.howItWorks),
  };
}

export async function getServices(options?: {
  page?: number;
  limit?: number;
}): Promise<ServicesPageDTO> {
  const page = options?.page ?? 1;
  const limit = options?.limit ?? 50;
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    activeOnly: 'true',
  });

  try {
    const result = await fetchServer<ServicesPageDTO>(
      `/api/services?${params.toString()}`,
      { revalidate: 60, tags: ['services'] }
    );
    return {
      ...result,
      items: result.items.map(normalizeService),
    };
  } catch (error) {
    console.error('Failed to get services:', error);
    return emptyPage(page, limit);
  }
}

export async function getServiceBySlug(
  slug: string
): Promise<ServiceOutputDTO | null> {
  try {
    const service = await fetchServer<ServiceOutputDTO>(`/api/services/${slug}`, {
      revalidate: 60,
      tags: ['services', slug],
    });
    return normalizeService(service);
  } catch (error) {
    console.error(`Failed to get service (${slug}):`, error);
    return null;
  }
}

export async function getAllActiveServices(): Promise<ServiceOutputDTO[]> {
  const limit = 50;
  const firstPage = await getServices({ page: 1, limit });
  const services = [...firstPage.items];

  for (let page = 2; page <= firstPage.totalPages; page++) {
    const nextPage = await getServices({ page, limit });
    services.push(...nextPage.items);
  }

  return services;
}
