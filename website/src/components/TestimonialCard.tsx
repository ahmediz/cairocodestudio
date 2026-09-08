import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { TestimonialOutputDTO } from '@/features/testimonials/dtos/testimonialsOutputDTO';

interface TestimonialCardProps {
  testimonial: TestimonialOutputDTO;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const logoSrc = testimonial.logo.startsWith('/')
    ? testimonial.logo
    : testimonial.logo.startsWith('images/')
    ? `/${testimonial.logo}`
    : `/images/clients/${testimonial.logo}`;

  return (
    <div className="flex flex-col gap-6 border border-gray-100 rounded-2xl p-6 h-full bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="relative h-8 w-28 flex items-center">
          <Image
            src={logoSrc}
            alt={testimonial.logoAlt || `${testimonial.company} Logo`}
            width={120}
            height={32}
            className="max-h-8 w-auto object-contain"
          />
        </div>
        <span className="flex items-center gap-1 text-sm font-semibold text-gray-800">
          {testimonial.rating.toFixed(1)}
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
        </span>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed italic">
        "{testimonial.description}"
      </p>

      <div className="flex flex-col mt-auto pt-4 border-t border-gray-50">
        <h4 className="font-bold text-gray-900 font-antonio text-base">
          {testimonial.name}
        </h4>
        <span className="text-xs text-gray-500 font-medium">
          {testimonial.company}
        </span>
      </div>
    </div>
  );
}
