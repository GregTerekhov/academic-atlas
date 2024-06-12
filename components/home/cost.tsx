import { SectionTitle } from 'types';

import { SectionTemplate } from 'template';
import PriceControls from './price-controls';

export default function Cost() {
  return (
    <SectionTemplate title={SectionTitle.FindOutCost}>
      <p>Розрахувати вартість</p>
      <PriceControls />
    </SectionTemplate>
  );
}
