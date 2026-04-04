//Папка `lib/constants` — хранилище общих констант проекта.
//Сейчас здесь `queryKeys.ts` с едиными ключами для React Query (кеширование и инвалидации).


import type { TransactionType } from '@/types/sharedTypes';

export const queryKeys = {
  currentUser: ['current-user'] as const,
  categories: ['categories'] as const,
  stats: ['stats', 'current-month'] as const,

  transactions: (
    type: TransactionType,
    params?: { date?: string; search?: string }
  ) =>
    [
      'transactions',
      type,
      params?.date ?? '',
      params?.search ?? '',
    ] as const,
};
