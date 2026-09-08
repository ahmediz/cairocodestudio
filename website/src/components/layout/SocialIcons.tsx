import React from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

export function SocialIcons({ className = '' }: { className?: string }) {
  const socials = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/cairocodestudio',
      icon: Facebook,
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/cairocodestudio',
      icon: Instagram,
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/cairo-code-studio/',
      icon: Linkedin,
    },
  ];

  return (
    <ul className={`flex items-center gap-4 ${className}`}>
      {socials.map((social) => {
        const Icon = social.icon;
        return (
          <li key={social.name}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors flex items-center justify-center p-1.5 rounded-full hover:bg-gray-100"
              aria-label={social.name}
            >
              <Icon className="h-5 w-5" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
