import { getSectionProps } from 'data';

import { SectionTemplate } from 'template';
import { JoinButton } from './subcomponents';

export default function Performers() {
  const sectionProps = getSectionProps();
  const mainPerformersProps = sectionProps.homePerformers;

  return (
    <SectionTemplate {...mainPerformersProps}>
      <JoinButton />
    </SectionTemplate>
  );
}
