import Image from 'next/image';

import { IconName, SectionTitle } from 'types';

import { idValues } from 'helpers';

import { SectionTemplate } from 'template';
import OverviewItem from './overview-item';

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
              <OverviewItem
                key={id}
                step={step}
                iconName={iconName}
              />
            ))}
        </ul>
      </div>
    </SectionTemplate>
  );
}
