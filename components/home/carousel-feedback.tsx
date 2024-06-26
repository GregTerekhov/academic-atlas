import Image from 'next/image';

import { Slide } from 'types';

import { RatingIcons } from './subcomponents';

interface ICarouselFeedbackProps<T> {
  slide: T;
  isActive: boolean;
}

const TOTAL_ICONS = 5;

export default function CarouselFeedback<T extends Slide>({
  slide,
  isActive,
}: ICarouselFeedbackProps<T>) {
  const getRatingIcons = (rating: number) => {
    return Array.from({ length: TOTAL_ICONS }, (_, index) => (
      <RatingIcons
        key={index}
        index={index}
        rating={rating}
      />
    ));
  };

  return (
    <div
      className={`${isActive ? 'swiper-slide-active !w-[301px] border-2 border-accentPrimary bg-background-gradient p-4 max-md:!mr-0 md:!w-[436px] md:p-8 lg:!w-[496px] lg:p-12' : 'border border-accentSecondary md:!w-[320px] md:p-6 md:max-lg:blur-[1px] lg:!w-[336px] lg:p-8'} slide-content rounded-[18px]`}
    >
      <div
        className={`${isActive ? 'mb-4 size-[120px] md:mb-6 md:size-[160px]' : 'mb-4 size-[120px]'} mx-auto overflow-hidden rounded-full border-[3px] border-solid border-accentPrimary-darker`}
      >
        <Image
          src={slide.memberImage}
          alt={slide.memberAlt}
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
        className={`${isActive ? 'generalText min-h-[110px] md:mb-6 md:min-h-24 lg:min-h-[150px]' : 'max-lg:leading-130 md:text-sm md:max-lg:min-h-[91px] lg:text-base'} mb-4`}
      >
        {slide.memberFeedback}
      </p>
      <div className='flex items-center justify-center gap-x-4'>
        {getRatingIcons(slide.memberRating)}
      </div>
    </div>
  );
}
