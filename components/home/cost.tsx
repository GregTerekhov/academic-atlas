import { SectionTitle } from 'types';

import { SectionTemplate } from 'template';
import { PriceControlsDesktop, PriceControlsMobile } from './subcomponents';

export default function Cost() {
  return (
    <SectionTemplate title={SectionTitle.FindOutCost}>
      <PriceControlsDesktop />
      <PriceControlsMobile />
    </SectionTemplate>
  );
}
