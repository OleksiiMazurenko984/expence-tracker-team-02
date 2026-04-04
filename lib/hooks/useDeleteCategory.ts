// Удаление категории с инвалидацией кеша.
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCategory } from '@/lib/api/categoriesApi';
import { queryKeys } from '@/lib/constants/queryKeys';

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.categories });
      await queryClient.invalidateQueries({ queryKey: queryKeys.currentUser });
    },
  });
};
