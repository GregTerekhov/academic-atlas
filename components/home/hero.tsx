import { SectionTemplate } from 'template';
import { SectionTitle } from 'types/sectionTitle';
import { PrimaryButtonUI } from 'ui';

export default function Hero() {
  return (
    <SectionTemplate
      title={SectionTitle.Hero}
      isBigTitle
    >
      <PrimaryButtonUI>Замовити</PrimaryButtonUI>
    </SectionTemplate>
  );
}
