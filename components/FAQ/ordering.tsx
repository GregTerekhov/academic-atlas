import { PrimaryButtonLabel, CtaText, SectionTitle, TelegramScenario, AriaId, AriaDescription } from 'types';

import { SectionTemplate, TelegramButton } from 'template';

export default function Ordering() {
  return (
    <SectionTemplate
      title={SectionTitle.FAQOrder}
      hasCtaText
      ctaText={CtaText.FAQOrder}
      ctaStyle='text-center max-md:px-3 md:max-lg:px-[15px]'
    >
      <div className='flex items-center justify-center'>
        <TelegramButton
          command={TelegramScenario.Order}
          label={PrimaryButtonLabel.Ordering}
          ariaId={AriaId.DefaultOrdering}
          ariaDescription={AriaDescription.DefaultOrdering}
        />
      </div>
    </SectionTemplate>
  );
}
