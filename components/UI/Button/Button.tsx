import React from 'react';
import css from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'green' | 'outline' | 'gray' | 'black';
  size?: 'desktop' | 'mobile';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  children: React.ReactNode;
}

const Button = ({
  variant = 'green',
  size = 'desktop',
  iconLeft,
  iconRight,
  children,
  className = '',
  ...props
}: ButtonProps) => {
  const combinedClasses = [css.btn, css[variant], css[size], className].join(
    ' '
  );

  return (
    <button className={combinedClasses} {...props}>
      {iconLeft && <span className="flex items-center">{iconLeft}</span>}

      {children}

      {iconRight && <span className="flex items-center">{iconRight}</span>}
    </button>
  );
};

export default Button;
