// Медиа‑запрос, возвращает boolean соответствия.
import { useEffect, useState } from 'react';

const getMatches = (query: string): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.matchMedia(query).matches;
};

export const useMedia = (query: string) => {
  const [matches, setMatches] = useState(getMatches(query));

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const onChange = () => setMatches(mediaQuery.matches);

    onChange();
    mediaQuery.addEventListener('change', onChange);

    return () => {
      mediaQuery.removeEventListener('change', onChange);
    };
  }, [query]);

  return matches;
};
