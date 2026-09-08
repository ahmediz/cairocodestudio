import React from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Github,
  Globe,
} from "lucide-react";

export interface SocialLinks {
  facebook?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  github?: string | null;
  behance?: string | null;
  dribbble?: string | null;
}

export interface SocialIconsProps {
  className?: string;
  socials?: SocialLinks | null;
}

export function SocialIcons({ className = "", socials }: SocialIconsProps) {
  // Built-in defaults if no socials provided at all
  const items: {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [];

  if (socials) {
    if (socials.facebook) {
      items.push({ name: "Facebook", href: socials.facebook, icon: Facebook });
    }
    if (socials.instagram) {
      items.push({
        name: "Instagram",
        href: socials.instagram,
        icon: Instagram,
      });
    }
    if (socials.linkedin) {
      items.push({ name: "LinkedIn", href: socials.linkedin, icon: Linkedin });
    }
    if (socials.twitter) {
      items.push({ name: "X (Twitter)", href: socials.twitter, icon: Twitter });
    }
    if (socials.github) {
      items.push({ name: "GitHub", href: socials.github, icon: Github });
    }
    if (socials.behance) {
      items.push({ name: "Behance", href: socials.behance, icon: Globe });
    }
    if (socials.dribbble) {
      items.push({ name: "Dribbble", href: socials.dribbble, icon: Globe });
    }
  } else {
    // Fallback default socials
    items.push(
      {
        name: "Facebook",
        href: "https://www.facebook.com/cairocodestudio",
        icon: Facebook,
      },
      {
        name: "Instagram",
        href: "https://www.instagram.com/cairocodestudio",
        icon: Instagram,
      },
      {
        name: "LinkedIn",
        href: "https://www.linkedin.com/company/cairo-code-studio/",
        icon: Linkedin,
      },
    );
  }

  if (items.length === 0) return null;

  return (
    <ul className={`flex items-center gap-4 ${className}`}>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <li key={item.name}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary transition-colors flex items-center justify-center"
              aria-label={item.name}
            >
              <Icon className="h-5 w-5" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
