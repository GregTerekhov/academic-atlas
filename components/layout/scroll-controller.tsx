'use client';

import { useScrollController } from 'hooks';
import { ButtonType, IconName, IconSize } from 'types';

import { SvgIconUI } from 'ui';

export default function ScrollController() {
  const { buttonRef, isVisible, scrollToTop } = useScrollController();

  return (
    <button
      ref={buttonRef}
      type={ButtonType.Button}
      aria-label='Кнопка плавного скролу сторінки до верху'
      onClick={scrollToTop}
      className={`fixed bottom-4 right-10 z-10 ${isVisible ? 'opacity-100 md:flex' : 'hidden opacity-0'} hidden size-10 items-center justify-center rounded-full border border-accentPrimary bg-whiteBase/10 backdrop-blur-sm transition-opacity hocus:bg-accentPrimary/10 dark:border-accentSecondary dark:hocus:bg-accentSecondary/30 lg:right-20 lg:size-16`}
    >
      <SvgIconUI
        id={IconName.Arrow}
        size={{ width: IconSize.HalfM, height: IconSize.HalfM }}
        className='fill-accentPrimary dark:fill-accentSecondary lg:size-9'
        ariaHidden={false}
        ariaLabel='Стрілка доверху'
      />
    </button>
  );
}
