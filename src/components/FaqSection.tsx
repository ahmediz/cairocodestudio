import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { HomeSection } from '@/components/HomeSection';
import { FaqAccordion } from '@/components/FaqAccordion';
import { Button } from '@/components/ui/button';
import { getFaqItems } from '@/features/faq/faq.service';
import type { FaqPlacement } from '@/features/faq/dtos/faqOutputDTO';

interface FaqSectionProps {
  placement: FaqPlacement;
  title?: string;
  subtitle?: string;
  showViewAllLink?: boolean;
  className?: string;
}

export async function FaqSection({
  placement,
  title = 'Frequently asked questions',
  subtitle = 'Common questions about our UI/UX design process, deliverables, and timelines.',
  showViewAllLink = false,
  className,
}: FaqSectionProps) {
  const items = await getFaqItems(placement);

  if (items.length === 0) {
    return null;
  }

  return (
    <HomeSection title={title} subtitle={subtitle} className={className}>
      <FaqAccordion items={items} />
      {showViewAllLink ? (
        <Button
          asChild
          variant="customText"
          className="text-gray-900 font-semibold gap-2 hover:text-primary transition-colors"
        >
          <Link href="/faq">
            View all FAQs <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      ) : null}
    </HomeSection>
  );
}
