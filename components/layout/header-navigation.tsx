'use client';

import Link from 'next/link';

import { ButtonType, MenuLinks, PositionInLayout } from 'types';

import { usePopup } from 'context';
import { getHeaderLinks } from 'helpers';

import CalculationModalTrigger from './calculation-modal-trigger';

interface INavigationProps {
  isDesktop?: boolean;
}

export default function Navigation({ isDesktop }: INavigationProps) {
  const { togglePopup } = usePopup();

  const headerLinks = getHeaderLinks();

  const adaptedLinks = isDesktop
    ? headerLinks.filter((link) => link.label !== MenuLinks.Promotions)
    : headerLinks;

  return (
    <nav>
      <ul className='max-lg:space-y-6 lg:flex lg:gap-x-8'>
        {Array.isArray(adaptedLinks) &&
          adaptedLinks.map(({ path, label }) => (
            <li key={label}>
              {isDesktop ? (
                <Link
                  href={path}
                  className='hidden text-medium hocus:text-accentPrimary dark:text-whiteBase dark:hocus:text-accentPrimary md:text-big lg:inline-block'
                >
                  {label}
                </Link>
              ) : (
                <button
                  type={ButtonType.Button}
                  onClick={togglePopup}
                  className='hidden max-lg:block'
                >
                  <Link
                    href={path}
                    className='text-medium hocus:text-accentPrimary dark:text-whiteBase dark:hocus:text-accentPrimary md:text-big'
                  >
                    {label}
                  </Link>
                </button>
              )}
            </li>
          ))}
        <li className='hidden dark:text-whiteBase max-lg:block'>
          <CalculationModalTrigger position={PositionInLayout.Header} />
        </li>
      </ul>
    </nav>
  );
}
