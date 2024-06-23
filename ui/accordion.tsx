'use client';

import { useRef, useState } from 'react';
import SvgIcon from './svg-icon';
import { IconName, IconSize } from 'types';

export default function Accordion({
  children,
  title,
}: Readonly<{
  children: React.ReactNode;
  title: string;
}>) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleToggle = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (
      e.type === 'click' ||
      (e.type === 'keydown' && (e as React.KeyboardEvent).key === 'Enter')
    ) {
      setIsOpen(!isOpen);
    } else if (e.type === 'keydown' && (e as React.KeyboardEvent).key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <li className='border-b border-whiteBase bg-transparent py-4 md:py-6'>
      <div
        role='button'
        onClick={handleToggle}
        className='group mb-2 flex w-full cursor-pointer items-center justify-between'
        tabIndex={0}
        onKeyDown={handleToggle}
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
      {/*
          FIXME: change to appropriated method of transition
        */}
      <div
        ref={contentRef}
        style={{ maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px' }}
        className={`overflow-hidden px-9 transition-[max-height] duration-500 ease-out md:px-14 lg:px-16`}
      >
        <p className='generalText'>{children}</p>
      </div>
    </li>
  );
}
