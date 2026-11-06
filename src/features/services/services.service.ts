import { fetchServer } from '@/lib/api';
import {
  ServiceBenefit,
  ServiceFeature,
  ServiceOutputDTO,
  ServiceStat,
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

function asBenefits(value: unknown): ServiceBenefit[] {
  return asRecordArray(value).flatMap((item) => {
    const title = asString(item.title);
    const description = asString(item.description);
    const image = asString(item.image);
    if (!title || !description) return [];
    return [{ title, description, image }];
  });
}

function asFeatures(value: unknown): ServiceFeature[] {
  return asRecordArray(value).flatMap((item) => {
    const title = asString(item.title);
    const description = asString(item.description);
    const image = asString(item.image);
    if (!title || !description) return [];
    return [
      {
        title,
        description,
        image,
        bullets: asStringList(item.bullets),
      },
    ];
  });
}

function asSteps(value: unknown): ServiceStep[] {
  return asRecordArray(value).flatMap((item) => {
    const title = asString(item.title);
    const description = asString(item.description);
    const image = asString(item.image);
    if (!title || !description) return [];
    return [{ title, description, image }];
  });
}

function asStats(value: unknown): ServiceStat[] {
  return asRecordArray(value).flatMap((item) => {
    const statValue = asString(item.value);
    const label = asString(item.label);
    if (!statValue || !label) return [];
    return [{ value: statValue, label }];
  });
}

function normalizeService(service: ServiceOutputDTO): ServiceOutputDTO {
  return {
    ...service,
    heroHeadline: service.heroHeadline || service.title,
    heroSubtitle: service.heroSubtitle || service.description,
    heroImage: service.heroImage || '',
    benefitsTitle: service.benefitsTitle || '',
    benefitsIntro: service.benefitsIntro || '',
    benefits: asBenefits(service.benefits),
    features: asFeatures(service.features),
    processTitle: service.processTitle || 'How it works',
    processIntro: service.processIntro || '',
    howItWorks: asSteps(service.howItWorks),
    statsTitle: service.statsTitle || '',
    statsIntro: service.statsIntro || '',
    stats: asStats(service.stats),
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
