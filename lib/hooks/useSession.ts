// Обновление серверной сессии (mutation placeholder).
'use client';

import { useMutation } from '@tanstack/react-query';
import { refreshSession } from '@/lib/api/authApi';

export const useSession = () => {
  return useMutation({
    mutationFn: refreshSession,
  });
};
