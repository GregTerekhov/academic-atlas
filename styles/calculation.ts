export const getThemeInputStyles = (hasBackground: boolean) => {
  const hasThemeValueClass = hasBackground
    ? 'border-none bg-accent-lightGradient text-base font-bold text-whiteBase dark:bg-accent-darkGradient md:text-medium lg:text-lg'
    : 'border-accentPrimary text-sm text-darkBase dark:border-accentSecondary-darker dark:bg-darkBase dark:text-whiteBase max-md:leading-130 md:text-base lg:text-big';

  return `h-10 w-full rounded-lg border bg-whiteBase px-2 py-[11px] caret-accentPrimary placeholder-shown:text-darkBase focus:outline-none focus:border-none focus:ring-[2px] focus:ring-accentPrimary dark:caret-accentSecondary placeholder-shown:dark:text-whiteBase dark:focus:ring-accentSecondary md:h-12 md:px-4 ${hasThemeValueClass}`;
};

export const getCheckboxStyles = (isChecked: boolean) => {
  return `${isChecked ? 'bg-accent-lightGradient dark:bg-accent-darkGradient' : 'bg-transparent'} flex size-10 items-center justify-center gap-x-4 rounded border border-accentPrimary dark:border-accentSecondary-darker`;
};

export const getResultPriceStyles = () => {
  return 'mb-8 text-center font-philosopher text-4xl text-darkBase dark:text-whiteBase md:mb-10 md:text-5xl lg:text-7xl';
};

export const getDisclaimerTextStyles = () => {
  return 'generalText mb-8 flex max-w-[550px] items-center justify-center text-center text-darkBase dark:text-whiteBase';
};

export const getDisclaimerCtaTextStyles = () => {
  return 'lg:text-bg mb-8 text-center text-sm text-darkBase dark:text-whiteBase max-md:leading-130 md:mb-10 md:text-medium';
};

export const getDisabledRangeStyles = (isChecked: boolean) => {
  return !isChecked ? 'text-disabled-foreground' : 'text-darkBase dark:text-whiteBase';
};
