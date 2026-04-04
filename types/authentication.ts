// Типы для аутентификации: запросы/ответы регистрации и логина.
// Также описываем поля пользователя, которые возвращает бэкенд (валюта, категории, totals).
import type { CategoriesResponse } from './category';
import type { Currency } from './sharedTypes';
import type { TransactionsTotal } from './user';

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  _id: string;
  name: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  _id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  currency: Currency;
  categories: CategoriesResponse;
  transactionsTotal: TransactionsTotal;
}
