import { SectionTemplate } from 'template';
import { SectionTitle, IconName, IconSize } from 'types';
import { SvgIconUI } from 'ui/index';

const localComponentData = [
  {
    title: 'Якість та терміни',
    desc: 'Ми надаємо високоякісні послуги. Виконавці повинні працювати вчасно та відповідально',
    iconData: {
      id: IconName.Fire,
      size: {
        width: IconSize.HalfM,
        height: IconSize.HalfM,
      },
      class: 'fill-accentPrimary',
    },
  },
  {
    title: 'Фаховість',
    desc: 'Ми шукаємо фахівців з високим рівнем знань та досвідом. Вища освіта або значний досвід роботи – перевага',
    iconData: {
      id: IconName.Fire,
      size: {
        width: IconSize.HalfM,
        height: IconSize.HalfM,
      },
      class: 'fill-accentPrimary',
    },
  },
  {
    title: 'Навички співпраці',
    desc: 'Командна робота та врахування потреб клієнтів – це ключовий аспект успішної співпраці',
    iconData: {
      id: IconName.Fire,
      size: {
        width: IconSize.HalfM,
        height: IconSize.HalfM,
      },
      class: 'fill-accentPrimary',
    },
  },
];

export default function Requirements() {
  return (
    <>
      <SectionTemplate title={SectionTitle.PartnershipRequirements}>
        <ul className='flex flex-col gap-y-6'>
          {localComponentData.map(({ title, desc, iconData }) => (
            <li
              key={title}
              className='flex flex-col items-center gap-x-6 rounded-[20px] border border-accentSecondary p-4 '
            >
              <div className='mb-2 mr-auto flex items-center gap-x-4'>
                <SvgIconUI
                  id={iconData.id}
                  size={{ width: iconData.size.width, height: iconData.size.height }}
                  className={iconData.class}
                />
                <h3 className='text-medium text-accentPrimary'>{title}</h3>
              </div>
              <p className='generalText'>{desc}</p>
            </li>
          ))}
        </ul>
      </SectionTemplate>
    </>
  );
}
