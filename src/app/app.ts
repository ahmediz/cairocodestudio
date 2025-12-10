import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';
import { ToastModule } from 'primeng/toast';
import { Meta } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { firstValueFrom, Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, ToastModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  router = inject(Router);
  route = inject(ActivatedRoute);
  metaService = inject(Meta);
  titleService = inject(Title);
  platformId = inject(PLATFORM_ID);

  private getSiteUrl(): string {
    if (isPlatformBrowser(this.platformId)) {
      return window.location.origin;
    }
    return environment.siteUrl;
  }

  private getAbsoluteUrl(path: string): string {
    const baseUrl = this.getSiteUrl().replace(/\/$/, '');
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${baseUrl}${cleanPath}`;
  }

  private updateMetaTags(data: any, url: string): void {
    const siteUrl = this.getSiteUrl();
    const title = data['title'] || 'Cairo Code Studio';
    const description = data['description'] || '';
    const image = data['image'] || '/images/hero-img.jpg'; // Default image
    const ogType = data['ogType'] || 'website';
    const siteName = 'Cairo Code Studio';

    const absoluteImageUrl = this.getAbsoluteUrl(image);
    const absoluteUrl = this.getAbsoluteUrl(url);

    // Update or create Open Graph tags
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:image', content: absoluteImageUrl });
    this.metaService.updateTag({ property: 'og:url', content: absoluteUrl });
    this.metaService.updateTag({ property: 'og:type', content: ogType });
    this.metaService.updateTag({ property: 'og:site_name', content: siteName });

    // Update or create Twitter Card tags
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: title });
    this.metaService.updateTag({ name: 'twitter:description', content: description });
    this.metaService.updateTag({ name: 'twitter:image', content: absoluteImageUrl });
  }

  ngOnInit() {
    // Remove hardcoded robots meta tag - we use X-Robots-Tag header instead
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(async (event) => {
        const data = await firstValueFrom(this.route.firstChild?.data as Observable<any>);

        // Update page title
        this.titleService.setTitle(data['title']);

        // Update description meta tag
        this.metaService.updateTag({ name: 'description', content: data['description'] });

        // Update Open Graph and Twitter Card meta tags
        this.updateMetaTags(data, event.urlAfterRedirects);
      });
  }
}
