import Image from 'next/image';
import { SectionTemplate } from 'template';
import { CtaText, SectionTitle } from 'types';

export default function Hero() {
  return (
    <SectionTemplate
      title={SectionTitle.FAQHero}
      isBigTitle
      noAlignment='text-start'
      hasCtaText
      titleStyle='md:w-[356px] lg:w-[621px] lg:mt-[154px]'
      ctaStyle='md:w-[392px] lg:w-[570px] no-margin'
      ctaText={CtaText.FAQHero}
      minHeight='lg:min-h-[792px]'
    >
      <Image
        src='/backgroundImage/faq-hero.webp'
        alt='Girl with a book and question marks symbolizing frequently asked questions and answers'
        width={192}
        height={208}
        className='max-md:mx-auto md:absolute md:right-10 md:top-1/2 md:h-[260px] md:w-[240px] md:-translate-y-1/2 lg:h-[584px] lg:w-[537px]'
      />
    </SectionTemplate>
  );
}
