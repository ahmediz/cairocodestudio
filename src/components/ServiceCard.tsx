import React from 'react';
import Link from 'next/link';
import {
  Palette,
  Globe,
  Smartphone,
  ShoppingCart,
  PenTool,
  Headphones,
  LucideIcon,
} from 'lucide-react';

export const iconMap: Record<string, LucideIcon> = {
  'pi pi-palette': Palette,
  'pi pi-globe': Globe,
  'pi pi-mobile': Smartphone,
  'pi pi-shopping-cart': ShoppingCart,
  'pi pi-pencil': PenTool,
  'pi pi-headphones': Headphones,
};

export interface ServiceCardData {
  slug: string;
  title: string;
  description: string;
  icon: string;
}

interface ServiceCardProps {
  service: ServiceCardData;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const IconComponent = iconMap[service.icon] || Globe;

  return (
    <Link
      href={`/services/${service.slug}`}
      className="flex items-start gap-4 border rounded-2xl p-6 h-full bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="w-12 h-12 flex items-center justify-center bg-primary text-white rounded-2xl shrink-0 shadow-sm">
        <IconComponent className="h-6 w-6" />
      </div>
      <div className="flex-1 flex flex-col gap-1.5">
        <h3 className="text-xl font-bold font-antonio text-gray-900">
          {service.title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {service.description}
        </p>
      </div>
    </Link>
  );
}
