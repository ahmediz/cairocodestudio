/**
 * Triggers on-demand cache tag & path revalidation in Next.js public website.
 */
export async function triggerRevalidation(
  tags: string[],
  path?: string | string[]
): Promise<void> {
  const websiteUrl = process.env.WEBSITE_URL || 'http://localhost:3000';

  const rawSecret =
    process.env.REVALIDATION_SECRET ||
    '5b18345512118c9686bd6367cfcde95d0b3ad4c7699279b14ac3ae5c719751c3';
  const secret = rawSecret.replace(/^["']|["']$/g, '').trim();

  try {
    const url = `${websiteUrl.replace(/\/+$/, '')}/api/revalidate`;
    const paths = Array.isArray(path) ? path : path ? [path] : undefined;

    console.log(
      `[Revalidation] Sending revalidation request to ${url} for tags:`,
      tags,
      paths ? `paths: [${paths.join(', ')}]` : ''
    );

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-revalidate-secret': secret,
      },
      body: JSON.stringify({
        tags,
        paths,
        path: typeof path === 'string' ? path : undefined,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.warn(
        `[Revalidation Warning] Next.js returned HTTP ${res.status}: ${errorText}`
      );
    } else {
      const data = await res.json().catch(() => ({}));
      console.log(
        `[Revalidation Success] Invalidated tags: [${tags.join(', ')}]`,
        data
      );
    }
  } catch (error) {
    // Non-blocking warning so admin mutations succeed even if website is temporarily offline
    console.warn(
      `[Revalidation Notice] Could not reach Next.js revalidation endpoint at ${websiteUrl}:`,
      error
    );
  }
}
