import { IconName, IconSize, SectionTitle } from 'types';

import { idValues } from 'helpers';

import { SectionTemplate } from 'template';
import { SvgIconUI } from 'ui';

export default function AboutUs() {
  return (
    <SectionTemplate
      title={SectionTitle.AboutUs}
      id={idValues.AboutUs ?? ''}
    >
      <ul className='mb-8 mt-8 space-y-4 md:mb-12 md:mt-10 md:space-y-8 md:max-lg:flex md:max-lg:flex-col md:max-lg:justify-center lg:mb-20 lg:mt-[72px]'>
        <li className='flex max-md:justify-between md:max-lg:justify-center md:max-lg:gap-x-20 lg:justify-between'>
          <p className='flex flex-col items-center justify-center md:text-base lg:text-big'>
            <strong className='bg-accent-gradient bg-clip-text text-6xl leading-130 tracking-[2px] text-transparent md:text-7xl lg:text-8xl'>
              15+
            </strong>{' '}
            років діяльності
          </p>
          <p className='hidden flex-col items-center justify-center md:text-base lg:flex lg:text-big'>
            <strong className='bg-accent-gradient bg-clip-text text-6xl leading-130 tracking-[2px] text-transparent md:text-7xl lg:text-8xl'>
              25+
            </strong>{' '}
            експертна команда
          </p>
          <p className='flex flex-col items-center justify-center md:text-base lg:text-big'>
            <strong className='bg-accent-gradient bg-clip-text text-6xl leading-130 tracking-[2px] text-transparent md:text-7xl lg:text-8xl'>
              40+
            </strong>{' '}
            видів послуг
          </p>
          <p className='hidden flex-col items-center justify-center lg:flex lg:text-big'>
            <strong className='bg-accent-gradient bg-clip-text text-6xl leading-130 tracking-[2px] text-transparent md:text-7xl lg:text-8xl'>
              50+
            </strong>{' '}
            спеціальностей
          </p>
          <p className='hidden flex-col items-center justify-center md:flex md:text-base lg:text-big'>
            <strong className='bg-accent-gradient bg-clip-text text-6xl leading-130 tracking-[2px] text-transparent md:text-7xl lg:text-8xl'>
              2850+
            </strong>{' '}
            якісно виконаних робіт
          </p>
        </li>
        <li className='hidden text-center max-md:block'>
          <p className='flex flex-col items-center justify-center'>
            <strong className='bg-accent-gradient bg-clip-text text-6xl leading-130 tracking-[2px] text-transparent'>
              2850+
            </strong>{' '}
            якісно виконаних робіт
          </p>
        </li>
        <li className='flex max-md:justify-between md:max-lg:justify-center md:max-lg:gap-x-[134px]'>
          <p className='hidden flex-col items-center justify-center max-lg:flex md:text-base'>
            <strong className='bg-accent-gradient bg-clip-text text-6xl leading-130 tracking-[2px] text-transparent md:text-7xl'>
              25+
            </strong>{' '}
            експертна команда
          </p>
          <p className='hidden flex-col items-center justify-center max-lg:flex md:text-base'>
            <strong className='bg-accent-gradient bg-clip-text text-6xl leading-130 tracking-[2px] text-transparent md:text-7xl'>
              50+
            </strong>{' '}
            спеціальностей
          </p>
        </li>
      </ul>
      <ul className='flex max-md:flex-wrap max-md:justify-center max-md:gap-6 md:justify-between'>
        <li className='w-[135px] space-y-4 text-center md:w-[154px] md:space-y-6 lg:w-[230px] lg:space-y-8'>
          <SvgIconUI
            id={IconName.Benefits1}
            className='mx-auto md:size-14 lg:size-20'
            size={{ width: IconSize.L, height: IconSize.L }}
          />
          <p className='text-medium md:text-big lg:text-2xl'>Високий рівень унікальності</p>
        </li>
        <li className='w-[135px] space-y-4 text-center md:w-[154px] md:space-y-6 lg:w-[230px] lg:space-y-8'>
          <SvgIconUI
            id={IconName.Benefits2}
            className='mx-auto md:size-14 lg:size-20'
            size={{ width: IconSize.L, height: IconSize.L }}
          />
          <p className='text-medium md:text-big lg:text-2xl'>Гарантія якості та результатів</p>
        </li>
        <li className='w-[135px] space-y-4 text-center md:w-[154px] md:space-y-6 lg:w-[230px] lg:space-y-8'>
          <SvgIconUI
            id={IconName.Benefits3}
            className='mx-auto md:size-14 lg:size-20'
            size={{ width: IconSize.L, height: IconSize.L }}
          />
          <p className='text-medium md:text-big lg:text-2xl'>Можливость внесення правок</p>
        </li>
        <li className='w-[135px] space-y-4 text-center md:w-[154px] md:space-y-6 lg:w-[230px] lg:space-y-8'>
          <SvgIconUI
            id={IconName.Benefits4}
            className='mx-auto md:size-14 lg:size-20'
            size={{ width: IconSize.L, height: IconSize.L }}
          />
          <p className='text-medium md:text-big lg:text-2xl'>Підтримка до захисту</p>
        </li>
      </ul>
    </SectionTemplate>
  );
}
