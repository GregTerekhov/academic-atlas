import Image from 'next/image';

import { type ISlide } from 'types';
import { getCarouselFeedbackStyles } from 'helpers';

import { RatingIcons } from './subcomponents';

interface ICarouselFeedbackProps<T> {
  slide: T;
  isActive: boolean;
}

const TOTAL_ICONS = 5;

export default function CarouselFeedback<T extends ISlide>({
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

  const { slideClass, imageContainerClass, imageClass, nameClass, feedbackClass } =
    getCarouselFeedbackStyles(isActive);

  return (
    <div className={`${slideClass} rounded-[18px]`}>
      <div
        className={`${imageContainerClass} mx-auto overflow-hidden rounded-full border-[3px] border-solid border-accentPrimary-darker`}
      >
        <Image
          src={slide.memberImage}
          alt={slide.memberAlt}
          width={120}
          height={120}
          className={imageClass}
        />
      </div>
      <p className={`${nameClass} text-center`}>{slide.memberName}</p>
      <p className={`${feedbackClass} mb-4`}>{slide.memberFeedback}</p>
      <div className='flex items-center justify-center gap-x-4'>
        {getRatingIcons(slide.memberRating)}
      </div>
    </div>
  );
}
