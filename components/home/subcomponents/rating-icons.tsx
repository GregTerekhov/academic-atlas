import { IconName, IconSize } from 'types';

import { SvgIconUI } from 'ui';

interface RatingIconProps {
  index: number;
  rating: number;
}

export default function RatingIcons({ rating, index }: RatingIconProps) {
  const iconId = index < rating ? IconName.RatingUp : IconName.RatingDown;
  return (
    <SvgIconUI
      key={index}
      id={iconId}
      className='fill-accentSecondary md:size-6'
      size={{ width: IconSize.XXS, height: IconSize.XXS }}
      data-testid={`rating-icon-${index}`}
    />
  );
}
