'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ServiceStep } from '@/features/services/dtos/servicesOutputDTO';
import { resolveProcessStepIcon } from '@/lib/serviceProcessStepIcons';

const STEP_DURATION_MS = 5000;

interface ServiceProcessTimelineProps {
  steps: ServiceStep[];
}

export function ServiceProcessTimeline({ steps }: ServiceProcessTimelineProps) {
  const [active, setActive] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (steps.length < 2 || reduceMotion) return;

    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % steps.length);
    }, STEP_DURATION_MS);

    return () => window.clearInterval(timer);
  }, [reduceMotion, steps.length, active]);

  const current = steps[active];
  if (!current) return null;

  const hasImages = steps.some((step) => step.image);

  return (
    <div className="grid w-full grid-cols-1 items-center gap-8 md:grid-cols-2 lg:gap-12">
      {hasImages ? (
        <div className="relative w-full aspect-[16/10] overflow-hidden rounded-3xl bg-gray-100">
          {steps.map((step, index) =>
            step.image ? (
              <Image
                key={`${step.image}-${index}`}
                src={step.image}
                alt={step.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index === 0}
                className={cn(
                  'object-cover pointer-events-none',
                  index === active ? 'z-10' : 'z-0',
                  reduceMotion
                    ? index === active
                      ? 'opacity-100'
                      : 'opacity-0'
                    : cn(
                        'transition-[opacity,transform] duration-700 ease-out',
                        index === active
                          ? 'opacity-100 scale-100'
                          : 'opacity-0 scale-105'
                      )
                )}
              />
            ) : null
          )}
        </div>
      ) : null}

      <div
        className="flex flex-col gap-6"
        role="tablist"
        aria-label="How it works"
      >
        {steps.map((step, index) => {
          const isActive = index === active;
          const StepIcon = resolveProcessStepIcon(step.icon, index);
          return (
            <button
              key={`${step.title}-${index}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(index)}
              className="relative flex gap-4 pb-5 text-left"
            >
              <div
                className={cn(
                  'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-colors',
                  isActive
                    ? 'border-primary/30 bg-primary/10'
                    : 'border-primary/15 bg-primary/5'
                )}
                aria-hidden
              >
                <StepIcon
                  className={cn(
                    'h-5 w-5 stroke-[1.75]',
                    isActive ? 'text-primary' : 'text-primary/70'
                  )}
                />
              </div>
              <div className="relative min-w-0 flex-1 pb-1">
                <p
                  className={cn(
                    'mb-1.5 text-sm font-semibold uppercase tracking-wide transition-colors',
                    isActive ? 'text-primary' : 'text-gray-400'
                  )}
                >
                  {index + 1}. {step.title}
                </p>
                <p
                  className={cn(
                    'text-sm leading-relaxed transition-colors',
                    isActive ? 'text-gray-700' : 'text-gray-500'
                  )}
                >
                  {step.description}
                </p>
                <span className="absolute right-0 bottom-0 left-0 h-0.5 bg-gray-200">
                  {isActive ? (
                    <span
                      key={active}
                      className={cn(
                        'block h-full origin-left bg-primary',
                        reduceMotion
                          ? 'w-full'
                          : 'w-full animate-process-progress'
                      )}
                    />
                  ) : null}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
