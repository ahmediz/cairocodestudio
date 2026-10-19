import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  acceptAllConsent,
  createConsentRecord,
  hasAnalyticsConsent,
  parseConsentRecord,
  readConsentFromStorage,
  rejectOptionalConsent,
  writeConsentToStorage,
} from './consent';
import { CONSENT_SCHEMA_VERSION, CONSENT_STORAGE_KEY } from './types';

describe('parseConsentRecord', () => {
  it('accepts a valid record', () => {
    const record = parseConsentRecord({
      version: CONSENT_SCHEMA_VERSION,
      timestamp: '2026-10-19T10:00:00.000Z',
      categories: { necessary: true, analytics: true },
    });

    expect(record).toEqual({
      version: CONSENT_SCHEMA_VERSION,
      timestamp: '2026-10-19T10:00:00.000Z',
      categories: { necessary: true, analytics: true },
    });
  });

  it('rejects missing or invalid payloads', () => {
    expect(parseConsentRecord(null)).toBeNull();
    expect(parseConsentRecord({})).toBeNull();
    expect(parseConsentRecord('nope')).toBeNull();
  });

  it('rejects outdated schema versions', () => {
    expect(
      parseConsentRecord({
        version: CONSENT_SCHEMA_VERSION + 1,
        timestamp: '2026-10-19T10:00:00.000Z',
        categories: { necessary: true, analytics: false },
      })
    ).toBeNull();
  });

  it('rejects records that disable necessary cookies', () => {
    expect(
      parseConsentRecord({
        version: CONSENT_SCHEMA_VERSION,
        timestamp: '2026-10-19T10:00:00.000Z',
        categories: { necessary: false, analytics: false },
      })
    ).toBeNull();
  });

  it('rejects invalid timestamps', () => {
    expect(
      parseConsentRecord({
        version: CONSENT_SCHEMA_VERSION,
        timestamp: 'not-a-date',
        categories: { necessary: true, analytics: false },
      })
    ).toBeNull();
  });
});

describe('consent helpers', () => {
  it('acceptAll enables analytics', () => {
    const record = acceptAllConsent();
    expect(record.categories).toEqual({ necessary: true, analytics: true });
    expect(hasAnalyticsConsent(record)).toBe(true);
  });

  it('rejectOptional keeps analytics off', () => {
    const record = rejectOptionalConsent();
    expect(record.categories).toEqual({ necessary: true, analytics: false });
    expect(hasAnalyticsConsent(record)).toBe(false);
  });

  it('createConsentRecord always forces necessary on', () => {
    const record = createConsentRecord({ analytics: true });
    expect(record.categories.necessary).toBe(true);
    expect(record.version).toBe(CONSENT_SCHEMA_VERSION);
  });

  it('treats null record as no analytics consent', () => {
    expect(hasAnalyticsConsent(null)).toBe(false);
  });
});

describe('consent storage', () => {
  const store = new Map<string, string>();

  beforeEach(() => {
    store.clear();
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => {
        store.set(key, value);
      },
      removeItem: (key: string) => {
        store.delete(key);
      },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('persists and restores a valid choice', () => {
    const record = rejectOptionalConsent();
    expect(writeConsentToStorage(record)).toBe(true);
    expect(readConsentFromStorage()).toEqual(record);
    expect(store.get(CONSENT_STORAGE_KEY)).toBeTruthy();
  });

  it('returns null for corrupted storage', () => {
    store.set(CONSENT_STORAGE_KEY, '{not-json');
    expect(readConsentFromStorage()).toBeNull();
  });

  it('returns null for outdated stored preferences', () => {
    store.set(
      CONSENT_STORAGE_KEY,
      JSON.stringify({
        version: 999,
        timestamp: '2026-10-19T10:00:00.000Z',
        categories: { necessary: true, analytics: true },
      })
    );
    expect(readConsentFromStorage()).toBeNull();
    expect(hasAnalyticsConsent(readConsentFromStorage())).toBe(false);
  });

  it('handles storage write failures without throwing', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => null,
      setItem: () => {
        throw new Error('quota exceeded');
      },
      removeItem: () => undefined,
    });

    expect(writeConsentToStorage(acceptAllConsent())).toBe(false);
  });
});
