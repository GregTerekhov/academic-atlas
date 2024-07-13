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
