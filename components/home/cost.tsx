import { SectionTemplate } from 'template';
import { PrimaryButtonUI } from 'ui';

export default function Cost() {
  return (
    <SectionTemplate hasBackground>
      <p>Розрахувати вартість</p>
      <PrimaryButtonUI>Розрахувати вартість</PrimaryButtonUI>
    </SectionTemplate>
  );
}
