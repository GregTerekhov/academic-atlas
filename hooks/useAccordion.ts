'use client';

import { useRef, useState } from 'react';

export const useAccordion = () => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleToggle = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (
      e.type === 'click' ||
      (e.type === 'keydown' && (e as React.KeyboardEvent).key === 'Enter')
    ) {
      setIsOpen((prevState) => !prevState);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return { isOpen, contentRef, handleToggle, handleKeyDown };
};
