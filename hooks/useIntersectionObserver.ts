'use client';

import { useEffect } from 'react';

export const useIntersectionObserver = (
  targets: Element[],
  options: IntersectionObserverInit,
  callback: IntersectionObserverCallback,
) => {
  useEffect(() => {
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(callback, options);

    targets.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      if (observer) {
        targets.forEach((element) => {
          observer.unobserve(element);
        });
        observer.disconnect();
      }
    };
  }, [callback, options, targets]);

  return {};
};
