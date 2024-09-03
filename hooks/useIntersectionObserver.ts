'use client';

import { useEffect, useRef } from 'react';

export const useIntersectionObserver = (
  targets: Element[],
  options: IntersectionObserverInit,
  callback: IntersectionObserverCallback,
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  //FIXME: add new logic in test
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

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
    