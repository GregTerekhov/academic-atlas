'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { debounce } from 'lodash';

import { MenuLinks, Paths } from '../types';
import { useIntersectionObserver } from './useIntersectionObserver';
import { useInitialiseSection } from './useInitialiseSection';
import { useInitialLink } from './useInitialLink';

export const useActiveLink = (isDesktop: boolean) => {
  const pathname = usePathname();
  const router = useRouter();

  const initialLink = useInitialLink();

  const defaultLink = initialLink ?? pathname;

  const [activeLink, setActiveLink] = useState<string>(defaultLink);

  const { sections, sectionRefs, initialiseSections } = useInitialiseSection(isDesktop);

  // const updateActiveLink = useCallback(() => {
  //   const legalPagesPaths = pathname === Paths.Offer || pathname === Paths.Policy;

  //   if (!legalPagesPaths) {
  //     const hash = window.location.hash;

  //     if (hash) {
  //       setActiveLink(hash);
  //     } else {
  //       setActiveLink(pathname as Paths);
  //     }
  //   } else {
  //     setActiveLink('');
  //   }
  // }, [pathname]);

  useEffect(() => {
    initialiseSections();
    // updateActiveLink();
    const legalPagesPaths = pathname === Paths.Offer || pathname === Paths.Policy;

    const updateActiveLink = () => {
      if (!legalPagesPaths) {
        const hash = window.location.hash;
        // if (!legalPagesPaths && typeof window !== 'undefined') {
        //   const hash = window.location.hash;

        if (initialLink) {
          // if (hash) {
          // setActiveLink(hash);
          // router.push(hash as Paths, { scroll: false });
          const sectionId = hash.replace('#', '');
          const section = document.getElementById(sectionId);

          if (section) {
            section.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'start',
            });
            setActiveLink(hash);
            router.push(`#${sectionId}`);
          }
        } else {
          setActiveLink(pathname as Paths);
        }
      } else {
        setActiveLink('');
      }
    };

    updateActiveLink();

    const handleScroll = () => {
      if (window.scrollY === 0 && pathname === Paths.Main) {
        setActiveLink(pathname as Paths);
        window.history.pushState(null, '', pathname);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [initialLink, initialiseSections, pathname, router]);

  const handleIntersection = debounce((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        if (id) {
          const section = sections.current.find((section) => section.id === id);
          if (section) {
            setActiveLink(section.path);
            const hash = window.location.hash;
            if (hash) {
              router.replace(`#${id}`, { scroll: false });
            }
          }
        }
      }
    });
  }, 400);

  useIntersectionObserver(sectionRefs.current, { root: null, threshold: 0.3 }, handleIntersection);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    label: MenuLinks,
    path: Paths,
  ) => {
    const isMainSection = [
      MenuLinks.Services,
      MenuLinks.AboutUs,
      MenuLinks.Promotions,
      MenuLinks.Feedback,
    ].includes(label);
    const isOtherPages = [MenuLinks.FAQ, MenuLinks.Partnership].includes(label);

    if (pathname === Paths.Main) {
      e.preventDefault();
      if (label === MenuLinks.Main) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });

        setActiveLink(Paths.Main);
        router.push(Paths.Main);
      } else if (isMainSection) {
        const sectionId = path.replace('/#', '');
        const section = document.getElementById(sectionId);

        if (section) {
          section.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'start',
          });
          setActiveLink(path);
          router.push(`#${sectionId}`);
        }
      } else if (isOtherPages) {
        router.push(path);
        setActiveLink(path);
      }
    } else {
      if (isOtherPages) {
        router.push(path);
        setActiveLink(path);
      } else if (isMainSection) {
        const sectionId = path.replace('/#', '');
        const section = document.getElementById(sectionId);
        console.log('path: ', path);

        if (section) {
          section.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'start',
          });
          setActiveLink(path);
          router.push(`#${sectionId}`);
        }
      }
    }
  };
  return { activeLink, handleLinkClick };
};
