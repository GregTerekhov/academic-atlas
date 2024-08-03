import { SectionTitle } from 'types';
import { getOfferArticles, MetadataTexts } from 'helpers';

import { SectionTemplate } from 'template';
import { LegalList } from 'components';
import { Metadata } from 'next';

const { offer } = MetadataTexts;
const { title, description, keywords } = offer;

export const metadata: Metadata = {
  title,
  description,
  keywords,
  // openGraph,  //FIXME: --- uncomment
};

export default function OfferAgreement() {
  const offerArticles = getOfferArticles();

  return (
    <SectionTemplate
      isBigTitle
      title={SectionTitle.Offer}
      titleStyle='text-center mb-4 md:mb-6 lg:mb-8'
    >
      <article className='prose-sm md:prose-base lg:prose-xl prose-p:text-pretty prose-a:text-accentPrimary prose-a:hover:underline prose-ol:text-pretty prose-ol:[counter-reset:section] prose-li:[counter-increment:section] prose-li:marker:[content:counters(section,".")] dark:prose-a:text-accentSecondary'>
        <LegalList list={offerArticles} />
      </article>
    </SectionTemplate>
  );
}
