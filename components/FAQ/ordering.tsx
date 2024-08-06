import { PrimaryButtonLabel, TelegramScenario, AriaId, AriaDescription } from 'types';
import { getSectionProps } from 'data';

import { SectionTemplate, TelegramButton } from 'template';

export default function Ordering() {
  const sectionProps = getSectionProps();
  const faqOrderingProps = sectionProps.faqOrdering;

  return (
    <SectionTemplate {...faqOrderingProps}>
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
