import { getWorkflowData } from 'helpers/componentsData';
import { SectionTemplate } from 'template';
import { SectionTitle, IconName, IconSize } from 'types';
import { SvgIconUI } from 'ui/index';
import { WorkflowItem } from './subcomponents';

export default function WorkflowSteps() {
  const workflowData = getWorkflowData();

  return (
    <SectionTemplate title={SectionTitle.PartnershipWorkflow}>
      <ul className='md:grid md:grid-cols-5 md:justify-between max-lg:md:gap-y-2 lg:relative lg:mx-auto lg:w-[1144px] lg:auto-rows-max lg:grid-cols-2 lg:grid-rows-3 lg:gap-y-16'>
        {Array.isArray(workflowData) &&
          workflowData.map(({ count, header, desc, gridMarkup }) => (
            <WorkflowItem
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
        className='absolute fill-accentPrimary max-lg:hidden md:left-1/2  md:top-[136px] md:-translate-x-1/2'
      />
    </SectionTemplate>
  );
}
