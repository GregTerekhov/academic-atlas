'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import { type IBreakpoints, type ISlide } from 'types';

import { CarouselWrapper } from 'template';

import 'swiper/css/bundle';

interface ICarouselProps<T extends ISlide> {
  slides: T[];
  breakpoints: IBreakpoints;
}

export default function Carousel<T extends ISlide>({ slides, breakpoints }: ICarouselProps<T>) {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
      breakpoints={breakpoints}
      centeredSlides={true}
      grabCursor={true}
      edgeSwipeThreshold={0}
      initialSlide={0}
      lazyPreloadPrevNext={1}
      loop={true}
      longSwipes={false}
      mousewheel={{ invert: true }}
      slideToClickedSlide={true}
      watchSlidesProgress={true}
      onSwiper={(swiper) => {
        swiper.on('touchStart', function () {
          swiper.autoplay.pause();
        });
        swiper.on('touchEnd', function () {
          swiper.autoplay.resume();
        });
      }}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          {({ isActive }) => (
            <CarouselWrapper
              slide={slide}
              isActive={isActive}
            />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
