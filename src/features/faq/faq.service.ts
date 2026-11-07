import { fetchServer } from '@/lib/api';
import type { FaqItemOutputDTO, FaqPlacement } from './dtos/faqOutputDTO';

export async function getFaqItems(
  placement?: FaqPlacement
): Promise<FaqItemOutputDTO[]> {
  try {
    const params = new URLSearchParams({ activeOnly: 'true' });
    if (placement) {
      params.set('placement', placement);
    }

    return await fetchServer<FaqItemOutputDTO[]>(`/api/faq?${params.toString()}`, {
      revalidate: 60,
      tags: ['faq'],
    });
  } catch (error) {
    console.error('Failed to get FAQ items from API:', error);
    return [];
  }
}
