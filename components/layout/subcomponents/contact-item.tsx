import { type IContactLink, PositionInLayout } from 'types';

import { useMenu } from 'context';
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
  const getAriaLabel = (href: string, label: string) => {
    if (href.startsWith('tel:')) {
      return `Call ${label}`;
    } else if (href.startsWith('mailto:')) {
      return `Email ${label}`;
    } else {
      return `Open link to ${label}`;
    }
  };

  return (
    <li>
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        aria-label={getAriaLabel(href, label)}
        className={`${variant === PositionInLayout.Footer ? 'md:max-lg:py-2' : ''} group flex items-center gap-x-2`}
        onClick={handleClick}
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
