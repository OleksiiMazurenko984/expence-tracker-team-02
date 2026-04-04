// /api/categories GET/POST -> прокси списка и создания категорий.
import { NextRequest, NextResponse } from 'next/server';
import { proxyRequest } from '@/lib/api/serverProxy';
import type {
  CategoriesResponse,
  Category,
} from '@/types/category';

export async function GET(req: NextRequest) {
  const cookie = req.headers.get('cookie') || '';

  const { status, data } = await proxyRequest<CategoriesResponse>(
    '/categories',
    {
      method: 'GET',
    },
    cookie
  );

  return NextResponse.json(data, { status });
}

export async function POST(req: NextRequest) {
  const cookie = req.headers.get('cookie') || '';
  const body = await req.json();

  const { status, data } = await proxyRequest<Category>(
    '/categories',
    {
      method: 'POST',
      body: JSON.stringify(body),
    },
    cookie
  );

  return NextResponse.json(data, { status });
}
