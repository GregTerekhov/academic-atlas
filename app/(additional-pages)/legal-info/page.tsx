import type { Metadata } from 'next';
import { getLegalInfoArticles, mapArray } from 'helpers';
import { SectionTemplate } from 'template';
import { MetadataTexts, SectionTitle } from 'types';

export const metadata: Metadata = {
  title: MetadataTexts.legal.title,
  description: MetadataTexts.legal.description,
  keywords: MetadataTexts.legal.keywords,
  // openGraph: MetadataTexts.legal.openGraph,  //FIXME: --- uncomment
};

export default function LegalInfo() {
  const legalInfoArticle = getLegalInfoArticles();

  return (
    <SectionTemplate
      isBigTitle
      title={SectionTitle.LegalInfo}
      titleStyle='text-center mb-4 md:mb-6 lg:mb-8'
    >
      <article className="prose-sm md:prose-base lg:prose-xl prose-p:text-pretty prose-a:text-accentPrimary prose-a:hover:underline prose-ol:text-pretty prose-ol:[counter-reset:section] prose-li:[counter-increment:section] prose-li:marker:[content:counters(section,'.')] dark:prose-a:text-accentSecondary">
        <p>Останнє оновлення 07.06.2024 року.</p>
        <p>
          Прохання уважно прочитати Політику конфіденційності (далі – «Політика конфіденційності»)
          перед використанням нашого веб-сайту.
        </p>
        <p>
          Ця Політика конфіденційності поширюється на веб-сайт your-website.com (далі – «веб-сайт»).
          Користувачі веб-сайту можуть переглядати сторінки сайту без необхідності надавати будь-які
          персональні дані. Однак, для надання послуг, пов’язаних з купівлею товарів, які
          представлені на нашому веб-сайті, нам потрібні Ваші контактні дані, щоб ми могли
          зв’язатися з Вами, підтвердити замовлення і доставити замовлений товар. Ваші персональні
          дані ми не передаємо третім особам і захищаємо їх конфіденційність.
        </p>
        <ol>
          {mapArray(legalInfoArticle, ({ id, article, paragraph }) => (
            <li key={id}>
              {article}
              <ol>
                {mapArray(Object.entries(paragraph), ([key, value]) => (
                  <li key={key}>
                    {value.includes('AcademicAtlas@ukr.net') ? (
                      <>
                        {value.split('AcademicAtlas@ukr.net')[0]}
                        <a href='mailto:AcademicAtlas@ukr.net'>AcademicAtlas@ukr.net</a>
                        {value.split('AcademicAtlas@ukr.net')[1]}
                      </>
                    ) : (
                      value
                    )}
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      </article>
    </SectionTemplate>
  );
}
