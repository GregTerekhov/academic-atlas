'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { throttle } from 'lodash';

import { Paths, type IWithChildren } from '../types';
import { useInitialiseSection } from 'hooks';
interface IActiveLinkContext {
  activatedLink: string;
  setActivatedLink: (path: string) => void;
  handleActivateLink: (path: string) => void;
  clearActiveLink: () => void;
}

const ActiveLinkContext = createContext<IActiveLinkContext | undefined>(undefined);

export const ActiveLinkProvider = ({ children }: IWithChildren) => {
  const pathname = usePathname();
  const router = useRouter();

  const [activatedLink, setActivatedLink] = useState<string>(pathname);
  const isNavigating = useRef<boolean>(false);

  const { sections, sectionRefs, initialiseSections } = useInitialiseSection();

  const handleScroll = useCallback(() => {
    if (window.scrollY === 0 && pathname === Paths.Main) {
      setActivatedLink(pathname as Paths);
      window.history.pushState(null, '', pathname);
    }
  }, [pathname]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, pathname]);

  const handleSectionIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      console.log('isNavigating.current', isNavigating.current);
      if (isNavigating.current) return;

      entries.forEach((entry) => {
        console.log('sectionRefs', sectionRefs);
        console.log('entry', entry);
        console.log('entry.isIntersecting', entry.isIntersecting);
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
    [sectionRefs, sections, activatedLink, router],
  );

  useEffect(() => {
    initialiseSections();
  }, [initialiseSections]);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const throttledHandleIntersection = throttle(handleSectionIntersection, 500);

    const initialiseAndObserve = () => {
      if (pathname === Paths.Main) {
        // Ensure sections are reset when back on the home page
        initialiseSections();

        observer = new IntersectionObserver(handleSectionIntersection, {
          root: null,
          threshold: 0.6,
        });

        sectionRefs.current.forEach((ref) => {
          if (ref) observer?.observe(ref);
        });
      }
    };

    initialiseAndObserve();

    // Always cleanup observers to avoid issues
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      sectionRefs.current.forEach((ref) => {
        if (ref) observer?.unobserve(ref);
      });
      throttledHandleIntersection.cancel();
    };
  }, [pathname, handleSectionIntersection, sectionRefs, initialiseSections]);

  const handleActivateLink = (path: string) => {
    const sectionId = path.split('#')[1];
    const section = sections.current.find((section) => section.id === sectionId);

    isNavigating.current = true;

    if (section) {
      setActivatedLink(section.path);
    } else {
      if (activatedLink !== path) {
        setActivatedLink(path);
      }
    }

    const navigationTimerId = setTimeout(() => {
      isNavigating.current = false;
    }, 1000);

    return () => {
      clearTimeout(navigationTimerId);
    };
  };

  const clearActiveLink = () => {
    setActivatedLink('');
  };

  return (
    <ActiveLinkContext.Provider
      value={{
        activatedLink,
        setActivatedLink,
        handleActivateLink,
        clearActiveLink,
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
