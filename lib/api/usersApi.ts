// Клиент профиля: текущий пользователь, обновление данных и аватара.
import { api } from './api';
import type {
  CurrentUserResponse,
  UpdateAvatarResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from '@/types/user';

export const getCurrentUser = async (): Promise<CurrentUserResponse> => {
  const response = await api.get<CurrentUserResponse>('/users/current');

  return response.data;
};

export const updateUserInfo = async (
  payload: UpdateUserRequest
): Promise<UpdateUserResponse> => {
  const response = await api.patch<UpdateUserResponse>('/users/info', payload);

  return response.data;
};

export const uploadAvatar = async (
  formData: FormData
): Promise<UpdateAvatarResponse> => {
  const response = await api.patch<UpdateAvatarResponse>(
    '/users/avatar',
    formData
  );

  return response.data;
};

export const removeAvatar = async (): Promise<void> => {
  await api.delete('/users/avatar');
};
