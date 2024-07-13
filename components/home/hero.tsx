import { CtaText, PrimaryButtonLabel, SectionTitle } from 'types';

import { SectionTemplate, TelegramLinkTemplate } from 'template';
import { PrimaryButtonUI } from 'ui';

export default function Hero() {
  return (
    <SectionTemplate
      title={SectionTitle.Hero}
      isBigTitle
      titleStyle='md:w-[440px] lg:w-[550px]'
      hasCtaText
      ctaStyle='md:w-[440px] lg:w-[458px]'
      ctaText={CtaText.MainHero}
      priority
    >
      <TelegramLinkTemplate telegramBotData={{ command: 'order' }}>
        <PrimaryButtonUI>{PrimaryButtonLabel.Ordering}</PrimaryButtonUI>
      </TelegramLinkTemplate>
    </SectionTemplate>
  );
}
