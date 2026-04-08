'use client';

import { ChangeEvent } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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

  const selectedDate = date ? new Date(`${date}T00:00:00`) : null;

  const handlePickerChange = (value: Date | null) => {
    if (!value) {
      onDateChange('');
      return;
    }

    const localDate = new Date(
      value.getTime() - value.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, 10);
    onDateChange(localDate);
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.searchLabel}>
        <span className={styles.srOnly}>Search by comment</span>
        <div className={styles.inputWithIcon}>
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search for anything.."
            className={`${styles.input} ${styles.searchInput}`}
          />
          <span className={styles.inputIcon}>
            <svg aria-hidden width={20} height={20} className={styles.toolIcon}>
              <use href="/icons.svg#icon-search" />
            </svg>
          </span>
        </div>
      </label>

      <label className={styles.dateLabel}>
        <span className={styles.srOnly}>Filter by date</span>
        <div className={styles.inputWithIcon}>
          <DatePicker
            selected={selectedDate}
            onChange={handlePickerChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/mm/yyyy"
            className={`${styles.input} ${styles.dateInput}`}
          />
          <span className={styles.inputIcon}>
            <svg aria-hidden width={20} height={20} className={styles.toolIcon}>
              <use href="/icons.svg#icon-calendar" />
            </svg>
          </span>
        </div>
      </label>
    </div>
  );
}
