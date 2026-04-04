// GET /api/users/current -> прокси текущего пользователя.
import { NextRequest, NextResponse } from 'next/server';
import { proxyRequest } from '@/lib/api/serverProxy';
import type { CurrentUserResponse } from '@/types/user';

export async function GET(req: NextRequest) {
  const cookie = req.headers.get('cookie') || '';

  const { status, data } = await proxyRequest<CurrentUserResponse>(
    '/users/current',
    {
      method: 'GET',
    },
    cookie
  );

  return NextResponse.json(data, { status });
}
