'use client';

import { PositionInLayout, IContactLink } from 'types';
import { getAdaptedContacts } from 'helpers';

import { MappedListTemplate } from 'template';
import { ContactItem } from './subcomponents';

// import { getContactListStyles } from 'styles'; //FIXME: use this function

interface IContactsProps {
  variant: PositionInLayout;
}

export default function Contacts({ variant }: IContactsProps) {
  const adaptedContacts = getAdaptedContacts(variant);

  // const listClass = getContactListStyles(variant); //FIXME: use this const

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
          className={`${
            variant === PositionInLayout.Header
              ? 'block max-lg:space-y-6 lg:flex lg:flex-row-reverse lg:gap-x-5'
              : 'max-md:flex max-md:items-center max-md:gap-x-4 max-sm:gap-x-3 md:space-y-4 lg:w-[304px]'
          }`} //FIXME: replace this styles on const listClass
        >
          {({ href, defaultSize, iconName, iconSize, label, labelClass, iconAriaLabel }) => (
            <ContactItem
              key={iconName}
              href={href}
              iconName={iconName}
              iconSize={iconSize}
              defaultSize={defaultSize}
              labelClass={labelClass}
              label={label}
              variant={variant}
              iconAriaLabel={iconAriaLabel}
            />
          )}
        </MappedListTemplate>
      </address>
    </>
  );
}
