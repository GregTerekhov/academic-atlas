'use client';

import { useEffect, useState } from 'react';

export const useInitialLink = () => {
  const [initialLink, setInitialLink] = useState('');

  useEffect(() => {
    if (typeof window !== undefined) {
      const hash = window.location.hash;
      if (hash) setInitialLink(hash);
    }
  }, []);

  return initialLink;
};
