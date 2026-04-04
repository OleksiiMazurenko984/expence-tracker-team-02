import { NextRequest, NextResponse } from 'next/server';
import { proxyRequest } from '@/lib/api/serverProxy';
import type { UpdateCategoryResponse } from '@/types/category';

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(req: NextRequest, context: RouteContext) {
  const cookie = req.headers.get('cookie') || '';
  const body = await req.json();
  const { id } = await context.params;

  const { status, data } = await proxyRequest<UpdateCategoryResponse>(
    `/categories/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify(body),
    },
    cookie
  );

  return NextResponse.json(data, { status });
}

export async function DELETE(req: NextRequest, context: RouteContext) {
  const cookie = req.headers.get('cookie') || '';
  const { id } = await context.params;

  const { status } = await proxyRequest(
    `/categories/${id}`,
    {
      method: 'DELETE',
    },
    cookie
  );

  return new NextResponse(null, { status });
}
