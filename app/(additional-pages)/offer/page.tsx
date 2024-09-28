import { Metadata } from 'next';

import { getOfferArticles, getSectionProps, MetadataTexts } from 'data';

import { SectionTemplate } from 'template';
import { LegalList } from 'components';

import { getLegalArticleStyles } from 'styles';

const { offer } = MetadataTexts;
const { title, description, keywords, openGraph } = offer;

export const metadata: Metadata = {
  title,
  description,
  keywords,
  openGraph,
};

export default function OfferAgreement() {
  const offerArticles = getOfferArticles();
  const articleClass = getLegalArticleStyles();
  const sectionProps = getSectionProps();
  const offerProps = sectionProps.offerPage;

  return (
    <SectionTemplate {...offerProps}>
      <article className={articleClass}>
        <LegalList
          list={offerArticles}
          substitute='policyPageLink'
        />
      </article>
    </SectionTemplate>
  );
}
