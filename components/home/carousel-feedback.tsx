import { type ISlide } from 'types';
import { slideImageSettings } from 'helpers';

import { RatingIcons } from './subcomponents';
import { ImageUI } from 'ui';

import { getCarouselFeedbackStyles } from 'styles';

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

  const { width, height } = slideImageSettings;

  const { imageAlt, imageSrc, title, description, memberRating } = slide;
  const { slideClass, imageContainerClass, imageClass, nameClass, feedbackClass } =
    getCarouselFeedbackStyles(isActive);

  return (
    <div className={`${slideClass} rounded-[18px]`}>
      <div
        className={`${imageContainerClass} mx-auto mb-4 size-[120px] overflow-hidden rounded-full border-[3px] border-solid dark:border-accentSecondary`}
      >
        <ImageUI
          src={imageSrc}
          alt={imageAlt}
          width={width}
          height={height}
          className={`${imageClass} h-auto w-auto`}
        />
      </div>
      <p className={`${nameClass} text-center font-bold`}>{title}</p>
      <p className={`${feedbackClass} mb-4`}>{description}</p>
      <div className='flex items-center justify-center gap-x-4'>{getRatingIcons(memberRating)}</div>
    </div>
  );
}
