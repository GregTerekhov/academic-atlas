import { SectionTitle, IconName, IconSize } from 'types';

import { getWorkflowData } from 'helpers';

import { SectionTemplate } from 'template';
import { SvgIconUI } from 'ui';
import { WorkflowItem } from './subcomponents';

export default function WorkflowSteps() {
  const workflowData = getWorkflowData();

  return (
    <SectionTemplate title={SectionTitle.PartnershipWorkflow}>
      <ul className='max-md:space-y-6 md:max-lg:space-y-2 lg:relative lg:grid lg:grid-rows-6 lg:gap-x-28 lg:gap-y-[56px] lg:px-16'>
        {Array.isArray(workflowData) &&
          workflowData.map(({ count, header, desc, gridMarkup }) => (
            <WorkflowItem
              key={count}
              count={count}
              header={header}
              desc={desc}
              gridMarkup={gridMarkup}
            />
          ))}
      </ul>
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
    </SectionTemplate>
  );
}
