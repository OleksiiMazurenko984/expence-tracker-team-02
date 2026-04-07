// Zustand-стор: список транзакций, фильтры и вспомогательные состояния.
import { create } from 'zustand';
import type { TransactionItem } from '@/types/transaction';
import type { TransactionType } from '@/types/sharedTypes';

interface TransactionFilters {
  date?: string;
  search?: string;
}

interface TransactionState {
  activeType: TransactionType;
  editingTransaction: TransactionItem | null;
  filters: TransactionFilters;
  setActiveType: (type: TransactionType) => void;
  setEditingTransaction: (transaction: TransactionItem | null) => void;
  setFilters: (filters: TransactionFilters) => void;
  clearFilters: () => void;
  clearTransactionState: () => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  activeType: 'expenses',
  editingTransaction: null,
  filters: {},
  setActiveType: (type) => set({ activeType: type }),
  setEditingTransaction: (transaction) => set({ editingTransaction: transaction }),
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  clearFilters: () => set({ filters: {} }),
  clearTransactionState: () =>
    set({
      activeType: 'expenses',
      editingTransaction: null,
      filters: {},
    }),
}));
