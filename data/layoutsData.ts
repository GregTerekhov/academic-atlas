import {
  type IContactLink,
  type ILinks,
  IconName,
  IconSize,
  MenuLinks,
  Paths,
  PositionInLayout,
} from '../types';
import { getIdValues } from '../helpers';

const getLinkData = (variant: PositionInLayout): IContactLink[] => {
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
      href: 'https://t.me/AcademicAtlasBot',
      iconName: IconName.Telegram,
      defaultSize: variant === PositionInLayout.Header ? IconSize.S : IconSize.L,
      iconSize: variant === PositionInLayout.Header ? 'lg:size-8' : 'md:size-6 lg:size-5',
      labelClass:
        variant === PositionInLayout.Header ? 'text-medium max-lg:inline' : 'md:inline lg:text-big',
      label: '@AcademicAtlas_Official',
    },
    {
      href: 'mailto:AcademicAtlas@ukr.net',
      iconName: IconName.Email,
      defaultSize: variant === PositionInLayout.Header ? IconSize.S : IconSize.L,
      iconSize: variant === PositionInLayout.Header ? 'lg:size-8' : 'md:size-6 lg:size-5',
      labelClass:
        variant === PositionInLayout.Header ? 'text-medium max-lg:inline' : 'md:inline lg:text-big',
      label: 'AcademicAtlas@ukr.net',
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
      path: Paths.FAQ,
      label: MenuLinks.FAQ,
    },
    {
      path: Paths.Partnership,
      label: MenuLinks.Partnership,
    },
  ];
};

const getHeaderLinks = (): ILinks[] => {
  const { Services, AboutUs, Promotions, Feedback } = getIdValues();
  return [
    {
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
      id: Promotions,
      path: Paths.Promotions,
      label: MenuLinks.Promotions,
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

const headerLinks = getHeaderLinks();

export const getAdaptedLinks = (isDesktop: boolean | undefined): ILinks[] => {
  return isDesktop
    ? headerLinks.filter((link) => link.label !== MenuLinks.Promotions)
    : headerLinks;
};
