// 'use client';

// import { useEffect, useRef, useState } from 'react';

// export const useScrollController = () => {
//   const buttonRef = useRef<HTMLButtonElement>(null);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const button = buttonRef.current;
//     const footer = document.querySelector('footer');
//     const header = document.querySelector('header');

//     if (!button || !footer || !header) return;

//     const handleScroll = () => {
//       const headerHeight = header.getBoundingClientRect()?.height ?? 0;
//       const viewportHeight = window.innerHeight - headerHeight;

//       if (window.scrollY > viewportHeight) {
//         setIsVisible(true);
//       } else {
//         setIsVisible(false);
//       }
//     };

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           const offset = 16;
//           button.style.bottom = `${offset}px`;

//           if (entry.isIntersecting) {
//             button.style.position = 'absolute';
//           } else {
//             button.style.position = 'fixed';
//           }
//         });
//       },
//       { root: null, threshold: 0 },
//     );

//     observer.observe(footer);
//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       observer.disconnect();
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   };

//   return { buttonRef, isVisible, scrollToTop };
// };

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
