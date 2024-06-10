import { SectionTemplate } from 'template';
import PriceControls from './price-controls';
import { SectionTitle } from 'types/sectionTitle';

interface ICostComponentProps {
  params: Record<string, string> | null;
}

export default function Cost({ params }: ICostComponentProps) {
  return (
    <SectionTemplate title={SectionTitle.FindOutCost}>
      <p>Розрахувати вартість</p>
      <PriceControls params={params} />
    </SectionTemplate>
  );
}
