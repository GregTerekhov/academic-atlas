import { render, screen } from '@testing-library/react';

import { ISlide } from 'types';

import { CarouselFeedback } from 'components';

import { getCarouselFeedbackStyles } from 'styles';

jest.mock('components/home/subcomponents', () => ({
  RatingIcons: jest.fn(({ index }) => <div data-testid={`rating-icon-${index}`}></div>),
}));

jest.mock('ui', () => ({
  ImageUI: jest.fn(({ props, id, className }) => (
    <div
      data-testid='mock-image'
      className={className}
      {...props}
      id={id}
    />
  )),
}));

const slideMock: ISlide = {
  id: '1',
  imageAlt: 'Test image',
  imageSrc: '/images/customer-01.jpg',
  title: 'Test title',
  description: 'Test description',
  memberRating: 3,
};

const setup = (props = {}) => {
  render(
    <CarouselFeedback
      slide={slideMock}
      isActive={true}
      {...props}
    />,
  );
};

describe('CarouselFeedback Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with all subcomponents', () => {
    setup();

    const imageElement = screen.getByTestId('mock-image');

    expect(imageElement).toBeInTheDocument();
    expect(screen.getByText('Test title')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();

    for (let i = 0; i < 5; i += 1) {
      expect(screen.getByTestId(`rating-icon-${i}`)).toBeInTheDocument();
    }
  });

  it('should apply correct styles when isActive is true', () => {
    setup();

    const container = screen.getByText('Test title').closest('div');
    const expectedStyles = getCarouselFeedbackStyles(true);

    expect(container).toHaveClass(expectedStyles.slideClass);
    expect(screen.getByTestId('mock-image')).toHaveClass(expectedStyles.imageClass);
    expect(screen.getByText('Test title')).toHaveClass(expectedStyles.nameClass);
    expect(screen.getByText('Test description')).toHaveClass(expectedStyles.feedbackClass);
  });

  it('should apply correct styles when isActive is false', () => {
    setup({ isActive: false });

    const container = screen.getByText('Test title').closest('div');
    const expectedStyles = getCarouselFeedbackStyles(false);

    expect(container).toHaveClass(expectedStyles.slideClass);
    expect(screen.getByTestId('mock-image')).toHaveClass(expectedStyles.imageClass);
    expect(screen.getByText('Test title')).toHaveClass(expectedStyles.nameClass);
    expect(screen.getByText('Test description')).toHaveClass(expectedStyles.feedbackClass);
  });
});
