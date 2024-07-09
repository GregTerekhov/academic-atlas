export const getDropdownTriggerStyles = (isOptionSelected: boolean, isDropdownOpen: boolean) => {
  return `${isOptionSelected ? 'border-none bg-accent-darkGradient' : 'border-accentSecondary-darker dark:bg-darkBase'} flex h-10 w-full items-center justify-between border border-solid px-2 hocus:border-transparent hocus:outline-none hocus:ring-[2px] hocus:ring-accentSecondary md:h-12 md:px-4 ${isDropdownOpen ? 'rounded-t-lg' : 'rounded-lg'}`;
};

export const getDropdownLabelStyles = (isOptionSelected: boolean) => {
  return isOptionSelected
    ? 'text-base font-bold text-whiteBase md:text-medium lg:text-lg'
    : 'text-sm text-darkBase dark:text-whiteBase max-md:leading-130 md:text-base lg:text-big';
};
