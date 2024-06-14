'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image, { StaticImageData } from 'next/image';

import 'swiper/css/bundle';
import SvgIcon from './svg-icon';
import { IconName, IconSize } from 'types/ui';

type Slides = {
  memberName: string;
  memberFeedback: string;
  memberImage: StaticImageData;
  memberRating?: number;
  memberFeedbackDate?: Date;
};

interface ICarouselProps {
  slides: Slides[];
}

export default function Carousel({ slides }: ICarouselProps) {
  const breakpoints = {
    375: {
      slidesPerView: 1,
      spaceBetween: 14,
    },
    768: {
      slidesPerView: 2,
      centeredSlides: true,
      spaceBetween: 40,
    },
    1440: {
      slidesPerView: 3,
      centeredSlides: true,
      spaceBetween: 56,
    },
  };

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
      {slides.map((slide) => (
        <SwiperSlide key={slide.memberName}>
          {({ isActive }) => (
            <div
              className={`${isActive ? 'swiper-slide-active !w-[299px] border-2 border-accentPrimary p-4 md:!w-[432px] md:p-8 lg:!w-[496px] lg:p-12' : 'border border-accentSecondary md:!w-[320px] md:p-6 lg:!w-[336px] lg:p-8'} slide-content rounded-[18px] `}
            >
              <div
                className={`${isActive ? 'mb-4 size-[120px] md:mb-6 md:size-[160px]' : 'mb-4 size-[120px]'} mx-auto overflow-hidden rounded-full border-[3px] border-solid border-accentPrimary-darker`}
              >
                <Image
                  src={slide.memberImage}
                  alt={slide.memberName}
                  width={120}
                  height={120}
                  className={`${isActive ? 'md:w-40' : 'md:w-[120px]'}`}
                />
              </div>
              <p
                className={`${isActive ? 'mb-6 text-medium md:mb-8 md:text-big lg:text-xl' : 'md:mb-4 md:text-base lg:mb-6 lg:text-medium'} text-center`}
              >
                {slide.memberName}
              </p>
              <p
                className={`${isActive ? 'min-h-[108px] text-sm md:mb-6 md:min-h-24 md:text-base lg:min-h-[150px] lg:text-big' : 'md:text-sm lg:text-base'} mb-4 leading-130`}
              >
                {slide.memberFeedback}
              </p>
              <div className='flex items-center justify-center gap-x-4'>
                <SvgIcon
                  id={IconName.Rating}
                  className='fill-accentPrimary md:size-6'
                  size={{ width: IconSize.XXS, height: IconSize.XXS }}
                />
                <SvgIcon
                  id={IconName.Rating}
                  className='fill-accentPrimary md:size-6'
                  size={{ width: IconSize.XXS, height: IconSize.XXS }}
                />
                <SvgIcon
                  id={IconName.Rating}
                  className='fill-accentPrimary md:size-6'
                  size={{ width: IconSize.XXS, height: IconSize.XXS }}
                />
                <SvgIcon
                  id={IconName.Rating}
                  className='fill-accentPrimary md:size-6'
                  size={{ width: IconSize.XXS, height: IconSize.XXS }}
                />
                <SvgIcon
                  id={IconName.Rating}
                  className='fill-accentPrimary md:size-6'
                  size={{ width: IconSize.XXS, height: IconSize.XXS }}
                />
              </div>
            </div>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
