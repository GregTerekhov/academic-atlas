import { type ISlide } from 'types';
import { getCarouselFeedbackStyles, slideImageSettings } from 'helpers';

import { RatingIcons } from './subcomponents';
import { ImageUI } from 'ui';

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

  const { width, height, className } = slideImageSettings;

  const { imageAlt, imageSrc, title, description, memberRating } = slide;
  const { slideClass, imageContainerClass, imageClass, nameClass, feedbackClass } =
    getCarouselFeedbackStyles(isActive, className);

  return (
    <div className={`${slideClass} rounded-[18px]`}>
      <div
        className={`${imageContainerClass} mx-auto overflow-hidden rounded-full border-[3px] border-solid dark:border-accentSecondary-darker`}
      >
        <ImageUI
          src={imageSrc}
          alt={imageAlt}
          width={width}
          height={height}
          className={imageClass}
        />
      </div>
      <p className={`${nameClass} text-center font-bold`}>{title}</p>
      <p className={`${feedbackClass} mb-4`}>{description}</p>
      <div className='flex items-center justify-center gap-x-4'>{getRatingIcons(memberRating)}</div>
    </div>
  );
}
