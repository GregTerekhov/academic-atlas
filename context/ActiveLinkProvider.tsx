'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

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
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, pathname]);

  const handleSectionIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (isNavigating.current) return;

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
    [sections, activatedLink, router],
  );

  // useEffect( () => {
  //   if (pathname === Paths.Main) {
  //     initialiseSections()
  //       .then(() => {
  //         const observer = new IntersectionObserver(handleSectionIntersection, {
  //           root: null,
  //           threshold: 0.3,
  //         });

  //         sectionRefs.current.forEach((ref) => {
  //           if (ref) observer.observe(ref);
  //         });
  //       })
  //       .catch((error) => {
  //         console.error('Failed to initialize sections:', error);
  //       });
  //   }
  // }, [pathname, handleSectionIntersection, sectionRefs, initialiseSections]);

  useEffect(() => {
    const initialiseAndObserve = async () => {
      if (pathname === Paths.Main) {
        try {
          await initialiseSections();

          const observer = new IntersectionObserver(handleSectionIntersection, {
            root: null,
            threshold: 0.3,
          });

          sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
          });
        } catch (error) {
          console.error('Failed to initialize sections:', error);
        }
      }
    };

    initialiseAndObserve();
  }, [pathname, handleSectionIntersection, sectionRefs, initialiseSections]);

  const handleActivateLink = async (path: string) => {
    const sectionId = path.split('#')[1];

    if (!sections.current || sectionRefs.current.length === 0) {
      try {
        await initialiseSections();
         await new Promise((resolve) => setTimeout(resolve, 200)); 
      } catch (error) {
        console.error('Failed to initialize sections before activating link:', error);
        return;
      }
    }

    const section = sections.current.find((section) => section.id === sectionId);
    isNavigating.current = true;

    if (section) {
      setActivatedLink(section.path);
      router.push(`#${section.id}`, { scroll: false });
      
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
