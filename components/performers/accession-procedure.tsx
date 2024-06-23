import { PrimaryButtonLabel, SectionTitle } from 'types';
import { SectionTemplate } from 'template';
import { PrimaryButtonUI } from 'ui';
import Image from 'next/image';

import * as accessionImage from '../../public/backgroundImage/partnership-accession.jpg';

const localComponentData = [
  {
    step: '1',
    desc: 'Відправте інформацію про ваш досвід та спеціалізацію нашому менеджеру через офіційний Telegram-бот.',
  },
  {
    step: '2',
    desc: 'Відправте інформацію про ваш досвід та спеціалізацію нашому менеджеру через офіційний Telegram-бот.',
  },
  {
    step: '3',
    desc: 'Відправте інформацію про ваш досвід та спеціалізацію нашому менеджеру через офіційний Telegram-бот.',
  },
];

export default function Accession() {
  return (
    <>
      <SectionTemplate title={SectionTitle.PartnershipAccession}>
        <ul className='flex flex-col items-center justify-center gap-y-6'>
          {localComponentData.map(({ step, desc }) => (
            <li
              key={step}
              className='flex items-center gap-x-6'
            >
              <div className="relative flex w-[45px] items-center justify-center after:absolute  after:right-0 after:top-0 after:h-full after:w-[1px] after:bg-accent-gradient after:content-['']">
                <p className='bg-accent-gradient bg-clip-text text-6xl font-bold text-transparent'>
                  {step}
                </p>
              </div>
              <p className='generalText'>{desc}</p>
            </li>
          ))}
        </ul>
        <div className='my-6 flex items-center justify-center'>
          <Image
            src={accessionImage}
            alt='accession-image'
            height={200}
          />
        </div>
        <PrimaryButtonUI>{PrimaryButtonLabel.Accession}</PrimaryButtonUI>
      </SectionTemplate>
    </>
  );
}
