// Zustand-стор для данных текущего пользователя.
import { create } from 'zustand';
import type { CurrentUserResponse } from '@/types/user';

interface UserState {
  user: CurrentUserResponse | null;
  setUser: (user: CurrentUserResponse | null) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
