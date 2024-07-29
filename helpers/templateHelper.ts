export const getBackdropStyles = () => {
  return 'fixed left-0 top-0 z-50 py-10 flex h-full w-full items-center justify-center overflow-auto bg-disabled-background/50 transition-colors dark:bg-darkBase/75';
};

export const getModalContainerStyles = () => {
  return 'relative rounded-[20px] border-2 mt-16 border-solid border-accentPrimary bg-whiteBase bg-background-light-gradient p-14 dark:border-accentSecondary dark:bg-background-dark-gradient lg:w-[752px]';
};

export const getModalCloseIconStyles = () => {
  return 'fill-darkBase group-hover:fill-accentPrimary group-focus:fill-accentPrimary dark:fill-whiteBase dark:group-hover:fill-accentSecondary dark:group-focus:fill-accentSecondary';
};

export const getHeaderStyles = () => {
  return 'fixed left-0 top-0 z-30 max-h-20 w-screen border-b-[0.5px] border-accentPrimary bg-whiteBase bg-background-light-gradient py-2 dark:bg-background-dark-gradient md:max-h-24 md:py-4 lg:max-h-28';
};
