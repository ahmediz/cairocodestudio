const RECAPTCHA_SCRIPT_ID = 'google-recaptcha-v3';
const RECAPTCHA_SCRIPT_SRC = 'https://www.google.com/recaptcha/api.js';

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export function getRecaptchaSiteKey(): string | undefined {
  const key = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim();
  return key || undefined;
}

function loadRecaptchaScript(siteKey: string): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('reCAPTCHA is only available in the browser'));
  }

  if (window.grecaptcha) {
    return new Promise((resolve) => {
      window.grecaptcha?.ready(() => resolve());
    });
  }

  const existing = document.getElementById(RECAPTCHA_SCRIPT_ID);
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener('load', () => {
        window.grecaptcha?.ready(() => resolve());
      });
      existing.addEventListener('error', () =>
        reject(new Error('Failed to load reCAPTCHA'))
      );
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.id = RECAPTCHA_SCRIPT_ID;
    script.src = `${RECAPTCHA_SCRIPT_SRC}?render=${encodeURIComponent(siteKey)}`;
    script.async = true;
    script.onload = () => {
      window.grecaptcha?.ready(() => resolve());
    };
    script.onerror = () => reject(new Error('Failed to load reCAPTCHA'));
    document.head.appendChild(script);
  });
}

/**
 * Executes reCAPTCHA v3 and returns a token for server-side verification.
 * Returns undefined in non-production when the site key is not configured.
 */
export async function getRecaptchaToken(
  action: string
): Promise<string | undefined> {
  const siteKey = getRecaptchaSiteKey();
  if (!siteKey) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        'Bot protection is not configured. Please try again later.'
      );
    }
    console.warn(
      'NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not set; skipping reCAPTCHA in development'
    );
    return undefined;
  }

  await loadRecaptchaScript(siteKey);

  if (!window.grecaptcha) {
    throw new Error(
      'Bot protection failed to initialize. Please refresh and try again.'
    );
  }

  const token = await window.grecaptcha.execute(siteKey, { action });
  if (!token) {
    throw new Error('Bot protection check failed. Please try again.');
  }

  return token;
}
