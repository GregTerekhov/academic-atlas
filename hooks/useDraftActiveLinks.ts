'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { debounce } from 'lodash';

import { Paths } from '../types';
import { useInitialiseSection } from './useInitialiseSection';
import { useIntersectionObserver } from './useIntersectionObserver';

export const useActivateLink = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [activatedLink, setActivatedLink] = useState<string>(pathname);

  const { sections, sectionRefs, isInitialised } = useInitialiseSection();
  console.log('isInitialised: ', isInitialised);

  // console.log('sectionRefs: ', sectionRefs);

  const clearActiveLink = useCallback(() => {
    setActivatedLink('');
  }, []);

  const updateActiveLink = useCallback(() => {
    const legalPagesPaths = pathname === Paths.Offer || pathname === Paths.Policy;

    if (legalPagesPaths) {
      clearActiveLink();
    } else {
      setActivatedLink(pathname);
    }
  }, [clearActiveLink, pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0 && pathname === Paths.Main) {
        setActivatedLink(pathname as Paths);
        window.history.pushState(null, '', pathname);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    updateActiveLink();
  }, [updateActiveLink]);

  const handleIntersection = debounce((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        if (id && sections?.current) {
          console.log('sections.current: ', sections.current);
          const section = sections.current.find((section) => section.id === id);
          if (section) {
            setActivatedLink(section.path);
            router.push(`#${section.id}`, { scroll: false });
          }
        }
      }
    });
  }, 300);

  useIntersectionObserver(
    isInitialised ? sectionRefs.current : [],
    { root: null, threshold: 0.2 },
    handleIntersection,
  );

  const handleActivateLink = (path: string) => {
    setActivatedLink(path);
  };

  return { activatedLink, handleActivateLink, clearActiveLink };
};
