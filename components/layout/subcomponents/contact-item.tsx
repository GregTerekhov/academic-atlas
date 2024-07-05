import { type IContactLink, PositionInLayout } from 'types';

import { useMenu } from 'context';
import { getAriaLabelContacts } from 'helpers';

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
  const { isNavMenuOpen, toggleNavMenu } = useMenu();

  const handleClick = () => {
    if (isNavMenuOpen) toggleNavMenu();
  };

  const ariaLabel = getAriaLabelContacts(href, label);

  return (
    <li>
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        aria-label={ariaLabel}
        className={`${variant === PositionInLayout.Footer ? 'md:max-lg:py-2' : ''} group flex items-center gap-x-2`}
        onClick={handleClick}
      >
        <SvgIconUI
          id={iconName}
          size={{ width: defaultSize, height: defaultSize }}
          className={`${iconSize} fill-darkBase group-hover:fill-accentSecondary dark:fill-whiteBase`}
        />
        <span
          className={`${labelClass} hidden group-hover:text-accentSecondary dark:text-whiteBase`}
        >
          {label}
        </span>
      </a>
    </li>
  );
}
