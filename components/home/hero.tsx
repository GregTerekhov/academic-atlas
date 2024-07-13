import { CtaText, PrimaryButtonLabel, SectionTitle, TelegramScenario } from 'types';

import { SectionTemplate, TelegramButton } from 'template';

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
      <TelegramButton
        command={TelegramScenario.Order}
        label={PrimaryButtonLabel.Ordering}
      />
    </SectionTemplate>
  );
}
