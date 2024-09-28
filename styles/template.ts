import { BACKGROUNDS, SectionTitle } from '../types';

export const getMobileMenuContainerStyles = (isOpen: boolean) => {
  const openState = isOpen ? 'left-0' : '-left-full';

  return `${openState} fixed top-20 z-40 h-full w-full overflow-auto bg-whiteBase bg-background-light-gradient pb-52 pt-10 transition-[left] duration-500 before:fixed before:left-0 before:top-0 before:w-full before:content-[""] dark:bg-background-dark-gradient md:top-24 max-h-mobileMenu md:max-h-tabletMenu`;
};

export const getSectionClasses = (title: SectionTitle) => {
  return BACKGROUNDS[title]
    ? `overflow-hidden text-whiteBase`
    : `bg-transparent text-darkBase dark:text-whiteBase`;
};

export const getExtraSectionOverlayStyles = () => {
  return 'absolute inset-0 h-full w-full bg-accentPrimary/10 bg-section-overlay-light dark:bg-accentPrimary/5 dark:bg-section-overlay-dark';
};

export const getTitleClasses = (
  isBigTitle: boolean,
  hasCtaText: boolean,
  titleStyle: string = '',
  noAlignment: string = '',
) => {
  const ctaClass = hasCtaText
    ? 'mb-4 md:mb-6 lg:mb-8'
    : !isBigTitle && !titleStyle.includes('no-margin')
      ? 'mb-8 md:mb-10 lg:mb-[72px]'
      : '';
  const customBigTitleClass = isBigTitle ? titleStyle : '';

  return `${ctaClass} ${noAlignment} ${customBigTitleClass}`.trim();
};

export const getCtaTextStyles = (textStyle: string | undefined) => {
  const marginClass =
    textStyle && textStyle.includes('no-margin') ? 'max-md:mb-6' : 'mb-6 md:mb-8 lg:mb-16';
  return `${textStyle ?? ''} ${marginClass} text-medium md:text-xl lg:text-2xl`;
};

export const getBackdropStyles = () => {
  return 'fixed left-0 top-0 z-50 py-10 flex h-full w-full items-center justify-center overflow-auto bg-disabled-background/50 transition-colors dark:bg-darkBase/75';
};

export const getModalContainerStyles = () => {
  return 'relative rounded-[20px] border-2 mt-16 border-solid border-accentPrimary bg-whiteBase bg-background-light-gradient p-14 dark:border-accentSecondary dark:bg-background-dark-gradient lg:w-[752px]';
};

export const getModalCloseIconStyles = () => {
  return 'fill-darkBase group-hover:fill-accentPrimary group-focus:fill-accentPrimary dark:fill-whiteBase dark:group-hover:fill-accentSecondary dark:group-focus:fill-accentSecondary';
};
