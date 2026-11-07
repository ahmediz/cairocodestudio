import type { Metadata } from 'next';
import { fetchServer } from '@/lib/api';
import type { PageSeoKey, PageSeoOutputDTO } from './dtos/pageSeoOutputDTO';
import { PAGE_SEO_FALLBACKS } from './pageSeoDefaults';

async function fetchAllPageSeo(): Promise<PageSeoOutputDTO[]> {
  try {
    const pages = await fetchServer<PageSeoOutputDTO[]>('/api/page-seo', {
      revalidate: 60,
      tags: ['page-seo'],
    });
    return pages;
  } catch (error) {
    console.error('Failed to get page SEO from API:', error);
    return [];
  }
}

export async function getPageSeo(pageKey: PageSeoKey): Promise<PageSeoOutputDTO | null> {
  const pages = await fetchAllPageSeo();
  return pages.find((page) => page.pageKey === pageKey) ?? null;
}

export async function buildStaticPageMetadata(pageKey: PageSeoKey): Promise<Metadata> {
  const fallback = PAGE_SEO_FALLBACKS[pageKey];
  const page = await getPageSeo(pageKey);

  const title = page?.title?.trim() || fallback.title;
  const description = page?.description?.trim() || fallback.description || undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}
