import { render, screen } from '@testing-library/react';
import Image from 'next/image';

import { ISlide } from 'types';

import { CarouselFeedback } from 'components';

import { getCarouselFeedbackStyles } from 'styles';

jest.mock('components/home/subcomponents', () => ({
  RatingIcons: jest.fn(({ index }) => <div data-testid={`rating-icon-${index}`}></div>),
}));

jest.mock('ui', () => ({
  ImageUI: jest.fn((props) => (
    <Image
      {...props}
      alt={props.alt || 'default alt text'}
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

describe('CarouselFeedback Component', () => {
  it('should render correctly with all subcomponents', () => {
    render(
      <CarouselFeedback
        slide={slideMock}
        isActive={true}
      />,
    );
    expect(screen.getByAltText('Test image')).toBeInTheDocument();
    expect(screen.getByText('Test title')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();

    for (let i = 0; i < 5; i += 1) {
      expect(screen.getByTestId(`rating-icon-${i}`)).toBeInTheDocument();
    }
  });

  it('should apply correct styles when isActive is true', () => {
    render(
      <CarouselFeedback
        slide={slideMock}
        isActive={true}
      />,
    );
    const container = screen.getByText('Test title').closest('div');
    const expectedStyles = getCarouselFeedbackStyles(true);

    expect(container).toHaveClass(expectedStyles.slideClass);
    expect(container?.querySelector('div > img')).toHaveClass(expectedStyles.imageClass);
    expect(screen.getByText('Test title')).toHaveClass(expectedStyles.nameClass);
    expect(screen.getByText('Test description')).toHaveClass(expectedStyles.feedbackClass);
  });

  it('should apply correct styles when isActive is false', () => {
    render(
      <CarouselFeedback
        slide={slideMock}
        isActive={false}
      />,
    );
    const container = screen.getByText('Test title').closest('div');
    const expectedStyles = getCarouselFeedbackStyles(false);

    expect(container).toHaveClass(expectedStyles.slideClass);
    expect(container?.querySelector('div > img')).toHaveClass(expectedStyles.imageClass);
    expect(screen.getByText('Test title')).toHaveClass(expectedStyles.nameClass);
    expect(screen.getByText('Test description')).toHaveClass(expectedStyles.feedbackClass);
  });
});
