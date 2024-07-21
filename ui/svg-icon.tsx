import { IconName, SvgSizes } from 'types';

interface ISvgIconProps {
  id: IconName;
  size: SvgSizes;
  className: string;
  ariaLabel?: string;
  ariaHidden?: boolean;
}

export default function SvgIcon({ id, size, className, ariaLabel, ariaHidden = true }: ISvgIconProps) {
  return (
    <svg
      width={size.width}
      height={size.height}
      className={className}
      aria-hidden={ariaHidden}
      aria-label={!ariaHidden ? ariaLabel : ''}
      role='img'
    >
      <use href={`/images/icons.svg#icon-${id}`}></use>
    </svg>
  );
}
