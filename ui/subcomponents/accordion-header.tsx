'use client';

import { IconName, IconSize } from 'types';

import SvgIcon from '../svg-icon';

type AccordionHeaderProps = Readonly<{
  title: string;
  isOpen: boolean;
  onToggle: (e: React.MouseEvent | React.KeyboardEvent) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  id: string;
}>;

export default function AccordionHeader({
  title,
  isOpen,
  onToggle,
  onKeyDown,
  id,
}: AccordionHeaderProps) {
  return (
    <div
      id={`accordion-header-${id}`}
      role='button'
      onClick={onToggle}
      className='group mb-2 flex w-full cursor-pointer items-center justify-between'
      tabIndex={0}
      aria-expanded={isOpen}
      aria-controls={`accordion-content-${id}`}
      onKeyDown={(e) => {
        onToggle(e);
        onKeyDown(e);
      }}
    >
      <div className='mr-4 size-9 md:mr-5 md:size-10'>
        <SvgIcon
          id={IconName.Question}
          className='mx-auto fill-accentPrimary dark:fill-accentSecondary md:size-10'
          size={{ width: IconSize.HalfL, height: IconSize.HalfL }}
        />
      </div>
      <h2
        id={`accordion-title-${id}`}
        className={`mr-2 flex-1 text-left group-hover:bg-accent-lightGradient group-hover:bg-clip-text group-hover:text-transparent dark:group-hover:bg-accent-darkGradient max-sm:text-medium ${
          isOpen ? 'bg-none text-accentPrimary dark:text-accentSecondary' : ''
        }`}
      >
        {title}
      </h2>
      <div className='size-6 md:size-8'>
        <SvgIcon
          id={IconName.Expand}
          className={`mx-auto transition-transform duration-200 group-hover:fill-accentPrimary-darker dark:group-hover:fill-accentSecondary-darker md:size-8 ${
            isOpen
              ? 'rotate-180 transform fill-accentPrimary dark:fill-accentSecondary'
              : 'fill-darkBase dark:fill-whiteBase'
          }`}
          size={{ width: IconSize.HalfM, height: IconSize.HalfM }}
          ariaLabel={isOpen ? 'Згорнути зміст' : 'Розгорнути зміст'}
          ariaHidden={false}
        />
      </div>
    </div>
  );
}
