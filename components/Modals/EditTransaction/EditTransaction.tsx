'use client';

import { FormEvent, useState } from 'react';
import { toast } from 'react-hot-toast';
import Modal from '@/components/Modals/Modal/Modal';
import { useUpdateTransaction } from '@/lib/hooks/useUpdateTransaction';
import { useCategories } from '@/lib/hooks/useCategories';
import type { TransactionItem } from '@/types/transaction';
import type { TransactionType } from '@/types/sharedTypes';
import styles from './EditTransaction.module.css';

interface EditTransactionProps {
  onClose: () => void;
  transaction: TransactionItem;
  type: TransactionType;
}

export default function EditTransaction({
  onClose,
  transaction,
  type,
}: EditTransactionProps) {
  const updateMutation = useUpdateTransaction();
  const { data: categories } = useCategories();

  const [date, setDate] = useState(transaction?.date ?? '');
  const [time, setTime] = useState(transaction?.time ?? '');
  const [sum, setSum] = useState(String(transaction?.sum ?? ''));
  const [comment, setComment] = useState(transaction?.comment ?? '');
  const [category, setCategory] = useState(transaction?.category?._id ?? '');

  const categoryOptions =
    type === 'incomes'
      ? (categories?.incomes ?? [])
      : (categories?.expenses ?? []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await updateMutation.mutateAsync({
        type,
        id: transaction._id,
        data: {
          date,
          time,
          sum: Number(sum),
          comment,
          category,
        },
      });

      toast.success('Transaction updated successfully');
      onClose();
    } catch (error: unknown) {
      const message =
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof (error as { response?: { data?: { message?: string } } })
          .response?.data?.message === 'string'
          ? ((error as { response?: { data?: { message?: string } } }).response
              ?.data?.message ?? 'Failed to fetch transactions')
          : 'Failed to update transaction';
      toast.error(message);
    }
  };

  return (
    <Modal isOpen onClose={onClose}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Edit transaction</h2>

        <label className={styles.label}>
          Date
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />
        </label>

        <label className={styles.label}>
          Time
          <input
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
            required
          />
        </label>

        <label className={styles.label}>
          Category
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>
              Select category
            </option>
            {categoryOptions.map(item => (
              <option key={item._id} value={item._id}>
                {item.categoryName}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.label}>
          Sum
          <input
            type="number"
            min="0"
            step="0.01"
            value={sum}
            onChange={e => setSum(e.target.value)}
            required
          />
        </label>

        <label className={styles.label}>
          Comment
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            maxLength={250}
          />
        </label>

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={updateMutation.isPending}
        >
          {updateMutation.isPending ? 'Saving...' : 'Edit'}
        </button>
      </form>
    </Modal>
  );
}
