// Получение агрегированной статистики через React Query.
'use client';

import { useQuery } from '@tanstack/react-query';
import { getCurrentMonthStats } from '@/lib/api/statsApi';
import { queryKeys } from '@/lib/constants/queryKeys';

export const useStats = () => {
  return useQuery({
    queryKey: queryKeys.stats,
    queryFn: getCurrentMonthStats,
  });
};

