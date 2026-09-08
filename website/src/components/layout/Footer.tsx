import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SocialIcons } from './SocialIcons';
import { CtaSection } from '../CtaSection';

export function Footer() {
  const footerLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <CtaSection />
      <footer className="bg-dark-bg text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link href="/">
              <Image
                src="/logo-white.svg"
                alt="Cairo Code Studio Logo"
                width={157}
                height={56}
                className="h-12 w-auto"
              />
            </Link>

            <ul className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-300">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <SocialIcons className="[&_a]:text-gray-400 [&_a:hover]:text-primary [&_a:hover]:bg-white/5" />
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 text-center text-xs text-gray-400">
            <p>
              © {new Date().getFullYear()} Cairo Code Studio. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
