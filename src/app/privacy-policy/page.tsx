import Link from 'next/link';
import { LegalPageShell, LegalSection } from '@/components/legal/LegalPageShell';
import { buildStaticPageMetadata } from '@/features/page-seo/page-seo.service';
import {
  getOperatorDisplayName,
  getPrivacyContactEmail,
  siteLegal,
} from '@/lib/site-legal';

export async function generateMetadata() {
  return buildStaticPageMetadata('privacy-policy');
}

const LAST_UPDATED = '19 October 2026';

export default function PrivacyPolicyPage() {
  const operator = getOperatorDisplayName();
  const privacyEmail = getPrivacyContactEmail();

  return (
    <LegalPageShell title="Privacy Policy" lastUpdated={LAST_UPDATED}>
      <LegalSection title="Who we are">
        <p>
          This website ({siteLegal.websiteUrl}) is operated by {operator}, a web
          and mobile app development studio based in {siteLegal.address}.
        </p>
        <p>
          Questions about this policy or your personal data:{' '}
          <a
            href={`mailto:${privacyEmail}`}
            className="text-primary underline underline-offset-2"
          >
            {privacyEmail}
          </a>
          {siteLegal.phone ? (
            <>
              {' '}
              or {siteLegal.phone}
            </>
          ) : null}
          .
        </p>
      </LegalSection>

      <LegalSection title="What this policy covers">
        <p>
          It explains how we handle personal data when you browse this website,
          submit the contact form, or otherwise get in touch. It does not cover
          third-party websites linked from our pages.
        </p>
      </LegalSection>

      <LegalSection title="Personal data we collect">
        <p>Depending on how you use the site, we may process:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong className="font-semibold text-gray-900">
              Contact details you submit
            </strong>
            : name, email address, phone number, subject, and message when you
            use the contact form or &quot;Let&apos;s talk&quot; form.
          </li>
          <li>
            <strong className="font-semibold text-gray-900">
              Technical and usage data (if you allow analytics)
            </strong>
            : page URLs, referrer, approximate location (country/region/city
            level as provided by Vercel), device type, browser, and operating
            system, plus performance metrics such as Core Web Vitals. See the
            analytics section below.
          </li>
          <li>
            <strong className="font-semibold text-gray-900">
              Cookie preference data
            </strong>
            : a record of your consent choices, stored in your browser so we can
            honour them.
          </li>
          <li>
            <strong className="font-semibold text-gray-900">
              Security signals from Google reCAPTCHA
            </strong>
            : when you submit a contact form, Google may process device and
            interaction signals to help us detect automated abuse. See Google&apos;s{' '}
            <a
              href="https://policies.google.com/privacy"
              className="text-primary underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
            .
          </li>
        </ul>
        <p>
          We do not create user accounts on this website. We do not knowingly
          collect payment card details through this site.
        </p>
      </LegalSection>

      <LegalSection title="How we collect data">
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Directly from you when you fill in a form or email, call, or message
            us.
          </li>
          <li>
            Automatically through website technologies when you visit, subject
            to your cookie and analytics choices where those choices apply.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Why we process personal data">
        <ul className="list-disc pl-5 space-y-2">
          <li>To respond to inquiries and discuss potential projects.</li>
          <li>
            To reduce spam and automated abuse on contact forms (Google
            reCAPTCHA).
          </li>
          <li>To operate, secure, and improve the website.</li>
          <li>
            To understand aggregate traffic and performance (only when analytics
            consent is given).
          </li>
          <li>To keep a record of your privacy preferences.</li>
          <li>To comply with legal obligations that apply to us.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Legal bases">
        <p>
          Where data protection laws that use &quot;legal bases&quot; apply (for
          example the GDPR), we typically rely on:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong className="font-semibold text-gray-900">
              Legitimate interests
            </strong>{' '}
            or{' '}
            <strong className="font-semibold text-gray-900">consent</strong> for
            optional analytics, depending on your location and the nature of the
            processing.
          </li>
          <li>
            <strong className="font-semibold text-gray-900">
              Steps prior to a contract / legitimate interests
            </strong>{' '}
            when you contact us about services.
          </li>
          <li>
            <strong className="font-semibold text-gray-900">
              Legal obligation
            </strong>{' '}
            where we must keep or disclose information under applicable law.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Vercel Web Analytics and Speed Insights">
        <p>
          This site can use{' '}
          <a
            href="https://vercel.com/docs/analytics"
            className="text-primary underline underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel Web Analytics
          </a>{' '}
          and{' '}
          <a
            href="https://vercel.com/docs/speed-insights"
            className="text-primary underline underline-offset-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel Speed Insights
          </a>
          , provided by Vercel Inc.
        </p>
        <p>
          According to Vercel&apos;s documentation, these products do not use
          third-party cookies for visitor identification. Web Analytics
          identifies visits using a hash derived from the incoming request; that
          session-related identifier is discarded after 24 hours. Speed Insights
          records anonymous performance data points (route, URL, network speed
          class, browser, device type, OS, country, and web vital values).
        </p>
        <p>
          Even without cookies, these tools send technical data to Vercel. On
          this website, both modules load only after you accept analytics (or
          enable the Analytics category in Cookie Settings). If you reject
          optional cookies or turn analytics off later, we stop loading them and
          block further events through their supported <code>beforeSend</code>{' '}
          hooks.
        </p>
        <p>
          We treat analytics as optional. Whether consent is legally required in
          every jurisdiction is a legal question; we gate collection behind
          consent as a conservative default. Review Vercel&apos;s privacy notices
          and take counsel for your situation.
        </p>
      </LegalSection>

      <LegalSection title="Hosting and other recipients">
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong className="font-semibold text-gray-900">Vercel</strong>:
            website hosting, Web Analytics, and Speed Insights (when enabled).
          </li>
          <li>
            <strong className="font-semibold text-gray-900">Google</strong>:
            reCAPTCHA verification when you submit a contact form.
          </li>
          <li>
            <strong className="font-semibold text-gray-900">
              Our backend / database providers
            </strong>
            : contact form submissions are sent to our API and stored so we can
            follow up. Exact infrastructure may change; ask us if you need the
            current processor list.
          </li>
        </ul>
        <p>
          We do not sell your personal data. We may disclose information if
          required by law or to protect rights, safety, or the integrity of the
          service.
        </p>
      </LegalSection>

      <LegalSection title="International transfers">
        <p>
          Our site is hosted on Vercel&apos;s infrastructure, which may process
          data in the United States and other countries. Contact form data is
          handled by systems we operate or commission, which may also involve
          cross-border processing.
        </p>
      </LegalSection>

      <LegalSection title="How long we keep data">
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong className="font-semibold text-gray-900">
              Cookie preferences
            </strong>
            : stored in your browser until you clear site data or we change the
            consent schema and ask you to choose again.
          </li>
          <li>
            <strong className="font-semibold text-gray-900">Analytics</strong>:
            retained by Vercel according to Vercel&apos;s product and privacy
            terms. Session hashing for Web Analytics is discarded after 24 hours
            per Vercel&apos;s documentation.
          </li>
          <li>
            <strong className="font-semibold text-gray-900">
              Contact inquiries
            </strong>
            :{' '}
            {siteLegal.inquiryRetentionDescription ??
              'kept for as long as needed to respond and manage the business relationship, then deleted or anonymised when no longer required.'}
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Your rights">
        <p>
          Depending on where you live, you may have rights to access, correct,
          delete, or restrict processing of your personal data, to object to
          certain processing, and to data portability. Where processing is based
          on consent, you may withdraw consent at any time (for analytics, use{' '}
          <strong className="font-semibold text-gray-900">Cookie Settings</strong>{' '}
          in the footer). Withdrawal does not affect processing that already
          happened lawfully.
        </p>
        <p>
          To exercise rights, email{' '}
          <a
            href={`mailto:${privacyEmail}`}
            className="text-primary underline underline-offset-2"
          >
            {privacyEmail}
          </a>
          . You may also complain to a supervisory authority if one applies to
          you.
        </p>
      </LegalSection>

      <LegalSection title="Children">
        <p>
          This website is aimed at businesses and adults exploring professional
          services. We do not knowingly collect personal data from children. If
          you believe a child has submitted information to us, contact us and we
          will delete it where appropriate.
        </p>
      </LegalSection>

      <LegalSection title="Security">
        <p>
          We use HTTPS for the website and limit access to inquiry data to people
          who need it for their work. No method of transmission or storage is
          completely secure; we work to reduce risk but cannot guarantee absolute
          security.
        </p>
      </LegalSection>

      <LegalSection title="Cookies and similar technologies">
        <p>
          Details of cookies, local storage, and related tools are in our{' '}
          <Link
            href="/cookie-policy"
            className="text-primary underline underline-offset-2"
          >
            Cookie Policy
          </Link>
          . You can change preferences anytime via Cookie Settings in the
          footer.
        </p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>
          We may update this policy when our practices, tools, or legal
          requirements change. The &quot;Last updated&quot; date at the top will
          change when we do. Material changes may also require a new consent
          choice if our cookie implementation changes.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
