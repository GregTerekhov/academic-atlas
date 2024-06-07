// 'use client';

import { ContactPosition, MenuLinks, Paths, IconName, IconSize } from 'types';
import { UrlObject } from 'url';

interface ContactLink {
  href: string;
  iconName: IconName;
  defaultSize: IconSize;
  iconSize: string;
  labelClass: string;
  label: string;
}

interface ILinks {
  label: MenuLinks;
  path: UrlObject | Paths;
}

export const getLinkData = (variant: ContactPosition): ContactLink[] => {
  return [
    {
      href: 'tel:+380632076120',
      iconName: IconName.Call,
      defaultSize: IconSize.L,
      iconSize: 'md:size-6 lg:size-5',
      labelClass: 'md:inline lg:text-big',
      label: '+380 63 20 761 20',
    },
    {
      href: '#', //FIXME: --- add a right link
      iconName: IconName.Telegram,
      defaultSize: variant === ContactPosition.Header ? IconSize.S : IconSize.L,
      iconSize: variant === ContactPosition.Header ? 'lg:size-8' : 'md:size-6 lg:size-5',
      labelClass:
        variant === ContactPosition.Header ? 'text-medium max-lg:inline' : 'md:inline lg:text-big',
      label: '@Academic_Atlas',
    },
    {
      href: 'mailto:AcademicAtlas@ukr.net',
      iconName: IconName.Email,
      defaultSize: variant === ContactPosition.Header ? IconSize.S : IconSize.L,
      iconSize: variant === ContactPosition.Header ? 'lg:size-8' : 'md:size-6 lg:size-5',
      labelClass:
        variant === ContactPosition.Header ? 'text-medium max-lg:inline' : 'md:inline lg:text-big',
      label: 'AcademicAtlas@ukr.net',
    },
  ];
};

export const getFooterLinks = (): ILinks[] => {
  return [
    {
      path: Paths.Overview,
      label: MenuLinks.Overview,
    },
    {
      path: Paths.AboutUs,
      label: MenuLinks.AboutUs,
    },
    {
      path: Paths.Feedback,
      label: MenuLinks.Feedback,
    },
    {
      path: Paths.Services,
      label: MenuLinks.Services,
    },
    {
      path: Paths.Promotions,
      label: MenuLinks.Promotions,
    },
    {
      path: { pathname: Paths.Partnership },
      label: MenuLinks.Partnership,
    },
  ];
};

export const getHeaderLinks = (): ILinks[] => {
  return [
    {
      path: Paths.Main,
      label: MenuLinks.Main,
    },
    {
      path: Paths.Services,
      label: MenuLinks.Services,
    },
    {
      path: Paths.AboutUs,
      label: MenuLinks.AboutUs,
    },
    {
      path: Paths.Promotions,
      label: MenuLinks.Promotions,
    },
    {
      path: Paths.Feedback,
      label: MenuLinks.Feedback,
    },
    {
      path: { pathname: Paths.FAQ },
      label: MenuLinks.FAQ,
    },
    {
      path: { pathname: Paths.Partnership },
      label: MenuLinks.Partnership,
    },
  ];
};
