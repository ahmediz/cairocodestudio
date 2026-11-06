'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ServiceBenefit } from '@/features/services/dtos/servicesOutputDTO';

interface ServiceBenefitsCarouselProps {
  title: string;
  subtitle: string;
  benefits: ServiceBenefit[];
}

const trackInset =
  'max(1rem,calc((100% - 80rem) / 2 + 1rem))';

export function ServiceBenefitsCarousel({
  title,
  subtitle,
  benefits,
}: ServiceBenefitsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(
      Math.round(el.scrollLeft) < el.scrollWidth - el.clientWidth - 5
    );
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [benefits]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-benefit-card]');
    const amount = card ? card.offsetWidth + 24 : 320;
    el.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  if (!benefits.length) return null;

  return (
    <div className="w-full space-y-8">
      <div className="max-w-7xl mx-auto px-4 flex items-end justify-between gap-6">
        <div className="max-w-xl space-y-3">
          <h2 className="text-3xl md:text-4xl font-extrabold font-antonio tracking-tight text-gray-900">
            {title}
          </h2>
          {subtitle ? (
            <p className="text-gray-600 text-base md:text-lg">{subtitle}</p>
          ) : null}
        </div>
        <div className="flex items-center gap-2 shrink-0 pb-1">
          <button
            type="button"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Previous cards"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-all hover:border-gray-300 hover:shadow-md disabled:opacity-40 disabled:pointer-events-none"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Next cards"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-all hover:border-gray-300 hover:shadow-md disabled:opacity-40 disabled:pointer-events-none"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          paddingLeft: trackInset,
          paddingRight: '1rem',
          scrollPaddingLeft: trackInset,
        }}
      >
        {benefits.map((benefit) => (
          <article
            key={benefit.title}
            data-benefit-card
            className="flex w-[min(22rem,85vw)] shrink-0 snap-start flex-col gap-4 rounded-2xl bg-white p-5 md:w-[24rem] md:p-6 lg:w-[26rem]"
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-antonio text-gray-900">
                {benefit.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
            {benefit.image ? (
              <div className="relative mt-auto aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-100">
                <Image
                  src={benefit.image}
                  alt={benefit.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 85vw, 416px"
                />
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
