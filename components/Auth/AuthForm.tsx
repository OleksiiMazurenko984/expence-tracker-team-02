'use client';

import Button from '@/components/UI/Button/Button';
import styles from './AuthForm.module.css';
import type { LoginRequest, RegisterRequest } from '@/types/authentication';

interface AuthFormProps {
  mode: 'login' | 'register';
  formData: LoginRequest | RegisterRequest;
  errors: Partial<LoginRequest & RegisterRequest>;
  isPending: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function AuthForm({
  mode,
  formData,
  errors,
  isPending,
  onChange,
  onSubmit,
}: AuthFormProps) {
  const isRegister = mode === 'register';

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit} className={styles.form}>
        <h1 className={styles.title}>
          {isRegister ? 'Регистрация' : 'Вход'}
        </h1>

        {isRegister && (
          <div className={styles.field}>
            <input
              type="text"
              name="name"
              placeholder="Имя"
              value={(formData as RegisterRequest).name || ''}
              onChange={onChange}
              className={`${styles.input} ${errors.name ? styles.error : ''}`}
              disabled={isPending}
            />
            {errors.name && <span className={styles.errorText}>{errors.name}</span>}
          </div>
        )}

        <div className={styles.field}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={onChange}
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
            onChange={onChange}
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
          {isPending
            ? isRegister
              ? 'Регистрация...'
              : 'Вход...'
            : isRegister
              ? 'Зарегистрироваться'
              : 'Войти'}
        </Button>
      </form>
    </div>
  );
}