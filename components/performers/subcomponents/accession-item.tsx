import { IAccession } from 'types';

export default function AccessionItem({ id, desc }: IAccession) {
  return (
    <li className='flex items-center gap-x-6 md:gap-x-8 lg:gap-x-16'>
      <div className="relative flex min-w-[45px] items-center justify-center after:absolute after:right-0 after:top-0 after:h-full after:w-px after:bg-accent-gradient after:content-[''] md:min-w-[50px] lg:min-w-[68px]">
        <strong className='gradientText'>{id}</strong>
      </div>
      <p className='generalText'>{desc}</p>
    </li>
  );
}
