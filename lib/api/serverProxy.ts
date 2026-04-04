// Хелперы для route handlers: проксирование на внешний API с куками.
import type { NextResponse } from 'next/server';

export const BASE_URL =
  process.env.API_URL || 'https://expense-tracker-v2.b.goit.study';

type ProxyResult<T = unknown> = {
  status: number;
  data: T | null;
  setCookie: string | null;
};

export async function proxyRequest<T = unknown>(
  endpoint: string,
  options: RequestInit = {},
  cookie?: string
): Promise<ProxyResult<T>> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(options.body instanceof FormData
        ? {}
        : { 'Content-Type': 'application/json' }),
      ...(cookie ? { Cookie: cookie } : {}),
      ...options.headers,
    },
    cache: 'no-store',
  });

  const setCookie = response.headers.get('set-cookie');

  let data: T | null = null;

  if (response.status !== 204) {
    try {
      data = (await response.json()) as T;
    } catch {
      data = null;
    }
  }

  return {
    status: response.status,
    data,
    setCookie,
  };
}

export function applySetCookieHeader(
  response: NextResponse,
  setCookie: string | null
) {
  if (setCookie) {
    response.headers.set('set-cookie', setCookie);
  }

  return response;
}
