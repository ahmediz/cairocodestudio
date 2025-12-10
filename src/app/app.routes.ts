import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Portfolio } from './pages/portfolio/portfolio';
import { Contact } from './pages/contact/contact';
import { Services } from './pages/services/services';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    data: {
      title: 'Website Development Experts | Cairo Code Studio',
      description:
        'We build fast, modern websites tailored to your business needs. Boost your online presence with expert development. Start your project with us today.',
      // robots: 'index, follow' // Optional: Override default robots header (default is 'index, follow')
      // image: '/images/og-home.jpg', // Optional: Custom Open Graph image (relative path)
      // ogType: 'website' // Optional: Open Graph type (default: 'website')
    },
  },
  {
    path: 'about',
    component: About,
    data: {
      title: 'Who We Are & What We Do | Cairo Code Studio',
      description:
        'Discover our mission, values, and team behind every project. Learn how we create impactful digital solutions. Get to know us and connect today.',
      // image: '/images/og-about.jpg', // Optional: Custom Open Graph image
      // ogType: 'website' // Optional: Open Graph type
    },
  },
  {
    path: 'portfolio',
    component: Portfolio,
    data: {
      title: 'Our Web & App Projects | Cairo Code Studio',
      description:
        'View our portfolio of websites and apps built for clients across industries. See the results we deliver. Explore our work and start your project today.',
      // image: '/images/og-portfolio.jpg', // Optional: Custom Open Graph image
      // ogType: 'website' // Optional: Open Graph type
    },
  },
  {
    path: 'contact',
    component: Contact,
    data: {
      title: 'Get in Touch With Us | Cairo Code Studio',
      description:
        'Have a question or need a quote? Our team is ready to help you build your next digital product. Contact us today and let\'s bring your idea to life.',
      // image: '/images/og-contact.jpg', // Optional: Custom Open Graph image
      // ogType: 'website' // Optional: Open Graph type
    },
  },
  {
    path: 'services',
    component: Services,
    data: {
      title: 'Web & App Development Services | Cairo Code Studio',
      description:
        'Explore our services in web design, app development, and UI/UX. We deliver scalable, high-quality digital solutions. Request your custom quote today.',
      // image: '/images/og-services.jpg', // Optional: Custom Open Graph image
      // ogType: 'website' // Optional: Open Graph type
    },
  },
];
