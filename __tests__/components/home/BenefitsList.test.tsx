import { render, screen } from '@testing-library/react';

import { BenefitLabel } from 'types';
import { getBenefits } from 'data';

import { BenefitsList } from 'components/home/subcomponents';

jest.mock('template', () => ({
  MappedListTemplate: jest.fn(({ children }) => (
    <ul>{getBenefits().map((item) => children(item))}</ul>
  )),
}));

jest.mock('components/home/subcomponents/benefits-item', () => {
  type MockBenefitsItemProps = {
    label: BenefitLabel;
  };
  const MockBenefitsItem = ({ label }: MockBenefitsItemProps) => (
    <li data-testid='benefits-item'>{label}</li>
  );
  MockBenefitsItem.displayName = 'BenefitsItem';
  return MockBenefitsItem;
});

describe('BenefitsList component', () => {
  it('should render a list of benefits', () => {
    render(<BenefitsList />);

    const benefitsItems = screen.getAllByTestId('benefits-item');
    expect(benefitsItems).toHaveLength(getBenefits().length);

    expect(screen.getByText(BenefitLabel.Uniqueness)).toBeInTheDocument();
    expect(screen.getByText(BenefitLabel.Guarantee)).toBeInTheDocument();
    expect(screen.getByText(BenefitLabel.Correction)).toBeInTheDocument();
    expect(screen.getByText(BenefitLabel.Support)).toBeInTheDocument();
  });
});
