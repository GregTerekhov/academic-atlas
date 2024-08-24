import { render, screen } from '@testing-library/react';

import { IconName, IconSize } from 'types';
import { PartnershipBenefitsItem } from 'components/performers/subcomponents';

jest.mock('styles', () => ({
  getBenefitItemStyles: jest.fn(() => 'mock-item-class'),
}));

jest.mock('ui', () => ({
  SvgIconUI: jest.fn((props) => (
    <svg
      width={props.size.width}
      height={props.size.height}
      className={props.className}
      role='img'
    >
      <use href={`/images/icons.svg#icon-${props.id}`}></use>
    </svg>
  )),
}));

describe('PartnershipBenefitsItem subComponent', () => {
  const props = {
    title: 'partnership-benefits-header',
    desc: 'partnership-benefits-desc',
    iconId: IconName.BenefitPartnership1,
  };

  beforeEach(() => {
    render(<PartnershipBenefitsItem {...props} />);
  });

  it('should render heading with the correct title', () => {
    const titleElement = screen.getByRole('heading', {
      level: 3,
      name: props.title,
    });
    expect(titleElement).toBeInTheDocument();
  });

  it('should render description text', () => {
    const descriptionElement = screen.getByText(props.desc);
    expect(descriptionElement).toBeInTheDocument();
  });

  it('should render SVG icon with correct attributes', () => {
    const svgIcon = screen.getByRole('img');
    expect(svgIcon).toBeInTheDocument();
    expect(svgIcon).toHaveAttribute('width', IconSize.HalfL.toString());
    expect(svgIcon).toHaveAttribute('height', IconSize.HalfL.toString());
    expect(svgIcon).toHaveClass('mx-auto fill-accentPrimary-darker md:size-14 lg:size-20');
    expect(svgIcon.querySelector('use')?.getAttribute('href')).toContain(props.iconId);
  });

  it('should have correct class on list item', () => {
    const listItem = screen.getByRole('listitem');
    expect(listItem).toHaveClass('mock-item-class');
  });
});
