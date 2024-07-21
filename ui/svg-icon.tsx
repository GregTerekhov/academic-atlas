import { IconName, SvgSizes } from 'types';

interface ISvgIconProps {
  id: IconName;
  size: SvgSizes;
  className: string;
  ariaHidden?: boolean;
}

export default function SvgIcon({ id, size, className, ariaHidden = true }: ISvgIconProps) {
  return (
    <svg
      width={size.width}
      height={size.height}
      className={className}
      aria-hidden={ariaHidden}
    >
      <use href={`/images/icons.svg#icon-${id}`}></use>
    </svg>
  );
}
