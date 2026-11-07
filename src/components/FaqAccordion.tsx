'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { FaqItemOutputDTO } from '@/features/faq/dtos/faqOutputDTO';

interface FaqAccordionProps {
  items: FaqItemOutputDTO[];
  className?: string;
}

export function FaqAccordion({ items, className }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <ul className={cn('w-full max-w-3xl space-y-3', className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `faq-panel-${item.id}`;
        const buttonId = `faq-trigger-${item.id}`;

        return (
          <li
            key={item.id}
            className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden"
          >
            <h3 className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start text-base md:text-lg font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 shrink-0 text-primary transition-transform duration-200',
                    isOpen && 'rotate-180'
                  )}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-5 pb-5 text-gray-600 text-sm md:text-base leading-relaxed border-t border-gray-100"
            >
              {isOpen ? <p className="pt-4 m-0">{item.answer}</p> : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
