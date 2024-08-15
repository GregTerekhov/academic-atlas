import { render, screen } from '@testing-library/react';

import { IconName, SectionTitle } from 'types';
import { getPartnershipBenefits } from 'data';

import { Benefits } from 'components/index';

jest.mock('template', () => ({
  MappedListTemplate: jest.fn(({ children }) => (
    <ul>{getPartnershipBenefits().map((item) => children(item))}</ul> //FIXME: getPartnershipBenefits() is not a function
  )),
}));

jest.mock('../../../components/performers/subcomponents/benefits-item', () => {
  type IPartnershipBenefitsItemProps = {
    title: string;
    desc: string;
    iconId: IconName;
  };
  const MockPerformersBenefitsItem = ({ title, desc, iconId }: IPartnershipBenefitsItemProps) => (
    <li data-testid='performers-benefits-item'>
      <svg>
        <use href={`/images/icons.svg#icon-${iconId}`} />
      </svg>
      <div>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </li>
  );
  MockPerformersBenefitsItem.displayName = 'PerformersBenefitsItem';
  return MockPerformersBenefitsItem;
});

jest.mock('data', () => ({
  getSectionProps: jest.fn(() => ({
    homeAbout: {
      title: SectionTitle.PartnershipBenefits,
    },
  })),
}));

describe('Benefits component', () => {
  it('should render a list of benefits', () => {
    render(<Benefits />);

    const benefitsItems = screen.getAllByTestId('performers-benefits-item');
    expect(benefitsItems).toHaveLength(getPartnershipBenefits().length);
  });
});
