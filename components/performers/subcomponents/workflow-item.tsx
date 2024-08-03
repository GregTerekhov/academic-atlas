import { TelegramScenario } from 'types';
import TextWithLink from '../../telegram-text-link';

interface IWorkflowItemProps {
  count: string;
  header: string;
  desc: string;
  gridMarkup: string;
}

export default function WorkflowItem({ count, header, desc, gridMarkup }: IWorkflowItemProps) {
  return (
    <li
      className={`${gridMarkup} lg:span-3 max-md:flex max-md:items-center max-md:gap-x-4 md:w-[456px] md:space-y-4 md:max-lg:even:ml-auto lg:w-[568px]`}
    >
      <div className='w-max rounded-full bg-accentPrimary dark:bg-accentSecondary md:mx-auto'>
        <p className='flex size-10 items-center justify-center text-medium font-bold text-whiteBase md:size-[46px] md:text-big lg:size-12 lg:text-xl'>
          {count}
        </p>
      </div>
      <div className='md:text-center'>
        <h3 className='mb-2 text-medium font-bold max-sm:text-base md:text-big lg:text-xl'>
          {header}
        </h3>
        {header === 'Реєстрація' ? (
          <TextWithLink
            order={TelegramScenario.Join}
            textWithLink={desc}
          />
        ) : (
          <p className='generalText'>{desc}</p>
        )}
      </div>
    </li>
  );
}
