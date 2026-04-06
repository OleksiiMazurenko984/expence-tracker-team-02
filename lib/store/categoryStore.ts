// Zustand-стор: список категорий и выбранный тип транзакции.
import { create } from 'zustand';
import type { Category } from '@/types/category';
import type { TransactionType } from '@/types/sharedTypes';

interface CategoryState {
  selectedCategory: Category | null;
  editingCategory: Category | null;
  activeCategoryType: TransactionType;
  setSelectedCategory: (category: Category | null) => void;
  setEditingCategory: (category: Category | null) => void;
  setActiveCategoryType: (type: TransactionType) => void;
  clearCategoryState: () => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  selectedCategory: null,
  editingCategory: null,
  activeCategoryType: 'expenses',
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setEditingCategory: (category) => set({ editingCategory: category }),
  setActiveCategoryType: (type) => set({ activeCategoryType: type }),
  clearCategoryState: () =>
    set({
      selectedCategory: null,
      editingCategory: null,
      activeCategoryType: 'expenses',
    }),
}));
