'use client';

import Logo from '../Logo/Logo';
import TransactionsHistoryNav from '../TransactionsHistoryNav/TransactionsHistoryNav';
import UserBarBtn from '../UserBarBtn/UserBarBtn';
import css from './Header.module.css';

export default function Header() {
  const isAuthenticated = false; // Тимчасово
  const headerClasses = `${css.header} ${!isAuthenticated ? css.isPublic : ''}`;

  return (
    <header className={headerClasses}>
      <div className="container">
        <div className={css.headerContent}>
          <Logo />

          {isAuthenticated && (
            <>
              <nav
                className={css.navigation}
                aria-label="Main transaction navigation"
              >
                <TransactionsHistoryNav />
              </nav>

              <div className={css.userBarBtn}>
                <UserBarBtn />
              </div>

              <button
                className={css.burgerBtn}
                type="button"
                aria-label="Open menu"
              >
                <svg className={css.burgerIcon}>
                  <use href="/icons.svg#icon-burger-menu" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
