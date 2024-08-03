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

// import { getHeroOverlayStyles, getHeroSectionStyles } from 'styles'; //FIXME: use this functions

export default function Hero() {
  // const sectionClass = getHeroSectionStyles(); // FIXME: use this const
  // const overlayClass = getHeroOverlayStyles(); // FIXME: use this const

  return (
    <section className='text-darkBase dark:text-whiteBase max-md:bg-partnership-hero-light max-md:py-20 dark:max-md:bg-partnership-hero-dark md:pt-16 lg:pt-[104px]'>
      {/* FIXME: replace this styles on const sectionClass */}
      <div className='absolute inset-0 h-full w-full bg-accentPrimary/10 dark:bg-accentPrimary/5 dark:bg-section-overlay-dark md:hidden'></div>
      {/* FIXME: replace this styles on const overlayClass */}
      <Container>
        <div className='md:flex md:items-start md:gap-x-9 lg:items-center'>
          <div>
            <h1 className='mb-4 md:mb-6 lg:mb-8'>
              {SectionDescriptions[SectionTitle.PartnershipHero]}
            </h1>
            <p className='mb-6 text-medium md:mb-8 md:text-xl lg:mb-16 lg:text-2xl'>
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
