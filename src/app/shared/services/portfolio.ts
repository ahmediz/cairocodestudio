import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  portfolio = signal([
    {
      id: 'ceel',
      title: 'Ceel',
      description:
        'Ceel is the all-in-one AI trust platform that automates compliance, strengthens security, and helps you pass audits in days, so you can focus on growth.',
      image: 'images/projects/ceel/thumb.png',
      link: 'https://app.ceel.io/',
      routerLink: '/projects/ceel',
      isFeatured: true,
    },
    {
      id: 'sanssapien',
      title: 'sanssapien',
      description:
        'Sanssapien is a platform that helps you find the right AI tools for your business.',
      image: 'images/projects/sanssapien/thumb.png',
      link: 'https://www.sanssapien.com/',
      routerLink: '/projects/sanssapien',
      isFeatured: true,
    },
    {
      id: 'smileme',
      title: 'Smileme',
      description: ' Facility & attendance management smart cloud software.',
      image: 'images/projects/smileme/thumb.png',
      link: 'https://smileme.in/',
      routerLink: '/projects/smileme',
      isFeatured: true,
    },
    {
      id: 'amplifai',
      title: 'Amplifai',
      description:
        'AI-powered thermal imaging enables fast, accessible and objective diabetic foot screening, so any care team can act early, with confidence.',
      image: 'images/projects/amplifai/thumb.png',
      link: 'https://portal.amplifaihealth.com',
      routerLink: '/projects/amplifai',
    },
  ]);
}
