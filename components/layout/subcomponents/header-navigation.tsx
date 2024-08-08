'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { AriaLabel, ButtonType, PositionInLayout } from 'types';
import { useMenu } from 'context';
import { getAdaptedLinks } from 'data';
import { getMenuAriaCurrent, mapArray } from 'helpers';
import { useActiveLink } from 'hooks';

import CalculationLinkMobile from './calculation-link-mobile';

import { getNavigationLinkStyles } from 'styles';
// import { useEffect } from 'react';

interface INavigationProps {
  isDesktop?: boolean;
}
export default function Navigation({ isDesktop }: INavigationProps) {
  const { isNavMenuOpen, toggleNavMenu } = useMenu();
  const pathname = usePathname();

  const { activeLink, handleLinkClick } = useActiveLink(isDesktop ?? false);

  // useEffect(() => {
  //   console.log('activeLink in useEffect: ', activeLink);
  // }, [activeLink]);

  const adaptedLinks = getAdaptedLinks(isDesktop);

  return (
    <nav aria-label={AriaLabel.Navigation}>
      <ul className='max-lg:space-y-6 lg:flex lg:gap-x-8'>
        {mapArray(adaptedLinks, ({ path, label }) => {
          const isActive = activeLink === path;
          const ariaCurrent = getMenuAriaCurrent(path, pathname, isActive);
          const linkClass = getNavigationLinkStyles(isActive);
          // const pageLinks = [Paths.Main, Paths.FAQ, Paths.Partnership].includes(path);

          return (
            <li key={label}>
              <Link
                href={path}
                // scroll={pageLinks}
                onClick={(e) => handleLinkClick(e, label, path)}
                aria-current={ariaCurrent}
                className={linkClass}
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
          <CalculationLinkMobile position={PositionInLayout.Header} />
        </li>
      </ul>
    </nav>
  );
}
