import { AriaLabel, IconName, IconSize } from 'types';
import { SvgIconUI } from 'ui';

export default function LogoIcon() {
  return (
    <SvgIconUI
      id={IconName.Logo}
      size={{ width: IconSize.LogoSmallWidth, height: IconSize.XXL }}
      className='fill-accentPrimary-darker dark:fill-whiteBase max-sm:size-16 sm:max-md:size-20 lg:size-28'
      ariaHidden={false}
      ariaLabel={AriaLabel.Logo}
    />
  );
}
