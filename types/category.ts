// Доменные типы категорий.
import type { TransactionType } from './sharedTypes';

export interface Category {
  _id: string;
  type: TransactionType;
  categoryName: string;
}

export interface CategoriesResponse {
  incomes: Category[];
  expenses: Category[];
}

export interface CreateCategoryRequest {
  type: TransactionType;
  categoryName: string;
}

export interface UpdateCategoryRequest {
  _id?: string;
  categoryName: string;
}

export interface UpdateCategoryResponse {
  _id: string;
  categoryName: string;
}
