import { SectionTemplate } from 'template';
import { SectionTitle } from 'types/sectionTitle';
import { PrimaryButtonUI } from 'ui';

export default function Hero() {
  return (
    <SectionTemplate
      title={SectionTitle.Hero}
      hasBackground
      isBigTitle
    >
      <button className='text-medium hocus:bg-accentPrimary dark:text-accentPrimary md:text-5xl lg:text-2xl'>
        Герой
      </button>
      <PrimaryButtonUI>Замовити</PrimaryButtonUI>
    </SectionTemplate>
  );
}
