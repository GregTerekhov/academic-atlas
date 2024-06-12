import { SectionTitle } from 'types';

import { SectionTemplate } from 'template';
import { PrimaryButtonUI } from 'ui';

export default function Performers() {
  return (
    <SectionTemplate title={SectionTitle.Performers}>
      <p>Для виконавців</p>
      <PrimaryButtonUI>Приєднатися</PrimaryButtonUI>
    </SectionTemplate>
  );
}
