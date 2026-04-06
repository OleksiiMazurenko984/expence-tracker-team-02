'use client';

import { TailSpin } from 'react-loading-icons';
import styles from './Loader.module.css';

type LoaderProps = {
  label?: string;
  size?: number;
  color?: string;
  overlay?: boolean;
};

export default function Loader({
  label = 'Loading...',
  size = 64,
  color = 'var(--green-neon)',
  overlay = true,
}: LoaderProps) {
  const Wrapper = overlay ? 'div' : 'span';

  return (
    <Wrapper className={overlay ? styles.overlay : undefined}>
      <div className={styles.card}>
        <TailSpin
          stroke={color}
          strokeWidth={3}
          speed={1}
          width={size}
          height={size}
          aria-label={label}
          className={styles.spinner}
        />
        <p className={styles.label}>{label}</p>
      </div>
    </Wrapper>
  );
}
