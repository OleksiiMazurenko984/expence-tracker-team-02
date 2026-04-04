// Клиент для CRUD категорий через общий axios-инстанс.
import { api } from './api';
import type {
  CategoriesResponse,
  Category,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  UpdateCategoryResponse,
} from '@/types/category';

export const getCategories = async (): Promise<CategoriesResponse> => {
  const response = await api.get<CategoriesResponse>('/categories');

  return response.data;
};

export const createCategory = async (
  payload: CreateCategoryRequest
): Promise<Category> => {
  const response = await api.post<Category>('/categories', payload);

  return response.data;
};

export const updateCategory = async (
  id: string,
  payload: UpdateCategoryRequest
): Promise<UpdateCategoryResponse> => {
  const response = await api.patch<UpdateCategoryResponse>(
    `/categories/${id}`,
    payload
  );

  return response.data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  await api.delete(`/categories/${id}`);
};
