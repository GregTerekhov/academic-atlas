'use client';

import { useEffect, useState } from 'react';
import { ButtonType, IconName, IconSize } from 'types';

import { SvgIconUI } from 'ui';

export default function ScrollController() {
  const [isVisible, setIsVisible] = useState(false);
  const [bottomOffset, setBottomOffset] = useState('16px');

  const toggleVisibility = () => {
    const footer = document.querySelector('footer');

    if (footer) {
      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const distanceToFooter = footerRect.top - windowHeight;

      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      if (distanceToFooter < 0) {
        if (window.innerWidth >= 1440) {
          setBottomOffset(`${16 - distanceToFooter}px`);
        } else {
          setBottomOffset(`${48 - distanceToFooter}px`);
        }
      } else {
        setBottomOffset(window.innerWidth >= 1024 ? '16px' : '48px');
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      type={ButtonType.Button}
      aria-label='Scroll up button'
      onClick={scrollToTop}
      className={`${
        isVisible
          ? 'fixed bottom-4 right-10 flex translate-y-0 opacity-100'
          : 'pointer-events-none fixed bottom-4 right-10 flex translate-y-4 opacity-0'
      } hidden size-10 items-center justify-center rounded-full border border-accentPrimary bg-whiteBase/10 transition duration-500 ease-out md:flex lg:right-20 lg:size-16`}
      style={{ bottom: bottomOffset }}
    >
      <SvgIconUI
        id={IconName.Arrow}
        size={{ width: IconSize.HalfM, height: IconSize.HalfM }}
        className='fill-accentPrimary lg:size-9'
      />
    </button>
  );
}
