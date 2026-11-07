import Link from 'next/link';
import { LegalPageShell, LegalSection } from '@/components/legal/LegalPageShell';
import { buildStaticPageMetadata } from '@/features/page-seo/page-seo.service';
import {
  getOperatorDisplayName,
  getPrivacyContactEmail,
  siteLegal,
} from '@/lib/site-legal';

export async function generateMetadata() {
  return buildStaticPageMetadata('terms-and-conditions');
}

const LAST_UPDATED = '19 October 2026';

export default function TermsAndConditionsPage() {
  const operator = getOperatorDisplayName();
  const contactEmail = getPrivacyContactEmail();

  return (
    <LegalPageShell title="Terms and Conditions" lastUpdated={LAST_UPDATED}>
      <LegalSection title="Agreement">
        <p>
          These terms apply when you browse or use {siteLegal.websiteUrl} (the
          &quot;Site&quot;), operated by {operator}. By using the Site you agree
          to these terms. If you do not agree, do not use the Site.
        </p>
      </LegalSection>

      <LegalSection title="What this site is for">
        <p>
          The Site presents {siteLegal.brandName}&apos;s web and mobile
          development services, portfolio, blog, and contact channels. It is an
          informational and inquiry website. Browsing it does not create a client
          engagement. Project work is governed by a separate agreement if we
          enter one.
        </p>
      </LegalSection>

      <LegalSection title="Acceptable use">
        <p>You may use the Site for lawful purposes only. You must not:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Attempt to gain unauthorised access to the Site, our systems, or
            related infrastructure.
          </li>
          <li>
            Probe, scan, or test vulnerability except with our prior written
            permission.
          </li>
          <li>
            Interfere with or disrupt the Site, including by introducing malware
            or overloading requests.
          </li>
          <li>
            Use the Site to send spam, scrape content at a harmful scale, or
            misrepresent your identity when contacting us.
          </li>
          <li>
            Use the Site in any way that breaks applicable law.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Content and intellectual property">
        <p>
          Text, branding, logos, layout, graphics, and other materials on the
          Site belong to {operator} or our licensors unless stated otherwise.
          You may view and share links to public pages for personal or
          professional reference. You may not copy, modify, distribute, or
          commercially exploit Site content without prior written permission,
          except for fair dealing or other rights that cannot be waived under
          applicable law.
        </p>
        <p>
          Portfolio case studies may describe client work. Client names,
          trademarks, and project materials remain the property of their
          respective owners.
        </p>
      </LegalSection>

      <LegalSection title="Information you send us">
        <p>
          If you submit a contact form or otherwise send us information, you
          confirm that it is accurate to the best of your knowledge and that you
          have the right to share it. Do not send sensitive personal data or
          confidential third-party information unless we have agreed in writing
          how it will be handled.
        </p>
        <p>
          How we process personal data is described in our{' '}
          <Link
            href="/privacy-policy"
            className="text-primary underline underline-offset-2"
          >
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link
            href="/cookie-policy"
            className="text-primary underline underline-offset-2"
          >
            Cookie Policy
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="External links and third-party services">
        <p>
          The Site may link to social networks, client sites, or other
          third-party resources. We do not control those sites and are not
          responsible for their content, policies, or practices. Your use of
          them is between you and the third party.
        </p>
      </LegalSection>

      <LegalSection title="Availability and changes">
        <p>
          We aim to keep the Site available but do not guarantee uninterrupted
          access. We may change, suspend, or discontinue any part of the Site
          without notice. We may also update these terms; the &quot;Last
          updated&quot; date will change when we do. Continued use after an
          update means you accept the revised terms, where permitted by law.
        </p>
      </LegalSection>

      <LegalSection title="Disclaimers">
        <p>
          The Site and its content are provided on an &quot;as is&quot; and
          &quot;as available&quot; basis. To the fullest extent permitted by
          applicable law, we disclaim warranties of merchantability, fitness for
          a particular purpose, and non-infringement. Blog posts and general
          descriptions of services are informational and are not professional
          advice tailored to your situation.
        </p>
      </LegalSection>

      <LegalSection title="Limitation of liability">
        <p>
          To the fullest extent permitted by applicable law, {operator} and its
          team members are not liable for indirect, incidental, special,
          consequential, or punitive damages, or for loss of profits, data, or
          goodwill, arising from your use of (or inability to use) the Site.
          Nothing in these terms excludes or limits liability that cannot be
          excluded or limited under applicable law (including liability for
          death or personal injury caused by negligence, or for fraud).
        </p>
      </LegalSection>

      <LegalSection title="Governing law and disputes">
        <p>
          {siteLegal.governingLaw ??
            'These terms are governed by the laws applicable to our place of business in Cairo, Egypt, without prejudice to mandatory consumer protections that may apply where you live. If a dispute arises and cannot be resolved informally, it may be brought before the competent courts in Cairo, Egypt, unless mandatory law requires otherwise.'}
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about these terms:{' '}
          <a
            href={`mailto:${contactEmail}`}
            className="text-primary underline underline-offset-2"
          >
            {contactEmail}
          </a>
          {siteLegal.address ? <>, {siteLegal.address}</> : null}.
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
