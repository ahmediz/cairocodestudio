import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with initial Cairo Code Studio data...');

  // 0. Default Admin User
  const adminEmail = 'admin@cairocodestudio.com';
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123456', 10);
    await prisma.user.create({
      data: {
        email: adminEmail,
        name: 'Ahmed Shaarawy',
        password: hashedPassword,
        role: 'admin',
      },
    });
    console.log('Created default admin user: admin@cairocodestudio.com / admin123456');
  }

  // 1. Testimonials (Trusted Clients)
  const testimonials = [
    {
      name: 'Mridul Pandey',
      company: 'Secugile',
      description:
        'You can share your requirements with Ahmed and rest assured of delivery. Minimal iterations. Excellent advice on approaching complex UI/UX issues. Ahmed is the best.',
      rating: 5.0,
      logo: 'secugile.png',
      logoAlt: 'secugile Logo',
      order: 1,
    },
    {
      name: 'Yuregir Tekeli',
      company: 'Metacore',
      description:
        'Ahmed done a great job on this Dashboard Design and Development project and I enjoyed working with him. He met all deadlines, and his design and development skills were top-notch. Also I asked for an additional milestones and he was very forthcoming that the additional work. Highly Recommended, Im sure I will work with him on next project.',
      rating: 5.0,
      logo: 'metacore.png',
      logoAlt: 'metacore Logo',
      order: 2,
    },
    {
      name: 'Ahmed Farag',
      company: 'Facegraph',
      description:
        'Ahmed is super talented! Has a rare and hard to find good mix of experiences between design and UX programming. On top of all this he is very accountable. Always delivers promptly and often early. I have an open contract with Ahmed to design and implement my overall company artwork, websites, marketing materials and apps! You will not find a better person.',
      rating: 5.0,
      logo: 'facegraph.svg',
      logoAlt: 'facegraph Logo',
      order: 3,
    },
    {
      name: 'Yasser Alshihri',
      company: 'Hafez',
      description:
        "It's my honor to work with Ahmad. I needed an excellent Designer to make a simple MVP for my idea in a small time. He didn’t mind to share me his advice on the project before starting, and he knows exactly what to do. I confirm that I will not hesitate to hire Ahmad again for the full project soon. Ahmad is really an experienced Graphic designer & expert UI/UX.",
      rating: 5.0,
      logo: 'hafez.png',
      logoAlt: 'hafez Logo',
      order: 4,
    },
    {
      name: 'Ibrahim Aloboudi',
      company: 'Thkee',
      description:
        'Excellent work! He did a good job and stuck with the project until completion. I would hire him again.',
      rating: 5.0,
      logo: 'thkee.svg',
      logoAlt: 'thkee Logo',
      order: 5,
    },
    {
      name: 'Rami Alloush',
      company: 'RMAsoft',
      description: 'Great to work with!',
      rating: 5.0,
      logo: 'RMAsoft.png',
      logoAlt: 'RMAsoft Logo',
      order: 6,
    },
  ];

  for (const item of testimonials) {
    const existing = await prisma.testimonial.findFirst({
      where: { name: item.name, company: item.company },
    });
    if (!existing) {
      await prisma.testimonial.create({ data: item });
    }
  }

  // 2. Projects (Our Portfolio)
  const projects = [
    {
      slug: 'ceel',
      title: 'Ceel',
      description:
        'Ceel is the all-in-one AI trust platform that automates compliance, strengthens security, and helps you pass audits in days, so you can focus on growth.',
      image: '/images/projects/ceel/thumb.png',
      link: 'https://app.ceel.io/',
      routerLink: '/projects/ceel',
      isFeatured: true,
      order: 1,
    },
    {
      slug: 'sanssapien',
      title: 'sanssapien',
      description:
        'Sanssapien is a platform that helps you find the right AI tools for your business.',
      image: '/images/projects/sanssapien/thumb.png',
      link: 'https://www.sanssapien.com/',
      routerLink: '/projects/sanssapien',
      isFeatured: true,
      order: 2,
    },
    {
      slug: 'smileme',
      title: 'Smileme',
      description: 'Facility & attendance management smart cloud software.',
      image: '/images/projects/smileme/thumb.png',
      link: 'https://smileme.in/',
      routerLink: '/projects/smileme',
      isFeatured: true,
      order: 3,
    },
    {
      slug: 'amplifai',
      title: 'Amplifai',
      description:
        'AI-powered thermal imaging enables fast, accessible and objective diabetic foot screening, so any care team can act early, with confidence.',
      image: '/images/projects/amplifai/thumb.png',
      link: 'https://portal.amplifaihealth.com',
      routerLink: '/projects/amplifai',
      isFeatured: true,
      order: 4,
    },
  ];

  for (const item of projects) {
    const existing = await prisma.project.findUnique({
      where: { slug: item.slug },
    });
    if (!existing) {
      await prisma.project.create({ data: item });
    }
  }

  // 3. Clients (Logos)
  const clients = [
    {
      name: 'King Faisal Hospital',
      logo: '/images/clients/king-faisal-hospital.png',
      alt: 'king-faisal-hospital Logo',
      order: 1,
    },
    {
      name: 'National E-Learning Center',
      logo: '/images/clients/national-elearning-center.webp',
      alt: 'national elearning center Logo',
      order: 2,
    },
    {
      name: 'Ceel',
      logo: '/images/clients/ceel.svg',
      alt: 'ceel Logo',
      order: 3,
    },
    {
      name: 'Battlebards',
      logo: '/images/clients/battlebards.png',
      alt: 'battlebards Logo',
      order: 4,
    },
    {
      name: 'Thkee',
      logo: '/images/clients/thkee.svg',
      alt: 'thkee Logo',
      order: 5,
    },
    {
      name: 'Sanssapien',
      logo: '/images/clients/sanssapien.png',
      alt: 'sanssapien Logo',
      order: 6,
    },
    {
      name: 'Amplifai',
      logo: '/images/clients/amplifai.png',
      alt: 'amplifai Logo',
      order: 7,
    },
    {
      name: 'Evento',
      logo: '/images/clients/evento.svg',
      alt: 'evento Logo',
      order: 8,
    },
    {
      name: 'Facegraph',
      logo: '/images/clients/facegraph.svg',
      alt: 'facegraph Logo',
      order: 9,
    },
    {
      name: 'Secugile',
      logo: '/images/clients/secugile.png',
      alt: 'secugile Logo',
      order: 10,
    },
    {
      name: 'Jest',
      logo: '/images/clients/jest.svg',
      alt: 'jest Logo',
      order: 11,
    },
  ];

  for (const item of clients) {
    const existing = await prisma.client.findFirst({
      where: { name: item.name },
    });
    if (!existing) {
      await prisma.client.create({ data: item });
    }
  }

  console.log('Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
