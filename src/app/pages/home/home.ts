import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ScrollContainer } from '../../shared/components/scroll-container/scroll-container';
import { RouterLink } from '@angular/router';
import { HomeSection } from '../../shared/components/home-section/home-section';
import { ServiceItem } from '../../shared/components/service-item/service-item';
import { PortfolioItem } from '../../shared/components/portfolio-item/portfolio-item';
import { TestmonialItem } from '../../shared/components/testimonial-item/testimonial-item';
import { NgOptimizedImage } from "@angular/common";
import { PortfolioService } from '../../shared/services/portfolio';
import { ServicesService } from '../../shared/services/services';

@Component({
  selector: 'c-home',
  standalone: true,
  imports: [
    ButtonModule,
    ScrollContainer,
    RouterLink,
    HomeSection,
    ServiceItem,
    PortfolioItem,
    TestmonialItem,
    NgOptimizedImage
],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  portfolioService = inject(PortfolioService);
  servicesService = inject(ServicesService);
  portfolio = computed(() => this.portfolioService.portfolio().filter(project => project.isFeatured));
  services = computed(() => this.servicesService.services());


  testimonials = signal([
    {
      id: 'secugile',
      name: 'Mridul Pandey',
      logo: 'secugile.png',
      logoAlt: 'secugile Logo',
      company: 'Secugile',
      description:
        'You can share your requirements with Ahmed and rest assured of delivery. Minimal iterations. Excellent advice on approaching complex UI/UX issues. Ahmed is the best.',
    },

    {
      id: 'metacore',
      name: 'Yuregir Tekeli',
      logo: 'metacore.png',
      logoAlt: 'metacore Logo',
      company: 'Metacore',
      description:
        'Ahmed done a great job on this Dashboard Design and Development project and I enjoyed working with him. He met all deadlines, and his design and development skills were top-notch. Also I asked for an additional milestones and he was very forthcoming that the additional work. Highly Recommended, Im sure I will work with him on next project.',
    },

    {
      id: 'facegraph',
      name: 'Ahmed Farag',
      logo: 'facegraph.svg',
      logoAlt: 'facegraph Logo',
      company: 'Facegraph',
      description:
        'Ahmed is super talented! Has a rare and hard to find good mix of experiences between design and UX programming. On top of all this he is very accountable. Always delivers promptly and often early. I have an open contract with Ahmed to design and implement my overall company artwork, websites, marketing materials and apps! You will not find a better person.',
    },

    {
      id: 'hafez',
      name: 'Yasser Alshihri',
      logo: 'hafez.png',
      logoAlt: 'hafez Logo',
      company: 'Hafez',
      description:
        "It's my honor to work with Ahmad. I needed an excellent Designer to make a simple MVP for my idea in a small time. He didn’t mind to share me his advice on the project before starting, and he knows exactly what to do. I confirm that I will not hesitate to hire Ahmad again for the full project soon. Ahmad is really an experienced Graphic designer & expert UI/UX.",
    },
    {
      id: 'thkee',
      name: 'Ibrahim Aloboudi',
      logo: 'thkee.svg',
      logoAlt: 'thkee Logo',
      company: 'Thkee',
      description:
        'Excellent work! He did a good job and stuck with the project until completion. I would hire him again.',
    },
    {
      id: 'RMAsoft',
      name: 'Rami Alloush',
      logo: 'RMAsoft.png',
      logoAlt: 'RMAsoft Logo',
      company: 'RMAsoft',
      description: 'Great to work with!',
    },
  ]);
}
