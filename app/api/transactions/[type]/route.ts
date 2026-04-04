import { NextRequest, NextResponse } from 'next/server';
import { proxyRequest } from '@/lib/api/serverProxy';
import type { TransactionItem } from '@/types/transaction';

type RouteContext = {
  params: Promise<{
    type: string;
  }>;
};

export async function GET(req: NextRequest, context: RouteContext) {
  const cookie = req.headers.get('cookie') || '';
  const { type } = await context.params;

  const searchParams = req.nextUrl.searchParams.toString();
  const endpoint = searchParams
    ? `/transactions/${type}?${searchParams}`
    : `/transactions/${type}`;

  const { status, data } = await proxyRequest<TransactionItem[]>(
    endpoint,
    {
      method: 'GET',
    },
    cookie
  );

  return NextResponse.json(data, { status });
}
