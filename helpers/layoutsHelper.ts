import { AriaLabelTrigger, Paths } from '../types';

export const getAriaLabelContacts = (href: string, label: string): string => {
  if (href.startsWith('tel:')) {
    return `Call ${label}`;
  } else if (href.startsWith('mailto:')) {
    return `Email ${label}`;
  } else {
    return `Open link to ${label}`;
  }
};

export const getAriaLabelSwitcher = (
  isNavMenuOpen: boolean,
  isCalcMenuOpen: boolean,
): AriaLabelTrigger => {
  switch (true) {
    case isNavMenuOpen:
      return AriaLabelTrigger.CloseNavigation;
    case isCalcMenuOpen:
      return AriaLabelTrigger.CloseCalculation;

    default:
      return AriaLabelTrigger.Default;
  }
};

export const getMenuAriaCurrent = (path: Paths, pathname: string, isActive: boolean) => {
  return isActive
    ? pathname === Paths.Main && path.startsWith('#')
      ? 'location'
      : 'page'
    : undefined;
};

export const getScrollControllerStyles = (isVisible: boolean) => {
  const appearanceClass = isVisible ? 'opacity-100 md:flex' : 'hidden opacity-0';

  return `fixed bottom-4 right-10 z-10 ${appearanceClass} hidden size-10 items-center justify-center rounded-full border border-accentPrimary bg-whiteBase/10 backdrop-blur-sm transition-opacity hocus:bg-accentPrimary/10 dark:border-accentSecondary dark:hocus:bg-accentSecondary/30 lg:right-20 lg:size-16`;
};

export const getBackdropStyles = () => {
  return 'fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-auto bg-disabled-background/50 transition-colors dark:bg-darkBase/75';
};

export const getModalContainerStyles = () => {
  return 'relative rounded-[20px] border-2 border-solid border-accentPrimary bg-whiteBase bg-background-light-gradient p-14 dark:border-accentSecondary dark:bg-background-dark-gradient lg:w-[752px]';
};

export const getModalCloseIconStyles = () => {
  return 'fill-darkBase group-hover:fill-accentPrimary group-focus:fill-accentPrimary dark:fill-whiteBase dark:group-hover:fill-accentSecondary dark:group-focus:fill-accentSecondary';
};
