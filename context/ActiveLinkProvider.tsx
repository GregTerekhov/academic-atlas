'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { Paths, type IWithChildren } from '../types';
import { useInitialiseSection, useIntersectionObserver } from 'hooks';

interface IActiveLinkContext {
  activatedLink: string;
  handleActivateLink: (path: string) => void;
  clearActiveLink: () => void;
  setScrollingWithButton: (isScrolling: boolean) => void;
}

const ActiveLinkContext = createContext<IActiveLinkContext | undefined>(undefined);

export const ActiveLinkProvider = ({ children }: IWithChildren) => {
  const pathname = usePathname();
  const router = useRouter();

  const { sections, sectionRefs } = useInitialiseSection();
  const isNavigating = useRef<boolean>(false);

  const [activatedLink, setActivatedLink] = useState<string>(pathname);
   const [isScrollingWithButton, setScrollingWithButton] = useState<boolean>(false);

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

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (isNavigating.current || isScrollingWithButton) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id && sections?.current) {
            const section = sections.current.find((section) => section.id === id);
            if (section && activatedLink !== section.path) {
              setActivatedLink(section.path);
              router.push(`#${section.id}`, { scroll: false });
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
    if (activatedLink !== path) {
      setActivatedLink(path);
      setTimeout(() => {
        isNavigating.current = false;
      }, 500);
    }
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
        setScrollingWithButton,
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
