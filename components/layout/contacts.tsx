import { PositionInLayout, type IContactLink } from 'types';
import { getAdaptedContacts } from 'data';

import { MappedListTemplate } from 'template';
import { ContactItem } from './subcomponents';

import { getContactListStyles } from 'styles';

interface IContactsProps {
  variant: PositionInLayout;
}

export default function Contacts({ variant }: IContactsProps) {
  const adaptedContacts = getAdaptedContacts(variant);
  const listClass = getContactListStyles(variant);

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
          className={listClass}
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
