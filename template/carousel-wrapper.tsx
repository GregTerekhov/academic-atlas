import { CarouselFeedback } from 'components/index';
import { ISlide } from 'types';

interface ICarouselWrapperProps {
  slide: ISlide;
  isActive: boolean;
}

export default function CarouselWrapper(props: ICarouselWrapperProps) {
  return <CarouselFeedback {...props} />;
}
