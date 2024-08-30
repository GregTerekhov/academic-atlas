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
  ContactItem: jest.fn(() => <li data-testid='contact-item'></li>),
}));

describe('Contacts Component', () => {
  const mockGetAdaptedContacts = getAdaptedContacts as jest.Mock;
  const mockGetContactListStyles = getContactListStyles as jest.Mock;

  const renderContacts = (
    variant: PositionInLayout,
    mockContacts: IContactLink[],
    styles: string,
  ) => {
    mockGetAdaptedContacts.mockReturnValue(mockContacts);
    mockGetContactListStyles.mockReturnValue(styles);

    return render(<Contacts variant={variant} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const adaptiveTestCases = [
    {
      query: '(max-width: 1439px)',
      contacts: [
        {
          href: `tel:${CompanyContacts.Phone}`,
          iconName: IconName.Call,
          defaultSize: IconSize.S,
          iconSize: 'lg:size-8',
          labelClass: 'text-medium max-lg:inline',
          label: CompanyContacts.PhoneToPrint,
          iconAriaLabel: AriaLabel.Phone,
        },
        {
          href: `mailto:${CompanyContacts.Email}`,
          iconName: IconName.Email,
          defaultSize: IconSize.HalfM,
          iconSize: '30',
          labelClass: 'label-class',
          label: CompanyContacts.Email,
          iconAriaLabel: AriaLabel.Email,
        },
        {
          href: `https://t.me/${CompanyContacts.Telegram}`,
          iconName: IconName.Telegram,
          defaultSize: IconSize.HalfM,
          iconSize: '30',
          labelClass: 'label-class',
          label: CompanyContacts.Telegram,
          iconAriaLabel: AriaLabel.Telegram,
        },
      ],
      expectedCount: 3,
    },
    {
      query: '(min-width: 1440px)',
      contacts: [
        {
          href: `mailto:${CompanyContacts.Email}`,
          iconName: IconName.Email,
          defaultSize: IconSize.HalfM,
          iconSize: '30',
          labelClass: 'label-class',
          label: CompanyContacts.Email,
          iconAriaLabel: AriaLabel.Email,
        },
        {
          href: `https://t.me/${CompanyContacts.Telegram}`,
          iconName: IconName.Telegram,
          defaultSize: IconSize.HalfM,
          iconSize: '30',
          labelClass: 'label-class',
          label: CompanyContacts.Telegram,
          iconAriaLabel: AriaLabel.Telegram,
        },
      ],
      expectedCount: 2,
    },
  ];

  const testCases = [
    {
      variant: PositionInLayout.Footer,
      mockContacts: [
        {
          href: `mailto:${CompanyContacts.Email}`,
          iconName: IconName.Email,
          defaultSize: IconSize.HalfM,
          iconSize: '30',
          labelClass: 'label-class',
          label: CompanyContacts.Email,
          iconAriaLabel: AriaLabel.Email,
        },
      ],
      styles: 'contacts-styles',
      hasHeading: true,
    },
    {
      variant: PositionInLayout.Header,
      mockContacts: [
        {
          href: `https://t.me/${CompanyContacts.Telegram}`,
          iconName: IconName.Telegram,
          defaultSize: IconSize.HalfM,
          iconSize: '30',
          labelClass: 'label-class',
          label: CompanyContacts.Telegram,
          iconAriaLabel: AriaLabel.Telegram,
        },
      ],
      styles: 'header-styles',
      hasHeading: false,
    },
  ];

  it.each(adaptiveTestCases)(
    'should render correct number of contact items for screen size query: $query with $expectedCount items',
    ({ query, contacts, expectedCount }) => {
      window.matchMedia = jest.fn().mockImplementation((q) => ({
        matches: q === query,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      }));

      renderContacts(PositionInLayout.Header, contacts, 'header-styles');

      const contactItems = screen.getAllByTestId('contact-item');
      screen.debug();
      expect(contactItems).toHaveLength(expectedCount);
    },
  );

  it.each(testCases)(
    'should render contacts for $variant variant',
    ({ variant, mockContacts, styles, hasHeading }) => {
      renderContacts(variant, mockContacts, styles);

      const heading = screen.queryByText(/Наші контакти/i);

      if (hasHeading) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(heading).toBeInTheDocument();
      } else {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(heading).not.toBeInTheDocument();
      }

      const contactItems = screen.getAllByTestId('contact-item');
      expect(contactItems).toHaveLength(mockContacts.length);
      expect(mockGetAdaptedContacts).toHaveBeenCalledWith(variant);
      expect(mockGetContactListStyles).toHaveBeenCalledWith(variant);
    },
  );
});
