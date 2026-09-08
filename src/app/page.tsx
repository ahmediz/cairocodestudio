import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HomeSection } from '@/components/HomeSection';
import { ServiceCard } from '@/components/ServiceCard';
import { PortfolioCard } from '@/components/PortfolioCard';
import { TestimonialCard } from '@/components/TestimonialCard';
import { ClientsScroll } from '@/components/ClientsScroll';
import { getClients } from '@/features/clients/clients.service';
import { getProjects } from '@/features/projects/projects.service';
import { getTestimonials } from '@/features/testimonials/testimonials.service';

export const revalidate = 60; // ISR revalidation every 60 seconds

const servicesData = [
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

export default async function HomePage() {
  const [clients, projects, testimonials] = await Promise.all([
    getClients(),
    getProjects(true),
    getTestimonials(),
  ]);

  return (
    <div className="flex flex-col overflow-hidden">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between flex-col-reverse md:flex-row gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-antonio leading-[1.1] text-gray-900 title-with-dash">
                <span className="text-primary block">Built on Experience.</span>
                <span>Driven by Trust</span>
              </h1>
              <p className="text-gray-600 text-lg md:text-xl max-w-xl leading-relaxed">
                A software team turned agency helping businesses grow with
                passion, commitment, and expert execution.
              </p>
              <div className="pt-2">
                <Button
                  asChild
                  variant="customText"
                  className="text-gray-900 font-semibold text-base gap-2 px-0 hover:text-primary transition-colors"
                >
                  <Link href="/about">
                    Learn More <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <figure className="overflow-hidden rounded-3xl max-w-2xl w-full shadow-lg">
              <Image
                src="/images/hero-img.jpg"
                width={672}
                height={448}
                alt="Cairo Code Studio Hero Image"
                priority
                className="w-full h-auto object-cover"
              />
            </figure>
          </div>

          {/* Clients Strip */}
          <div className="flex flex-col md:flex-row md:items-center gap-6 mt-16 md:mt-28 pt-8 border-t border-gray-100">
            <h2 className="text-xl md:text-2xl font-bold font-antonio shrink-0 md:max-w-xs text-gray-900">
              Clients{' '}
              <Heart className="inline h-5 w-5 fill-primary text-primary align-middle mx-1" />{' '}
              we're proud we've worked with
            </h2>
            <div className="flex-1 md:border-s md:border-gray-200 md:ps-8 min-w-0">
              <ClientsScroll clients={clients} />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <HomeSection title="Our Services">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {servicesData.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
        <div className="flex justify-center mt-2">
          <Button
            asChild
            variant="customText"
            className="text-gray-900 font-semibold gap-2 hover:text-primary transition-colors"
          >
            <Link href="/services">
              Check Our Services <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </HomeSection>

      {/* Portfolio Section */}
      <HomeSection
        title="Our Portfolio"
        className="bg-gray-50 border-y border-gray-100"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {projects.map((project) => (
            <PortfolioCard key={project.id} project={project} />
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <Button
            asChild
            variant="customText"
            className="text-gray-900 font-semibold gap-2 hover:text-primary transition-colors"
          >
            <Link href="/portfolio">
              Check Our Portfolio <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </HomeSection>

      {/* Testimonials Section */}
      <HomeSection title="Our Trusted Clients">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </HomeSection>
    </div>
  );
}
