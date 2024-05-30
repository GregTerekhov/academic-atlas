import { SectionTemplate } from 'template';
import { PrimaryButtonUI } from 'ui';

export default function Hero() {
  return (
    <SectionTemplate
      hasBackground
      isBigTitle
    >
      <p className='text-medium text-darkBase dark:text-accentPrimary'>Герой</p>
      <PrimaryButtonUI>Замовити</PrimaryButtonUI>
    </SectionTemplate>
  );
}
