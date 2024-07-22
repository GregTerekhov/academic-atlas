import { ISlide } from 'types';

import { CarouselFeedback } from 'components';

interface ICarouselWrapperProps {
  slide: ISlide;
  isActive: boolean;
}

export default function CarouselWrapper(props: ICarouselWrapperProps) {
  return <CarouselFeedback {...props} />;
}
