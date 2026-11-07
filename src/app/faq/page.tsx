import React from 'react';
import Link from 'next/link';
import { FaqAccordion } from '@/components/FaqAccordion';
import { buildStaticPageMetadata } from '@/features/page-seo/page-seo.service';
import { getFaqItems } from '@/features/faq/faq.service';

export async function generateMetadata() {
  return buildStaticPageMetadata('faq');
}

export const revalidate = 60;

export default async function FaqPage() {
  const items = await getFaqItems();

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-10 md:gap-14">
        <div className="text-center space-y-4 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold font-antonio text-primary">
            FAQ
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Answers about our UI/UX design services, deliverables, and how we
            work with product and engineering teams.
          </p>
        </div>

        {items.length > 0 ? (
          <FaqAccordion items={items} className="max-w-3xl" />
        ) : (
          <p className="text-gray-500 text-center">No questions published yet.</p>
        )}

        <p className="text-center text-gray-600 text-sm md:text-base max-w-xl">
          Still have questions?{' '}
          <Link
            href="/contact"
            className="font-semibold text-primary hover:underline"
          >
            Get in touch
          </Link>{' '}
          and we will help you plan the right approach for your product.
        </p>
      </div>
    </div>
  );
}
