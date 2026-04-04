// Клиент статистики: сводка за текущий месяц.
import { api } from './api';
import type { CategoryStatItem } from '@/types/stats';

export const getCurrentMonthStats = async (): Promise<CategoryStatItem[]> => {
  const response = await api.get<CategoryStatItem[]>(
    '/stats/categories/current-month'
  );

  return response.data;
};
