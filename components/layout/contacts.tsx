'use client';

import { PositionInLayout, IconName, IconSize } from 'types';

import { SvgIconUI } from 'ui';

interface IContactsProps {
  variant: PositionInLayout;
}

interface IContactLink {
  href: string;
  iconName: IconName;
  defaultSize: IconSize;
  iconSize: string;
  labelClass: string;
  label: string;
}

export default function Contacts({ variant }: IContactsProps) {
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
        href: '#', //FIXME: --- add a right link
        iconName: IconName.Telegram,
        defaultSize: variant === PositionInLayout.Header ? IconSize.S : IconSize.L,
        iconSize: variant === PositionInLayout.Header ? 'lg:size-8' : 'md:size-6 lg:size-5',
        labelClass:
          variant === PositionInLayout.Header
            ? 'text-medium max-lg:inline'
            : 'md:inline lg:text-big',
        label: '@Academic_Atlas',
      },
      {
        href: 'mailto:AcademicAtlas@ukr.net',
        iconName: IconName.Email,
        defaultSize: variant === PositionInLayout.Header ? IconSize.S : IconSize.L,
        iconSize: variant === PositionInLayout.Header ? 'lg:size-8' : 'md:size-6 lg:size-5',
        labelClass:
          variant === PositionInLayout.Header
            ? 'text-medium max-lg:inline'
            : 'md:inline lg:text-big',
        label: 'AcademicAtlas@ukr.net',
      },
    ];
  };

  const linkData = getLinkData(variant);
  const adaptedContacts =
    variant === PositionInLayout.Footer
      ? linkData
      : linkData.filter((link) => link.iconName !== IconName.Call);

  return (
    <>
      <address className='not-italic'>
        {variant === PositionInLayout.Footer && (
          <p className='mb-4 hidden max-md:block max-md:text-center'>Наші контакти</p>
        )}
        <ul
          className={
            variant === PositionInLayout.Header
              ? 'max-lg:block max-lg:space-y-6 lg:flex lg:flex-row-reverse lg:gap-x-6'
              : 'max-md:flex max-md:items-center max-md:gap-x-4 md:space-y-4'
          }
        >
          {Array.isArray(adaptedContacts) &&
            adaptedContacts.map(({ href, defaultSize, iconName, iconSize, label, labelClass }) => (
              <li key={iconName}>
                <a
                  href={href}
                  className={`${variant === PositionInLayout.Footer ? 'md:max-lg:py-2' : ''} flex items-center gap-x-2`}
                >
                  <SvgIconUI
                    id={iconName}
                    size={{ width: defaultSize, height: defaultSize }}
                    className={`${iconSize} fill-darkBase dark:fill-whiteBase`}
                  />
                  <span className={`${labelClass} hidden`}>{label}</span>
                </a>
              </li>
            ))}
        </ul>
      </address>
    </>
  );
}
