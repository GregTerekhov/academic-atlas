import { AriaDescription, AriaId, PrimaryButtonLabel, TelegramScenario } from 'types';
import { getSectionProps, imageSettings } from 'data';
import { getIdValues } from 'helpers';

import { SectionTemplate, TelegramButton } from 'template';
import { ImageUI } from 'ui';

export default function Promotions() {
  const { promotions } = imageSettings;
  const { Promotions } = getIdValues();
  const sectionProps = getSectionProps(undefined, Promotions);
  const mainPromotionsProps = sectionProps.homePromotions;

  const { src, width, height, className } = promotions;

  return (
    <SectionTemplate {...mainPromotionsProps}>
      <ImageUI
        src={src}
        alt=''
        width={width}
        height={height}
        className={className}
      />
      <TelegramButton
        command={TelegramScenario.Order}
        label={PrimaryButtonLabel.Ordering}
        ariaId={AriaId.DefaultPromotionsOrdering}
        ariaDescription={AriaDescription.DefaultPromotionsOrdering}
      />
    </SectionTemplate>
  );
}
