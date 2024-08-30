import { render, screen } from '@testing-library/react';

import { type IRequirements, SectionDescriptions, SectionTitle } from 'types';
import { getRequirements } from 'data';
import { Requirements } from 'components';

jest.mock('data', () => ({
  getSectionProps: jest.fn(() => ({
    performersRequirements: {
      title: SectionTitle.PartnershipRequirements,
    },
  })),
  getRequirements: jest.fn(),
}));

jest.mock('template', () => ({
  MappedListTemplate: jest.fn(({ children, items = [] }) => (
    <ul data-testid='performers-requirement-list'>
      {items.map((item: IRequirements) => children(item))}
    </ul>
  )),
  SectionTemplate: jest.fn(({ title, children }) => (
    <section id={title}>
      <h2> {SectionDescriptions[SectionTitle.PartnershipRequirements]}</h2>
      {children}
    </section>
  )),
}));

jest.mock('components/performers/subcomponents', () => ({
  RequirementsItem: jest.fn(({ title, desc }) => (
    <li data-testid='performers-requirements-item'>
      <h3>{title}</h3>
      <p>{desc}</p>
    </li>
  )),
}));

const mockGetRequirements = getRequirements as jest.Mock;

const setup = (data: IRequirements[] | undefined = []) => {
  mockGetRequirements.mockReturnValue(data);

  return render(<Requirements />);
};

describe('Requirements performers component', () => {
  const mockData = [
    {
      id: '1',
      title: 'Якість та терміни',
      description:
        'Ми надаємо високоякісні послуги. Виконавці повинні працювати вчасно та відповідально',
    },
  ];

  const invalidData = [
    { data: [], description: 'should handle empty requirements data gracefully' },
    { data: undefined, description: 'should handle missing requirements data scenario' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render component with correct props and data', () => {
    setup(mockData);

    const requirementHeader = screen.getByRole('heading', {
      level: 2,
      name: SectionDescriptions[SectionTitle.PartnershipRequirements],
    });
    expect(requirementHeader).toBeInTheDocument();

    const requirementList = screen.getByTestId('performers-requirement-list');
    expect(requirementList).toBeInTheDocument();

    const requirementItem = screen.getByTestId('performers-requirements-item');
    expect(requirementItem).toBeInTheDocument();
  });

  it.each(invalidData)('$description', ({ data }) => {
    setup(data);

    const requirementList = screen.getByTestId('performers-requirement-list');
    expect(requirementList).toBeEmptyDOMElement();
  });
});
