import { render, screen } from '@testing-library/react';
import { PartnershipBenefitsItem } from 'components/performers/subcomponents';
import { IconName } from 'types';

jest.mock('styles', () => ({
  getBenefitItemStyles: jest.fn(),
}));

jest.mock('ui', () => ({
  SvgIconUI: jest.fn((props) => (
    <svg
      width={props.width}
      height={props.height}
      className={props.className}
      aria-hidden={props.ariaHidden}
      aria-label={!props.ariaHidden ? props.ariaLabel : undefined}
      role='img'
    >
      <use href={`/images/icons.svg#icon-${props.id}`}></use>
    </svg>
  )),
}));

describe('PartnershipBenefitsItem subComponent', () => {
  test('should render subComponent correctly', () => {
    const testIPartnershipBenefitsItemProps = {
      title: 'partnership-benefits-header',
      desc: 'partnership-benefits-desc',
      iconId: IconName.BenefitPartnership1,
    };

    const { container } = render(
      <PartnershipBenefitsItem {...testIPartnershipBenefitsItemProps} />,
    );

    const partnershipBenefitsHeader = screen.getByRole('heading', {
      level: 3,
      name: 'partnership-benefits-header',
    });
    expect(partnershipBenefitsHeader).toBeInTheDocument();

    const partnershipBenefitsList = screen.getByText('partnership-benefits-desc');
    expect(partnershipBenefitsList).toBeInTheDocument();

    const partnershipBenefitsSVG = container.querySelector('svg');
    expect(partnershipBenefitsSVG).toBeInTheDocument();

    expect(container.querySelector('use')?.getAttribute('href')).toContain(
      IconName.BenefitPartnership1,
    );
  });
});
