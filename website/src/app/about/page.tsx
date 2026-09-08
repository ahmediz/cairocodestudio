import React from 'react';
import { Metadata } from 'next';
import {
  Smile,
  Briefcase,
  Lightbulb,
  GraduationCap,
  CheckCircle2,
} from 'lucide-react';
import { TeamCard } from '@/components/TeamCard';

export const metadata: Metadata = {
  title: 'Who We Are & What We Do | Cairo Code Studio',
  description:
    'Discover our mission, values, and team behind every project. Learn how we create impactful digital solutions. Get to know us and connect today.',
};

const teamMembers = [
  {
    name: 'Ahmed Shaarawy',
    title: 'Founder & CEO',
    image: '/images/team/ahmed.jpg',
    socials: [
      {
        name: 'LinkedIn',
        link: 'https://www.linkedin.com/in/ahmedshaarawy/',
      },
    ],
  },
  {
    name: 'Samar Aly',
    title: 'PR & Marketing',
    image: '/images/team/samar.png',
    socials: [
      {
        name: 'LinkedIn',
        link: 'https://www.linkedin.com/in/samaraly/',
      },
    ],
  },
  {
    name: 'Taha Ahmed',
    title: 'UI/UX Designer',
    image: '/images/team/taha.jpg',
    socials: [
      {
        name: 'LinkedIn',
        link: 'https://www.linkedin.com/in/taha-ui/',
      },
    ],
  },
  {
    name: 'Toka Aly',
    title: 'Frontend Developer',
    image: '/images/team/toka.png',
    socials: [
      {
        name: 'LinkedIn',
        link: 'https://www.linkedin.com/in/toka-aly-033822175/',
      },
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20 space-y-16 md:space-y-24">
      {/* Story */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold font-antonio text-primary">
          Our Story
        </h1>
        <div className="space-y-4 text-gray-600 text-base md:text-lg leading-relaxed">
          <p>
            Cairo Codes Studio began after years of real software experience,
            working with clients across Egypt, Saudi Arabia, the Emirates,
            Canada, and the U.S. We noticed the same pain point everywhere:
            clients struggled to find someone they could trust—someone
            committed, experienced, and passionate about their success.
          </p>
          <p>
            What started as freelancing turned into something bigger. Our
            values, work ethic, and dedication led us to evolve into a full
            agency helping more clients grow their business and follow their
            dreams with confidence.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-dark-bg text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <h2 className="text-3xl md:text-4xl font-extrabold font-antonio text-white shrink-0">
              Our Values
            </h2>
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8 md:border-s border-white/20 md:ps-12 w-full text-center">
              <div className="flex flex-col items-center gap-3">
                <Smile className="h-9 w-9 text-primary" />
                <h3 className="text-lg font-bold text-white/90">Friendly</h3>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Briefcase className="h-9 w-9 text-primary" />
                <h3 className="text-lg font-bold text-white/90">
                  Professional
                </h3>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Lightbulb className="h-9 w-9 text-primary" />
                <h3 className="text-lg font-bold text-white/90">Innovative</h3>
              </div>
              <div className="flex flex-col items-center gap-3">
                <GraduationCap className="h-9 w-9 text-primary" />
                <h3 className="text-lg font-bold text-white/90">Expertise</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16">
          <h2 className="text-5xl md:text-8xl lg:text-9xl font-extrabold font-antonio text-gray-900 shrink-0 md:min-w-[450px]">
            <span className="text-primary">M</span>ission
          </h2>
          <div className="flex-1 text-gray-600 text-base md:text-lg leading-relaxed">
            <p>
              <strong className="text-gray-900">Our mission</strong> is to
              build user-friendly websites and interfaces that truly support
              our clients’ growth. We focus on clear design, reliable front-end
              development, and smooth user experiences. Through collaboration
              and attention to detail, we create digital tools that make running
              a business easier. We’re committed to helping clients succeed online
              with solutions that work beautifully and efficiently.
            </p>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16">
          <h2 className="text-5xl md:text-8xl lg:text-9xl font-extrabold font-antonio text-gray-900 shrink-0 md:min-w-[450px]">
            <span className="text-primary">V</span>ision
          </h2>
          <div className="flex-1 text-gray-600 text-base md:text-lg leading-relaxed">
            <p>
              <strong className="text-gray-900">Our vision</strong> is to
              create clean, modern digital experiences that help people thrive in
              their businesses. We believe the web should feel easy, intuitive,
              and enjoyable for everyone. By combining creativity with
              thoughtful design, we aim to empower clients to grow with
              confidence. Our goal is to build digital solutions that support
              long-term success and meaningful impact.
            </p>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16">
          <h2 className="text-5xl md:text-8xl lg:text-9xl font-extrabold font-antonio text-gray-900 shrink-0 md:min-w-[450px]">
            <span className="text-primary">A</span>pproach
          </h2>
          <div className="flex-1 text-gray-600 text-base md:text-lg leading-relaxed space-y-4">
            <p>
              <strong className="text-gray-900">Our approach</strong> is simple:
              we treat every project with the same care, passion, and precision
              we bring to our own work. As software professionals, we focus on
              clarity, communication, and delivering results you can rely on.
            </p>
            <ul className="flex flex-col gap-3 pt-2">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                <span className="font-medium text-gray-800">
                  We listen first—every business is unique.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                <span className="font-medium text-gray-800">
                  We communicate clearly—no tech overwhelm.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                <span className="font-medium text-gray-800">
                  We build with quality—long-lasting, scalable work.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                <span className="font-medium text-gray-800">
                  We support you even after launch.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Meet The Team */}
      <section className="max-w-7xl mx-auto px-4 text-center space-y-12">
        <h2 className="text-3xl md:text-4xl font-extrabold font-antonio text-gray-900">
          Meet The Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </section>
    </div>
  );
}
