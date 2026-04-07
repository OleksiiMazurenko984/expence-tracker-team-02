'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDeleteTransaction } from '@/lib/hooks/useDeleteTransaction';
import type { TransactionItem } from '@/types/transaction';
import type { TransactionType } from '@/types/sharedTypes';
import EditTransaction from '@/components/Modals/EditTransaction/EditTransaction';
import styles from './TransactionsList.module.css';

interface TransactionsListProps {
  type: TransactionType;
  transactions: TransactionItem[];
  isLoading: boolean;
}

export default function TransactionsList({
  type,
  transactions,
  isLoading,
}: TransactionsListProps) {
  const deleteMutation = useDeleteTransaction();
  const [editedTransaction, setEditedTransaction] =
    useState<TransactionItem | null>(null);

  const onDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync({ id, type });
      toast.success('Transaction deleted');
    } catch (error: unknown) {
      const message =
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof (error as { response?: { data?: { message?: string } } })
          .response?.data?.message === 'string'
          ? ((error as { response?: { data?: { message?: string } } }).response
              ?.data?.message ?? 'Failed to fetch transactions')
          : 'Failed to delete transaction';
      toast.error(message);
    }
  };

  if (isLoading) {
    return <p className={styles.state}>Loading transactions...</p>;
  }

  if (!transactions.length) {
    return <p className={styles.state}>No transactions found.</p>;
  }

  return (
    <>
      <div className={styles.tableWrap}>
        <div className={styles.table}>
          <div className={styles.headRow}>
            <span>Category</span>
            <span>Comment</span>
            <span>Date</span>
            <span>Time</span>
            <span>Amount</span>
            <span>Actions</span>
          </div>

          <ul className={styles.list}>
            {transactions.map(transaction => (
              <li key={transaction._id} className={styles.row}>
                <span>{transaction.category.categoryName}</span>
                <span>{transaction.comment || '—'}</span>
                <span>{transaction.date}</span>
                <span>{transaction.time}</span>
                <span
                  className={
                    type === 'incomes' ? styles.income : styles.expense
                  }
                >
                  {transaction.sum}
                </span>
                <div className={styles.actions}>
                  <button
                    type="button"
                    className={styles.iconButton}
                    onClick={() => setEditedTransaction(transaction)}
                    aria-label="Edit transaction"
                  >
                    <svg width="18" height="18">
                      <use href="/icons.svg#icon-edit" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className={styles.iconButton}
                    onClick={() => onDelete(transaction._id)}
                    aria-label="Delete transaction"
                    disabled={deleteMutation.isPending}
                  >
                    <svg width="18" height="18">
                      <use href="/icons.svg#icon-trash" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {editedTransaction && (
        <EditTransaction
          key={editedTransaction._id}
          onClose={() => setEditedTransaction(null)}
          transaction={editedTransaction}
          type={type}
        />
      )}
    </>
  );
}
