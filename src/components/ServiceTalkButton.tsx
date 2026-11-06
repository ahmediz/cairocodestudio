'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useContactModal } from '@/context/ContactModalContext';

export function ServiceTalkButton() {
  const { openModal } = useContactModal();

  return (
    <Button onClick={openModal} className="font-semibold">
      Let&apos;s Talk
    </Button>
  );
}
