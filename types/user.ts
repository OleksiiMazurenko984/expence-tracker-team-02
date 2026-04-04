// Типы профиля пользователя и обновлений.
import type { CategoriesResponse } from './category';
import type { Currency } from './sharedTypes';

export interface TransactionsTotal {
  incomes: number;
  expenses: number;
}

export interface CurrentUserResponse {
  _id: string;
  name: string | null;
  email: string;
  avatarUrl: string | null;
  currency: Currency;
  categories: CategoriesResponse;
  transactionsTotal: TransactionsTotal;
}

export interface UpdateUserRequest {
  name?: string;
  currency?: Currency;
}

export interface UpdateUserResponse {
  _id: string;
  name: string;
  currency: Currency;
}

export interface UpdateAvatarResponse {
  avatarUrl: string;
}
