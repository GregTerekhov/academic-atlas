import { PositionInLayout } from '../types';

export const getHeaderStyles = () => {
  return 'fixed left-0 top-0 z-30 max-h-20 w-screen border-b-[0.5px] border-accentPrimary bg-whiteBase bg-background-light-gradient py-2 dark:bg-background-dark-gradient md:max-h-24 md:py-4 lg:max-h-28';
};

export const getNavigationLinkStyles = (isActive: boolean) => {
  const linkClass = isActive
    ? 'text-accentPrimary dark:text-accentSecondary'
    : 'dark:text-whiteBase';

  return `${linkClass} text-medium hocus:text-accentPrimary dark:hocus:text-accentSecondary md:text-big`;
};

export const getContactListStyles = (variant: PositionInLayout) => {
  //FIXME: use this function
  return variant === PositionInLayout.Header
    ? 'block max-lg:space-y-6 lg:flex lg:flex-row-reverse lg:gap-x-5'
    : 'max-md:flex max-md:items-center max-sm:gap-x-3 max-md:gap-x-4 md:space-y-4 lg:w-[304px]';
};

export const getScrollControllerStyles = (isVisible: boolean) => {
  const appearanceClass = isVisible ? 'opacity-100 md:flex' : 'hidden opacity-0';

  return `fixed bottom-4 right-10 z-30 ${appearanceClass} hidden size-10 items-center justify-center rounded-full border border-accentPrimary bg-whiteBase/10 backdrop-blur-sm transition-opacity hocus:bg-accentPrimary/10 dark:border-accentSecondary dark:hocus:bg-accentSecondary/30 lg:right-20 lg:size-16`;
};

export const skeletonStyles = {
  section:
    'my-auto min-h-mobileScreen py-20 md:min-h-tabletScreen md:py-24 lg:min-h-desktopScreen lg:py-28',
  container:
    'flex h-full w-full items-center max-md:flex-col max-md:justify-center md:justify-between md:gap-6',
  line1: 'mb-5 h-8 md:mb-7 md:h-12 md:w-[396px] lg:mb-9 lg:h-[60px] lg:w-[546px]',
  line2: 'mb-4 h-8 md:mb-6 md:h-12 md:w-[440px] lg:mb-8 lg:h-[60px] lg:w-[546px]',
  line3: 'mb-[18px] h-[18px] md:mb-6 md:h-6 md:w-96 lg:mb-7 lg:h-7 lg:w-[470px]',
  line4: 'mb-6 h-[18px] md:mb-8 md:h-6 md:w-96 lg:mb-16 lg:h-7 lg:w-[470px]',
  line5: 'h-16 md:w-60 lg:w-80',
  block:
    'hidden size-64 rounded-3xl bg-accentPrimary/20 dark:bg-whiteBase/20 md:block lg:size-[536px]',
};
