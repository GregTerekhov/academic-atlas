'use client';

import Link from 'next/link';

import { ButtonType, PositionInLayout } from 'types';

import { useMenu } from 'context';
import { getAdaptedLinks } from 'helpers';

import CalculationModalTrigger from './calculation-modal-trigger';

interface INavigationProps {
  isDesktop?: boolean;
}

export default function Navigation({ isDesktop }: INavigationProps) {
  const { isNavMenuOpen, toggleNavMenu } = useMenu();

  const adaptedLinks = getAdaptedLinks(isDesktop);

  return (
    <nav>
      <ul className='max-lg:space-y-6 lg:flex lg:gap-x-8'>
        {Array.isArray(adaptedLinks) &&
          adaptedLinks.map(({ path, label }) => (
            <li key={label}>
              <Link
                href={path}
                className='text-medium hocus:text-accentPrimary dark:text-whiteBase dark:hocus:text-accentPrimary md:text-big'
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
          ))}
        <li className='hidden dark:text-whiteBase max-lg:block'>
          <CalculationModalTrigger position={PositionInLayout.Header} />
        </li>
      </ul>
    </nav>
  );
}
