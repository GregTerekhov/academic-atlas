'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
// import { debounce } from 'lodash';

import { Paths } from '../types';
import { useIntersectionObserver } from './useIntersectionObserver';
import { useInitialiseSection } from './useInitialiseSection';

export const useActivateLink = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [activatedLink, setActivatedLink] = useState<string>(pathname);
  const { sections, sectionRefs } = useInitialiseSection();
  const isNavigating = useRef<boolean>(false);

  const updateActiveLink = useCallback(() => {
    const legalPagesPaths = pathname === Paths.Offer || pathname === Paths.Policy;

    if (legalPagesPaths) {
      setActivatedLink('');
    }
  }, [pathname]);

  const handleScroll = useCallback(() => {
    if (window.scrollY === 0 && pathname === Paths.Main) {
      setActivatedLink(pathname as Paths);
      window.history.pushState(null, '', pathname);
    }
  }, [pathname]);

  useEffect(() => {
    if (activatedLink !== pathname) {
      updateActiveLink();
    }
  }, [activatedLink, pathname, updateActiveLink]);

  useEffect(() => {
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, pathname]);

  // const handleScroll = useCallback(() => {
  //   const hash = window.location.hash;

  //   if (window.scrollY === 0 && pathname === Paths.Main) {
  //     setActivatedLink(pathname as Paths);
  //     console.log('Scroll to top detected, setting activatedLink to:', pathname);
  //     window.history.pushState(null, '', pathname);
  //   } else if (pathname === Paths.Main && hash && activatedLink !== `/${hash}`) {
  //     const targetElement = document.querySelector(hash);

  //     if (targetElement) {
  //       targetElement.scrollIntoView({ behavior: 'auto' });
  //       console.log('Scrolling to hash:', hash);
  //       setActivatedLink(`/${hash}`);
  //     }
  //   }
  // }, [pathname, activatedLink]);

  // useEffect(() => {
  //   handleScroll();
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [handleScroll]);

  // const handleIntersection = debounce((entries: IntersectionObserverEntry[]) => {
  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    if (isNavigating.current) return;

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');

        if (id && sections?.current) {
          const section = sections.current.find((section) => section.id === id);

          if (section && activatedLink !== section.path) {
            console.log('section.path:', section.path);

            setActivatedLink(section.path);
            router.push(`#${section.id}`, { scroll: false });
          }
        }
      }
    });
  };

  // }, 300);

  useIntersectionObserver(sectionRefs.current, { root: null, threshold: 0.3 }, handleIntersection);

  const handleActivateLink = (path: string) => {
    isNavigating.current = true;
    if (activatedLink !== path) {
      console.log('handleActivateLink called with path:', path);
      setActivatedLink(path);
      setTimeout(() => {
        isNavigating.current = false;
      }, 500);
    }
  };

  const clearActiveLink = () => {
    setActivatedLink('');
  };
  return { activatedLink, handleActivateLink, clearActiveLink };
};
