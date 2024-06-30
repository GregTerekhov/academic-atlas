'use client';

import { IconName, IconSize } from 'types';

import SvgIcon from '../svg-icon';

type AccordionHeaderProps = Readonly<{
  title: string;
  isOpen: boolean;
  onToggle: (e: React.MouseEvent | React.KeyboardEvent) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}>;

export default function AccordionHeader({
  title,
  isOpen,
  onToggle,
  onKeyDown,
}: AccordionHeaderProps) {
  return (
    <div
      role='button'
      onClick={onToggle}
      className='group mb-2 flex w-full cursor-pointer items-center justify-between'
      tabIndex={0}
      onKeyDown={(e) => {
        onToggle(e);
        onKeyDown(e);
      }}
    >
      <SvgIcon
        id={IconName.Question}
        className='mx-auto mr-4 fill-accentPrimary md:mr-5 md:size-10'
        size={{ width: IconSize.HalfL, height: IconSize.HalfL }}
      />
      <h2
        className={`mr-2 flex-1 text-left group-hover:bg-accent-gradient group-hover:bg-clip-text group-hover:text-transparent ${
          isOpen ? 'bg-none text-accentPrimary' : ''
        }`}
      >
        {title}
      </h2>
      <SvgIcon
        id={IconName.Expand}
        className={`mx-auto transition-transform duration-200 group-hover:fill-accentPrimary-darker md:size-8 ${
          isOpen ? 'rotate-180 transform fill-accentPrimary' : 'fill-whiteBase'
        }`}
        size={{ width: IconSize.HalfM, height: IconSize.HalfM }}
      />
    </div>
  );
}