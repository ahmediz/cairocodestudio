const RAW_API_BASE_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:5001';

const API_BASE_URL = RAW_API_BASE_URL.replace(/\/+$/, '');

export async function fetchServer<T>(
  endpoint: string,
  options: RequestInit & { revalidate?: number | false; tags?: string[] } = {}
): Promise<T> {
  const { revalidate = 60, tags, ...fetchOptions } = options;
  const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_BASE_URL}${formattedEndpoint}`;

  const nextOptions: any = {};
  if (revalidate !== undefined) {
    nextOptions.revalidate = revalidate;
  }
  if (tags) {
    nextOptions.tags = tags;
  }

  try {
    const res = await fetch(url, {
      ...fetchOptions,
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
      next: nextOptions,
    });

    if (!res.ok) {
      console.warn(`Fetch to ${endpoint} failed with status: ${res.status}`);
      throw new Error(`Failed to fetch from ${endpoint}: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error(`Fetch error for ${endpoint}:`, error);
    throw error;
  }
}
