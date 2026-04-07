import { api } from './api';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '@/types/authentication';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';

export async function registerUser(
  data: RegisterRequest
): Promise<RegisterResponse> {
  try {
    const response = await api.post<RegisterResponse>('/auth/register', data);
    toast.success('Registration was successful!');
    return response.data;
  } catch (error: AxiosError) {
    const message =
      error.response?.status === 409
        ? 'A user with this email address already exists'
        : (error.response?.data as any)?.message || 'Registration error';

    toast.error(message);
    throw error;
  }
}

export async function loginUser(data: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await api.post<LoginResponse>('/auth/login', data);
    toast.success('Login successful!');
    return response.data;
  } catch (error: AxiosError) {
    const message =
      error.response?.status === 403
        ? 'Incorrect email or password'
        : (error.response?.data as any)?.message || 'Login error';

    toast.error(message);
    throw error;
  }
}

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const refreshSession = async (): Promise<void> => {
  await api.get('/auth/session');
};
