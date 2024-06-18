import { IconName, SvgSizes } from 'types';

interface ISvgIconProps {
  id: IconName;
  size: SvgSizes;
  className: string;
}

export default function SvgIcon({ id, size, className }: ISvgIconProps) {
  return (
    <svg
      width={size.width}
      height={size.height}
      className={className}
    >
      <use href={`/images/icons.svg#icon-${id}`}></use>
    </svg>
  );
}
