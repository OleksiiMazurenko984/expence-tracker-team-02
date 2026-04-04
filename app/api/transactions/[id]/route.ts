import { NextRequest, NextResponse } from 'next/server';
import { proxyRequest } from '@/lib/api/serverProxy';
import type { DeleteTransactionResponse } from '@/types/transaction';

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(req: NextRequest, context: RouteContext) {
  const cookie = req.headers.get('cookie') || '';
  const { id } = await context.params;

  const { status, data } = await proxyRequest<DeleteTransactionResponse>(
    `/transactions/${id}`,
    {
      method: 'DELETE',
    },
    cookie
  );

  return NextResponse.json(data, { status });
}
