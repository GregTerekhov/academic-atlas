import { AriaLabel, IconName, SvgSizes } from 'types';

interface ISvgIconProps {
  id: IconName;
  size: SvgSizes;
  className: string;
  ariaLabel?: AriaLabel | undefined;
  ariaHidden?: boolean;
}

export default function SvgIcon({
  id,
  size,
  className,
  ariaLabel,
  ariaHidden = true,
}: ISvgIconProps) {
  return (
    <svg
      width={size.width}
      height={size.height}
      className={className}
      aria-hidden={ariaHidden}
      aria-label={!ariaHidden ? ariaLabel : undefined}
      role='img'
    >
      <use href={`/images/icons.svg#icon-${id}`}></use>
    </svg>
  );
}
