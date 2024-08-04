import { IWorkflow } from 'types';
import { getSectionProps, getWorkflowData } from 'helpers';

import { MappedListTemplate, SectionTemplate } from 'template';
import { WorkflowBackground, WorkflowItem } from './subcomponents';

export default function WorkflowSteps() {
  const workflowData = getWorkflowData();
  const sectionProps = getSectionProps();
  const performersWorkflowProps = sectionProps.performersWorkflow;

  return (
    <SectionTemplate {...performersWorkflowProps}>
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
