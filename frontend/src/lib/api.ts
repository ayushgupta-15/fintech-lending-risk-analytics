const API_BASE = "http://localhost:8000/api/v1";

export async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  const json = await res.json();
  return json.data;
}

export const api = {
  getPortfolioSummary: () => fetcher<any>('/portfolio/summary'),
  getRiskSegments: () => fetcher<any>('/risk/segments'),
  getRiskGrades: () => fetcher<any>('/risk/grades'),
  getRiskDti: () => fetcher<any>('/risk/dti'),
  simulatePolicy: (payload: any) => fetcher<any>('/policy/simulate', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  getMetadata: () => fetcher<any>('/metadata'),
};
