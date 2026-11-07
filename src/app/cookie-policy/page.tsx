import Link from 'next/link';
import { LegalPageShell, LegalSection } from '@/components/legal/LegalPageShell';
import { CONSENT_STORAGE_KEY, CONSENT_SCHEMA_VERSION } from '@/lib/consent/types';
import { buildStaticPageMetadata } from '@/features/page-seo/page-seo.service';
import { getPrivacyContactEmail, siteLegal } from '@/lib/site-legal';

export async function generateMetadata() {
  return buildStaticPageMetadata('cookie-policy');
}

const LAST_UPDATED = '19 October 2026';

export default function CookiePolicyPage() {
  const privacyEmail = getPrivacyContactEmail();

  return (
    <LegalPageShell title="Cookie Policy" lastUpdated={LAST_UPDATED}>
      <LegalSection title="What cookies and similar technologies are">
        <p>
          Cookies are small text files stored on your device by a website.
          Similar technologies include local storage, session storage, pixels,
          and scripts that read or write data in your browser.
        </p>
        <p>
          This policy explains what {siteLegal.brandName} uses on{' '}
          {siteLegal.websiteUrl}, how consent works, and how you can change your
          mind. For broader privacy practices, see the{' '}
          <Link
            href="/privacy-policy"
            className="text-primary underline underline-offset-2"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="How we use these technologies">
        <p>We use them to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Remember your cookie and analytics preferences.</li>
          <li>
            Measure site traffic and performance when you allow analytics
            (Vercel Web Analytics and Vercel Speed Insights).
          </li>
          <li>
            Help prevent automated spam on contact forms (Google reCAPTCHA),
            loaded when you submit a form.
          </li>
        </ul>
        <p>
          We do not currently use advertising pixels, marketing tags, or
          third-party social embeds that set their own tracking cookies on this
          site.
        </p>
      </LegalSection>

      <LegalSection title="Categories we use">
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong className="font-semibold text-gray-900">
              Strictly necessary
            </strong>
            : storing your consent record, and Google reCAPTCHA when you submit
            a contact form (to protect the form from bots). Always active for
            those purposes.
          </li>
          <li>
            <strong className="font-semibold text-gray-900">Analytics</strong>:
            optional. Enables Vercel Web Analytics and Speed Insights.
          </li>
        </ul>
        <p>
          Marketing categories are not shown in our preference centre because we
          have not deployed advertising technologies. If we add them later, we
          will update this policy and the consent controls.
        </p>
      </LegalSection>

      <LegalSection title="Technology inventory">
        <p>
          The table below lists technologies identified from the current website
          codebase and from Vercel&apos;s published documentation. Exact cookie
          names for Vercel intake scripts can change with package versions and
          Vercel&apos;s Resilient Intake. We do not invent cookie names we have
          not verified in production.
        </p>

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-900">
              <tr>
                <th className="p-3 font-semibold">Name / mechanism</th>
                <th className="p-3 font-semibold">Provider</th>
                <th className="p-3 font-semibold">Purpose</th>
                <th className="p-3 font-semibold">Type</th>
                <th className="p-3 font-semibold">Duration</th>
                <th className="p-3 font-semibold">Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="p-3 font-mono text-xs">{CONSENT_STORAGE_KEY}</td>
                <td className="p-3">{siteLegal.brandName}</td>
                <td className="p-3">
                  Stores consent schema version {CONSENT_SCHEMA_VERSION}, your
                  category choices, and a timestamp
                </td>
                <td className="p-3">localStorage</td>
                <td className="p-3">Until cleared or schema changes</td>
                <td className="p-3">Strictly necessary</td>
              </tr>
              <tr>
                <td className="p-3">
                  Vercel Web Analytics script / intake
                </td>
                <td className="p-3">Vercel Inc.</td>
                <td className="p-3">
                  Aggregated page-view and traffic statistics. Uses a request
                  hash rather than third-party cookies for visitor sessions
                  (per Vercel docs); hash discarded after 24 hours
                </td>
                <td className="p-3">
                  Script / network requests (no third-party ID cookies claimed
                  by Vercel)
                </td>
                <td className="p-3">
                  Session hash: 24 hours (Vercel documentation)
                </td>
                <td className="p-3">Analytics (optional)</td>
              </tr>
              <tr>
                <td className="p-3">
                  Vercel Speed Insights script / intake
                </td>
                <td className="p-3">Vercel Inc.</td>
                <td className="p-3">
                  Collects anonymous Core Web Vitals and related performance
                  metrics
                </td>
                <td className="p-3">Script / network requests</td>
                <td className="p-3">
                  Per Vercel product retention (see Vercel privacy notice)
                </td>
                <td className="p-3">Analytics (optional)</td>
              </tr>
              <tr>
                <td className="p-3">
                  Google reCAPTCHA v3 (e.g. _GRECAPTCHA / related)
                </td>
                <td className="p-3">Google</td>
                <td className="p-3">
                  Spam and bot protection on contact form submission; may set
                  cookies or use other browser storage per Google&apos;s
                  implementation
                </td>
                <td className="p-3">Script / cookies / network requests</td>
                <td className="p-3">
                  Per Google reCAPTCHA cookie durations (see Google policies)
                </td>
                <td className="p-3">Strictly necessary (forms)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          This inventory lists confirmed storage we control (
          <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">
            {CONSENT_STORAGE_KEY}
          </code>
          ) and the documented behaviour of Vercel Web Analytics and Speed
          Insights for the package versions used on this site. Vercel&apos;s
          hosted scripts may change over time; refer to Vercel&apos;s current
          documentation for the latest technical details.
        </p>
      </LegalSection>

      <LegalSection title="Consent and preferences">
        <p>
          On your first visit (or after we raise the consent schema version), we
          show a banner. You can accept all optional technologies, reject them,
          or open Customize preferences. Closing the banner or the preferences
          dialog without choosing does not count as consent for analytics.
        </p>
        <p>
          Your choice is saved in localStorage under{' '}
          <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">
            {CONSENT_STORAGE_KEY}
          </code>
          . Missing, invalid, or outdated records are treated as no choice, so
          the banner can appear again.
        </p>
      </LegalSection>

      <LegalSection title="How to change or withdraw consent">
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Use{' '}
            <strong className="font-semibold text-gray-900">
              Cookie Settings
            </strong>{' '}
            in the website footer at any time.
          </li>
          <li>
            Clear this site&apos;s data in your browser settings to remove the
            stored preference record.
          </li>
        </ul>
        <p>
          When you turn analytics off, we stop mounting the Vercel Analytics and
          Speed Insights components and drop events via their{' '}
          <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">
            beforeSend
          </code>{' '}
          callbacks. Collection does not resume unless you grant analytics
          consent again.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about cookies or this policy:{' '}
          <a
            href={`mailto:${privacyEmail}`}
            className="text-primary underline underline-offset-2"
          >
            {privacyEmail}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
