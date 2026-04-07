'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import TransactionsTotalAmount from '@/components/Transactions/TransactionsTotalAmount/TransactionsTotalAmount';
import TransactionsSearchTools from '@/components/History/TransactionsSearchTools/TransactionsSearchTools';
import TransactionsList from '@/components/History/TransactionsList/TransactionsList';
import { useTransactions } from '@/lib/hooks/useTransactions';
import type { TransactionType } from '@/types/sharedTypes';
import styles from './TransactionsHistoryPage.module.css';

interface TransactionsHistoryPageProps {
  type: TransactionType;
}

export default function TransactionsHistoryPage({
  type,
}: TransactionsHistoryPageProps) {
  const [search, setSearch] = useState('');
  const [date, setDate] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 350);

    return () => clearTimeout(timer);
  }, [search]);

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useTransactions({
    type,
    date: date || undefined,
    search: debouncedSearch || undefined,
  });

  useEffect(() => {
    if (isError) {
      const message =
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof (error as { response?: { data?: { message?: string } } })
          .response?.data?.message === 'string'
          ? ((error as { response?: { data?: { message?: string } } }).response
              ?.data?.message ?? 'Failed to fetch transactions')
          : 'Failed to fetch transactions';
      toast.error(message);
    }
  }, [isError, error]);

  const title = type === 'incomes' ? 'All income' : 'All expense';
  const descr =
    type === 'incomes'
      ? 'Track and celebrate every bit of earnings effortlessly! Gain insights into your total revenue in a snap.'
      : 'View and manage every transaction seamlessly! Your entire financial landscape, all in one place.';
  return (
    <div className={styles.pageContainer}>
      <section className={styles.headerSection}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{descr}</p>
      </section>

      <section className={styles.totalSection}>
        <TransactionsTotalAmount />
      </section>

      <section className={styles.historySection}>
        <div className={styles.toolsSection}>
          <TransactionsSearchTools
            search={search}
            date={date}
            onSearchChange={setSearch}
            onDateChange={setDate}
          />
        </div>

        <div className={styles.listSection}>
          <TransactionsList
            type={type}
            transactions={data}
            isLoading={isLoading}
          />
        </div>
      </section>
    </div>
  );
}
