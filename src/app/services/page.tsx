import React from 'react';
import { Metadata } from 'next';
import { ServiceCard } from '@/components/ServiceCard';

export const metadata: Metadata = {
  title: 'Web & App Development Services | Cairo Code Studio',
  description:
    'Explore our services in web design, app development, and UI/UX. We deliver scalable, high-quality digital solutions. Request your custom quote today.',
};

const allServices = [
  {
    title: 'UI/UX Design',
    description:
      'Modern, user-centered interfaces, prototypes, design systems, and complete UX flows.',
    icon: 'pi pi-palette',
  },
  {
    title: 'Web Development',
    description:
      'Fast, secure, scalable websites with clean engineering and long-term reliability.',
    icon: 'pi pi-globe',
  },
  {
    title: 'Mobile App Development',
    description: 'iOS & Android apps built for performance and scale.',
    icon: 'pi pi-mobile',
  },
  {
    title: 'E-Commerce Solutions',
    description:
      'Online stores with smooth checkout, product pages, and secure payment integrations.',
    icon: 'pi pi-shopping-cart',
  },
  {
    title: 'Brand Identity',
    description: 'Logo, color palette, typography, and full brand systems.',
    icon: 'pi pi-pencil',
  },
  {
    title: 'Care & Support Plans',
    description: 'Maintenance, updates, monitoring, backups, and support.',
    icon: 'pi pi-headphones',
  },
];

export default function ServicesPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold font-antonio text-primary">
            Our Services
          </h1>
          <p className="text-gray-600 text-lg">
            Comprehensive digital services designed to turn ambitious concepts
            into performant, world-class products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {allServices.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}
