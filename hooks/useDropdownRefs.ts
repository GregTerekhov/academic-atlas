'use client';

import { useEffect, useRef } from 'react';

import { IDropdownRef } from '../types';

export const useDropdownRefs = (
  registerDropdownRefs: (refs: Record<string, IDropdownRef | null>) => void,
) => {
  const workTypeRef = useRef<IDropdownRef | null>(null);
  const expertiseAreaRef = useRef<IDropdownRef | null>(null);
  const executionTimeRef = useRef<IDropdownRef | null>(null);

  useEffect(() => {
    const refs: Record<string, IDropdownRef | null> = {
      workTypeRef: workTypeRef.current,
      expertiseAreaRef: expertiseAreaRef.current,
      executionTimeRef: executionTimeRef.current,
    };

    registerDropdownRefs(refs);
  }, [registerDropdownRefs]);

  return {
    workTypeRef,
    expertiseAreaRef,
    executionTimeRef,
  };
};
