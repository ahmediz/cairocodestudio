export const CONSENT_STORAGE_KEY = 'ccs-cookie-consent';
export const CONSENT_SCHEMA_VERSION = 1;

/** Categories currently relevant to technologies used on this website. */
export type ConsentCategoryId = 'necessary' | 'analytics';

/**
 * Reserved for future integrations (e.g. chat widgets, Meta Pixel).
 * Not shown in the UI until a corresponding technology is added.
 */
export type FutureConsentCategoryId = 'functional' | 'marketing';

export type ConsentCategories = Record<ConsentCategoryId, boolean>;

export interface ConsentRecord {
  version: number;
  timestamp: string;
  categories: ConsentCategories;
}

export type ConsentStatus = 'unknown' | 'configured';

export interface ConsentState {
  status: ConsentStatus;
  record: ConsentRecord | null;
  /** True after client hydration so UI can safely read storage. */
  hydrated: boolean;
}
