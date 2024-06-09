'use client';

import Link from 'next/link';

import { ILinks, MenuLinks, Paths } from 'types';

interface INavigationProps {
  isDesktop?: boolean;
}

export default function Navigation({ isDesktop }: INavigationProps) {
  const getHeaderLinks = (): ILinks[] => {
    return [
      {
        path: Paths.Main,
        label: MenuLinks.Main,
      },
      {
        path: Paths.Services,
        label: MenuLinks.Services,
      },
      {
        path: Paths.AboutUs,
        label: MenuLinks.AboutUs,
      },
      {
        path: Paths.Promotions,
        label: MenuLinks.Promotions,
      },
      {
        path: Paths.Feedback,
        label: MenuLinks.Feedback,
      },
      {
        path: { pathname: Paths.FAQ },
        label: MenuLinks.FAQ,
      },
      {
        path: { pathname: Paths.Partnership },
        label: MenuLinks.Partnership,
      },
    ];
  };

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
                className='text-medium hocus:text-accentPrimary md:text-big'
              >
                {label}
              </Link>
            </li>
          ))}
        <li className='hidden max-lg:block'>
          <button
            type='button'
            onClick={() => console.log('Розрахувати вартість')} //FIXME: -- replace it with togglePopup function from the custom hook
            className='text-medium hocus:text-accentPrimary md:text-big'
          >
            {MenuLinks.Cost}
          </button>
        </li>
      </ul>
    </nav>
  );
}
