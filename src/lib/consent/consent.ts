import { getDefaultCategories } from './categories';
import {
  CONSENT_SCHEMA_VERSION,
  CONSENT_STORAGE_KEY,
  type ConsentCategories,
  type ConsentRecord,
} from './types';

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

/**
 * Validates a stored consent payload. Invalid, missing, or outdated records
 * are treated as no consent (never as acceptance).
 */
export function parseConsentRecord(raw: unknown): ConsentRecord | null {
  if (!isPlainObject(raw)) {
    return null;
  }

  if (raw.version !== CONSENT_SCHEMA_VERSION) {
    return null;
  }

  if (typeof raw.timestamp !== 'string' || Number.isNaN(Date.parse(raw.timestamp))) {
    return null;
  }

  if (!isPlainObject(raw.categories)) {
    return null;
  }

  const { necessary, analytics } = raw.categories;
  if (!isBoolean(necessary) || !isBoolean(analytics)) {
    return null;
  }

  // Necessary must always remain enabled.
  if (!necessary) {
    return null;
  }

  return {
    version: CONSENT_SCHEMA_VERSION,
    timestamp: raw.timestamp,
    categories: {
      necessary: true,
      analytics,
    },
  };
}

export function createConsentRecord(
  categories: Pick<ConsentCategories, 'analytics'>
): ConsentRecord {
  return {
    version: CONSENT_SCHEMA_VERSION,
    timestamp: new Date().toISOString(),
    categories: getDefaultCategories(categories.analytics),
  };
}

export function acceptAllConsent(): ConsentRecord {
  return createConsentRecord({ analytics: true });
}

export function rejectOptionalConsent(): ConsentRecord {
  return createConsentRecord({ analytics: false });
}

function getLocalStorage(): Storage | null {
  try {
    if (typeof globalThis === 'undefined') {
      return null;
    }
    const storage = (globalThis as { localStorage?: Storage }).localStorage;
    return storage ?? null;
  } catch {
    return null;
  }
}

export function readConsentFromStorage(): ConsentRecord | null {
  const storage = getLocalStorage();
  if (!storage) {
    return null;
  }

  try {
    const raw = storage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    return parseConsentRecord(JSON.parse(raw) as unknown);
  } catch {
    return null;
  }
}

export function writeConsentToStorage(record: ConsentRecord): boolean {
  const storage = getLocalStorage();
  if (!storage) {
    return false;
  }

  try {
    storage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
    return true;
  } catch {
    return false;
  }
}

export function clearConsentFromStorage(): void {
  const storage = getLocalStorage();
  if (!storage) {
    return;
  }

  try {
    storage.removeItem(CONSENT_STORAGE_KEY);
  } catch {
    // Ignore storage errors; callers treat missing consent as no choice.
  }
}

export function hasAnalyticsConsent(record: ConsentRecord | null): boolean {
  return record?.categories.analytics === true;
}
