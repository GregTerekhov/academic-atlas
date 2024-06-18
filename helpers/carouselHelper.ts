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
