"use client";

import Logo from "../Logo/Logo";
import css from "./Header.module.css";

export default function Header() {
  const isAuthenticated = true; // Тимчасово
  const headerClasses = `${css.header} ${!isAuthenticated ? css.isPublic : ""}`;

  return (
    <header className={headerClasses}>
      <div className="container">
        <div className={css.headerContent}>
          <Logo />

          {isAuthenticated && (
            <>
              <div className={css.authNav}>
                <nav>{/* <TransactionsHistoryNav /> */}</nav>
                {/* <UserBarBtn /> */}
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
