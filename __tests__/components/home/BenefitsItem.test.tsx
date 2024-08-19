import { render, screen } from '@testing-library/react';
import BenefitsItem from 'components/home/subcomponents/benefits-item';
import { IconName, BenefitLabel } from 'types';

jest.mock('ui', () => ({
  SvgIconUI: jest.fn(({ id }) => (
    <svg
      data-testid='icon'
      id={id}
    />
  )),
}));

describe('BenefitsItem component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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
