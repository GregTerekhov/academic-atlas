'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { ButtonType, MenuLinks, Paths, PositionInLayout } from 'types';

import { useMenu } from 'context';
import { getAdaptedLinks, getMenuAriaCurrent, mapArray } from 'helpers';
import { useActiveLink } from 'hooks';

import CalculationModalTrigger from './calculation-modal-trigger';
import { useEffect, useState } from 'react';

interface INavigationProps {
  isDesktop?: boolean;
}
export default function Navigation({ isDesktop }: INavigationProps) {
  const [currentHash, setCurrentHash] = useState('');
  const { isNavMenuOpen, toggleNavMenu } = useMenu();
  const pathname = usePathname();
  const router = useRouter();

  const { activeLink, setActiveLink } = useActiveLink(isDesktop ?? false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentHash(window.location.hash);
    }
  }, [pathname]);

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
    <nav aria-label='Основне меню'>
      <ul className='max-lg:space-y-6 lg:flex lg:gap-x-8'>
        {mapArray(adaptedLinks, ({ path, label }) => {
          const isActive = activeLink === path || (pathname === Paths.Main && currentHash === path);
          return (
            <li key={label}>
              <Link
                href={path}
                onClick={(e) => handleLinkClick(e, label, path)}
                aria-current={getMenuAriaCurrent(path, pathname, isActive)}
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
