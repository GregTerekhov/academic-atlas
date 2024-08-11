import { render, screen } from '@testing-library/react';
import BenefitsItem from 'components/home/subcomponents/benefits-item';
import { IconName, BenefitLabel } from 'types';

jest.mock('ui', () => ({
  SvgIconUI: jest.fn(() => <svg data-testid='icon' />),
}));

describe('BenefitsItem component', () => {
  it('should render correctly with given props', () => {
    const props = {
      iconName: IconName.Benefits1,
      label: BenefitLabel.Uniqueness,
    };

    render(<BenefitsItem {...props} />);

    expect(screen.getByTestId('icon')).toBeInTheDocument();

    expect(screen.getByText(BenefitLabel.Uniqueness)).toBeInTheDocument();
  });
});
