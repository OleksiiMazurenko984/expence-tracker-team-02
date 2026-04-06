// app/(auth routes)/login/page.tsx
'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/UI/Button/Button';
import { loginUser } from '@/lib/api/authApi';
import type { LoginRequest } from '@/types/authentication';
import styles from './LoginPage.module.css'; // если у тебя уже есть модуль — оставь, иначе создай пустой или удали импорт

export default function LoginPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<LoginRequest>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginRequest> = {};
    if (!formData.email) newErrors.email = 'Email обязателен';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Неверный формат email';
    if (!formData.password) newErrors.password = 'Пароль обязателен';
    else if (formData.password.length < 6) newErrors.password = 'Пароль минимум 6 символов';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // очищаем ошибку при вводе
    if (errors[name as keyof LoginRequest]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    startTransition(async () => {
      try {
        await loginUser(formData);
        // middleware сам сделает редирект, но для мгновенности:
        router.replace('/transactions/expenses');
      } catch {
        // toast уже показан в сервисе
      }
    });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.title}>Вход</h1>

        <div className={styles.field}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={`${styles.input} ${errors.email ? styles.error : ''}`}
            disabled={isPending}
          />
          {errors.email && <span className={styles.errorText}>{errors.email}</span>}
        </div>

        <div className={styles.field}>
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
            className={`${styles.input} ${errors.password ? styles.error : ''}`}
            disabled={isPending}
          />
          {errors.password && <span className={styles.errorText}>{errors.password}</span>}
        </div>

        <Button
          type="submit"
          variant="green"
          size="desktop"
          disabled={isPending}
          className={styles.submitBtn}
        >
          {isPending ? 'Вход...' : 'Войти'}
        </Button>
      </form>
    </div>
  );
}