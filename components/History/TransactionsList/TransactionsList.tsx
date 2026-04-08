'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDeleteTransaction } from '@/lib/hooks/useDeleteTransaction';
import { useMedia } from '@/lib/hooks/useMedia';
import { useUserStore } from '@/lib/store/userStore';
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
  const user = useUserStore(state => state.user);
  const isPhoneLayout = useMedia('(min-width: 375px) and (max-width: 767px)');
  const [editedTransaction, setEditedTransaction] =
    useState<TransactionItem | null>(null);
  const currency = user?.currency ? user.currency.toUpperCase() : 'UAH';

  const truncateForPhone = (value: string, maxLength = 7) => {
    if (!isPhoneLayout || value.length <= maxLength) {
      return value;
    }

    return `${value.slice(0, maxLength)}...`;
  };

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
            <span>Sum</span>
            <span>Actions</span>
          </div>

          <ul className={styles.list}>
            {transactions.map(transaction => (
              <li key={transaction._id} className={styles.row}>
                <span>{transaction.category.categoryName}</span>
                <span>{truncateForPhone(transaction.comment || '—')}</span>
                <span>{transaction.date}</span>
                <span>{transaction.time}</span>
                <span className={styles.sumValue}>
                  {transaction.sum} / {currency}
                </span>
                <div className={styles.actions}>
                  <button
                    type="button"
                    className={`${styles.iconButton} ${styles.editButton}`}
                    onClick={() => setEditedTransaction(transaction)}
                    aria-label="Edit transaction"
                  >
                    <svg
                      aria-hidden
                      width={16}
                      height={16}
                      className={styles.editIcon}
                    >
                      <use href="/icons.svg#icon-edit" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className={`${styles.iconButton} ${styles.deleteButton}`}
                    onClick={() => onDelete(transaction._id)}
                    aria-label="Delete transaction"
                    disabled={deleteMutation.isPending}
                  >
                    <svg
                      aria-hidden
                      width={16}
                      height={16}
                      className={styles.deleteIcon}
                    >
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
