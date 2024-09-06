'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
// import { throttle } from 'lodash';

import { Paths, type IWithChildren } from '../types';
import { useInitialiseSection } from 'hooks';
interface IActiveLinkContext {
  activatedLink: string;
  setActivatedLink: (path: string) => void;
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

  const { sections, sectionRefs, initialiseSections } = useInitialiseSection();

  // const handleScroll = useCallback(() => {
  //   // console.log('handleScroll');
  //   if (window.scrollY === 0 && pathname === Paths.Main) {
  //     setActivatedLink(pathname as Paths);
  //     window.history.pushState(null, '', pathname);
  //   }
  // }, [pathname]);

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [handleScroll, pathname]);
  const updateScrollWithButtonState = (isScrolling: boolean) => {
    setIsScrollingWithButton(isScrolling);
  };

  const handleSectionIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      console.log('handleSectionIntersection');

      if (isNavigating.current || isScrollingWithButton) return;

      entries.forEach((entry) => {
        // console.log('sectionRefs', sectionRefs);
        // console.log('entry', entry);
        // console.log('entry.isIntersecting', entry.isIntersecting);
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id && sections?.current) {
            const section = sections.current.find((section) => section.id === id);
            if (section && activatedLink !== section.path) {
              if (section.path === '/') {
                router.push('/', { scroll: false });
              } else {
                router.push(`#${section.id}`, { scroll: false });
              }

              setActivatedLink(section.path);
            }
          }
        }
      });
    },
    [isScrollingWithButton, sections, activatedLink, router],
  );

  // useEffect(() => {
  //   initialiseSections();
  // }, [initialiseSections]);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const initialiseAndObserve = () => {
      if (pathname === Paths.Main) {
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

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      sectionRefs.current.forEach((ref) => {
        if (ref) observer?.unobserve(ref);
      });
    };
  }, [pathname, handleSectionIntersection, sectionRefs, initialiseSections]);

  const handleActivateLink = (path: string) => {
    
    isNavigating.current = true;
    setActivatedLink(path);

    // const sectionId = path.split('#')[1];
    // const section = sections.current.find((section) => section.id === sectionId);

    // isNavigating.current = true;

    // if (section) {
    //   setActivatedLink(section.path);
    // } else {
    //   if (activatedLink !== path) {
    //     setActivatedLink(path);
    //   }
    // }

    const navigationTimerId = setTimeout(() => {
      isNavigating.current = false;
    }, 1500);

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
