import { ContactPosition } from 'types';

import { getLinkData } from 'helpers';

import { SvgIconUI } from 'ui';

interface IContactsProps {
  variant: ContactPosition;
}

export default function Contacts({ variant }: IContactsProps) {
  const linkData = getLinkData(variant);

  return (
    <>
      <address className='not-italic'>
        {variant === ContactPosition.Footer && (
          <p className='mb-4 hidden max-md:block max-md:text-center'>Наші контакти</p>
        )}
        <ul
          className={
            variant === ContactPosition.Header
              ? 'max-lg:block max-lg:space-y-6 lg:flex lg:flex-row-reverse lg:gap-x-6'
              : 'max-md:flex max-md:items-center max-md:gap-x-4 md:space-y-4'
          }
        >
          {Array.isArray(linkData) &&
            linkData.map(({ href, defaultSize, iconName, iconSize, label, labelClass }) => (
              <li key={iconName}>
                <a
                  href={href}
                  className={`${variant === ContactPosition.Footer ? 'md:max-lg:py-2' : ''} flex items-center gap-x-2`}
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
