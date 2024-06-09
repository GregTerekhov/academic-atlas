import { SectionTemplate } from 'template';
import PriceControls from './price-controls';

export default function Cost({ params }: any) {
  return (
    <SectionTemplate hasBackground>
      <p>Розрахувати вартість</p>
      <PriceControls params={params} />
    </SectionTemplate>
  );
}
