// Zustand-стор для флагов аутентификации и статусов.
import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  loginSuccess: () => void;
  logoutSuccess: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  loginSuccess: () => set({ isAuthenticated: true }),
  logoutSuccess: () => set({ isAuthenticated: false }),
}));
