import { SectionTemplate } from 'template';
import { SectionTitle } from 'types/sectionTitle';
import { PrimaryButtonUI } from 'ui';

export default function Promotions() {
  return (
    <SectionTemplate title={SectionTitle.Promotions} hasBackground>
      <p>Акційні пропозиції</p>
      <PrimaryButtonUI>Замовити</PrimaryButtonUI>
    </SectionTemplate>
  );
}
