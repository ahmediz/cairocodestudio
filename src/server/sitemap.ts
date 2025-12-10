import { routes } from '../app/app.routes';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

/**
 * Route priority and changefreq configuration
 */
const routeConfig: Record<string, { priority: string; changefreq: string }> = {
  '': { priority: '1.0', changefreq: 'weekly' }, // home
  about: { priority: '0.8', changefreq: 'monthly' },
  services: { priority: '0.9', changefreq: 'monthly' },
  portfolio: { priority: '0.9', changefreq: 'weekly' },
  contact: { priority: '0.7', changefreq: 'monthly' },
};

/**
 * Generate sitemap XML from Angular routes
 */
export function generateSitemap(): string {
  const siteUrl = process.env['SITE_URL'] || 'https://cairocodestudio.com';
  const baseUrl = siteUrl.replace(/\/$/, ''); // Remove trailing slash

  const urls: SitemapUrl[] = routes
    .filter((route) => route.path !== undefined && !route.path.includes(':')) // Exclude dynamic routes
    .map((route) => {
      const path = route.path === '' ? '/' : `/${route.path}`;
      const config = routeConfig[route.path || ''] || {
        priority: '0.5',
        changefreq: 'monthly',
      };

      return {
        loc: `${baseUrl}${path}`,
        lastmod: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
        changefreq: config.changefreq,
        priority: config.priority,
      };
    });

  // Generate XML
  const xmlUrls = urls
    .map(
      (url) => `  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`;
}

/**
 * Escape XML special characters
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

