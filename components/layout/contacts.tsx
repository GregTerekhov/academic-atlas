'use client';

import { PositionInLayout, IconName } from 'types';

import { getLinkData } from 'helpers';

import ContactItem from './contact-item';

interface IContactsProps {
  variant: PositionInLayout;
}

export default function Contacts({ variant }: IContactsProps) {
  const linkData = getLinkData(variant);
  const adaptedContacts =
    variant === PositionInLayout.Footer
      ? linkData
      : linkData.filter((link) => link.iconName !== IconName.Call);

  return (
    <>
      <address className='not-italic'>
        {variant === PositionInLayout.Footer && (
          <p className='mb-4 hidden text-darkBase dark:text-whiteBase max-md:block max-md:text-center'>
            Наші контакти
          </p>
        )}
        <ul
          className={
            variant === PositionInLayout.Header
              ? 'max-lg:block max-lg:space-y-6 lg:flex lg:flex-row-reverse lg:gap-x-6'
              : 'max-md:flex max-md:items-center max-md:gap-x-4 md:space-y-4 lg:w-[304px]'
          }
        >
          {Array.isArray(adaptedContacts) &&
            adaptedContacts.map(({ href, defaultSize, iconName, iconSize, label, labelClass }) => (
              <ContactItem
                key={iconName}
                href={href}
                iconName={iconName}
                iconSize={iconSize}
                defaultSize={defaultSize}
                labelClass={labelClass}
                label={label}
                variant={variant}
              />
            ))}
        </ul>
      </address>
    </>
  );
}
