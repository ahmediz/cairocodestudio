import React from 'react';
import { ServiceCard } from '@/components/ServiceCard';
import { buildStaticPageMetadata } from '@/features/page-seo/page-seo.service';
import { getServices } from '@/features/services/services.service';

export async function generateMetadata() {
  return buildStaticPageMetadata('services');
}

export const revalidate = 60;

export default async function ServicesPage() {
  const { items } = await getServices();

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
          {items.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}
