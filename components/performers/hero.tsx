import Container from 'layout/container';
import { CtaText, PrimaryButtonLabel, SectionDescriptions, SectionTitle } from 'types';
import { PrimaryButtonUI } from 'ui';
import HeroMatrix from './subcomponents/hero-matrix';

export default function Hero() {
  return (
    <div className='max-md:py-8'>
      <div className="max-md:bg-partnership-hero relative mx-auto w-full max-w-[4000px] bg-cover bg-center py-16 before:absolute before:left-0 before:top-0 before:h-full before:w-full before:content-[''] max-md:before:bg-accentSecondary/10 lg:py-[104px]">
        <Container>
          <div className='flex gap-x-9 md:items-start lg:items-center'>
            <div>
              <h1>{SectionDescriptions[SectionTitle.PartnershipHero]}</h1>
              <p className='max-md:mb-6 max-md:mt-4 max-md:text-medium md:mb-8 md:mt-6 md:text-xl lg:mb-16 lg:mt-8 lg:text-2xl'>
                {CtaText.PartnershipHero}
              </p>
              <PrimaryButtonUI>{PrimaryButtonLabel.Accession}</PrimaryButtonUI>
            </div>
            <HeroMatrix />
          </div>
        </Container>
      </div>
    </div>
  );
}
