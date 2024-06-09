import { SectionTemplate } from 'template';
import { SectionTitle } from 'types/sectionTitle';
import { PrimaryButtonUI } from 'ui';

export default function Performers() {
  return (
    <SectionTemplate title={SectionTitle.Performers} hasBackground>
      <p>Для виконавців</p>
      <PrimaryButtonUI>Приєднатися</PrimaryButtonUI>
    </SectionTemplate>
  );
}
