import { render, screen } from '@testing-library/react';

import { CtaText, SectionDescriptions, SectionTitle } from 'types';

import { Performers } from 'components';

jest.mock('data', () => ({
  getSectionProps: jest.fn(() => ({
    homePerformers: {
      title: SectionTitle.Performers,
      ctaStyle: 'md:text-center',
      noAlignment: 'max-md:text-start',
      ctaText: CtaText.MainPerformers,
      hasCtaText: true,
    },
  })),
}));

jest.mock('components/home/subcomponents/join-button', () =>
  jest.fn(() => <div data-testid='join-button'></div>),
);

jest.mock('template', () => ({
  SectionTemplate: jest.fn(({ children, title, ctaText }) => (
    <div id={title}>
      <h2>{SectionDescriptions[SectionTitle.Performers]}</h2>
      <p>{ctaText}</p>
      {children}
    </div>
  )),
}));

describe('Performers Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component with correct content', () => {
    render(<Performers />);

    const sectionTitle = screen.getByRole('heading', {
      level: 2,
      name: SectionDescriptions[SectionTitle.Performers],
    });
    expect(sectionTitle).toBeInTheDocument();

    const ctaText = screen.getByText(CtaText.MainPerformers);
    expect(ctaText).toBeInTheDocument();

    expect(screen.getByTestId('join-button')).toBeInTheDocument();
  });
});
