'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { ButtonType, MenuLinks, Paths, PositionInLayout } from 'types';
import { useMenu } from 'context';
import { getAdaptedLinks, mapArray } from 'helpers';
import CalculationModalTrigger from './calculation-modal-trigger';
import { initMultiObserver } from 'helpers';

interface INavigationProps {
  isDesktop?: boolean;
}

export default function Navigation({ isDesktop }: INavigationProps) {
  const { isNavMenuOpen, toggleNavMenu } = useMenu();
  const pathname = usePathname();
  const router = useRouter();
  const [activeLink, setActiveLink] = useState<Paths | string>(Paths.Main);
  const observer = useRef<IntersectionObserver | null>(null);
  const sections = useRef<{ id: string; path: string }[]>([]);

  useEffect(() => {
    const updateActiveLink = () => {
      setActiveLink(window.location.pathname + window.location.hash);
    };

    updateActiveLink();

    const handleScroll = () => {
      if (window.scrollY === 0) {
        setActiveLink(pathname as Paths);
        window.history.pushState(null, '', pathname);
      }
    };

    observer.current = initMultiObserver(
      sections.current.map((section) => ({
        id: section.id,
        callback: (entry) => {
          if (entry.isIntersecting) {
            setActiveLink(section.path);
          }
        },
      })),
    );

    const adaptedLinks = getAdaptedLinks(isDesktop);
    sections.current = adaptedLinks.map(({ path }) => {
      const id = path.split('#')[1];
      return { id: id ?? '', path };
    });

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', updateActiveLink);
    window.addEventListener('popstate', updateActiveLink);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', updateActiveLink);
      window.removeEventListener('popstate', updateActiveLink);
    };
  }, [pathname, isDesktop]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    label: MenuLinks,
    path: Paths | string,
  ) => {
    if (label === MenuLinks.Main) {
      e.preventDefault();
      if (pathname !== Paths.Main) {
        router.push(Paths.Main);
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
        setActiveLink(Paths.Main);
        window.history.pushState(null, '', '/');
      }
    } else {
      setActiveLink(path);
    }
  };

  const adaptedLinks = getAdaptedLinks(isDesktop);

  return (
    <nav>
      <ul className='max-lg:space-y-6 lg:flex lg:gap-x-8'>
        {mapArray(adaptedLinks, ({ path, label }) => {
          const isActive = activeLink === path;
          return (
            <li key={label}>
              <Link
                href={path}
                onClick={(e) => handleLinkClick(e, label, path)}
                className={`${isActive ? 'text-accentPrimary dark:text-accentSecondary' : 'dark:text-whiteBase'} text-medium hocus:text-accentPrimary dark:hocus:text-accentSecondary md:text-big`}
              >
                {isNavMenuOpen ? (
                  <button
                    type={ButtonType.Button}
                    onClick={toggleNavMenu}
                  >
                    {label}
                  </button>
                ) : (
                  label
                )}
              </Link>
            </li>
          );
        })}
        <li className='hidden dark:text-whiteBase max-lg:block'>
          <CalculationModalTrigger position={PositionInLayout.Header} />
        </li>
      </ul>
    </nav>
  );
}
