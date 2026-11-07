import { fetchServer } from '@/lib/api';
import {
  ServiceBenefit,
  ServiceFeature,
  ServiceIncludedItem,
  ServiceRelatedSummary,
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

const DEFAULT_STEP_ICONS = [
  'search',
  'waypoints',
  'pencil',
  'layers',
] as const;

function asSteps(value: unknown): ServiceStep[] {
  return asRecordArray(value).flatMap((item, index) => {
    const title = asString(item.title);
    const description = asString(item.description);
    const image = asString(item.image);
    const iconRaw = asString(item.icon);
    if (!title || !description) return [];
    const icon =
      iconRaw ||
      DEFAULT_STEP_ICONS[index % DEFAULT_STEP_ICONS.length] ||
      'search';
    return [{ title, description, image, icon }];
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

function asWhatsIncluded(value: unknown): ServiceIncludedItem[] {
  return asRecordArray(value).flatMap((item) => {
    const title = asString(item.title);
    const description = asString(item.description);
    if (!title || !description) return [];
    return [{ title, description }];
  });
}

function asRelatedServices(value: unknown): ServiceRelatedSummary[] {
  return asRecordArray(value).flatMap((item) => {
    const id = asString(item.id);
    const slug = asString(item.slug);
    const title = asString(item.title);
    const description = asString(item.description);
    const icon = asString(item.icon);
    if (!id || !slug || !title || !description) return [];
    return [{ id, slug, title, description, icon: icon || 'pi pi-globe' }];
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
    whatsIncluded: asWhatsIncluded(service.whatsIncluded),
    relatedServices: asRelatedServices(service.relatedServices),
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
