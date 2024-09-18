import { PositionInLayout } from 'types';
import { LogoIcon, LogoLink } from './subcomponents';

interface ISvgIconProps {
  position: PositionInLayout;
}

export default function Logo({ position }: ISvgIconProps) {
  return position === PositionInLayout.Header ? <LogoLink /> : <LogoIcon />;
}
