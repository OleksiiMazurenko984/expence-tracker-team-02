import { NextRequest, NextResponse } from 'next/server';
import { proxyRequest } from '@/lib/api/serverProxy';
import type { UpdateTransactionResponse } from '@/types/transaction';

type RouteContext = {
  params: {
    slug: string;
    id: string;
  };
};

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  const cookie = req.headers.get('cookie') || '';
  const body = await req.json();
  const { slug, id } = params;

  const { status, data } = await proxyRequest<UpdateTransactionResponse>(
    `/transactions/${slug}/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(body),
    },
    cookie
  );

  return NextResponse.json(data, { status });
}

