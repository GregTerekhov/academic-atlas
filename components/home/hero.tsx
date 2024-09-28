import { AriaDescription, AriaId, PrimaryButtonLabel, TelegramScenario } from 'types';
import { getSectionProps } from 'data';
import { getIdValues } from 'helpers';

import { SectionTemplate, TelegramButton } from 'template';

export default function Hero() {
  const { Main } = getIdValues();
  const sectionProps = getSectionProps(undefined, Main);
  const mainHomeProps = sectionProps.homeHero;

  return (
    <SectionTemplate {...mainHomeProps}>
      <TelegramButton
        command={TelegramScenario.Order}
        label={PrimaryButtonLabel.Ordering}
        ariaId={AriaId.DefaultOrdering}
        ariaDescription={AriaDescription.DefaultOrdering}
      />
    </SectionTemplate>
  );
}
