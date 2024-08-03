import { getOfferArticles, getSectionProps } from 'helpers';

import { SectionTemplate } from 'template';
import { LegalList } from 'components';

import { getLegalArticleStyles } from 'styles';

export default function OfferAgreement() {
  const offerArticles = getOfferArticles();
  const articleClass = getLegalArticleStyles();
  const sectionProps = getSectionProps();
  const offerProps = sectionProps.offerPage;

  return (
    <SectionTemplate {...offerProps}>
      <article className={articleClass}>
        <LegalList list={offerArticles} />
      </article>
    </SectionTemplate>
  );
}
