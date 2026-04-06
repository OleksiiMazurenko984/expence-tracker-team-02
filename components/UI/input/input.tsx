import React from 'react';
import styles from './input.module.css';

type IconType = React.ReactNode | string;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  iconLeft?: IconType;
  iconRight?: IconType;
  fullWidth?: boolean;
  containerClassName?: string;
}

export const Input = ({
  label,
  error,
  iconLeft,
  iconRight,
  fullWidth,
  containerClassName,
  className,
  ...props
}: InputProps) => {
  const renderIcon = (icon?: IconType) => {
    if (!icon) return null;
    if (typeof icon === 'string') {
      return (
        <svg className={styles.icon} aria-hidden>
          <use href={`/icons.svg#${icon}`} />
        </svg>
      );
    }
    return icon;
  };

  return (
    <div
      className={`${styles.wrapper} ${fullWidth ? styles.fullWidth : ''} ${
        containerClassName ?? ''
      }`.trim()}
    >
      {label && <label className={styles.label}>{label}</label>}

      <div className={`${styles.field} ${error ? styles.error : ''}`.trim()}>
        {iconLeft && (
          <span className={styles.iconLeft}>{renderIcon(iconLeft)}</span>
        )}

        <input
          {...props}
          className={`${styles.input} ${className ?? ''}`.trim()}
          aria-invalid={Boolean(error)}
        />

        {iconRight && (
          <span className={styles.iconRight}>{renderIcon(iconRight)}</span>
        )}
      </div>

      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};
