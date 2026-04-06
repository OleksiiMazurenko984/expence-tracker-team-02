// Логин: мутация, выставление флагов auth и запись пользователя.
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '@/lib/api/authApi';
import { queryKeys } from '@/lib/constants/queryKeys';
import { useAuthStore } from '@/store/authStore';
import { useUserStore } from '@/store/userStore';
import type { LoginRequest } from '@/types/authentication';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const loginSuccess = useAuthStore((state) => state.loginSuccess);
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: (payload: LoginRequest) => login(payload),
    onSuccess: (data) => {
      loginSuccess();
      setUser(data);
      queryClient.setQueryData(queryKeys.currentUser, data);
    },
  });
};

