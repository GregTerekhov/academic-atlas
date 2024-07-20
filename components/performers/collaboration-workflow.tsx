import { IWorkflow, SectionTitle } from 'types';

import { getWorkflowData } from 'helpers';

import { MappedListTemplate, SectionTemplate } from 'template';
import { WorkflowBackground, WorkflowItem } from './subcomponents';

export default function WorkflowSteps() {
  const workflowData = getWorkflowData();

  return (
    <SectionTemplate title={SectionTitle.PartnershipWorkflow}>
      <MappedListTemplate<IWorkflow>
        items={workflowData}
        className='max-md:space-y-6 md:max-lg:space-y-2 lg:grid lg:grid-rows-6 lg:gap-x-24 lg:gap-y-14 lg:px-8'
      >
        {({ id, title, description, gridMarkup }) => (
          <WorkflowItem
            key={id}
            count={id}
            header={title}
            desc={description}
            gridMarkup={gridMarkup}
          />
        )}
      </MappedListTemplate>
      <WorkflowBackground />
    </SectionTemplate>
  );
}
