'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useIntersectionObserver } from './useIntersectionObserver';
import { useMenu } from 'context/MenuProvider';

export const useScrollController = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const footerRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const { isNavMenuOpen } = useMenu();

  useEffect(() => {
    if (!footerRef.current) {
      footerRef.current = document.querySelector('footer');
    }
  }, []);

  useEffect(() => {
    const header = document.querySelector('header');
    if (!header) return;

    if (isNavMenuOpen) {
      setIsVisible(!isVisible);
    } else {
      setIsVisible(!isVisible);
    }

    const handleScroll = () => {
      const headerHeight = header.getBoundingClientRect()?.height ?? 0;
      const viewportHeight = window.innerHeight - headerHeight;

      setIsVisible(window.scrollY > viewportHeight);

      console.log('scroll is', isVisible);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isNavMenuOpen]);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const button = buttonRef.current;
    if (!button) return;

    const offset = 16;
    entries.forEach((entry) => {
      button.style.bottom = `${offset}px`;
      button.style.position = entry.isIntersecting ? 'absolute' : 'fixed';
    });
  }, []);

  useIntersectionObserver(
    footerRef.current ? [footerRef.current] : [],
    { root: null, threshold: 0 },
    handleIntersection,
  );

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return { buttonRef, isVisible, scrollToTop };
};
