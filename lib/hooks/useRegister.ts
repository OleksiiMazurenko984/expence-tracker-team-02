// –егистраци€: мутаци€, установка auth и пользовател€.
'use client';

import { useMutation } from '@tanstack/react-query';
import { register } from '@/lib/api/authApi';
import type { RegisterRequest } from '@/types/authentication';

export const useRegister = () => {
  return useMutation({
    mutationFn: (payload: RegisterRequest) => register(payload),
  });
};
