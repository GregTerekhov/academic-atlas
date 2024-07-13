'use client';
import Link from 'next/link';

import { PositionInLayout } from 'types';

import { getFooterLinks, mapArray } from 'helpers';

import { CalculationModalTrigger } from './subcomponents';
import { useActiveLink } from 'context';
import { useEffect } from 'react';

export default function FooterMenu() {
  const footerMenuLinks = getFooterLinks();
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
  }, [setActiveLink]);

  return (
    <nav>
      <ul
        className='max-md:space-y-6 md:grid md:grid-cols-[200px_minmax(200px,_1fr)] md:grid-rows-4 md:gap-y-6 lg:grid-cols-[324px_minmax(324px,_1fr)] lg:gap-y-4'
        role='list'
      >
        <li>
          <CalculationModalTrigger position={PositionInLayout.Footer} />
        </li>
        {mapArray(footerMenuLinks, ({ path, label }) => (
          <li key={label}>
            <Link
              href={path}
              className={`generalText hocus:text-accentPrimary dark:hocus:text-accentSecondary ${activeLink === path ? 'text-accentSecondary' : ''}`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
