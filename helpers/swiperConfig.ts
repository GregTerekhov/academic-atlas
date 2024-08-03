import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';

import { IBreakpoints } from 'types';

export const swiperModules = [Autoplay];

export const feedbackBreakpoints: IBreakpoints = {
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

export const swiperConfig = {
  autoplay: { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true },
  centeredSlides: true,
  grabCursor: true,
  edgeSwipeThreshold: 0,
  initialSlide: 0,
  lazyPreloadPrevNext: 1,
  loop: true,
  longSwipes: false,
  mousewheel: { invert: true },
  slideToClickedSlide: true,
  watchSlidesProgress: true,
};

export const swiperEventHandlers = (swiper: Swiper) => {
  swiper.on('touchStart', function () {
    swiper.autoplay.pause();
  });
  swiper.on('touchEnd', function () {
    swiper.autoplay.resume();
  });
};
