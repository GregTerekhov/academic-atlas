'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { Paths, type IWithChildren } from '../types';
import { useInitialiseSection } from 'hooks';
import { useMenu } from './MenuProvider';
interface IActiveLinkContext {
  activatedLink: string;
  isScrollingWithButton: boolean;
  handleActivateLink: (path: string) => void;
  updateScrollWithButtonState: (isScrolling: boolean) => void;
  updateActiveLink: (path: string) => void;
}

const ActiveLinkContext = createContext<IActiveLinkContext | undefined>(undefined);

export const ActiveLinkProvider = ({ children }: IWithChildren) => {
  const pathname = usePathname();
  const router = useRouter();

  const [activatedLink, setActivatedLink] = useState<string>(pathname);
  const [isScrollingWithButton, setIsScrollingWithButton] = useState(false);
  const isNavigating = useRef<boolean>(false);
  const navigationTimerId = useRef<NodeJS.Timeout | null>(null);

  const { isNavMenuOpen, toggleNavMenu } = useMenu();

  const { sections, sectionRefs, initialiseSections } = useInitialiseSection();

  const updateScrollWithButtonState = (isScrolling: boolean) => {
    setIsScrollingWithButton(isScrolling);
  };

  const handleSectionIntersecting = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (isNavigating.current || isScrollingWithButton) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id && sections?.current) {
            const section = sections.current.find((section) => section.id === id);
            if (section && activatedLink !== section.path) {
              if (section.path === Paths.Main) {
                router.push(Paths.Main, { scroll: false });
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
      if (pathname === Paths.Main) {
        initialiseSections();

        observer = new IntersectionObserver(handleSectionIntersecting, {
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
      observer?.disconnect();
    };
  }, [pathname, handleSectionIntersecting, sectionRefs, initialiseSections]);

  const handleActivateLink = async (path: string) => {
    isNavigating.current = true;
    setActivatedLink(path);

    if (isNavMenuOpen) toggleNavMenu();

    if (navigationTimerId.current) {
      clearTimeout(navigationTimerId.current);
    }

    if ((path.includes('#') || path === Paths.Main) && pathname !== Paths.Main) {
      await initialiseSections();
    }

    navigationTimerId.current = setTimeout(() => {
      isNavigating.current = false;
    }, 1500);
  };

  const updateActiveLink = (path: string) => {
    setActivatedLink(path);
  };

  return (
    <ActiveLinkContext.Provider
      value={{
        activatedLink,
        isScrollingWithButton,
        handleActivateLink,
        updateScrollWithButtonState,
        updateActiveLink,
      }}
    >
      {children}
    </ActiveLinkContext.Provider>
  );
};

export const useActiveLink = () => {
  const context = useContext(ActiveLinkContext);
  if (context === undefined) {
    throw new Error('useActiveLink must be used within an ActiveLinkProvider');
  }
  return context;
};
