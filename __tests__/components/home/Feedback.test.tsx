import { render, screen } from '@testing-library/react';

import { BACKGROUNDS, SectionDescriptions, SectionTitle } from 'types';
import { DEVICES, mapArray } from 'helpers';

import { Feedback } from 'components';

jest.mock('template', () => ({
  SectionTemplate: jest.fn(({ children }) => (
    <section
      data-testid='section-feedback'
      id='feedback'
    >
      <h2>{SectionDescriptions[SectionTitle.CustomerReviews]}</h2>
      {children}
    </section>
  )),
}));

jest.mock('ui', () => ({
  CarouselUI: jest.fn(({ slides }) => (
    <div data-testid='carousel-ui'>
      {slides.map(({ ...props }) => (
        <div key={props.id}>
          <p>{props.title}</p>
          <p>{props.description}</p>
          <div>{props.memberRating}</div>
        </div>
      ))}
    </div>
  )),
}));

jest.mock('data', () => ({
  getFeedbackSlides: jest.fn(() => [
    {
      id: '1',
      title: 'Test Slide 1',
      imageSrc: '/images/customer-01.jpg',
      imageAlt: 'First image',
      description: 'Test description 1',
      memberRating: 5,
    },
    {
      id: '2',
      title: 'Test Slide 2',
      imageSrc: '/images/customer-02.jpg',
      imageAlt: 'Second image',
      description: 'Test description 2',
      memberRating: 4,
    },
  ]),
  getSectionProps: jest.fn(() => ({
    homeFeedback: { title: SectionTitle.CustomerReviews, id: 'test-feedback-id' },
  })),
}));

jest.mock('helpers', () => ({
  mapArray: jest.fn(),
  getIdValues: jest.fn(() => ({ Feedback: SectionTitle.CustomerReviews })),
  generateBackgroundImagePaths: jest.fn((section: SectionTitle) => {
    const baseName = BACKGROUNDS[section];
    if (!baseName) return null;

    return DEVICES.reduce(
      (paths, device) => {
        paths[device] = `/backgroundImage/${baseName}-${device}.webp`;
        return paths;
      },
      {} as Record<string, string>,
    );
  }),
}));

describe('Feedback Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (mapArray as jest.Mock).mockImplementation((array, callback) => array.map(callback));
  });

  it('should render Feedback component correctly', () => {
    const { container } = render(<Feedback />);

    const slides = screen.getAllByTestId('carousel-ui')[0].children;
    expect(slides).toHaveLength(2);
    expect(slides[0]).toHaveTextContent('Test Slide 1');
    expect(slides[0]).toHaveTextContent('Test description');
    expect(slides[0]).toHaveTextContent('5');

    expect(slides[1]).toHaveTextContent('Test Slide 2');
    expect(slides[1]).toHaveTextContent('Test description');
    expect(slides[1]).toHaveTextContent('4');

    const sectionElement = screen.getByTestId('section-feedback');
    expect(sectionElement).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('should pass the correct props to SectionTemplate and render the correct h2', () => {
    render(<Feedback />);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: SectionDescriptions[SectionTitle.CustomerReviews],
    });
    expect(heading).toBeInTheDocument();

    const sectionElement = heading.closest('section');
    expect(sectionElement).toHaveAttribute('id', 'feedback');
  });
});
