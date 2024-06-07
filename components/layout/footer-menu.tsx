'use client';

import Link from 'next/link';

import { getFooterLinks } from 'helpers';
import { useState } from 'react';

export default function FooterMenu() {
  const [isOpen, setIsOpen] = useState(false); //FIXME: --- replace this state with the call of togglePopup function from a custom hook

  const openModal = () => {
    //FIXME: --- delete this
    setIsOpen(!isOpen);
  };

  const footerMenuLinks = getFooterLinks(openModal); //FIXME: --- put your togglePopup function here

  return (
    <>
      <nav>
        <ul className='max-md:space-y-6 md:grid md:grid-cols-[226px_minmax(226px,_1fr)] md:grid-rows-4 md:gap-y-6 lg:grid-cols-[314px_minmax(314px,_1fr)] lg:gap-y-4'>
          {Array.isArray(footerMenuLinks) &&
            footerMenuLinks.map(({ path, label, onClick }) => (
              <li key={label}>
                {onClick ? (
                  <button
                    type='button'
                    onClick={onClick}
                  >
                    {label}
                  </button>
                ) : (
                  <Link
                    href={path!}
                    className='text-sm md:text-base lg:text-big'
                  >
                    {label}
                  </Link>
                )}
              </li>
            ))}
        </ul>
      </nav>
    </>
  );
}
