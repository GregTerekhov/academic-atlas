'use client';

import Link from 'next/link';

import { MenuLinks } from 'types';

import { getHeaderLinks } from 'helpers';

interface INavigationProps {
  isDesktop?: boolean;
}

export default function Navigation({ isDesktop }: INavigationProps) {
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
              <Link
                href={path}
                className='text-medium md:text-big'
              >
                {label}
              </Link>
            </li>
          ))}
        <li className='hidden max-lg:block'>
          <button
            type='button'
            onClick={() => console.log('Розрахувати вартість')} //FIXME: -- replace it with togglePopup function from the custom hook
            className='text-medium md:text-big'
          >
            {MenuLinks.Cost}
          </button>
        </li>
      </ul>
    </nav>
  );
}
