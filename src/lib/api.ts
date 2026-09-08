const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export async function fetchServer<T>(
  endpoint: string,
  options: RequestInit & { revalidate?: number | false; tags?: string[] } = {}
): Promise<T> {
  const { revalidate = 60, tags, ...fetchOptions } = options;
  const url = `${API_BASE_URL}${endpoint}`;

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
