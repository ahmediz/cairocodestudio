'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useConsent } from '@/context/ConsentContext';

export function CookieConsentBanner() {
  const { showBanner, acceptAll, rejectOptional, openPreferences } = useConsent();

  if (!showBanner) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-heading"
      aria-describedby="cookie-consent-description"
      className="fixed inset-x-0 bottom-0 z-[60] p-4 md:p-6 pointer-events-none"
    >
      <div className="pointer-events-auto mx-auto max-w-4xl rounded-2xl border border-white/10 bg-dark-bg text-white shadow-2xl p-5 md:p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <h2
              id="cookie-consent-heading"
              className="text-xl md:text-2xl font-antonio font-bold text-white"
            >
              Your privacy choices
            </h2>
            <p
              id="cookie-consent-description"
              className="text-sm md:text-base text-gray-300 leading-relaxed"
            >
              We use cookies and similar technologies to run the site and, if you
              allow it, to measure traffic and performance. Strictly necessary
              storage keeps your preferences. You can accept optional analytics,
              reject them, or choose what you want.{' '}
              <Link
                href="/privacy-policy"
                className="text-primary-200 underline underline-offset-2 hover:text-primary-100"
              >
                Privacy Policy
              </Link>
              {' · '}
              <Link
                href="/cookie-policy"
                className="text-primary-200 underline underline-offset-2 hover:text-primary-100"
              >
                Cookie Policy
              </Link>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
            <Button
              type="button"
              variant="default"
              className="sm:flex-1"
              onClick={acceptAll}
            >
              Accept all
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="sm:flex-1 bg-white text-dark-bg hover:bg-gray-100"
              onClick={rejectOptional}
            >
              Reject optional cookies
            </Button>
            <Button
              type="button"
              variant="outline"
              className="sm:flex-1 border-white/30 text-white hover:bg-white/10 hover:text-white"
              onClick={openPreferences}
            >
              Customize preferences
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
