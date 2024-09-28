import { render, screen } from '@testing-library/react';

import { getFeedbackSlides } from 'data';
import { CarouselUI } from 'ui';

jest.mock('swiper/react', () => ({
  Swiper: jest.fn(({ children }) => <div data-testid='swiper'>{children}</div>),
  SwiperSlide: jest.fn(({ children }) => (
    <div data-testid='swiper-slide'>
      {typeof children === 'function' ? children({ isActive: true }) : children}
    </div>
  )),
}));

jest.mock('template', () => ({
  CarouselWrapper: jest.fn(({ children, props }) => (
    <div
      data-testid='wrapper'
      {...props}
    >
      {children}
    </div>
  )),
}));

jest.mock('helpers', () => ({
  mapArray: jest.fn((array, fn) => array.map(fn)),
}));

describe('CarouselUI Component', () => {
  const slides = getFeedbackSlides();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render all children components with slides', () => {
    render(<CarouselUI slides={slides} />);

    expect(screen.getByTestId('swiper')).toBeInTheDocument();

    const swiperSlides = screen.getAllByTestId('swiper-slide');
    swiperSlides.forEach((slide) => {
      expect(slide).toBeInTheDocument();
    });
  });
});
