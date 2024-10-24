import {
  type IContactLink,
  type ILinks,
  AriaLabel,
  CompanyContacts,
  IconName,
  IconSize,
  MenuLinks,
  Paths,
  PositionInLayout,
} from '../types';
import { getIdValues } from '../helpers';

import { skeletonStyles } from '../styles';

export const getLinkData = (variant: PositionInLayout): IContactLink[] => {
  return [
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
      defaultSize: variant === PositionInLayout.Header ? IconSize.S : IconSize.L,
      iconSize: variant === PositionInLayout.Header ? 'lg:size-8' : 'md:size-6 lg:size-5',
      labelClass:
        variant === PositionInLayout.Header ? 'text-medium max-lg:inline' : 'md:block lg:text-big',
      label: `@${CompanyContacts.Telegram}`,
      iconAriaLabel: AriaLabel.Telegram,
    },
    {
      href: `mailto:${CompanyContacts.Email}`,
      iconName: IconName.Email,
      defaultSize: variant === PositionInLayout.Header ? IconSize.S : IconSize.L,
      iconSize: variant === PositionInLayout.Header ? 'lg:size-8' : 'md:size-6 lg:size-5',
      labelClass:
        variant === PositionInLayout.Header ? 'text-medium max-lg:inline' : 'md:block lg:text-big',
      label: CompanyContacts.Email,
      iconAriaLabel: AriaLabel.Email,
    },
  ];
};

export const getAdaptedContacts = (variant: PositionInLayout) => {
  const linkData = getLinkData(variant);

  return variant === PositionInLayout.Footer
    ? linkData
    : linkData.filter((link) => link.iconName !== IconName.Call);
};

export const getFooterLinks = (): ILinks[] => {
  const { Services, AboutUs, Feedback, Overview, Promotions } = getIdValues();
  return [
    {
      id: Overview,
      path: Paths.Overview,
      label: MenuLinks.Overview,
    },
    {
      id: AboutUs,
      path: Paths.AboutUs,
      label: MenuLinks.AboutUs,
    },
    {
      id: Feedback,
      path: Paths.Feedback,
      label: MenuLinks.Feedback,
    },
    {
      id: Services,
      path: Paths.Services,
      label: MenuLinks.Services,
    },
    {
      id: Promotions,
      path: Paths.Promotions,
      label: MenuLinks.Promotions,
    },
    {
      path: Paths.FAQ,
      label: MenuLinks.FAQ,
    },
    {
      path: Paths.Partnership,
      label: MenuLinks.Partnership,
    },
  ];
};

export const getAdaptedLinks = (): ILinks[] => {
  const { Main, Services, AboutUs, Feedback } = getIdValues();
  return [
    {
      id: Main,
      path: Paths.Main,
      label: MenuLinks.Main,
    },
    {
      id: Services,
      path: Paths.Services,
      label: MenuLinks.Services,
    },
    {
      id: AboutUs,
      path: Paths.AboutUs,
      label: MenuLinks.AboutUs,
    },
    {
      id: Feedback,
      path: Paths.Feedback,
      label: MenuLinks.Feedback,
    },
    {
      path: Paths.FAQ,
      label: MenuLinks.FAQ,
    },
    {
      path: Paths.Partnership,
      label: MenuLinks.Partnership,
    },
  ];
};

export const getSkeletonLines = () => {
  const { line1, line2, line3, line4, line5 } = skeletonStyles;

  return [
    {
      id: 'line1',
      className: line1,
    },
    {
      id: 'line2',
      className: line2,
    },
    {
      id: 'line3',
      className: line3,
    },
    {
      id: 'line4',
      className: line4,
    },
    {
      id: 'line5',
      className: line5,
    },
  ];
};
