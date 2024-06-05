import { IconName, IconSize } from 'types';

import { SectionTemplate } from 'template';
import { DropdownUI, SvgIconUI } from 'ui';

export default function AboutUs() {
  return (
    <SectionTemplate>
      <p>Про нас</p>
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
      <DropdownUI
        label='Курсові роботи'
        options={['1', '2', '3']}
      />
      {/* <SvgIconUI />
      <SvgIconUI />
      <SvgIconUI /> */}
    </SectionTemplate>
  );
}
