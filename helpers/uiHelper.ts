export const getDropdownTriggerStyles = (isOptionSelected: boolean, isDropdownOpen: boolean) => {
  return `${isOptionSelected ? 'border-none bg-accent-lightGradient dark:bg-accent-darkGradient' : 'bg-none border-accentPrimary dark:border-accentSecondary-darker bg-whiteBase dark:bg-darkBase border'} flex h-10 w-full items-center justify-between border-solid px-2 hover:border-transparent dark:hover:border-transparent hocus:outline-none hocus:ring-[2px] hocus:ring-accentPrimary dark:hocus:ring-accentSecondary md:h-12 md:px-4 ${isDropdownOpen ? 'rounded-t-lg' : 'rounded-lg'}`;
};

export const getDropdownLabelStyles = (isOptionSelected: boolean) => {
  return isOptionSelected
    ? 'text-base font-bold text-whiteBase md:text-medium lg:text-lg'
    : 'text-sm max-md:leading-130 text-darkBase dark:text-whiteBase md:text-base lg:text-big';
};

export const getDropdownIconStyles = (isOptionSelected: boolean, isDropdownOpen: boolean) => {
  return `${isDropdownOpen ? 'rotate-180' : ''} ${isOptionSelected ? 'fill-whiteBase' : 'fill-darkBase dark:fill-whiteBase'}  transition-transform`;
};

export const getPrimaryButtonStyles = (isOnLightBackground?: boolean, isDisabled?: boolean) => {
  const buttonBackground = isOnLightBackground
    ? 'hocus:text-accentPrimary dark:hocus:text-whiteBase'
    : '';

  const checkedDisabledStyles = isDisabled
    ? 'bg-none text-whiteBase dark:text-disabled-foreground dark:bg-disabled-background/50 bg-disabled-foreground'
    : `${buttonBackground} bg-accent-lightGradient dark:bg-accent-darkGradient hocus:bg-none dark:hocus:bg-none dark:hocus:bg-whiteBase/10 hocus:bg-accentPrimary/10 hocus:outline-none hocus:ring-[2px] dark:hocus:ring-accentSecondary-darker hocus:ring-accentPrimary text-whiteBase`;

  return `${checkedDisabledStyles} flex items-center justify-center rounded-[20px] max-sm:text-medium text-big font-bold w-full md:w-80 lg:text-xl`;
};
