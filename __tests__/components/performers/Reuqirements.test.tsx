import { render, screen } from '@testing-library/react';
import { Requirements } from 'components/index';
import { getRequirements } from 'data/componentsData';
import { SectionTitle } from 'types/layoutTypes';

jest.mock('data', () => ({
  getSectionProps: jest.fn(() => ({
    performersRequirements: {
      title: SectionTitle.PartnershipRequirements,
    },
  })),
}));

jest.mock('template', () => ({
  MappedListTemplate: jest.fn(({ children }) => (
    <ul>{getRequirements().map((item) => children(item))}</ul>
  )),
}));

jest.mock('../../../components/performers/subcomponents/requirements', () => {
  type MockRequirementsItemProps = {
    title: string;
    desc: string;
  };
  const MockRequirementsItem = ({ title, desc }: MockRequirementsItemProps) => (
    <li data-testid='requirement-item'>
      <h3>{title}</h3>
      <p>{desc}</p>
    </li>
  );
  MockRequirementsItem.displayName = 'RequirementsItem';
  return MockRequirementsItem;
});

describe('BenefitsList component', () => {
  it('should render a list of benefits', () => {
    render(<Requirements />);

    const benefitsItems = screen.getAllByTestId('requirement-item');
    expect(benefitsItems).toHaveLength(getRequirements().length);
  });
});
