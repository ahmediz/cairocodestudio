import { fetchServer } from '@/lib/api';
import { TestimonialOutputDTO } from './dtos/testimonialsOutputDTO';

export async function getTestimonials(): Promise<TestimonialOutputDTO[]> {
  try {
    return await fetchServer<TestimonialOutputDTO[]>('/api/testimonials?activeOnly=true', {
      revalidate: 60,
      tags: ['testimonials'],
    });
  } catch (error) {
    console.error('Failed to get testimonials from API:', error);
    return [];
  }
}
