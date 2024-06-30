import { IconName, IconSize } from 'types';
import { SvgIconUI } from 'ui';

export default function WorkflowBackground() {
  return (
    <>
      <SvgIconUI
        id={IconName.PartnershipStepMd}
        size={{ width: IconSize.WorkflowMdWidth, height: IconSize.WorkflowMdHeight }}
        className='absolute hidden fill-accentPrimary md:left-1/2 md:top-[82px] md:-translate-x-1/2 max-lg:md:block'
      />
      <SvgIconUI
        id={IconName.PartnershipStepLg}
        size={{ width: IconSize.WorkflowLgWidth, height: IconSize.WorkflowLgHeight }}
        className='absolute fill-accentPrimary max-lg:hidden md:left-1/2 md:top-[136px] md:-translate-x-1/2'
      />
    </>
  );
}
