import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  services = signal([
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
  ]);
}
