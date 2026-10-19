import type { ConsentCategoryId } from './types';

export interface ConsentCategoryMeta {
  id: ConsentCategoryId;
  label: string;
  description: string;
  required: boolean;
}

/**
 * Only categories tied to technologies actually used on the site.
 * Functional and marketing are omitted until those integrations exist.
 */
export const CONSENT_CATEGORIES: ConsentCategoryMeta[] = [
  {
    id: 'necessary',
    label: 'Strictly necessary',
    description:
      'Required for basic site operation. This includes storing your cookie preferences so we remember your choices. These cannot be turned off.',
    required: true,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    description:
      'Helps us understand how visitors use the site through Vercel Web Analytics and Vercel Speed Insights. These tools measure page views and performance. They do not use cookies for visitor identification, but they still send usage data to Vercel. Collection starts only if you allow this category.',
    required: false,
  },
];

export function getDefaultCategories(analyticsEnabled = false): Record<ConsentCategoryId, boolean> {
  return {
    necessary: true,
    analytics: analyticsEnabled,
  };
}
