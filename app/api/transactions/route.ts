// /api/transactions GET -> прокси списка транзакций с фильтрами.
import { NextRequest, NextResponse } from 'next/server';
import { proxyRequest } from '@/lib/api/serverProxy';
import type { CreateTransactionResponse } from '@/types/transaction';

export async function POST(req: NextRequest) {
  const cookie = req.headers.get('cookie') || '';
  const body = await req.json();

  const { status, data } = await proxyRequest<CreateTransactionResponse>(
    '/transactions',
    {
      method: 'POST',
      body: JSON.stringify(body),
    },
    cookie
  );

  return NextResponse.json(data, { status });
}
