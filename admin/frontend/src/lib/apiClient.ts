const BASE_URL = import.meta.env.VITE_API_URL || '';

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = `API Error: ${response.status} ${response.statusText}`;
    try {
      const errorBody = await response.json();
      if (errorBody.error) errorMessage = errorBody.error;
      else if (errorBody.message) errorMessage = errorBody.message;
      else if (errorBody.errors) errorMessage = JSON.stringify(errorBody.errors);
    } catch {
      // Ignored if response is not JSON
    }
    throw new Error(errorMessage);
  }

  return response.json();
}
