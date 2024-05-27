import { ButtonType } from 'types';

import { SectionTemplate } from 'template';
import { PrimaryButtonUI } from 'ui';

export default function Hero() {
  return (
    <SectionTemplate hasBackground>
      <p>Герой</p>
      <PrimaryButtonUI type={ButtonType.Button} />
    </SectionTemplate>
  );
}
