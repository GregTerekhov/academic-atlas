'use client';

import { useScrollController } from 'hooks/useScrollController';
import { ButtonType, IconName, IconSize } from 'types';

import { SvgIconUI } from 'ui';

export default function ScrollController() {
  const { buttonRef, isVisible } = useScrollController();

   const scrollToTop = () => {
     window.scrollTo({
       top: 0,
       behavior: 'smooth',
     });
   };
  
  return (
    <button
      ref={buttonRef}
      type={ButtonType.Button}
      aria-label='Scroll up button'
      onClick={scrollToTop}
      className={`${
        isVisible
          ? 'flex translate-y-0 opacity-100'
          : 'pointer-events-none flex translate-y-4 opacity-0'
      } right-10 size-10 bottom-4 z-10 hidden items-center justify-center rounded-full border border-accentPrimary bg-whiteBase/10 transition duration-500 ease-out md:flex lg:right-20 lg:size-16`}
    >
      <SvgIconUI
        id={IconName.Arrow}
        size={{ width: IconSize.HalfM, height: IconSize.HalfM }}
        className='fill-accentPrimary lg:size-9'
      />
    </button>
  );
}
