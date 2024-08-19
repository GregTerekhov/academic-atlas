import { render, screen } from '@testing-library/react';
import { Requirements } from 'components';
import { getRequirements } from 'data';
import { type IRequirements, SectionDescriptions, SectionTitle } from 'types';

jest.mock('data', () => ({
  getSectionProps: jest.fn(() => ({
    performersRequirements: {
      title: SectionTitle.PartnershipRequirements,
    },
  })),
  getRequirements: jest.fn(),
}));

jest.mock('template', () => ({
  MappedListTemplate: jest.fn(({ children, items }) => (
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
  RequirementsItem: jest.fn(() => <li data-testid='performers-requirements-item'></li>),
}));

describe('Requirements performers component', () => {
  test('should render component with correct props', () => {
    jest.clearAllMocks();

    const mockGetRequirements = getRequirements as jest.Mock;
    mockGetRequirements.mockReturnValue([
      {
        id: '1',
        title: 'Якість та терміни',
        description:
          'Ми надаємо високоякісні послуги. Виконавці повинні працювати вчасно та відповідально',
      },
    ]);

    render(<Requirements />);

    const requirementHeader = screen.getByRole('heading', { level: 2 });
    expect(requirementHeader).toBeInTheDocument();

    const requirementList = screen.getByTestId('performers-requirement-list');
    expect(requirementList).toBeInTheDocument();

    const requirementItem = screen.getByTestId('performers-requirements-item');
    expect(requirementItem).toBeInTheDocument();
  });
});
