import { render, screen } from '@testing-library/react';

import {
  type IContactLink,
  AriaLabel,
  CompanyContacts,
  IconName,
  IconSize,
  PositionInLayout,
} from 'types';
import { getAdaptedContacts } from 'data';

import { Contacts } from 'components';

import { getContactListStyles } from 'styles';

jest.mock('data', () => ({
  getAdaptedContacts: jest.fn(),
}));

jest.mock('styles', () => ({
  getContactListStyles: jest.fn(),
}));

jest.mock('template', () => ({
  MappedListTemplate: jest.fn(({ items, children }) => (
    <ul>{items.map((item: IContactLink) => children(item))}</ul>
  )),
}));

jest.mock('components/layout/subcomponents', () => ({
  ContactItem: jest.fn((props) => (
    <li
      {...props}
      data-testid='contact-item'
    ></li>
  )),
}));

describe('Contacts Component', () => {
  const mockGetAdaptedContacts = getAdaptedContacts as jest.Mock;
  const mockGetContactListStyles = getContactListStyles as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render contacts for Footer variant', () => {
    const mockContacts = [
      {
        href: `mailto:${CompanyContacts.Email}`,
        iconName: IconName.Email,
        defaultSize: IconSize.HalfM,
        iconSize: IconSize.M,
        labelClass: 'label-class',
        label: CompanyContacts.Email,
        iconAriaLabel: AriaLabel.Email,
      },
    ];

    mockGetAdaptedContacts.mockReturnValue(mockContacts);
    mockGetContactListStyles.mockReturnValue('contacts-styles');

    render(<Contacts variant={PositionInLayout.Footer} />);

    const heading = screen.getByText(/Наші контакти/i);
    expect(heading).toBeInTheDocument();

    const contactItems = screen.getAllByTestId('contact-item');
    expect(contactItems).toHaveLength(mockContacts.length);
    expect(mockGetAdaptedContacts).toHaveBeenCalledWith(PositionInLayout.Footer);
    expect(mockGetContactListStyles).toHaveBeenCalledWith(PositionInLayout.Footer);
  });

  it('should render contacts for Header variant without heading', () => {
    const mockContacts = [
      {
        href: `https://t.me/${CompanyContacts.Telegram}`,
        iconName: IconName.Telegram,
        defaultSize: IconSize.HalfM,
        iconSize: IconSize.M,
        labelClass: 'label-class',
        label: CompanyContacts.Telegram,
        iconAriaLabel: AriaLabel.Telegram,
      },
    ];

    mockGetAdaptedContacts.mockReturnValue(mockContacts);
    mockGetContactListStyles.mockReturnValue('header-styles');

    render(<Contacts variant={PositionInLayout.Header} />);

    const heading = screen.queryByText(/Наші контакти/i);
    expect(heading).not.toBeInTheDocument();

    const contactItems = screen.getAllByTestId('contact-item');
    expect(contactItems).toHaveLength(mockContacts.length);
    expect(mockGetAdaptedContacts).toHaveBeenCalledWith(PositionInLayout.Header);
    expect(mockGetContactListStyles).toHaveBeenCalledWith(PositionInLayout.Header);
  });
});
