import { SectionTemplate } from 'template';
import PriceControls from './price-controls';

interface ICostComponentProps {
  params: Record<string, string> | null;
}

export default function Cost({ params }: ICostComponentProps) {
  return (
    <SectionTemplate hasBackground>
      <p>Розрахувати вартість</p>
      <PriceControls params={params} />
    </SectionTemplate>
  );
}
