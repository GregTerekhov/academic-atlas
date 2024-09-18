import { getLinkData } from 'data';
import { PositionInLayout, IconName, IconSize, AriaLabel, CompanyContacts } from 'types';

describe('getLinkData', () => {
  it('returns correct contact link data for Header variant', () => {
    const result = getLinkData(PositionInLayout.Header);

    expect(result).toEqual([
      {
        href: `tel:${CompanyContacts.Phone}`,
        iconName: IconName.Call,
        defaultSize: IconSize.L,
        iconSize: 'md:size-6 lg:size-5',
        labelClass: 'md:block lg:text-big',
        label: CompanyContacts.PhoneToPrint,
        iconAriaLabel: AriaLabel.Phone,
      },
      {
        href: `https://t.me/${CompanyContacts.Telegram}`,
        iconName: IconName.Telegram,
        defaultSize: IconSize.S,
        iconSize: 'lg:size-8',
        labelClass: 'text-medium max-lg:inline',
        label: `@${CompanyContacts.Telegram}`,
        iconAriaLabel: AriaLabel.Telegram,
      },
      {
        href: `mailto:${CompanyContacts.Email}`,
        iconName: IconName.Email,
        defaultSize: IconSize.S,
        iconSize: 'lg:size-8',
        labelClass: 'text-medium max-lg:inline',
        label: CompanyContacts.Email,
        iconAriaLabel: AriaLabel.Email,
      },
    ]);
  });

  it('returns correct contact link data for Footer variant', () => {
    const result = getLinkData(PositionInLayout.Footer);

    expect(result).toEqual([
      {
        href: `tel:${CompanyContacts.Phone}`,
        iconName: IconName.Call,
        defaultSize: IconSize.L,
        iconSize: 'md:size-6 lg:size-5',
        labelClass: 'md:block lg:text-big',
        label: CompanyContacts.PhoneToPrint,
        iconAriaLabel: AriaLabel.Phone,
      },
      {
        href: `https://t.me/${CompanyContacts.Telegram}`,
        iconName: IconName.Telegram,
        defaultSize: IconSize.L,
        iconSize: 'md:size-6 lg:size-5',
        labelClass: 'md:block lg:text-big',
        label: `@${CompanyContacts.Telegram}`,
        iconAriaLabel: AriaLabel.Telegram,
      },
      {
        href: `mailto:${CompanyContacts.Email}`,
        iconName: IconName.Email,
        defaultSize: IconSize.L,
        iconSize: 'md:size-6 lg:size-5',
        labelClass: 'md:block lg:text-big',
        label: CompanyContacts.Email,
        iconAriaLabel: AriaLabel.Email,
      },
    ]);
  });
});
