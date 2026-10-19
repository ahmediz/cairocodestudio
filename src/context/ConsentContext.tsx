'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  acceptAllConsent,
  createConsentRecord,
  hasAnalyticsConsent,
  readConsentFromStorage,
  rejectOptionalConsent,
  writeConsentToStorage,
} from '@/lib/consent/consent';
import type { ConsentCategories, ConsentRecord } from '@/lib/consent/types';
import { CookieConsentBanner } from '@/components/consent/CookieConsentBanner';
import { CookiePreferencesDialog } from '@/components/consent/CookiePreferencesDialog';

interface ConsentContextValue {
  hydrated: boolean;
  record: ConsentRecord | null;
  showBanner: boolean;
  preferencesOpen: boolean;
  analyticsAllowed: boolean;
  openPreferences: () => void;
  closePreferences: () => void;
  acceptAll: () => void;
  rejectOptional: () => void;
  savePreferences: (categories: Pick<ConsentCategories, 'analytics'>) => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [record, setRecord] = useState<ConsentRecord | null>(null);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [bannerDismissedThisSession, setBannerDismissedThisSession] = useState(false);

  useEffect(() => {
    setRecord(readConsentFromStorage());
    setHydrated(true);
  }, []);

  const persist = useCallback((next: ConsentRecord) => {
    writeConsentToStorage(next);
    setRecord(next);
    setBannerDismissedThisSession(true);
    setPreferencesOpen(false);
  }, []);

  const acceptAll = useCallback(() => {
    persist(acceptAllConsent());
  }, [persist]);

  const rejectOptional = useCallback(() => {
    persist(rejectOptionalConsent());
  }, [persist]);

  const savePreferences = useCallback(
    (categories: Pick<ConsentCategories, 'analytics'>) => {
      persist(createConsentRecord(categories));
    },
    [persist]
  );

  const openPreferences = useCallback(() => {
    setPreferencesOpen(true);
  }, []);

  const closePreferences = useCallback(() => {
    setPreferencesOpen(false);
  }, []);

  const showBanner = hydrated && !record && !bannerDismissedThisSession && !preferencesOpen;

  const value = useMemo<ConsentContextValue>(
    () => ({
      hydrated,
      record,
      showBanner,
      preferencesOpen,
      analyticsAllowed: hasAnalyticsConsent(record),
      openPreferences,
      closePreferences,
      acceptAll,
      rejectOptional,
      savePreferences,
    }),
    [
      hydrated,
      record,
      showBanner,
      preferencesOpen,
      openPreferences,
      closePreferences,
      acceptAll,
      rejectOptional,
      savePreferences,
    ]
  );

  return (
    <ConsentContext.Provider value={value}>
      {children}
      <CookieConsentBanner />
      <CookiePreferencesDialog />
    </ConsentContext.Provider>
  );
}

export function useConsent(): ConsentContextValue {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error('useConsent must be used within a ConsentProvider');
  }
  return context;
}
