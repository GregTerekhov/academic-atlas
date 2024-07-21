import { CtaText, SectionTitle } from 'types';
import { imageSettings } from 'helpers';

import { SectionTemplate } from 'template';
import { ImageUI } from 'ui';

export default function Hero() {
  const { faqHero } = imageSettings;
  const { src, alt, width, height, className } = faqHero;

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
      <ImageUI
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    </SectionTemplate>
  );
}
