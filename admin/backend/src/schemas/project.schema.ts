import { z } from 'zod';

export const createProjectSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  image: z.string().min(1, 'Image URL or path is required'),
  link: z.string().url().optional().or(z.literal('')).nullable(),
  routerLink: z.string().optional().nullable(),
  isFeatured: z.boolean().default(false),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export const updateProjectSchema = createProjectSchema.partial();
