import { IconName, IconSize } from 'types';

import { SectionTemplate } from 'template';
import { SvgIconUI } from 'ui';

export default function AboutUs() {
  return (
    <SectionTemplate>
      <p>Про нас</p>
      <SvgIconUI
        id={IconName.Overview1}
        className='hidden lg:block'
        size={{ width: IconSize.XXXL, height: IconSize.XXXL }}
      />
      <SvgIconUI
        id={IconName.Benefits1}
        className='hidden md:max-lg:block'
        size={{ width: IconSize.XL, height: IconSize.XL }}
      />
      <SvgIconUI
        id={IconName.Benefits1}
        className='hidden max-md:block'
        size={{ width: IconSize.L, height: IconSize.L }}
      />
      {/* <SvgIconUI />
      <SvgIconUI />
      <SvgIconUI /> */}
    </SectionTemplate>
  );
}
