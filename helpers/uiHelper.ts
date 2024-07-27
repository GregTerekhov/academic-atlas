export const getDropdownTriggerStyles = (isOptionSelected: boolean, isDropdownOpen: boolean) => {
  const toggledSelectedStyles = isOptionSelected
    ? 'border-none bg-accent-lightGradient dark:bg-accent-darkGradient'
    : 'bg-none border-accentPrimary dark:border-accentSecondary-darker bg-whiteBase dark:bg-darkBase border';
  const toggledOpenedStyles = isDropdownOpen ? 'rounded-t-lg' : 'rounded-lg';

  return `${toggledSelectedStyles} ${toggledOpenedStyles} flex h-10 w-full items-center justify-between border-solid px-2 hover:border-transparent dark:hover:border-transparent hocus:outline-none hocus:ring-[2px] hocus:ring-accentPrimary dark:hocus:ring-accentSecondary md:h-12 md:px-4`;
};

export const getDropdownLabelStyles = (isOptionSelected: boolean) => {
  return isOptionSelected
    ? 'max-sm:text-sm max-sm:font-normal text-base font-bold text-whiteBase md:text-medium lg:text-lg text-left line-clamp-1'
    : 'text-sm max-md:leading-130 text-darkBase dark:text-whiteBase/60 md:text-base lg:text-big';
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

export const getAccordionTitleStyles = (isOpen: boolean) => {
  return `mr-2 flex-1 text-left group-hover:bg-accent-lightGradient group-hover:bg-clip-text group-hover:text-transparent dark:group-hover:bg-accent-darkGradient max-sm:text-medium ${
    isOpen ? 'bg-none text-accentPrimary dark:text-accentSecondary' : ''
  }`;
};

export const getAccordionExpandIconStyles = (isOpen: boolean) => {
  const isExpanded = isOpen
    ? 'rotate-180 transform fill-accentPrimary dark:fill-accentSecondary'
    : 'fill-darkBase dark:fill-whiteBase';

  return `${isExpanded} mx-auto transition-transform duration-200 group-hover:fill-accentPrimary-darker dark:group-hover:fill-accentSecondary-darker md:size-8`;
};

export const getDropdownBoxStyles = () => {
  return 'absolute z-10 max-h-[248px] w-full overflow-hidden rounded-b-lg bg-whiteBase bg-background-light-gradient ring-[2px] ring-accentPrimary dark:bg-background-dark-gradient dark:ring-accentSecondary lg:max-h-[314px]';
};

export const getDropdownOptionsListStyles = () => {
  return 'w-full space-y-6 rounded-b-lg bg-whiteBase bg-background-light-gradient p-4 text-sm dark:bg-background-dark-gradient max-md:leading-130 md:text-base lg:text-medium';
};
