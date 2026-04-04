// PATCH /api/users/info -> прокси обновления профиля.
import { NextRequest, NextResponse } from 'next/server';
import { proxyRequest } from '@/lib/api/serverProxy';
import type { UpdateUserResponse } from '@/types/user';

export async function PATCH(req: NextRequest) {
  const cookie = req.headers.get('cookie') || '';
  const body = await req.json();

  const { status, data } = await proxyRequest<UpdateUserResponse>(
    '/users/info',
    {
      method: 'PATCH',
      body: JSON.stringify(body),
    },
    cookie
  );

  return NextResponse.json(data, { status });
}
