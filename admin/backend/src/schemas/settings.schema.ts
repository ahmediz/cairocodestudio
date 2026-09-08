import { z } from 'zod';

const optionalUrl = z
  .string()
  .trim()
  .url('Must be a valid URL (e.g. https://...)')
  .optional()
  .or(z.literal(''))
  .nullable();

export const updateSettingsSchema = z.object({
  email: z.string().trim().email('Invalid email address'),
  phone: z.string().trim().min(1, 'Phone number is required'),
  whatsapp: z.string().trim().optional().or(z.literal('')).nullable(),
  address: z.string().trim().min(1, 'Address is required'),
  workingHours: z.string().trim().optional().or(z.literal('')).nullable(),
  facebook: optionalUrl,
  instagram: optionalUrl,
  linkedin: optionalUrl,
  twitter: optionalUrl,
  github: optionalUrl,
  behance: optionalUrl,
  dribbble: optionalUrl,
});

export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;
