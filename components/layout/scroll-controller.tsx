'use client';

import { AriaLabel, ButtonType, IconName, IconSize } from 'types';
import { useScrollController } from 'hooks';

import { SvgIconUI } from 'ui';

import { getScrollControllerStyles } from 'styles';
import { useMenu } from 'context/MenuProvider';

export default function ScrollController() {
  const { buttonRef, isVisible, scrollToTop } = useScrollController();
  const { isNavMenuOpen, isCalcMenuOpen } = useMenu();

  const oneOfMenuIsOpen = isNavMenuOpen || isCalcMenuOpen;
  const triggerClass = getScrollControllerStyles(isVisible, oneOfMenuIsOpen);

  return (
    <button
      ref={buttonRef}
      type={ButtonType.Button}
      aria-label={AriaLabel.ScrollUp}
      onClick={scrollToTop}
      className={triggerClass}
    >
      <SvgIconUI
        id={IconName.Arrow}
        size={{ width: IconSize.HalfM, height: IconSize.HalfM }}
        className='fill-accentPrimary dark:fill-accentSecondary lg:size-9'
        ariaHidden={false}
        ariaLabel={AriaLabel.ScrollArrow}
      />
    </button>
  );
}
