import Link from 'next/link';
import { PositionInLayout, IconName, IconSize, Paths } from 'types';
import { SvgIconUI } from 'ui';

interface ISvgIconProps {
  position: PositionInLayout;
}

export default function Logo({ position }: ISvgIconProps) {
  return (
    <Link href={Paths.Main}>
      <SvgIconUI
        id={IconName.Logo}
        size={{ width: IconSize.LogoSmallWidth, height: IconSize.XXL }}
        className={
          position === PositionInLayout.Header ? `lg:size-20` : `max-md:size-20 lg:size-28`
        } //FIXME: --- colour at the light theme
      />
    </Link>
  );
}
