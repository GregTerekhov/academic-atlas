import { getSectionProps, imageSettings } from 'data';

import { SectionTemplate } from 'template';
import { ImageUI } from 'ui';

export default function Hero() {
  const { faqHero } = imageSettings;
  const { src, alt, width, height, className } = faqHero;
  const sectionProps = getSectionProps();
  const faqHeroProps = sectionProps.faqHero;

  return (
    <SectionTemplate {...faqHeroProps}>
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
