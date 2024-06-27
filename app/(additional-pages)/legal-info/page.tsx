import { getLegalInfoArticles } from 'helpers/componentsData';
import { SectionTemplate } from 'template/index';
import { SectionTitle } from 'types/layoutTypes';

export default function LegalInfo() {
  const legalInfoArticle = getLegalInfoArticles();

  return (
    <SectionTemplate
      isBigTitle
      title={SectionTitle.LegalInfo}
      titleStyle='text-center'
    >
      {/* TOFIX: по каким-то причинам нельзя подвинуть числовой маркер списка от самого текста. выглядит всё слитно. плохо читается*/}
      <div className="pro prose prose-xl max-w-none prose-p:generalText prose-li:generalText prose-p:m-0 prose-p:text-whiteBase prose-ol:list-inside prose-ol:p-0 prose-ol:[counter-reset:section] prose-li:p-0 prose-li:text-whiteBase prose-li:[counter-increment:section] prose-li:marker:text-whiteBase prose-li:marker:[content:counters(section,'.')]">
        <div className='mt-8 space-y-8'>
          <p>Останнє оновлення 07.06.2024 року.</p>
          <p>
            Прохання уважно прочитати Політику конфіденційності (далі – «Політика конфіденційності»)
            перед використанням нашого веб-сайту.
          </p>
          <p>
            Ця Політика конфіденційності поширюється на веб-сайт your-website.com (далі –
            «веб-сайт»). Користувачі веб-сайту можуть переглядати сторінки сайту без необхідності
            надавати будь-які персональні дані. Однак, для надання послуг, пов’язаних з купівлею
            товарів, які представлені на нашому веб-сайті, нам потрібні Ваші контактні дані, щоб ми
            могли зв’язатися з Вами, підтвердити замовлення і доставити замовлений товар. Ваші
            персональні дані ми не передаємо третім особам і захищаємо їх конфіденційність.
          </p>
        </div>
        <ol className='mt-8 space-y-8'>
          {Array.isArray(legalInfoArticle) &&
            legalInfoArticle.map(({ id, article, paragraph }) => {
              return (
                <li key={id}>
                  {article}
                  <ol>
                    <li>{paragraph.one}</li>
                    {paragraph.two && <li>{paragraph.two}</li>}
                    {paragraph.three && <li>{paragraph.three}</li>}
                    {paragraph.four && <li>{paragraph.four}</li>}
                    {paragraph.five && <li>{paragraph.five}</li>}
                    {paragraph.six && <li>{paragraph.six}</li>}
                  </ol>
                </li>
              );
            })}
        </ol>
      </div>
    </SectionTemplate>
  );
}
