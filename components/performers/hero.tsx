import {
  AriaDescription,
  AriaId,
  CtaText,
  PrimaryButtonLabel,
  SectionDescriptions,
  SectionTitle,
  TelegramScenario,
} from 'types';

import { Container } from 'layout';
import { TelegramButton } from 'template';
import { HeroMatrix } from './subcomponents';

import { getHeroOverlayStyles, getHeroSectionStyles } from 'styles';

export default function Hero() {
  const sectionClass = getHeroSectionStyles();
  const overlayClass = getHeroOverlayStyles();

  return (
    <section className={sectionClass}>
      <div className={overlayClass}></div>
      <Container>
        <div className='md:flex md:items-start md:gap-x-9 lg:items-center'>
          <div>
            <h1 className='mb-4 md:mb-6 lg:mb-8'>
              {SectionDescriptions[SectionTitle.PartnershipHero]}
            </h1>
            <p className='mb-6 text-medium md:mb-8 md:text-xl lg:mb-16 lg:w-[600px] lg:text-2xl'>
              {CtaText.PartnershipHero}
            </p>
            <TelegramButton
              command={TelegramScenario.Join}
              label={PrimaryButtonLabel.Accession}
              isOnLightBackground
              ariaId={AriaId.Accession}
              ariaDescription={AriaDescription.Accession}
            />
          </div>
          <HeroMatrix />
        </div>
      </Container>
    </section>
  );
}
