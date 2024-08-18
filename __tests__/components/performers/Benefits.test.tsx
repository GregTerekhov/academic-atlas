import { render, screen } from '@testing-library/react';

import { IconName, type IPartnershipBenefits, SectionDescriptions, SectionTitle } from 'types';
import { getPartnershipBenefits } from 'data';

import { Benefits } from 'components';

jest.mock('template', () => ({
  MappedListTemplate: jest.fn(({ children, items }) => (
    <ul data-testid='performers-benefits-list'>
      {items.map((item: IPartnershipBenefits) => children(item))}
    </ul>
  )),
  SectionTemplate: jest.fn(({ title, children }) => (
    <section id={title}>
      <h2> {SectionDescriptions[SectionTitle.PartnershipBenefits]}</h2>
      {children}
    </section>
  )),
}));

jest.mock('components/performers/subcomponents', () => ({
  PartnershipBenefitsItem: jest.fn(() => <li data-testid='performers-benefits-item'></li>),
}));

jest.mock('data', () => ({
  getSectionProps: jest.fn(() => ({
    performersBenefits: {
      title: SectionTitle.PartnershipBenefits,
    },
  })),
  getPartnershipBenefits: jest.fn(),
}));

describe('Benefits performers component', () => {
  test('should render component correctly', () => {
    jest.clearAllMocks();

    const mockGetPartnershipBenefits = getPartnershipBenefits as jest.Mock;
    mockGetPartnershipBenefits.mockReturnValue([
      {
        id: '1',
        title: 'benefits-item-title',
        description: 'benefits-item-title',
        iconName: IconName.BenefitPartnership1,
      },
    ]);

    render(<Benefits />);

    const benefitsHeader = screen.getByRole('heading', {
      level: 2,
      name: SectionDescriptions[SectionTitle.PartnershipBenefits],
    });
    expect(benefitsHeader).toBeInTheDocument();

    const benefitsList = screen.getByTestId('performers-benefits-list');
    expect(benefitsList).toBeInTheDocument();

    const benefitsItem = screen.getByTestId('performers-benefits-item');
    expect(benefitsItem).toBeInTheDocument;
  });
});
