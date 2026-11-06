import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Globe } from 'lucide-react';
import { iconMap } from '@/components/ServiceCard';
import { getServiceBySlug } from '@/features/services/services.service';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service || !service.isActive) {
    return { title: 'Service not found | Cairo Code Studio' };
  }
  return {
    title: `${service.title} | Cairo Code Studio`,
    description: service.description,
    openGraph: {
      title: service.title,
      description: service.description,
      type: 'website',
    },
  };
}

export const revalidate = 60;

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service || !service.isActive) {
    notFound();
  }

  const IconComponent = iconMap[service.icon] || Globe;
  const paragraphs = service.overview
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0);

  return (
    <article className="py-12 md:py-20">
      <div className="max-w-3xl mx-auto px-4 space-y-10">
        <div className="space-y-4">
          <Link
            href="/services"
            className="text-xs font-semibold uppercase tracking-wide text-primary hover:underline"
          >
            Services
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center bg-primary text-white rounded-2xl shrink-0">
              <IconComponent className="h-6 w-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold font-antonio text-gray-900">
              {service.title}
            </h1>
          </div>
          <p className="text-lg text-gray-600">{service.description}</p>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold font-antonio text-gray-900">
            Overview
          </h2>
          <div className="space-y-4">
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-gray-600 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {service.includedItems.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-antonio text-gray-900">
              What&apos;s included
            </h2>
            <ul className="space-y-2 list-disc ps-5 text-gray-600">
              {service.includedItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {service.howItWorks.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-antonio text-gray-900">
              How it works
            </h2>
            <ol className="space-y-4">
              {service.howItWorks.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-bold font-antonio text-gray-900">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        <div className="pt-8 border-t">
          <Link
            href="/services"
            className="text-sm font-semibold text-primary hover:underline"
          >
            ← Back to services
          </Link>
        </div>
      </div>
    </article>
  );
}
