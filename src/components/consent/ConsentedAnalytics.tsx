'use client';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { useConsent } from '@/context/ConsentContext';
import {
  hasAnalyticsConsent,
  readConsentFromStorage,
} from '@/lib/consent/consent';

/**
 * Loads Vercel Web Analytics and Speed Insights only after analytics consent.
 * beforeSend is a second guard so events are dropped if consent is withdrawn
 * while a script is still present in the page lifecycle.
 */
export function ConsentedAnalytics() {
  const { hydrated, analyticsAllowed } = useConsent();

  if (!hydrated || !analyticsAllowed) {
    return null;
  }

  return (
    <>
      <Analytics
        beforeSend={(event) =>
          hasAnalyticsConsent(readConsentFromStorage()) ? event : null
        }
      />
      <SpeedInsights
        beforeSend={(event) =>
          hasAnalyticsConsent(readConsentFromStorage()) ? event : null
        }
      />
    </>
  );
}
