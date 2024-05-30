import { SectionTemplate } from 'template';
import PriceControls from './price-controls';

export default function Cost() {
  return (
    <SectionTemplate hasBackground>
      <p>Розрахувати вартість</p>
      <PriceControls />
    </SectionTemplate>
  );
}
