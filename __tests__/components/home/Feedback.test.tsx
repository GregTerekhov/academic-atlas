import { render, screen } from '@testing-library/react';

import { BACKGROUNDS, SectionDescriptions, SectionTitle } from 'types';
import { DEVICES, mapArray } from 'helpers';

import { Feedback } from 'components';

jest.mock('template', () => ({
  SectionTemplate: jest.fn(({ children, title }) => (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  )),
}));

jest.mock('data', () => ({
  getFeedbackSlides: jest.fn(() => [
    {
      id: '1',
      title: 'Test Slide 1',
      imageSrc: 'test1.jpg',
      description: 'Test description 1',
      memberRating: 5,
    },
    {
      id: '2',
      title: 'Test Slide 2',
      imageSrc: 'test2.jpg',
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
    (mapArray as jest.Mock).mockImplementation((array, callback) => array.map(callback));
  });

  it('should render Feedback component correctly', () => {
    const { container } = render(<Feedback />);

    const slides = screen.getAllByRole('img');
    expect(slides).toHaveLength(2);
    expect(slides[0]).toHaveAttribute('src', 'test1.jpg');
    expect(slides[1]).toHaveAttribute('src', 'test2.jpg');

    expect(container).toMatchSnapshot();
  });

  it('should pass the correct props to SectionTemplate and render the correct h2', () => {
    render(<Feedback />);

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(SectionDescriptions[SectionTitle.CustomerReviews]);

    const sectionElement = heading.closest('section');
    expect(sectionElement).toHaveAttribute('id', 'feedback');
  });
});
