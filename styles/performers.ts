export const getHeroSectionStyles = () => {
  return 'backgroundSection text-darkBase dark:text-whiteBase max-md:bg-partnership-hero-light max-md:py-20 dark:max-md:bg-partnership-hero-dark md:pt-16 lg:pt-[104px]';
};

export const getHeroOverlayStyles = () => {
  return 'absolute inset-0 h-full w-full bg-accentPrimary/10 dark:bg-accentPrimary/5 dark:bg-section-overlay-dark md:hidden';
};

export const getAboutUsImageStyles = () => {
  return 'relative overflow-hidden rounded-lg bg-cover before:absolute before:left-0 before:top-0 before:h-full before:w-full before:bg-accentPrimary/10 before:content-[""] lg:w-[512px]';
};

export const getFigureWrapperStyles = () => {
  return "relative flex min-w-[45px] items-center justify-center after:absolute after:right-0 after:top-0 after:h-full after:w-px after:bg-accent-lightGradient after:content-[''] dark:after:bg-accent-darkGradient md:min-w-[50px] lg:min-w-[68px]";
};

export const getBenefitItemStyles = () => {
  return 'blockItem bg-whiteBase/10 p-4 max-md:flex max-md:items-center max-md:gap-x-6 md:basis-1/3 md:space-y-6 md:text-center lg:space-y-8 lg:p-6';
};

export const getRequirementsItemStyles = () => {
  return 'blockItem space-y-2 p-4 backdrop-blur-lg dark:bg-whiteBase/10 md:max-lg:space-y-4 lg:basis-1/3 lg:p-6';
};

export const getRequirementsTitleStyles = () => {
  return 'text-medium font-bold text-whiteBase dark:text-accentSecondary max-sm:text-base md:text-big lg:text-xl';
};

export const getWorkflowBackgroundTabletStyles = () => {
  return 'absolute left-1/2 top-20 -z-10 hidden -translate-x-1/2 fill-accentPrimary/50 dark:fill-accentSecondary/50 md:max-lg:block';
};

export const getWorkflowBackgroundDesktopStyles = () => {
  return 'absolute -z-10 fill-accentPrimary/50 dark:fill-accentSecondary/50 max-lg:hidden md:left-1/2 md:top-[136px] md:-translate-x-1/2';
};
