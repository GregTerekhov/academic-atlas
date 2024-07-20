'use client';

import { PositionInLayout, IContactLink } from 'types';
import { getAdaptedContacts } from 'data';

import { MappedListTemplate } from 'template';
import { ContactItem } from './subcomponents';

interface IContactsProps {
  variant: PositionInLayout;
}

export default function Contacts({ variant }: IContactsProps) {
  const adaptedContacts = getAdaptedContacts(variant);

  const getListStyle = () => {
    return variant === PositionInLayout.Header
      ? 'max-lg:block max-lg:space-y-6 lg:flex lg:flex-row-reverse lg:gap-x-6'
      : 'max-md:flex max-sm:flex-col max-md:items-center max-sm:gap-y-4 sm:max-md:gap-x-4 md:space-y-4 lg:w-[304px]';
  };

  return (
    <>
      <address className='not-italic'>
        {variant === PositionInLayout.Footer && (
          <p className='mb-4 hidden text-darkBase dark:text-whiteBase max-md:block max-md:text-center max-sm:text-xs'>
            Наші контакти
          </p>
        )}
        <MappedListTemplate<IContactLink>
          items={adaptedContacts}
          className={getListStyle()}
        >
          {({ href, defaultSize, iconName, iconSize, label, labelClass }) => (
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
          )}
        </MappedListTemplate>
      </address>
    </>
  );
}
