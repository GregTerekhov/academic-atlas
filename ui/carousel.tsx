'use client';

import { Swiper, SwiperSlide } from 'swiper/react';

import { type ISlide } from 'types';
import {
  feedbackBreakpoints,
  mapArray,
  swiperConfig,
  swiperEventHandlers,
  swiperModules,
} from 'helpers';

import { CarouselWrapper } from 'template';

import 'swiper/css/bundle';

interface ICarouselProps<T extends ISlide> {
  slides: T[];
}

export default function Carousel<T extends ISlide>({ slides }: ICarouselProps<T>) {
  return (
    <Swiper
      modules={swiperModules}
      breakpoints={feedbackBreakpoints}
      onSwiper={swiperEventHandlers}
      {...swiperConfig}
    >
      {mapArray(slides, (slide) => (
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
