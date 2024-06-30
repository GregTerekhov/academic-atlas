'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ButtonType, MenuLinks, Paths, PositionInLayout } from 'types';

import { useMenu } from 'context';
import { getAdaptedLinks, mapArray } from 'helpers';

import CalculationModalTrigger from './calculation-modal-trigger';

interface INavigationProps {
  isDesktop?: boolean;
}

export default function Navigation({ isDesktop }: INavigationProps) {
  const { isNavMenuOpen, toggleNavMenu } = useMenu();
  const pathname = usePathname();

  const handleMainLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    label: MenuLinks,
  ) => {
    if (label === MenuLinks.Main && pathname === Paths.Main) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const adaptedLinks = getAdaptedLinks(isDesktop);

  return (
    <nav>
      <ul className='max-lg:space-y-6 lg:flex lg:gap-x-8'>
        {mapArray(adaptedLinks, ({ path, label }) => {
          const isActive = pathname === path;
          return (
            <li key={label}>
              <Link
                href={path}
                onClick={(e) => handleMainLinkClick(e, label)}
                className={`${isActive ? 'text-accentPrimary' : 'dark:text-whiteBase'} text-medium hocus:text-accentPrimary dark:hocus:text-accentPrimary md:text-big`}
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
