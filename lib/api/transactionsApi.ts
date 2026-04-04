// Клиент CRUD транзакций (доход/расход) с поддержкой фильтров.
import { api } from './api';
import type {
  CreateTransactionRequest,
  CreateTransactionResponse,
  DeleteTransactionResponse,
  TransactionItem,
  TransactionType,
  UpdateTransactionRequest,
  UpdateTransactionResponse,
} from '@/types/transaction';

interface GetTransactionsParams {
  date?: string;
  search?: string;
}

export const createTransaction = async (
  payload: CreateTransactionRequest
): Promise<CreateTransactionResponse> => {
  const response = await api.post<CreateTransactionResponse>(
    '/transactions',
    payload
  );

  return response.data;
};

export const getTransactions = async (
  type: TransactionType,
  params?: GetTransactionsParams
): Promise<TransactionItem[]> => {
  const response = await api.get<TransactionItem[]>(`/transactions/${type}`, {
    params,
  });

  return response.data;
};

export const updateTransaction = async (
  type: TransactionType,
  id: string,
  payload: UpdateTransactionRequest
): Promise<UpdateTransactionResponse> => {
  const response = await api.patch<UpdateTransactionResponse>(
    `/transactions/${type}/${id}`,
    payload
  );

  return response.data;
};

export const deleteTransaction = async (
  id: string
): Promise<DeleteTransactionResponse> => {
  const response = await api.delete<DeleteTransactionResponse>(
    `/transactions/${id}`
  );

  return response.data;
};
