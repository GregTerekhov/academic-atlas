import { render, screen } from '@testing-library/react';

import { type ISlide } from 'types';
import { CarouselWrapper } from 'template';
import { CarouselFeedback } from 'components';

jest.mock('components', () => ({
  CarouselFeedback: jest.fn(({ slide }) => (
    <div>
      <div>CarouselFeedback</div>
      <p>Slide title: {slide.title}</p>
    </div>
  )),
}));

describe('CarouselWrapper template', () => {
  const mockSlide: ISlide = {
    id: '1',
    title: 'Анна Парфенюк',
    description:
      'Замовляла магістерську роботу по програмній інженерії. Дуже задоволена сервісом. Все зроблено на найвищому рівні',
    imageSrc: 'slide-src',
    imageAlt: 'slide-alt',
    memberRating: 5,
  };

  const mockIsActive = true;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render CarouselFeedback with correct props', () => {
    render(
      <CarouselWrapper
        slide={mockSlide}
        isActive={mockIsActive}
      />,
    );

    expect(CarouselFeedback).toHaveBeenCalledWith(
      expect.objectContaining({
        slide: mockSlide,
        isActive: mockIsActive,
      }),
      {},
    );

    expect(screen.getByText('CarouselFeedback')).toBeInTheDocument();
    expect(screen.getByText(`Slide title: ${mockSlide.title}`)).toBeInTheDocument();
  });
});
