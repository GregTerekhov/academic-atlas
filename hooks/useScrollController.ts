'use client';

import { useEffect, useRef, useState } from 'react';

import { useIntersectionObserver } from './useIntersectionObserver';

export const useScrollController = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const footerRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    footerRef.current = document.querySelector('footer');
  }, []);

  useEffect(() => {
    const header = document.querySelector('header');
    if (!header) return;

    const handleScroll = () => {
      const headerHeight = header.getBoundingClientRect()?.height ?? 0;
      const viewportHeight = window.innerHeight - headerHeight;

      if (window.scrollY > viewportHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const button = buttonRef.current;
    if (!button) return;

    const offset = 16;
    entries.forEach((entry) => {
      button.style.bottom = `${offset}px`;
      button.style.position = entry.isIntersecting ? 'absolute' : 'fixed';
    });
  };

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
