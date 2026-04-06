// Удаление транзакции с инвалидацией связанных кешей.
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTransaction } from '@/lib/api/transactionsApi';
import { queryKeys } from '@/lib/constants/queryKeys';
import type { TransactionType } from '@/types/sharedTypes';

interface DeleteTransactionPayload {
  id: string;
  type: TransactionType;
}

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: DeleteTransactionPayload) => deleteTransaction(id),
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.transactions(variables.type),
      });
      await queryClient.invalidateQueries({ queryKey: queryKeys.currentUser });
      await queryClient.invalidateQueries({ queryKey: queryKeys.stats });
    },
  });
};
