'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { AriaLabel, PositionInLayout } from 'types';
import { useActiveLink } from 'context';
import { getAdaptedLinks } from 'data';
import { getMenuAriaCurrent, mapArray } from 'helpers';

import CalculationLinkMobile from './calculation-link-mobile';

import { getNavigationLinkStyles } from 'styles';

export default function Navigation() {
  const { activatedLink, handleActivateLink } = useActiveLink();
  const pathname = usePathname();

  const adaptedLinks = getAdaptedLinks();

  return (
    <nav aria-label={AriaLabel.Navigation}>
      <ul className='max-lg:space-y-6 lg:flex lg:gap-x-8'>
        {mapArray(adaptedLinks, ({ path, label }) => {
          const isActive = path === activatedLink;
          const ariaCurrent = getMenuAriaCurrent(path, pathname, isActive);
          const linkClass = getNavigationLinkStyles(isActive);

          // type pathAsType = '/' | '/faq' | '/offer' | '/partnership';
          // const altPath: pathAsType = '/partnership';

          return (
            <li key={label}>
              <Link
                href={`/faq`}
                scroll={true}
                onClick={() => {
                  handleActivateLink(path);
                }}
                aria-current={ariaCurrent}
                className={linkClass}
              >
                {label}
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
