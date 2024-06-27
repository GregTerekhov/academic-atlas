interface IWorkflowItemProps {
  count: string;
  header: string;
  desc: string;
  gridMarkup: string;
}

export default function WorkflowItem({ count, header, desc, gridMarkup }: IWorkflowItemProps) {
  return (
    <li
      className={`${gridMarkup} lg:span-3 max-md:flex max-md:items-center max-md:gap-x-4 md:w-[408px] md:space-y-4 md:even:ml-auto lg:w-[520px]`}
    >
      <div className='w-max rounded-full bg-accentPrimary md:mx-auto'>
        <p className='flex size-10 items-center justify-center text-medium font-bold md:size-[46px] md:text-big lg:size-12 lg:text-xl'>
          {count}
        </p>
      </div>
      <div className='md:text-center'>
        <h3 className='mb-2 text-medium font-bold md:text-big lg:text-xl'>{header}</h3>
        <p className='generalText'>{desc}</p>
      </div>
    </li>
  );
}
