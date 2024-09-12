'use client';

import { useEffect, useRef } from 'react';

export const useIntersectionObserver = (
  targets: Element[],
  options: IntersectionObserverInit,
  callback: IntersectionObserverCallback,
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(callback, options);
    observerRef.current = observer;

    targets.forEach((element) => {
      observerRef.current?.observe(element);
    });

    return () => {
      if (observerRef.current) {
        targets.forEach((element) => {
          observerRef.current?.unobserve(element);
        });
        observerRef.current?.disconnect();
      }
    };
  }, [callback, options, targets]);

  return {};
};
