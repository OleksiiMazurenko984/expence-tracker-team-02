// Логаут: очистка кешей и сброс стора клиента.
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '@/lib/api/authApi';
import { queryKeys } from '@/lib/constants/queryKeys';
import { useAuthStore } from '@/store/authStore';
import { useCategoryStore } from '@/store/categoryStore';
import { useTransactionStore } from '@/store/transactionStore';
import { useUiStore } from '@/store/uiStore';
import { useUserStore } from '@/store/userStore';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const logoutSuccess = useAuthStore((state) => state.logoutSuccess);
  const clearUser = useUserStore((state) => state.clearUser);
  const clearCategoryState = useCategoryStore((state) => state.clearCategoryState);
  const clearTransactionState = useTransactionStore((state) => state.clearTransactionState);
  const closeBurgerMenu = useUiStore((state) => state.closeBurgerMenu);
  const closeUserPanel = useUiStore((state) => state.closeUserPanel);

  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      logoutSuccess();
      clearUser();
      clearCategoryState();
      clearTransactionState();
      closeBurgerMenu();
      closeUserPanel();
      await queryClient.invalidateQueries({ queryKey: queryKeys.currentUser });
      queryClient.clear();
    },
  });
};
