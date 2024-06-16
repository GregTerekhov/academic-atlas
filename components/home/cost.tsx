import { SectionTitle } from 'types';

import { SectionTemplate } from 'template';
import { PriceControls } from './subcomponents';

export default function Cost() {
  return (
    <SectionTemplate title={SectionTitle.FindOutCost}>
      <PriceControls />
    </SectionTemplate>
  );
}
