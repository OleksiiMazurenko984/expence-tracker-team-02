// POST /api/auth/register -> прокси регистрации на внешний бэк.
import { NextRequest, NextResponse } from 'next/server';
import { applySetCookieHeader, proxyRequest } from '@/lib/api/serverProxy';
import type { RegisterResponse } from '@/types/authentication';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { status, data, setCookie } = await proxyRequest<RegisterResponse>(
    '/auth/register',
    {
      method: 'POST',
      body: JSON.stringify(body),
    }
  );

  const response = NextResponse.json(data, { status });

  return applySetCookieHeader(response, setCookie);
}
