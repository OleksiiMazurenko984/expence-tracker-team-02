import { NextRequest, NextResponse } from 'next/server';
import { proxyRequest } from '@/lib/api/serverProxy';
import type { UpdateTransactionResponse } from '@/types/transaction';

type RouteContext = {
  params: Promise<{
    type: string;
    id: string;
  }>;
};

export async function PATCH(req: NextRequest, context: RouteContext) {
  const cookie = req.headers.get('cookie') || '';
  const body = await req.json();
  const { type, id } = await context.params;

  const { status, data } = await proxyRequest<UpdateTransactionResponse>(
    `/transactions/${type}/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(body),
    },
    cookie
  );

  return NextResponse.json(data, { status });
}
