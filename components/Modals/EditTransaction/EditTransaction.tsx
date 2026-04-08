'use client';

import { FormEvent, useState } from 'react';
import { toast } from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from '@/components/Modals/Modal/Modal';
import { useUpdateTransaction } from '@/lib/hooks/useUpdateTransaction';
import { useCategories } from '@/lib/hooks/useCategories';
import { useUserStore } from '@/lib/store/userStore';
import type { TransactionItem } from '@/types/transaction';
import { CalendarIcon, ClockIcon } from '@/components/UI/Icons/Icons';
import type { TransactionType } from '@/types/sharedTypes';
import css from './EditTransaction.module.css';

interface EditTransactionProps {
  onClose: () => void;
  transaction: TransactionItem;
  type: TransactionType;
}

const parseDate = (value: string | undefined) =>
  value ? new Date(`${value}T00:00:00`) : null;

const parseTime = (value: string | undefined) => {
  if (!value) {
    return null;
  }

  const [hours = '00', minutes = '00'] = value.split(':');
  const time = new Date();
  time.setHours(Number(hours), Number(minutes), 0, 0);
  return time;
};

const toLocalIsoDate = (value: Date) => {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, '0');
  const day = String(value.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatTime = (value: Date) => {
  const hours = String(value.getHours()).padStart(2, '0');
  const minutes = String(value.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export default function EditTransaction({
  onClose,
  transaction,
  type,
}: EditTransactionProps) {
  const updateMutation = useUpdateTransaction();
  const { data: categories } = useCategories();
  const { user } = useUserStore();
  const currency = user?.currency ? user.currency.toUpperCase() : 'UAH';

  const [date, setDate] = useState<Date | null>(parseDate(transaction?.date));
  const [time, setTime] = useState<Date | null>(parseTime(transaction?.time));
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
          date: date ? toLocalIsoDate(date) : transaction.date,
          time: time ? formatTime(time) : transaction.time,
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
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.row}>
          <label className={css.fieldGroup}>
            <span className={css.label}>Date</span>
            <div className={css.inputWithIcon}>
              <DatePicker
                selected={date}
                onChange={(value: Date | null) => setDate(value)}
                dateFormat="dd/MM/yyyy"
                placeholderText="dd/mm/yyyy"
                className={css.input}
                required
              />
              <span className={css.inputIcon}>
                <CalendarIcon />
              </span>
            </div>
          </label>
          <label className={css.fieldGroup}>
            <span className={css.label}>Time</span>
            <div className={css.inputWithIcon}>
              <DatePicker
                selected={time}
                onChange={(value: Date | null) => setTime(value)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={5}
                timeCaption="Time"
                timeFormat="HH:mm"
                dateFormat="HH:mm"
                placeholderText="00:00"
                className={css.input}
                required
              />
              <span className={css.inputIcon}>
                <ClockIcon />
              </span>
            </div>
          </label>
        </div>

        <label className={css.fieldGroup}>
          <span className={css.label}>Category</span>
          <select
            className={css.input}
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

        <label className={css.fieldGroup}>
          <span className={css.label}>Sum</span>
          <div className={css.inputWithIcon}>
            <input
              className={css.input}
              type="number"
              min="0"
              step="0.01"
              value={sum}
              onChange={e => setSum(e.target.value)}
              required
            />
            <span className={css.inputIcon}>{currency}</span>
          </div>
        </label>

        <label className={css.fieldGroup}>
          <span className={css.label}>Comment</span>
          <textarea
            className={css.textarea}
            value={comment}
            onChange={e => setComment(e.target.value)}
            maxLength={250}
          />
        </label>

        <button
          type="submit"
          className={css.submitBtn}
          disabled={updateMutation.isPending}
        >
          {updateMutation.isPending ? 'Saving...' : 'Send'}
        </button>
      </form>
    </Modal>
  );
}
