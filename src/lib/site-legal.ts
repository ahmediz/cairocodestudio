/**
 * Verified site details used in legal/privacy copy.
 * Fields marked TODO must be confirmed by the site owner before relying on them legally.
 */
export const siteLegal = {
  brandName: 'Cairo Code Studio',
  websiteUrl: 'https://cairocodestudio.com',
  contactEmail: 'hello@cairocodestudio.com',
  phone: '+201000 60 9719',
  address: 'Nasr City, Cairo, Egypt',
  /**
   * TODO: Confirm the formal registered legal entity name (if different from the brand).
   */
  legalEntityName: null as string | null,
  /**
   * TODO: Confirm the privacy-specific contact address if different from contactEmail.
   */
  privacyEmail: null as string | null,
  /**
   * TODO: Confirm governing law / dispute venue with legal counsel.
   * Do not invent a jurisdiction.
   */
  governingLaw: null as string | null,
  /**
   * TODO: Confirm how long contact-form inquiries are retained in the backend.
   */
  inquiryRetentionDescription: null as string | null,
} as const;

export function getOperatorDisplayName(): string {
  return siteLegal.legalEntityName ?? siteLegal.brandName;
}

export function getPrivacyContactEmail(): string {
  return siteLegal.privacyEmail ?? siteLegal.contactEmail;
}
