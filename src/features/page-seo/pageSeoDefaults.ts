import type { PageSeoKey } from './dtos/pageSeoOutputDTO';

const SITE_NAME = 'Cairo Code Studio';

type PageSeoFallback = { title: string; description: string };

const PAGE_SEO_KEYS: PageSeoKey[] = [
  'home',
  'about',
  'services',
  'projects',
  'blog',
  'contact',
  'faq',
  'privacy-policy',
  'terms-and-conditions',
  'cookie-policy',
];

/** Minimal fallbacks when CMS has no SEO entry yet — not marketing copy. */
export const PAGE_SEO_FALLBACKS: Record<PageSeoKey, PageSeoFallback> =
  PAGE_SEO_KEYS.reduce(
    (acc, key) => {
      acc[key] = { title: SITE_NAME, description: '' };
      return acc;
    },
    {} as Record<PageSeoKey, PageSeoFallback>
  );
