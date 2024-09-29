import type { Metadata } from 'next';

import { getPolicyArticles, getSectionProps, MetadataTexts } from 'data';

import { SectionTemplate } from 'template';
import { LegalList } from 'components';

import { getLegalArticleStyles } from 'styles';

const { legal } = MetadataTexts;
const { title, description, keywords, openGraph } = legal;

export const metadata: Metadata = {
  title,
  description,
  keywords,
  openGraph,
};

export default function Policy() {
  const policyArticles = getPolicyArticles();
  const articleClass = getLegalArticleStyles();
  const sectionProps = getSectionProps();
  const policyProps = sectionProps.policyPage;

  return (
    <SectionTemplate {...policyProps}>
      <article className={articleClass}>
        <p>Останнє оновлення 01.10.2024 року.</p>
        <strong className='font-normal'>
          Прохання уважно прочитати Політику конфіденційності (далі – «Політика») перед
          використанням нашого веб-сайту. Ця Політика поширюється на веб-сайт academic-atlas.com
          (далі – «веб-сайт»).
        </strong>
        <LegalList
          list={policyArticles}
          substitute='email'
        />
      </article>
    </SectionTemplate>
  );
}
