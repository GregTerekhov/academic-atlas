import { render, screen } from '@testing-library/react';

import { SectionDescriptions, SectionTitle } from 'types';
import { AboutUs } from 'components';

jest.mock('components/home/subcomponents', () => ({
  StatisticList: jest.fn(() => <div data-testid='statistic-list'></div>),
  BenefitsList: jest.fn(() => <div data-testid='benefits-list'></div>),
}));

jest.mock('data', () => ({
  getSectionProps: jest.fn(() => ({
    homeAbout: {
      title: SectionTitle.AboutUs,
      id: 'about-us',
    },
  })),
}));

jest.mock('template', () => ({
  SectionTemplate: jest.fn(({ title, children }) => {
    return (
      <section id={title}>
        <h2>
          {title === SectionTitle.AboutUs ? SectionDescriptions[SectionTitle.AboutUs] : title}
        </h2>
        {children}
      </section>
    );
  }),
}));

jest.mock('helpers', () => ({
  getIdValues: jest.fn(() => ({
    AboutUs: 'about-us',
  })),
}));

describe('AboutUs Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    render(<AboutUs />);
  });

  it('should render correctly with all subcomponents', () => {
    expect(screen.getByTestId('statistic-list')).toBeInTheDocument();
    expect(screen.getByTestId('benefits-list')).toBeInTheDocument();
  });

  it('should pass the correct props to SectionTemplate and render the correct h2', () => {
    const heading = screen.getByRole('heading', {
      level: 2,
      name: SectionDescriptions[SectionTitle.AboutUs],
    });
    expect(heading).toBeInTheDocument();

    const sectionElement = heading.closest('section');
    expect(sectionElement).toHaveAttribute('id', 'about-us');
  });
});
