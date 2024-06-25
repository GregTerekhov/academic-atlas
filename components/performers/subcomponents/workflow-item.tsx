import { IWorkflow } from 'types/components';

export default function WorkflowItem({ count, header, desc, gridMarkup }: IWorkflow) {
  return (
    <li
      key={count}
      className={`flex items-center gap-x-4 max-md:mb-6 md:w-[408px] md:flex-col md:gap-y-4 lg:w-[520px] ${gridMarkup}`}
    >
      <div className=' flex h-10 w-10 min-w-10 items-center justify-center rounded-full bg-accentPrimary text-medium font-bold md:h-[46px] md:w-[46px] md:text-big lg:h-12 lg:w-12 lg:text-xl'>
        {count}
      </div>
      <div className='text-center'>
        <h3 className=' mb-2 text-medium font-bold md:text-big lg:text-xl'>{header}</h3>
        <p className='generalText'>{desc}</p>
      </div>
    </li>
  );
}
