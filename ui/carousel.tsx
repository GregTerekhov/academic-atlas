'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import { type Breakpoints, type ISlide } from 'types';

import { CarouselFeedback } from 'components';

import 'swiper/css/bundle';

interface ICarouselProps<T extends ISlide> {
  slides: T[];
  breakpoints: Breakpoints;
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
      // url= //FIXME: --- додати значення для SSR
      // userAgent={} //FIXME: --- додати значення для SSR
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
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          {({ isActive }) => (
            <CarouselFeedback
              slide={slide}
              isActive={isActive}
            />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
