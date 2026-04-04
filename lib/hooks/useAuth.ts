// Хелпер чтения/записи auth и user состояния из zustand.
import { useAuthStore } from '@/store/authStore';
import { useUserStore } from '@/store/userStore';

export const useAuth = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const loginSuccess = useAuthStore((state) => state.loginSuccess);
  const logoutSuccess = useAuthStore((state) => state.logoutSuccess);

  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  return {
    isAuthenticated,
    setIsAuthenticated,
    loginSuccess,
    logoutSuccess,
    user,
    setUser,
    clearUser,
  };
};
