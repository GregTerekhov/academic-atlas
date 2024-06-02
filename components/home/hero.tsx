import { SectionTemplate } from 'template';
import { PrimaryButtonUI } from 'ui';

export default function Hero() {
  return (
    <SectionTemplate
      hasBackground
      isBigTitle
      title
    >
      <button className='text-medium hocus:bg-accentPrimary dark:text-accentPrimary md:text-5xl lg:text-2xl'>
        Герой
      </button>
      <PrimaryButtonUI>Замовити</PrimaryButtonUI>
    </SectionTemplate>
  );
}
