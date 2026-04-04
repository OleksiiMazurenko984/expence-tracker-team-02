// GET /api/stats/categories/current-month -> прокси статистики.
import { NextRequest, NextResponse } from 'next/server';
import { proxyRequest } from '@/lib/api/serverProxy';
import type { CategoryStatItem } from '@/types/stats';

export async function GET(req: NextRequest) {
  const cookie = req.headers.get('cookie') || '';

  const { status, data } = await proxyRequest<CategoryStatItem[]>(
    '/stats/categories/current-month',
    {
      method: 'GET',
    },
    cookie
  );

  return NextResponse.json(data, { status });
}
