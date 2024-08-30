import { render, screen } from '@testing-library/react';

import { IconName, type IPartnershipBenefits, SectionDescriptions, SectionTitle } from 'types';
import { getPartnershipBenefits } from 'data';
import { Benefits } from 'components';

jest.mock('template', () => ({
  MappedListTemplate: jest.fn(({ children, items = [] }) => (
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
  PartnershipBenefitsItem: jest.fn(({ title, desc, iconId }) => (
    <li data-testid={`performers-benefits-item-${iconId}`}>
      <h3>{title}</h3>
      <p>{desc}</p>
    </li>
  )),
}));

jest.mock('data', () => ({
  getSectionProps: jest.fn(() => ({
    performersBenefits: {
      title: SectionTitle.PartnershipBenefits,
    },
  })),
  getPartnershipBenefits: jest.fn(),
}));

const mockGetPartnershipBenefits = getPartnershipBenefits as jest.Mock;

const setup = (data: IPartnershipBenefits[] | undefined = []) => {
  mockGetPartnershipBenefits.mockReturnValue(data);

  return render(<Benefits />);
};

describe('Benefits performers component', () => {
  const mockData = [
    {
      id: '1',
      title: 'benefits-item-title',
      description: 'benefits-item-title',
      iconName: IconName.BenefitPartnership1,
    },
  ];

  const invalidData = [
    {
      data: [],
      description: 'should handle empty benefits data gracefully',
    },
    {
      data: undefined,
      description: 'should handle missing benefits data scenario',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render component correctly with benefits data', () => {
    setup(mockData);

    const benefitsHeader = screen.getByRole('heading', {
      level: 2,
      name: SectionDescriptions[SectionTitle.PartnershipBenefits],
    });
    expect(benefitsHeader).toBeInTheDocument();

    const benefitsList = screen.getByTestId('performers-benefits-list');
    expect(benefitsList).toBeInTheDocument();

    expect(
      screen.getByTestId(`performers-benefits-item-${IconName.BenefitPartnership1}`),
    ).toBeInTheDocument();
  });

  test.each(invalidData)('$description', ({ data }) => {
    setup(data);

    const listElement = screen.getByTestId('performers-benefits-list');
    expect(listElement).toBeEmptyDOMElement();
  });
});
