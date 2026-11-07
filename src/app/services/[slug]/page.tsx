import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HomeSection } from '@/components/HomeSection';
import { ServiceBenefitsCarousel } from '@/components/ServiceBenefitsCarousel';
import { ServiceProcessTimeline } from '@/components/ServiceProcessTimeline';
import { ServiceTalkButton } from '@/components/ServiceTalkButton';
import { ServiceCard } from '@/components/ServiceCard';
import { PortfolioCard } from '@/components/PortfolioCard';
import { TestimonialCard } from '@/components/TestimonialCard';
import { getRecentProjects } from '@/features/projects/projects.service';
import { getServiceBySlug } from '@/features/services/services.service';
import { FaqSection } from '@/components/FaqSection';
import { getTestimonials } from '@/features/testimonials/testimonials.service';

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
    description: service.heroSubtitle || service.description,
    openGraph: {
      title: service.heroHeadline || service.title,
      description: service.heroSubtitle || service.description,
      images: service.heroImage ? [{ url: service.heroImage }] : undefined,
      type: 'website',
    },
  };
}

export const revalidate = 60;

function SectionImage({ src, alt }: { src: string; alt: string }) {
  if (!src) return null;
  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden rounded-3xl bg-gray-100 shadow-sm">
      <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
    </div>
  );
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const [service, testimonials, recentProjects] = await Promise.all([
    getServiceBySlug(slug),
    getTestimonials(),
    getRecentProjects(3),
  ]);

  if (!service || !service.isActive) {
    notFound();
  }

  return (
    <div className="flex flex-col overflow-hidden">
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between flex-col-reverse md:flex-row gap-12">
            <div className="flex-1 space-y-6">
              <Link
                href="/services"
                className="text-xs font-semibold uppercase tracking-wide text-primary hover:underline"
              >
                Services
              </Link>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-antonio leading-[1.1] text-gray-900 title-with-dash">
                {service.heroHeadline}
              </h1>
              <p className="text-gray-600 text-lg md:text-xl max-w-xl leading-relaxed">
                {service.heroSubtitle}
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <ServiceTalkButton />
                <Button
                  asChild
                  variant="customText"
                  className="text-gray-900 font-semibold text-base gap-2 px-0 hover:text-primary transition-colors"
                >
                  <Link href="#why-it-matters">
                    Learn More <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            {service.heroImage && (
              <figure className="overflow-hidden rounded-3xl max-w-2xl w-full shadow-lg">
                <Image
                  src={service.heroImage}
                  width={672}
                  height={448}
                  alt={service.heroHeadline}
                  priority
                  sizes="(max-width: 768px) 100vw, 672px"
                  className="w-full h-auto object-cover"
                />
              </figure>
            )}
          </div>
        </div>
      </section>

      {service.benefits.length > 0 && (
        <section
          id="why-it-matters"
          className="py-12 md:py-20 bg-gray-50 border-y border-gray-100"
        >
          <ServiceBenefitsCarousel
            title={service.benefitsTitle}
            subtitle={service.benefitsIntro}
            benefits={service.benefits}
          />
        </section>
      )}

      {service.features.length > 0 && (
        <div className="py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 space-y-16">
            {service.features.map((feature, index) => (
              <article
                key={feature.title}
                className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"
              >
                <div className={index % 2 === 1 ? 'md:order-2' : undefined}>
                  <SectionImage src={feature.image} alt={feature.title} />
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-extrabold font-antonio text-gray-900">
                    {feature.title}
                  </h2>
                  <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                    {feature.description}
                  </p>
                  {feature.bullets.length > 0 && (
                    <ul className="space-y-2 list-disc ps-5 text-gray-600">
                      {feature.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {service.howItWorks.length > 0 && (
        <HomeSection
          title={service.processTitle}
          subtitle={service.processIntro}
          className="bg-gray-50 border-y border-gray-100"
        >
          <ServiceProcessTimeline steps={service.howItWorks} />
        </HomeSection>
      )}

      {service.whatsIncluded.length > 0 && (
        <HomeSection title="What's Included">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {service.whatsIncluded.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="rounded-2xl border bg-white p-8 text-center shadow-sm"
              >
                <h3 className="text-lg md:text-xl font-extrabold font-antonio text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm font-medium text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </HomeSection>
      )}

      {service.stats.length > 0 && (
        <HomeSection title={service.statsTitle} subtitle={service.statsIntro}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {service.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border bg-white p-8 text-center shadow-sm"
              >
                <p className="text-4xl md:text-5xl font-extrabold font-antonio text-primary">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-medium text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </HomeSection>
      )}

      {service.relatedServices.length > 0 && (
        <HomeSection
          title="Related services"
          className="bg-gray-50 border-y border-gray-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {service.relatedServices.map((related) => (
              <ServiceCard key={related.id} service={related} />
            ))}
          </div>
        </HomeSection>
      )}

      {recentProjects.length > 0 && (
        <HomeSection
          title="Our most recent delivered projects"
          subtitle="Recent web and mobile work delivered with engineering excellence and thoughtful design."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {recentProjects.map((project) => (
              <PortfolioCard key={project.id} project={project} />
            ))}
          </div>
          <Button
            asChild
            variant="customText"
            className="text-gray-900 font-semibold gap-2 hover:text-primary transition-colors"
          >
            <Link href="/projects">
              View all projects <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </HomeSection>
      )}

      {testimonials.length > 0 && (
        <HomeSection
          title="What clients say"
          subtitle="Teams we have built with, across products, brands, and long-term support."
          className="bg-gray-50 border-y border-gray-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </HomeSection>
      )}

      <FaqSection placement="services" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Link
            href="/services"
            className="text-sm font-semibold text-primary hover:underline"
          >
            ← Back to services
          </Link>
        </div>
      </div>
    </div>
  );
}
