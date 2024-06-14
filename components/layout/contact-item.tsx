import { type IContactLink, PositionInLayout } from 'types';

import { SvgIconUI } from 'ui';

interface IContactItem extends IContactLink {
  variant: PositionInLayout;
}

export default function ContactItem({
  href,
  iconName,
  defaultSize,
  iconSize,
  labelClass,
  label,
  variant,
}: IContactItem) {
  return (
    <li>
      <a
        href={href}
        target='_blank'
        className={`${variant === PositionInLayout.Footer ? 'md:max-lg:py-2' : ''} group flex items-center gap-x-2`}
      >
        <SvgIconUI
          id={iconName}
          size={{ width: defaultSize, height: defaultSize }}
          className={`${iconSize} fill-darkBase group-hover:fill-accentPrimary dark:fill-whiteBase`}
        />
        <span className={`${labelClass} hidden group-hover:text-accentPrimary dark:text-whiteBase`}>
          {label}
        </span>
      </a>
    </li>
  );
}
