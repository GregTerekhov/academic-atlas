import { type IAccession } from 'types';
import { getFigureWrapperStyles } from 'styles';

export default function AccessionItem({ id, desc }: IAccession) {
  const figureWrapperClass = getFigureWrapperStyles();

  return (
    <li className='flex items-center gap-x-6 lg:gap-x-16'>
      <div className={figureWrapperClass}>
        <strong className='gradientText bg-accent-lightGradient font-philosopher dark:bg-accent-darkGradient'>
          {id}
        </strong>
      </div>
      <p className='generalText'>{desc}</p>
    </li>
  );
}
