export const getServiceItemStyles = () => {
  return 'group blockItem relative w-full overflow-hidden bg-whiteBase/10 hocus:border-transparent hocus:outline-none hocus:ring-[2px] hocus:ring-accentSecondary max-md:h-[180px] md:h-[280px]';
};

export const getWorkTypeTitleStyles = () => {
  return 'text-balance text-medium text-whiteBase group-hover:underline max-sm:w-[108px] max-sm:text-base sm:max-md:w-[170px] md:mb-2 md:min-h-[100px] md:text-big lg:mb-4 lg:min-h-20 lg:text-lg';
};

export const getOverviewImageStyles = () => {
  return 'absolute left-1/2 top-0 hidden h-full w-full max-w-[232px] -translate-x-1/2 items-center justify-center bg-service-overview bg-cover bg-center bg-no-repeat opacity-50 dark:opacity-20 max-md:flex';
};

export const getFiguresTextStyles = (
  hideOnSmallScreen: boolean | undefined,
  hideOnLargeScreen: boolean | undefined,
  showOnLargeScreen: boolean | undefined,
) => {
  switch (true) {
    case hideOnSmallScreen:
      return 'hidden md:flex';
    case hideOnLargeScreen:
      return 'hidden max-lg:flex';
    case showOnLargeScreen:
      return 'hidden lg:flex';

    default:
      return 'flex';
  }
};

export const getCarouselFeedbackStyles = (isActive: boolean) => {
  return {
    slideClass: isActive
      ? 'swiper-slide-active max-sm:!w-[calc(100vw - 48px)] sm:!w-[301px] border-2 border-accentPrimary dark:border-accentSecondary bg-accentPrimary/10 md:max-lg:bg-whiteBase dark:bg-whiteBase/10 md:max-lg:dark:bg-background-dark-gradient md:max-lg:bg-background-light-gradient p-4 max-md:!mr-0 md:!w-[436px] md:p-8 lg:!w-[494px] lg:p-12'
      : 'border border-accentPrimary md:!w-[320px] p-3 md:p-6 md:max-lg:blur-[1px] lg:!w-[334px] lg:p-8',
    imageContainerClass: isActive
      ? 'md:mb-6 md:size-[160px] border-accentSecondary'
      : 'border-accentPrimary',
    imageClass: isActive ? 'size-[120px] md:size-40' : 'size-[120px]',
    nameClass: isActive
      ? 'max-sm:min-h-12 max-sm:mb-3 mb-6 text-base sm:text-medium md:mb-8 md:text-big lg:text-xl'
      : 'md:mb-4 md:text-base lg:mb-6 lg:text-medium mb-2',
    feedbackClass: isActive
      ? 'generalText max-sm:min-h-[132px] sm:min-h-[128px] md:mb-6 md:min-h-36 lg:min-h-[210px]'
      : 'max-lg:leading-130 max-sm:min-h-[132px] max-sm:text-xs text-sm md:max-lg:min-h-32 lg:text-base lg:min-h-48',
  };
};
