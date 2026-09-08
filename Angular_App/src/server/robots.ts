import { routes } from '../app/app.routes';

/**
 * Determine X-Robots-Tag header value based on request path and route configuration
 */
export function getRobotsHeader(path: string): string | null {
  // API endpoints should not be indexed
  if (path.startsWith('/api/')) {
    return 'noindex, nofollow';
  }

  // Special files that should be indexed
  if (path === '/robots.txt' || path === '/sitemap.xml') {
    return null; // No header needed, or use 'index, follow' if preferred
  }

  // Static assets (images, CSS, JS) - typically don't need robots header
  if (
    path.match(/\.(jpg|jpeg|png|gif|svg|webp|ico|css|js|woff|woff2|ttf|eot)$/i)
  ) {
    return null;
  }

  // Find matching route
  const normalizedPath = path === '/' ? '' : path.replace(/^\//, '');
  const route = routes.find((r) => {
    if (r.path === undefined) return false;
    // Handle exact match
    if (r.path === normalizedPath) return true;
    // Handle empty path (home)
    if (r.path === '' && normalizedPath === '') return true;
    return false;
  });

  // If route has robots configuration in data, use it
  if (route?.data && typeof route.data === 'object' && 'robots' in route.data) {
    return (route.data as { robots?: string })['robots'] as string;
  }

  // Default: allow indexing for public pages
  return 'index, follow';
}

