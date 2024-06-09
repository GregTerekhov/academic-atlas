import { IconName, IconSize, SectionTitle } from 'types';

import { SectionTemplate } from 'template';
import { SvgIconUI } from 'ui';

export default function AboutUs() {
  return (
    <SectionTemplate title={SectionTitle.AboutUs}>
      <SvgIconUI
        id={IconName.Benefits1}
        className='hidden stroke-accentSecondary-darker stroke-[0.5] lg:block'
        size={{ width: IconSize.XXXL, height: IconSize.XXXL }}
      />
      <SvgIconUI
        id={IconName.Benefits1}
        className='hidden stroke-accentSecondary-darker stroke-[0.5] md:max-lg:block'
        size={{ width: IconSize.XL, height: IconSize.XL }}
      />
      <SvgIconUI
        id={IconName.Benefits1}
        className='hidden stroke-accentSecondary-darker stroke-[0.5] max-md:block'
        size={{ width: IconSize.L, height: IconSize.L }}
      />
      {/* <SvgIconUI />
      <SvgIconUI />
      <SvgIconUI /> */}
    </SectionTemplate>
  );
}
