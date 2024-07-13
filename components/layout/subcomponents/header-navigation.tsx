'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ButtonType, MenuLinks, Paths, PositionInLayout } from 'types';

import { useMenu } from 'context';
import { getAdaptedLinks, mapArray } from 'helpers';

import CalculationModalTrigger from './calculation-modal-trigger';
import { useEffect, useState } from 'react';

interface INavigationProps {
  isDesktop?: boolean;
}

export default function Navigation({ isDesktop }: INavigationProps) {
  const { isNavMenuOpen, toggleNavMenu } = useMenu();
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState<string>(pathname);

  useEffect(() => {
    setActiveLink(pathname + window.location.hash);
  }, [pathname]);

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
          console.log(`activeLink: ${activeLink}, path: ${path}, isActive: ${isActive}`);
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
