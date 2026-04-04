// POST /api/auth/logout -> прокси логаута на внешний бэк.
import { NextRequest, NextResponse } from 'next/server';
import { proxyRequest } from '@/lib/api/serverProxy';

export async function POST(req: NextRequest) {
  const cookie = req.headers.get('cookie') || '';

  const { status } = await proxyRequest(
    '/auth/logout',
    {
      method: 'POST',
    },
    cookie
  );

  return new NextResponse(null, { status });
}
