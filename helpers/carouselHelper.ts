import { Breakpoints } from 'types';

export const feedbackBreakpoints: Breakpoints = {
  375: {
    slidesPerView: 1,
    spaceBetween: 14,
    centeredSlides: true,
    slidesOffsetAfter: 8,
    slidesOffsetBefore: 14,
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
      ? 'swiper-slide-active !w-[301px] border-2 border-accentPrimary bg-background-gradient p-4 max-md:!mr-0 md:!w-[436px] md:p-8 lg:!w-[496px] lg:p-12'
      : 'border border-accentSecondary md:!w-[320px] md:p-6 md:max-lg:blur-[1px] lg:!w-[336px] lg:p-8',
    imageContainerClass: isActive
      ? 'mb-4 size-[120px] md:mb-6 md:size-[160px]'
      : 'mb-4 size-[120px]',
    imageClass: isActive ? 'md:w-40' : 'md:w-[120px]',
    nameClass: isActive
      ? 'mb-6 text-medium md:mb-8 md:text-big lg:text-xl'
      : 'md:mb-4 md:text-base lg:mb-6 lg:text-medium',
    feedbackClass: isActive
      ? 'generalText min-h-[110px] md:mb-6 md:min-h-24 lg:min-h-[150px]'
      : 'max-lg:leading-130 md:text-sm md:max-lg:min-h-[91px] lg:text-base',
  };
};
