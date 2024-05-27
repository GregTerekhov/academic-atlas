import { ButtonType } from 'types';

import { SectionTemplate } from 'template';
import { PrimaryButtonUI } from 'ui';

export default function Cost() {
  return (
    <SectionTemplate hasBackground>
      <p>Розрахувати вартість</p>
      <PrimaryButtonUI type={ButtonType.Submit} />
    </SectionTemplate>
  );
}
