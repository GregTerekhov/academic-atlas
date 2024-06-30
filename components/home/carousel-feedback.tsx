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

  const { imageAlt, imageSrc, title, description, memberRating } = slide;
  const { slideClass, imageContainerClass, imageClass, nameClass, feedbackClass } =
    getCarouselFeedbackStyles(isActive);

  return (
    <div className={`${slideClass} rounded-[18px]`}>
      <div
        className={`${imageContainerClass} mx-auto overflow-hidden rounded-full border-[3px] border-solid border-accentPrimary-darker`}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={120}
          height={120}
          className={imageClass}
          priority={false}
        />
      </div>
      <p className={`${nameClass} text-center`}>{title}</p>
      <p className={`${feedbackClass} mb-4`}>{description}</p>
      <div className='flex items-center justify-center gap-x-4'>{getRatingIcons(memberRating)}</div>
    </div>
  );
}
