import { IconName, IconSize } from 'types';

import { SvgIconUI } from 'ui';

import { getWorkflowBackgroundDesktopStyles, getWorkflowBackgroundTabletStyles } from 'styles';

export default function WorkflowBackground() {
  const tabletSvgClass = getWorkflowBackgroundTabletStyles();
  const desktopSvgClass = getWorkflowBackgroundDesktopStyles();
  return (
    <>
      <SvgIconUI
        id={IconName.PartnershipStepMd}
        size={{ width: IconSize.WorkflowMdWidth, height: IconSize.WorkflowMdHeight }}
        className={tabletSvgClass}
      />
      <SvgIconUI
        id={IconName.PartnershipStepLg}
        size={{ width: IconSize.WorkflowLgWidth, height: IconSize.WorkflowLgHeight }}
        className={desktopSvgClass}
      />
    </>
  );
}
