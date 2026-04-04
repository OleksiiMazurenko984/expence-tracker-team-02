// Мутация создания категории с инвалидацией кеша.
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCategory } from '@/lib/api/categoriesApi';
import { queryKeys } from '@/lib/constants/queryKeys';
import type { CreateCategoryRequest } from '@/types/category';

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCategoryRequest) => createCategory(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.categories });
      await queryClient.invalidateQueries({ queryKey: queryKeys.currentUser });
    },
  });
};
