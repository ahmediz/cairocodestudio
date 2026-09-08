import { z } from 'zod';

export const contactSubmissionSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(6, 'Valid phone number is required'),
  subject: z.string().min(2, 'Subject is required'),
  message: z.string().min(5, 'Message must be at least 5 characters'),
  type: z.enum(['contact', 'lets_talk']).default('contact'),
});

export const updateInquiryStatusSchema = z.object({
  status: z.enum(['pending', 'contacted', 'closed']),
});
