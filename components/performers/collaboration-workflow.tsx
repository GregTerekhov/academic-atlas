import { SectionTemplate } from 'template';
import { SectionTitle } from 'types/layoutTypes';

const localComponentData = [
  {
    count: '1',
    header: 'Реєстрація',
    desc: 'Приєднуйтесь до нашої платформи через Telegram, заповнивши профіль з вашим досвідом та спеціалізацією',
  },
  {
    count: '2',
    header: 'Отримання завдань',
    desc: "Якщо замовлення відповідає вашій експертизі, наш менеджер зв'яжеться з вами для узгодження деталей",
  },
  {
    count: '3',
    header: 'Виконання замовлення',
    desc: 'Після прийняття замовлення, виконуйте його з відповідальністю та уважності до деталей',
  },
  {
    count: '4',
    header: 'Отримання оплати',
    desc: 'Після успішного виконання замовлення, оплата буде здійснена відповідно до обговорених умов',
  },
  {
    count: '5',
    header: 'Комунікація та підтримка',
    desc: 'Забезпечуйте відкриту комунікацію з клієнтами та готовність вносити зміни, за потреби',
  },
];

export default function WorkflowSteps() {
  return (
    <>
      <SectionTemplate title={SectionTitle.PartnershipWorkflow}>
        <ul>
          {localComponentData.map(({ count, header, desc }) => (
            <li
              key={count}
              className='mb-6 flex items-center gap-x-4'
            >
              <div className='flex h-10 w-10 items-center justify-center rounded-full bg-accentPrimary'>
                {count}
              </div>
              <div>
                <h3 className='mb-2 text-medium'>{header}</h3>
                <p className='generalText'>{desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </SectionTemplate>
    </>
  );
}
