'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ButtonType, MenuLinks, Paths, PositionInLayout } from 'types';

import { useActiveLink, useMenu } from 'context';
import { getAdaptedLinks, mapArray } from 'helpers';

import CalculationModalTrigger from './calculation-modal-trigger';
import { useEffect } from 'react';

interface INavigationProps {
  isDesktop?: boolean;
}

export default function Navigation({ isDesktop }: INavigationProps) {
  const { isNavMenuOpen, toggleNavMenu } = useMenu();
  const pathname = usePathname();
  const { activeLink, setActiveLink } = useActiveLink();

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll<HTMLElement>('section');
      let foundActive = false;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (
          !foundActive &&
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        ) {
          const id = section.getAttribute('id');
          if (id) {
            setActiveLink(`${window.location.pathname}#${id}`);
            foundActive = true;
          }
        }
      });

      if (!foundActive) {
        setActiveLink(window.location.pathname);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, setActiveLink]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    label: MenuLinks,
    path: string,
  ) => {
    if (label === MenuLinks.Main && pathname === Paths.Main) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      setActiveLink(Paths.Main);
      window.history.pushState(null, '', '/');
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
                className={`${isActive ? 'text-accentSecondary' : 'dark:text-whiteBase'} text-medium hocus:text-accentSecondary dark:hocus:text-accentSecondary md:text-big`}
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
