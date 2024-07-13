import { Breakpoints } from 'types';

export const feedbackBreakpoints: Breakpoints = {
  375: {
    slidesPerView: 1,
    spaceBetween: 16,
    centeredSlides: true,
    slidesOffsetAfter: 12,
    slidesOffsetBefore: 12,
  },
  768: {
    slidesPerView: 2,
    spaceBetween: -90,
    centeredSlides: true,
    slidesOffsetAfter: 60,
    slidesOffsetBefore: 50,
  },
  1440: {
    slidesPerView: 3,
    spaceBetween: 56,
    centeredSlides: true,
  },
};

export const getCarouselFeedbackStyles = (isActive: boolean) => {
  return {
    slideClass: isActive
      ? 'swiper-slide-active max-sm:!w-[calc(100vw - 48px)] sm:!w-[301px] border-2 border-accentPrimary dark:border-accentSecondary bg-accentPrimary/10 md:max-lg:bg-whiteBase dark:bg-whiteBase/10 md:max-lg:dark:bg-background-dark-gradient md:max-lg:bg-background-light-gradient p-4 max-md:!mr-0 md:!w-[436px] md:p-8 lg:!w-[496px] lg:p-12'
      : 'border border-accentPrimary md:!w-[320px] p-3 md:p-6 md:max-lg:blur-[1px] lg:!w-[336px] lg:p-8',
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
