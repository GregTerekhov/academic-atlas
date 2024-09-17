'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { type IWithChildren } from '../types';
import { useInitialiseSection } from 'hooks';
import { useMenu } from './MenuProvider';

interface IActiveLinkContext {
  activatedLink: string;
  setActivatedLink: (path: string) => void;
  handleActivateLink: (path: string) => void;
  updateScrollWithButtonState: (isScrolling: boolean) => void;
}

const ActiveLinkContext = createContext<IActiveLinkContext | undefined>(undefined);

export const ActiveLinkProvider = ({ children }: IWithChildren) => {
  const pathname = usePathname();
  const router = useRouter();

  const [activatedLink, setActivatedLink] = useState<string>(pathname);
  const [isScrollingWithButton, setIsScrollingWithButton] = useState(false);
  const isNavigating = useRef<boolean>(false);

  const { isNavMenuOpen, toggleNavMenu } = useMenu();

  const { sections, sectionRefs, initialiseSections } = useInitialiseSection();

  const updateScrollWithButtonState = (isScrolling: boolean) => {
    setIsScrollingWithButton(isScrolling);
  };

  const handleSectionIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      console.log('IntersectionObserver entries:', entries);
      console.log('isNavigating.current', isNavigating.current);

      if (isNavigating.current || isScrollingWithButton) return;

      entries.forEach((entry) => {
        console.log(
          `IntersectionObserver for ${entry.target.id}: isIntersecting = ${entry.isIntersecting}`,
        );
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

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    
    const initialiseAndObserve = () => {
     
      initialiseSections();

      observer = new IntersectionObserver(handleSectionIntersection, {
        root: null,
        threshold: 0.7,
      });

      sectionRefs.current.forEach((ref, index) => {
        if (ref) {
          console.log(`Observing section ${index}: ${ref.id}`);
          observer?.observe(ref);
        } else {
          console.log(`Section ${index} is not found or undefined.`);
        }
      });
      // }
    };

   
    if (observer) {
      sectionRefs.current.forEach((ref, index) => {
        if (ref) {
          console.log(`Observing section ${index}: ${ref.id}`);
          observer?.observe(ref);
        }
      });
    }

    initialiseAndObserve();

    return () => {
      if (observer) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        sectionRefs.current.forEach((ref) => {
          console.log(`Unobserving section ${ref.id}`);
          if (ref) observer?.unobserve(ref);
        });
      }
     
    };
  }, [pathname, handleSectionIntersection, initialiseSections, sectionRefs]);

  const handleActivateLink = (path: string) => {
    console.log('handleActivateLink');

    isNavigating.current = true;
    setActivatedLink(path);

    if (isNavMenuOpen) toggleNavMenu();

    const navigationTimerId = setTimeout(() => {
      isNavigating.current = false;
    }, 500);

    return () => {
      clearTimeout(navigationTimerId);
    };
  };

  return (
    <ActiveLinkContext.Provider
      value={{
        activatedLink,
        setActivatedLink,
        handleActivateLink,
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
