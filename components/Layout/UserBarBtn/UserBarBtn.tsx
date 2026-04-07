'use client';

import { useState } from 'react';
import css from './UserBarBtn.module.css';

const UserBarBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const userName = 'Alex Rybachok';

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <button
      type="button"
      className={css.userBtn}
      aria-label="Open user menu"
      onClick={toggleMenu}
      aria-expanded={isOpen}
    >
      <div className={css.avatarWrapper}>
        <svg className={css.userIcon} width="16" height="16">
          <use href="/icons.svg#icon-user-avatar" />
        </svg>
      </div>

      <span className={css.userName}>{userName}</span>

      <div className={css.chevronWrapper}>
        <svg className={css.chevronIcon} width="20" height="20">
          <use
            href={
              isOpen
                ? '/icons.svg#icon-chevron-down'
                : '/icons.svg#icon-chevron-up'
            }
          />
        </svg>
      </div>
    </button>
  );
};

export default UserBarBtn;
