import { z } from 'zod';

export const createTestimonialSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  company: z.string().min(1, 'Company is required'),
  description: z.string().min(1, 'Description/Quote is required'),
  rating: z.number().min(1).max(5).default(5.0),
  logo: z.string().min(1, 'Logo is required'),
  logoAlt: z.string().optional(),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export const updateTestimonialSchema = createTestimonialSchema.partial();
