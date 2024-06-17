import { IconName, IconSize } from 'types';
import { SvgIconUI } from 'ui';

interface RatingIconProps {
  index: number;
  rating: number; //FIXME: --- take into account the problem of server and client rendering mismatch
}

export default function RatingIcons({ rating, index }: RatingIconProps) {
  const iconId = index < rating ? IconName.RatingUp : IconName.RatingDown; //FIXME: --- take into account the problem of server and client rendering mismatch
  return (
    <SvgIconUI
      key={index}
      id={iconId}
      // id={IconName.RatingUp}
      className='fill-accentPrimary md:size-6'
      size={{ width: IconSize.XXS, height: IconSize.XXS }}
    />
  );
}
