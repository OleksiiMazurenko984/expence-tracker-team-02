import { NextRequest, NextResponse } from 'next/server';
import { proxyRequest } from '@/lib/api/serverProxy';
import type {
  TransactionItem,
  DeleteTransactionResponse,
} from '@/types/transaction';

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(req: NextRequest, { params }: RouteContext) {
  const cookie = req.headers.get('cookie') || '';
  const { slug } = await params;

  const searchParams = req.nextUrl.searchParams.toString();
  const endpoint = searchParams
    ? `/transactions/${slug}?${searchParams}`
    : `/transactions/${slug}`;

  const { status, data } = await proxyRequest<TransactionItem[]>(
    endpoint,
    {
      method: 'GET',
    },
    cookie
  );

  return NextResponse.json(data, { status });
}

export async function DELETE(req: NextRequest, { params }: RouteContext) {
  const cookie = req.headers.get('cookie') || '';
  const { slug } = await params;

  const { status, data } = await proxyRequest<DeleteTransactionResponse>(
    `/transactions/${slug}`,
    {
      method: 'DELETE',
    },
    cookie
  );

  return NextResponse.json(data, { status });
}
