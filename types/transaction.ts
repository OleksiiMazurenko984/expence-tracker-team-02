// Доменные типы и payloads транзакций.
import type { TransactionType } from './sharedTypes';

export interface CreateTransactionRequest {
  type: TransactionType;
  date: string;
  time: string;
  category: string;
  sum: number;
  comment?: string;
}

export interface CreateTransactionResponse {
  transaction: {
    _id: string;
    type: TransactionType;
    date: string;
    time: string;
    category: string;
    sum: number;
    comment?: string;
  };
  total: number;
}

export interface TransactionItem {
  _id: string;
  type: TransactionType;
  date: string;
  time: string;
  category: {
    _id: string;
    categoryName: string;
  };
  sum: number;
  comment?: string;
}

export interface UpdateTransactionRequest {
  date?: string;
  time?: string;
  category?: string;
  sum?: number;
  comment?: string;
}

export interface UpdateTransactionResponse {
  transaction: {
    date: string;
    time: string;
    category: {
      _id: string;
      categoryName: string;
    };
    sum: number;
    comment?: string;
  };
  total: number;
}

export interface DeleteTransactionResponse {
  total: number;
}

export type { TransactionType };
