'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SocialIcons, SocialLinks } from './SocialIcons';
import { useContactModal } from '@/context/ContactModalContext';
import { cn } from '@/lib/utils';

interface HeaderProps {
  socials?: SocialLinks | null;
}

export function Header({ socials }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openModal } = useContactModal();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="py-4 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="shrink-0">
          <Image
            src="/logo-dark.svg"
            alt="Cairo Code Studio Logo"
            width={157}
            height={56}
            className="h-12 w-auto"
            priority
          />
        </Link>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(true)}
          className="p-2 md:hidden rounded-lg hover:bg-gray-100 text-gray-700"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'text-sm font-medium transition-colors hover:text-primary',
                      isActive ? 'text-primary font-semibold' : 'text-gray-600'
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-5">
          <SocialIcons socials={socials} />
          <Button onClick={openModal} size="sm" className="font-semibold">
            Let's Talk
          </Button>
        </div>

        {/* Mobile Drawer */}
        <div
          className={cn(
            'fixed inset-0 z-50 bg-dark-bg text-white flex flex-col p-8 transition-transform duration-300 md:hidden',
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="flex items-center justify-between pb-8 border-b border-white/10">
            <Image
              src="/logo-white.svg"
              alt="Cairo Code Studio Logo"
              width={140}
              height={50}
              className="h-10 w-auto"
            />
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-full hover:bg-white/10 text-white"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex-1 py-8">
            <ul className="flex flex-col gap-6 text-xl font-medium font-antonio tracking-wide">
              {navItems.map((item) => {
                const isActive =
                  item.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(
                        'block transition-colors',
                        isActive ? 'text-primary' : 'text-gray-300 hover:text-white'
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="pt-6 border-t border-white/10 space-y-6">
            <SocialIcons socials={socials} className="justify-center [&_a]:text-white [&_a:hover]:text-primary [&_a:hover]:bg-white/10" />
            <Button
              onClick={() => {
                setIsMenuOpen(false);
                openModal();
              }}
              className="w-full h-12 text-base font-semibold"
            >
              Let's Talk
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
