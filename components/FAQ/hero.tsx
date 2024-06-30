import Image from 'next/image';

import { CtaText, SectionTitle } from 'types';
import { imageSettings } from 'helpers';

import { SectionTemplate } from 'template';

export default function Hero() {
  const { faqHero } = imageSettings;

  return (
    <SectionTemplate
      title={SectionTitle.FAQHero}
      isBigTitle
      noAlignment='text-start'
      hasCtaText
      titleStyle='md:w-[356px] lg:w-[621px] lg:mt-[154px]'
      ctaStyle='md:w-[392px] lg:w-[570px] no-margin'
      ctaText={CtaText.FAQHero}
      minHeight='lg:min-h-[792px]'
    >
      <Image
        src={faqHero.src}
        alt={faqHero.alt}
        width={faqHero.width}
        height={faqHero.height}
        className={faqHero.className}
      />
    </SectionTemplate>
  );
}
