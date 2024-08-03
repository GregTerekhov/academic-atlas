import { IconName, IconSize } from 'types';

import { SvgIconUI } from 'ui';

export default function WorkflowBackground() {
  return (
    <>
      <SvgIconUI
        id={IconName.PartnershipStepMd}
        size={{ width: IconSize.WorkflowMdWidth, height: IconSize.WorkflowMdHeight }}
        className='absolute left-1/2 top-20 -z-10 hidden -translate-x-1/2 fill-accentPrimary/50 dark:fill-accentSecondary/50 md:max-lg:block'
      />
      <SvgIconUI
        id={IconName.PartnershipStepLg}
        size={{ width: IconSize.WorkflowLgWidth, height: IconSize.WorkflowLgHeight }}
        className='absolute -z-10 fill-accentPrimary/50 dark:fill-accentSecondary/50 max-lg:hidden md:left-1/2 md:top-[136px] md:-translate-x-1/2'
      />
    </>
  );
}
