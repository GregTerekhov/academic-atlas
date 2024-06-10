import { SectionTemplate } from 'template';
import PriceControls from './price-controls';
import { SectionTitle } from 'types/sectionTitle';

export default function Cost() {
  return (
    <SectionTemplate title={SectionTitle.FindOutCost}>
      <p>Розрахувати вартість</p>
      <PriceControls />
    </SectionTemplate>
  );
}
