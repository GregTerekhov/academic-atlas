'use client';

import { useEffect, useRef, useState } from 'react';

export const useScrollController = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const button = buttonRef.current;
    const footer = document.querySelector('footer');
    const header = document.querySelector('header');

    if (!button || !footer || !header) return;

    const handleScroll = () => {
      const headerHeight = header.getBoundingClientRect()?.height ?? 0;
      const viewportHeight = window.innerHeight - headerHeight;
      if (window.scrollY > viewportHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const offset = 16;
          const footerTop = entry.boundingClientRect.top;
          const viewportHeight = window.innerHeight;

          if (entry.isIntersecting) {
            button.style.position = 'absolute';
            button.style.bottom = `${viewportHeight - footerTop + offset}px`;
          } else {
            button.style.position = 'fixed';
            button.style.bottom = `${offset}px`;
          }
        });
      },
      { root: null, threshold: 0 },
    );

    observer.observe(footer);
    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { buttonRef, isVisible };
};
