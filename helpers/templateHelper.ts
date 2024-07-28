export const getBackdropStyles = () => {
  return 'fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-auto bg-disabled-background/50 transition-colors dark:bg-darkBase/75';
};

export const getModalContainerStyles = () => {
  return 'relative rounded-[20px] border-2 border-solid border-accentPrimary bg-whiteBase bg-background-light-gradient p-14 dark:border-accentSecondary dark:bg-background-dark-gradient lg:w-[752px]';
};

export const getModalCloseIconStyles = () => {
  return 'fill-darkBase group-hover:fill-accentPrimary group-focus:fill-accentPrimary dark:fill-whiteBase dark:group-hover:fill-accentSecondary dark:group-focus:fill-accentSecondary';
};
