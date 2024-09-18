'use client';

import { useRef } from 'react';

import { useActiveLink } from '../context';

export const useScrollResetTimeout = () => {
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);
  const { updateScrollWithButtonState } = useActiveLink();

  const startTimeout = () => {
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
      timerIdRef.current = null;
    }

    timerIdRef.current = setTimeout(() => {
      updateScrollWithButtonState(false);
    }, 1000);
  };

  return startTimeout;
};
