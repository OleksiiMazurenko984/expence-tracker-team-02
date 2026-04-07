import Link from 'next/link';
import css from './Logo.module.css';

function Logo() {
  return (
    <Link href="/" className={css.logo} aria-label="Home">
      <svg className={css.icon} width="27" height="16">
        <use href="/icons.svg#logo-icon" />
      </svg>
      <span className={css.text}>ExpenseTracker</span>
    </Link>
  );
}

export default Logo;
