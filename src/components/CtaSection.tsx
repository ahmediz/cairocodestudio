'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useContactModal } from '@/context/ContactModalContext';
import { Zap } from 'lucide-react';

interface CtaSectionProps {
  title?: string;
  subtitle?: string;
}

export function CtaSection({
  title = 'Unlock the Full Potential of Your Website',
  subtitle = 'Claim your free expert audit and discover where improvements can boost results.',
}: CtaSectionProps) {
  const { openModal } = useContactModal();

  return (
    <section className="bg-primary text-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-extrabold font-antonio tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        <div className="pt-2 flex justify-center">
          <Button
            onClick={openModal}
            variant="contrast"
            size="lg"
            className="gap-2 font-semibold shadow-lg"
          >
            <Zap className="h-5 w-5 text-primary" /> Start Your Project
          </Button>
        </div>
      </div>
    </section>
  );
}
