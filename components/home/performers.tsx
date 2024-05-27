import { ButtonType } from 'types';

import { SectionTemplate } from 'template';
import { PrimaryButtonUI } from 'ui';

export default function Performers() {
  return (
    <SectionTemplate hasBackground>
      <p>Для виконавців</p>
      <PrimaryButtonUI type={ButtonType.Button} />
    </SectionTemplate>
  );
}
