import { render, screen } from '@testing-library/react';

import { BACKGROUNDS, SectionDescriptions, SectionTitle } from 'types';
import { DEVICES } from 'helpers';
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

jest.mock('helpers', () => ({
  getIdValues: jest.fn(() => ({
    AboutUs: 'about-us',
  })),
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
    expect(heading).toHaveTextContent(SectionDescriptions[SectionTitle.AboutUs]);

    const sectionElement = heading.closest('section');
    expect(sectionElement).toHaveAttribute('id', 'about-us');
  });
});
