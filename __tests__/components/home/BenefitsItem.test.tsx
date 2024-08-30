import { render, screen } from '@testing-library/react';

import { IconName, BenefitLabel } from 'types';
import BenefitsItem from 'components/home/subcomponents/benefits-item';

jest.mock('ui', () => ({
  SvgIconUI: jest.fn(({ id }) => (
    <svg
      data-testid='icon'
      id={id}
    />
  )),
}));

describe('BenefitsItem component', () => {
  it('should render correctly with given props', () => {
    const props = {
      iconName: IconName.Benefits1,
      label: BenefitLabel.Uniqueness,
    };

    render(<BenefitsItem {...props} />);

    const iconElement = screen.getByTestId('icon');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveAttribute('id', IconName.Benefits1);

    expect(screen.getByText(BenefitLabel.Uniqueness)).toBeInTheDocument();
  });
});
