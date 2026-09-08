import React from 'react';
import { cn } from '@/lib/utils';

interface HomeSectionProps {
  title: string;
  subtitle?: string;
  isCenter?: boolean;
  className?: string;
  containerClass?: string;
  children: React.ReactNode;
}

export function HomeSection({
  title,
  subtitle,
  isCenter = false,
  className = '',
  containerClass = '',
  children,
}: HomeSectionProps) {
  return (
    <section className={cn('py-12 md:py-20', className)}>
      <div
        className={cn(
          'max-w-7xl mx-auto px-4 flex flex-col items-center gap-8 md:gap-12',
          containerClass
        )}
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <h2
            className={cn(
              'text-3xl md:text-4xl font-extrabold font-antonio tracking-tight text-gray-900',
              !isCenter && 'relative pb-3 after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-0.5 after:bg-primary'
            )}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-gray-600 text-base md:text-lg max-w-2xl">{subtitle}</p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
