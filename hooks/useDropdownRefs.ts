'use client';

import { useEffect, useRef, useState } from 'react';

import { type IDropdownRef } from '../types';

export const useDropdownRefs = () => {
  const workTypeRef = useRef<IDropdownRef | null>(null);
  const expertiseAreaRef = useRef<IDropdownRef | null>(null);
  const executionTimeRef = useRef<IDropdownRef | null>(null);
  const [dropdownRefs, setDropdownRefs] = useState<Record<string, IDropdownRef | null>>({});

  useEffect(() => {
    const refs: Record<string, IDropdownRef | null> = {
      workTypeRef: workTypeRef.current,
      expertiseAreaRef: expertiseAreaRef.current,
      executionTimeRef: executionTimeRef.current,
    };

    const registerDropdownRefs = (refs: Record<string, IDropdownRef | null>) => {
      setDropdownRefs((prevRefs) => {
        if (JSON.stringify(prevRefs) === JSON.stringify(refs)) {
          return prevRefs;
        }
        return refs;
      });
    };

    registerDropdownRefs(refs);
  }, [setDropdownRefs]);

  const resetAllDropdownLabels = () => {
    Object.values(dropdownRefs).forEach((ref) => {
      if (ref) {
        ref.resetSelectedLabel();
      }
    });
  };

  return {
    workTypeRef,
    expertiseAreaRef,
    executionTimeRef,
    resetAllDropdownLabels,
  };
};
