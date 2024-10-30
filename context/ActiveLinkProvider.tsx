'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { Paths, type IWithChildren } from '../types';
import { useInitialiseSection } from 'hooks';
import { useMenu } from './MenuProvider';

interface IActiveLinkContext {
  activatedLink: string;
  isScrollingWithButton: boolean;
  handleActivateLink: (path: Paths) => void;
  updateScrollWithButtonState: (isScrolling: boolean) => void;
  updateActiveLink: (path: Paths) => void;
}

const ActiveLinkContext = createContext<IActiveLinkContext | undefined>(undefined);

const DESKTOP_THRESHOLD = 0.7;
const MOBILE_THRESHOLD = 0.4;
const SECTION_CHECK_INTERVAL = 200;
const NAVIGATION_DELAY = 1500;

export const ActiveLinkProvider = ({ children }: IWithChildren) => {
  const pathname = usePathname();
  const router = useRouter();

  const [activatedLink, setActivatedLink] = useState<string>(pathname);
  const [isScrollingWithButton, setIsScrollingWithButton] = useState(false);
  const [areSectionsReady, setAreSectionsReady] = useState(false);
  const [prevScrollTop, setPrevScrollTop] = useState<number>(0);

  const isNavigating = useRef<boolean>(false);
  const navigationTimerId = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sectionRefs = useRef<Element[]>([]);

  const { isNavMenuOpen, toggleNavMenu } = useMenu();

  const { sections, initialiseSections } = useInitialiseSection(
    sectionRefs.current,
    areSectionsReady,
  );

  const findSectionsInDOM = useCallback(() => {
    const checkSections = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const nodeList = document.querySelectorAll('section[id]');
      sectionRefs.current = Array.from(nodeList);

      if (sectionRefs.current.length > 1) {
        setAreSectionsReady(true);
      } else {
        timeoutRef.current = setTimeout(checkSections, SECTION_CHECK_INTERVAL);
      }
    };

    checkSections();
  }, []);

  useEffect(() => {
    if (pathname === Paths.Main) {
      findSectionsInDOM();
    }
  }, [pathname, findSectionsInDOM]);

  const handleSectionIntersecting = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const currentScrollTop = window.scrollY || document.documentElement.scrollTop;
      const isScrollingDown = currentScrollTop > prevScrollTop;

      setPrevScrollTop(currentScrollTop);

      if (isNavigating.current || isScrollingWithButton) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id && sections?.current) {
            const section = sections.current.find((section) => section.id === id);
            if (section && activatedLink !== section.path) {
              if (isScrollingDown && section.path === Paths.Main) {
                return;
              }

              if (!isScrollingDown && section.path === Paths.Services) {
                return;
              }

              if (section.path === Paths.Main && !section.path.includes('#')) {
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
    [prevScrollTop, isScrollingWithButton, sections, activatedLink, router],
  );

  useEffect(() => {
    let observer: IntersectionObserver | null = null;

    const initialiseAndObserve = () => {
      if (pathname === Paths.Main && areSectionsReady) {
        initialiseSections();

        const sections = sectionRefs.current as HTMLElement[];

        sections.forEach((section) => {
          if (section) {
            const sectionHeight = section.offsetHeight;
            const threshold =
              sectionHeight > window.innerHeight ? MOBILE_THRESHOLD : DESKTOP_THRESHOLD;

            observer = new IntersectionObserver(handleSectionIntersecting, {
              root: null,
              threshold,
            });

            sectionRefs.current.forEach((ref) => {
              if (ref) observer?.observe(ref);
            });
          }
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
  }, [pathname, initialiseSections, areSectionsReady, sectionRefs, handleSectionIntersecting]);

  const handleActivateLink = async (path: Paths) => {
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
    }, NAVIGATION_DELAY);
  };

  const updateScrollWithButtonState = (isScrolling: boolean) =>
    setIsScrollingWithButton(isScrolling);

  const updateActiveLink = (path: Paths) => setActivatedLink(path);

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
