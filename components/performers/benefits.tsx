import { SectionTemplate } from 'template';
import { SectionTitle, IconName, IconSize } from 'types';
import { SvgIconUI } from 'ui/index';

const localComponentData = [
  {
    title: 'Конкурентна винагорода',
    desc: 'Ми пропонуємо справедливу оплату за виконану роботу',
    iconData: {
      id: IconName.Benefits1,
      size: {
        width: IconSize.L,
        height: IconSize.L,
      },
      class: '',
    },
  },
  {
    title: 'Гнучкий графік',
    desc: 'Обирайте час роботи, який буде для вас найзручнішим',
    iconData: {
      id: IconName.Benefits2,
      size: {
        width: IconSize.L,
        height: IconSize.L,
      },
      class: '',
    },
  },
  {
    title: 'Ваш розвиток',
    desc: 'Розвивайтеся та вдосконалюйте навички з проектами',
    iconData: {
      id: IconName.Benefits3,
      size: { width: IconSize.L, height: IconSize.L },
      class: '',
    },
  },
];

export default function Benefits() {
  return (
    <SectionTemplate title={SectionTitle.PartnershipBenefits}>
      <ul className='flex flex-col gap-y-6'>
        {localComponentData.map(({ title, desc, iconData }) => {
          return (
            <li
              key={title}
              className='flex items-center gap-x-6 rounded-2xl border border-accentSecondary p-4'
            >
              <SvgIconUI
                id={iconData.id}
                size={{ width: iconData.size.width, height: iconData.size.height }}
                className={iconData.class}
              />
              <div>
                <h3 className='mb-2 text-medium'>{title}</h3>
                <p className='generalText'>{desc}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </SectionTemplate>
  );
}
