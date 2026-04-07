'use client';

import { ChangeEvent } from 'react';
import styles from './TransactionsSearchTools.module.css';

interface TransactionsSearchToolsProps {
  search: string;
  date: string;
  onSearchChange: (value: string) => void;
  onDateChange: (value: string) => void;
}

export default function TransactionsSearchTools({
  search,
  date,
  onSearchChange,
  onDateChange,
}: TransactionsSearchToolsProps) {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    onDateChange(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.searchLabel}>
        <span className={styles.srOnly}>Search by comment</span>
        <svg className={styles.searchIcon} width="18" height="18">
          <use href="/icons.svg#icon-search" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search for anything.."
          className={styles.input}
        />
      </label>

      <label className={styles.dateLabel}>
        <span className={styles.srOnly}>Filter by date</span>
        <svg className={styles.calendarIcon} width="18" height="18">
          <use href="/icons.svg#icon-calendar" />
        </svg>
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          className={styles.input}
          placeholder="dd/mm/yyyy"
        />
      </label>
    </div>
  );
}
