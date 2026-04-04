// GET /api/auth/session -> прокси обновления сессии.
import { NextRequest, NextResponse } from 'next/server';
import { applySetCookieHeader, proxyRequest } from '@/lib/api/serverProxy';

export async function GET(req: NextRequest) {
  const cookie = req.headers.get('cookie') || '';

  const { status, data, setCookie } = await proxyRequest(
    '/auth/session',
    {
      method: 'GET',
    },
    cookie
  );

  const response =
    status === 204
      ? new NextResponse(null, { status })
      : NextResponse.json(data, { status });

  return applySetCookieHeader(response, setCookie);
}
