'use client';

import { useScrollController } from 'hooks';
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
      className={`fixed bottom-4 right-10 z-10 ${isVisible ? 'opacity-100 md:flex' : 'hidden opacity-0'} hidden size-10 items-center justify-center rounded-full border border-accentPrimary bg-whiteBase/10 transition-opacity lg:right-20 lg:size-16`}
    >
      <SvgIconUI
        id={IconName.Arrow}
        size={{ width: IconSize.HalfM, height: IconSize.HalfM }}
        className='fill-accentPrimary lg:size-9'
      />
    </button>
  );
}
