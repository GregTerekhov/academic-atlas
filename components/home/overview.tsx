import { IconName, IconSize, SectionTitle } from 'types';

import { idValues } from 'helpers';
import { SectionTemplate } from 'template';
import { SvgIconUI } from 'ui/index';
import Image from 'next/image';

import serviceOverview from '../../public/backgroundImage/service-overview.webp';

interface IOrderStep {
  id: string;
  step: string;
  iconName: IconName;
}

export default function ServiceOverview() {
  const orderSteps: IOrderStep[] = [
    {
      id: 'communication',
      step: 'Зв’яжіться з нами',
      iconName: IconName.Overview1,
    },
    {
      id: 'application process',
      step: 'Оформіть заявку',
      iconName: IconName.Overview2,
    },
    {
      id: 'prepayment',
      step: 'Після внесення 50% передоплати виконавець приступає до виконання завдання',
      iconName: IconName.Overview3,
    },
    {
      id: 'deal closing',
      step: 'По готовності сплачуєте решту суми і отримуєте готову роботу',
      iconName: IconName.Overview4,
    },
    {
      id: 'feedback',
      step: 'Залишаєте відгук',
      iconName: IconName.Overview5,
    },
  ];
  return (
    <SectionTemplate
      title={SectionTitle.HowItWorks}
      id={idValues.Overview ?? ''}
    >
      <div className='max-lg:bg-service-overview mt-8 flex items-center max-lg:bg-opacity-75 max-lg:bg-no-repeat md:mt-10 md:max-lg:justify-end md:max-lg:bg-contain lg:mt-[72px] lg:justify-center lg:gap-x-16'>
        <div className='hidden lg:block'>
          <Image
            src={serviceOverview}
            alt='A sheet of paper and a magnifying glass'
            width={402}
            height={512}
          />
        </div>
        <ul className='space-y-6 max-md:bg-center max-md:px-2 md:w-[430px] md:space-y-8 md:bg-left lg:w-[631px] lg:space-y-12'>
          {Array.isArray(orderSteps) &&
            orderSteps.map(({ id, step, iconName }) => (
              <li
                key={id}
                className='flex items-center gap-x-2 lg:gap-x-4'
              >
                <div className='flex items-center gap-x-4 md:gap-x-6 lg:gap-x-10'>
                  <div className='relative flex h-[28px] w-[28px] items-center justify-center rounded-full bg-whiteBase/10 lg:h-10 lg:w-10'>
                    <div className='absolute h-4 w-4 rounded-full bg-accentSecondary lg:h-6 lg:w-6'></div>
                  </div>
                  <SvgIconUI
                    id={iconName}
                    size={{ width: IconSize.L, height: IconSize.L }}
                    className='lg:size-16'
                  />
                </div>
                <p className='text-sm max-md:leading-130 md:text-base lg:text-big'>{step}</p>
              </li>
            ))}
        </ul>
      </div>
    </SectionTemplate>
  );
}
