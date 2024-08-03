import type { Metadata } from 'next';

import { SectionTitle } from 'types';
import { getPolicyArticles, MetadataTexts } from 'helpers';

import { SectionTemplate } from 'template';
import { LegalList } from 'components';

// import { getLegalArticleStyles } from 'styles'; //FIXME: use this function

const { legal } = MetadataTexts;
const { title, description, keywords } = legal;

export const metadata: Metadata = {
  title,
  description,
  keywords,
  // openGraph,  //FIXME: --- uncomment
};

export default function Policy() {
  const policyArticles = getPolicyArticles();
  // const articleClass = getLegalArticleStyles(); //FIXME: use this const

  return (
    <SectionTemplate
      isBigTitle
      title={SectionTitle.Policy}
      titleStyle='text-center mb-4 md:mb-6 lg:mb-8'
    >
      <article className="prose-sm md:prose-base lg:prose-xl prose-p:text-pretty prose-a:text-accentPrimary prose-a:hover:underline prose-ol:text-pretty prose-ol:[counter-reset:section] prose-li:[counter-increment:section] prose-li:marker:[content:counters(section,'.')] dark:prose-a:text-accentSecondary">
        {/* FIXME: replace these styles on const articleClass */}
        <p>Останнє оновлення 07.06.2024 року.</p>
        <strong className='font-normal'>
          Прохання уважно прочитати Політику конфіденційності (далі – «Політика конфіденційності»)
          перед використанням нашого веб-сайту.
        </strong>
        <p>
          Ця Політика конфіденційності поширюється на веб-сайт your-website.com (далі – «веб-сайт»).
          Користувачі веб-сайту можуть переглядати сторінки сайту без необхідності надавати будь-які
          персональні дані. Однак, для надання послуг, пов’язаних з купівлею товарів, які
          представлені на нашому веб-сайті, нам потрібні Ваші контактні дані, щоб ми могли
          зв’язатися з Вами, підтвердити замовлення і доставити замовлений товар. Ваші персональні
          дані ми не передаємо третім особам і захищаємо їх конфіденційність.
        </p>
        <LegalList list={policyArticles} />
      </article>
    </SectionTemplate>
  );
}
