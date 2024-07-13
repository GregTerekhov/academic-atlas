import {
  CtaText,
  PrimaryButtonLabel,
  SectionDescriptions,
  SectionTitle,
  TelegramScenario,
} from 'types';

import { Container } from 'layout';
import { TelegramButton } from 'template';
import { HeroMatrix } from './subcomponents';

export default function Hero() {
  return (
    <section className='pt-20 md:pt-24 lg:pt-[104px]'>
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
            />
          </div>
          <HeroMatrix />
        </div>
      </Container>
    </section>
  );
}
