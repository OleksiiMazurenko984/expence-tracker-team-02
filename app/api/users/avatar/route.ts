// /api/users/avatar PATCH/DELETE -> прокси загрузки/удаления аватара.
import { NextRequest, NextResponse } from 'next/server';
import { proxyRequest } from '@/lib/api/serverProxy';
import type { UpdateAvatarResponse } from '@/types/user';

export async function PATCH(req: NextRequest) {
  const cookie = req.headers.get('cookie') || '';
  const formData = await req.formData();

  const { status, data } = await proxyRequest<UpdateAvatarResponse>(
    '/users/avatar',
    {
      method: 'PATCH',
      body: formData,
    },
    cookie
  );

  return NextResponse.json(data, { status });
}

export async function DELETE(req: NextRequest) {
  const cookie = req.headers.get('cookie') || '';

  const { status } = await proxyRequest(
    '/users/avatar',
    {
      method: 'DELETE',
    },
    cookie
  );

  return new NextResponse(null, { status });
}
