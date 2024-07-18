'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { debounce } from 'lodash';

import { Paths } from '../types';
import { getAdaptedLinks } from 'helpers';
import { useIntersectionObserver } from './useIntersectionObserver';

export const useActiveLink = (isDesktop: boolean) => {
  const pathname = usePathname();

  const [activeLink, setActiveLink] = useState<string>(pathname);
  const sections = useRef<{ id: string; path: string }[]>([]);
  const sectionRefs = useRef<Element[]>([]);

  useEffect(() => {
    sectionRefs.current = Array.from(document.querySelectorAll('section[id]'));
    const adaptedLinks = getAdaptedLinks(isDesktop);
    sections.current = adaptedLinks.map(({ path, id }) => {
      return { id: id ?? '', path };
    });

    const updateActiveLink = () => {
      setActiveLink(window.location.pathname + window.location.hash);
    };

    updateActiveLink();

    const handleScroll = debounce(() => {
      if (window.scrollY === 0) {
        setActiveLink(pathname as Paths);
        window.history.pushState(null, '', pathname);
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);
    // window.addEventListener('hashchange', updateActiveLink); //FIXME: --- if all right, delete after texting
    // window.addEventListener('popstate', updateActiveLink); //FIXME: --- if all right, delete after texting

    return () => {
      window.removeEventListener('scroll', handleScroll);
      //   window.removeEventListener('hashchange', updateActiveLink); //FIXME: --- if all right, delete after texting
      //   window.removeEventListener('popstate', updateActiveLink); //FIXME: --- if all right, delete after texting
    };
  }, [pathname, isDesktop]);

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
  }, 800);

  useIntersectionObserver(sectionRefs.current, { root: null, threshold: 0.5 }, handleIntersection);

  return { activeLink, setActiveLink };
};
