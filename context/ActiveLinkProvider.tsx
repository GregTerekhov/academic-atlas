'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { Paths, type IWithChildren } from '../types';
import { useInitialiseSection, useIntersectionObserver } from 'hooks';

interface IActiveLinkContext {
  activatedLink: string;
  handleActivateLink: (path: string) => void;
  clearActiveLink: () => void;
  updateScrollWithButtonState: (isScrolling: boolean) => void;
}

const ActiveLinkContext = createContext<IActiveLinkContext | undefined>(undefined);

export const ActiveLinkProvider = ({ children }: IWithChildren) => {
  const pathname = usePathname();
  const router = useRouter();

  const [activatedLink, setActivatedLink] = useState<string>(pathname);
  const [isScrollingWithButton, setIsScrollingWithButton] = useState<boolean>(false);

  const isNavigating = useRef<boolean>(false);
  const { sections, sectionRefs } = useInitialiseSection();

  const updateScrollWithButtonState = (isScrolling: boolean) => {
    setIsScrollingWithButton(isScrolling);
  };

  const handleScroll = useCallback(() => {
    if (window.scrollY === 0 && pathname === Paths.Main) {
      setActivatedLink(pathname as Paths);
      window.history.pushState(null, '', pathname);
    }
  }, [pathname]);

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, pathname]);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (isNavigating.current || isScrollingWithButton) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id && sections?.current) {
            const section = sections.current.find((section) => section.id === id);
            if (section && activatedLink !== section.path) {
              // console.log('Setting activated link to section path:', section.path);
              setActivatedLink(section.path);
              router.push(`#${section.id}`, { scroll: false });
              // console.log('URL updated with:', `${section.path}`);
            }
          }
        }
      });
    },
    [activatedLink, sections, router, isScrollingWithButton],
  );
  useIntersectionObserver(sectionRefs.current, { root: null, threshold: 0.3 }, handleIntersection);

  const handleActivateLink = (path: string) => {
    isNavigating.current = true;

    console.log('sections.current: ', sections.current);

    const section = sections?.current?.find((section) => section.path === path);

    if (section) {
      // console.log('section.path: ', section.path);
      // console.log('path: ', path);
      setActivatedLink(section.path);
      router.push(`#${section.id}`, { scroll: false });
    } else {
      if (activatedLink !== path) {
        setActivatedLink(path);
      }
    }

    setTimeout(() => {
      isNavigating.current = false;
    }, 500);
  };

  const clearActiveLink = () => {
    setActivatedLink('');
  };

  return (
    <ActiveLinkContext.Provider
      value={{
        activatedLink,
        handleActivateLink,
        clearActiveLink,
        updateScrollWithButtonState,
      }}
    >
      {children}
    </ActiveLinkContext.Provider>
  );
};

export const useActiveLink = () => {
  const context = useContext(ActiveLinkContext);
  if (context === undefined) {
    throw new Error('useActiveLink must be used within a ActiveLinkProvider');
  }
  return context;
};
