import { PrimaryButtonLabel, CtaText, SectionTitle } from 'types';

import { SectionTemplate, TelegramLinkTemplate } from 'template';
import { PrimaryButtonUI } from 'ui';

export default function Ordering() {
  return (
    <SectionTemplate
      title={SectionTitle.FAQOrder}
      hasCtaText
      ctaText={CtaText.FAQOrder}
      ctaStyle='text-center max-md:px-3 md:max-lg:px-[15px]'
    >
      <TelegramLinkTemplate
        telegramBotData={{ command: 'order' }}
        className={'flex items-center justify-center'}
      >
        <PrimaryButtonUI>{PrimaryButtonLabel.Ordering}</PrimaryButtonUI>
      </TelegramLinkTemplate>
    </SectionTemplate>
  );
}
