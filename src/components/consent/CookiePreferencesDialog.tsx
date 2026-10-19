'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CONSENT_CATEGORIES } from '@/lib/consent/categories';
import { useConsent } from '@/context/ConsentContext';
import { cn } from '@/lib/utils';

export function CookiePreferencesDialog() {
  const {
    preferencesOpen,
    closePreferences,
    record,
    acceptAll,
    rejectOptional,
    savePreferences,
  } = useConsent();

  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    if (preferencesOpen) {
      setAnalyticsEnabled(record?.categories.analytics ?? false);
    }
  }, [preferencesOpen, record]);

  return (
    <Dialog
      open={preferencesOpen}
      onOpenChange={(open) => {
        if (!open) {
          closePreferences();
        }
      }}
    >
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Cookie preferences</DialogTitle>
          <DialogDescription>
            Choose which optional technologies we may use. Closing this dialog
            does not change your current choice. Read the{' '}
            <Link
              href="/cookie-policy"
              className="text-primary underline underline-offset-2"
              onClick={closePreferences}
            >
              Cookie Policy
            </Link>{' '}
            for details.
          </DialogDescription>
        </DialogHeader>

        <ul className="space-y-4 py-2">
          {CONSENT_CATEGORIES.map((category) => {
            const checked =
              category.id === 'necessary' ? true : analyticsEnabled;
            const disabled = category.required;

            return (
              <li
                key={category.id}
                className="rounded-xl border border-gray-200 p-4 space-y-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 min-w-0">
                    <p className="font-semibold text-gray-900 font-antonio text-lg">
                      {category.label}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                  <label className="inline-flex items-center gap-2 shrink-0 pt-1">
                    <span className="sr-only">
                      {category.required
                        ? `${category.label} (always on)`
                        : `Enable ${category.label}`}
                    </span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={checked}
                      aria-label={
                        category.required
                          ? `${category.label}, always enabled`
                          : `${category.label}`
                      }
                      disabled={disabled}
                      onClick={() => {
                        if (!disabled) {
                          setAnalyticsEnabled((prev) => !prev);
                        }
                      }}
                      className={cn(
                        'relative h-7 w-12 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70',
                        checked ? 'bg-primary' : 'bg-gray-300'
                      )}
                    >
                      <span
                        className={cn(
                          'absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform',
                          checked && 'translate-x-5'
                        )}
                      />
                    </button>
                  </label>
                </div>
                {category.required && (
                  <p className="text-xs text-gray-500">Always on</p>
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap pt-2">
          <Button
            type="button"
            className="sm:flex-1"
            onClick={() => savePreferences({ analytics: analyticsEnabled })}
          >
            Save preferences
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="sm:flex-1"
            onClick={acceptAll}
          >
            Accept all
          </Button>
          <Button
            type="button"
            variant="outline"
            className="sm:flex-1"
            onClick={rejectOptional}
          >
            Reject optional cookies
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
