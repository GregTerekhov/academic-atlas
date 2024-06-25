import { IAccession } from 'types/components';

export default function AccessionItem({ step, desc }: IAccession) {
  return (
    <li
      key={step}
      className='flex items-center gap-x-6 md:gap-x-8 lg:gap-x-16'
    >
      <div className="relative flex min-w-[45px] items-center justify-center after:absolute after:right-0 after:top-0  after:h-full after:w-[1px] after:bg-accent-gradient after:content-[''] md:min-w-[50px] lg:min-w-[68px] ">
        <p className='bg-accent-gradient bg-clip-text text-6xl font-bold text-transparent md:text-7xl lg:text-8xl'>
          {step}
        </p>
      </div>
      <p className='generalText'>{desc}</p>
    </li>
  );
}
