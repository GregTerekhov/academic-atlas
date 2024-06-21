'use client';

import { useEffect, useRef, useState } from 'react';
import { SvgIconUI } from '.';
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

  useEffect(() => {
    if (isOpen && contentRef.current) {
      contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
    } else if (contentRef.current) {
      contentRef.current.style.maxHeight = '0px';
    }
  }, [isOpen]);

  return (
    <div className='mb-4 border-b border-whiteBase bg-transparent py-4 md:mb-6 md:py-6 lg:mb-8'>
      <button
        type='button'
        onClick={() => setIsOpen(!isOpen)}
        className='group mb-2 flex w-full items-center justify-between text-left'
      >
        <SvgIconUI
          id={IconName.Question}
          className='mx-auto mr-4 fill-accentPrimary md:mr-5 md:size-10'
          size={{ width: IconSize.HalfL, height: IconSize.HalfL }}
        />
        <h4
          className={
            ' mr-2 flex-1 text-1.5xl font-bold leading-130 text-whiteBase group-hover:text-accentPrimary md:text-3xl lg:text-4xl'
          }
        >
          {title}
        </h4>

        <SvgIconUI
          id={IconName.Expand}
          className={`mx-auto fill-whiteBase transition-transform duration-200 group-hover:fill-accentPrimary md:size-8 ${
            isOpen ? 'rotate-180 transform' : ''
          }`}
          size={{ width: IconSize.HalfM, height: IconSize.HalfM }}
        />
      </button>

      <div
        ref={contentRef}
        className={`accordion-content ${isOpen ? 'open' : ''}`}
      >
        <div className='px-9 md:px-14 lg:px-16'>
          <p
            className={'md:leading-150 text-sm leading-130 text-whiteBase md:text-base lg:text-big'}
          >
            {children}
          </p>
        </div>
      </div>
    </div>
  );
}
