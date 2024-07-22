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
      grabCursor={true}
      initialSlide={0}
      loop={true}
      longSwipes={false}
      edgeSwipeThreshold={0}
      mousewheel={{ invert: true }}
      slideToClickedSlide={true}
      watchSlidesProgress={true}
      autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
      breakpoints={breakpoints}
      lazyPreloadPrevNext={1}
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
