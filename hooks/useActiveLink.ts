'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { debounce } from 'lodash';

import { MenuLinks, Paths } from '../types';
import { useIntersectionObserver } from './useIntersectionObserver';
import { useInitialiseSection } from './useInitialiseSection';

export const useActiveLink = (isDesktop: boolean) => {
  const pathname = usePathname();
  const router = useRouter();

  const [activeLink, setActiveLink] = useState<string>(pathname);

  const { sections, sectionRefs, initialiseSections } = useInitialiseSection(isDesktop);

  const updateActiveLink = useCallback(() => {
    const legalPagesPaths = pathname === Paths.Offer || pathname === Paths.Policy;

    if (!legalPagesPaths) {
      const hash = window.location.hash;

      if (hash) {
        setActiveLink(hash);
      } else {
        setActiveLink(pathname as Paths);
      }
    } else {
      setActiveLink('');
    }
  }, [pathname]);

  useEffect(() => {
    initialiseSections();
    updateActiveLink();

    const handleScroll = debounce(() => {
      if (window.scrollY === 0 && pathname === Paths.Main) {
        setActiveLink(pathname as Paths);
        window.history.pushState(null, '', pathname);
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [initialiseSections, pathname, updateActiveLink]);

  const handleIntersection = debounce((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        if (id) {
          const section = sections.current.find((section) => section.id === id);
          if (section) {
            setActiveLink(section.path);
          }
        }
      }
    });
  }, 400);

  useIntersectionObserver(sectionRefs.current, { root: null, threshold: 0.5 }, handleIntersection);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    label: MenuLinks,
    path: Paths,
  ) => {
    const isMainSection = [MenuLinks.Services, MenuLinks.AboutUs, MenuLinks.Feedback].includes(
      label,
    );

    if (pathname === Paths.Main) {
      if (label === MenuLinks.Main) {
        e.preventDefault();

        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });

        setActiveLink(Paths.Main);
        router.push(Paths.Main);
      } else if (isMainSection && activeLink !== path) {
        setActiveLink(path);
      }
    } else {
      setActiveLink(path);
    }
  };

  return { activeLink, handleLinkClick };
};
