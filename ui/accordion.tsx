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
    <li className='border-b border-whiteBase bg-transparent py-4 md:py-6'>
      <div
        role='button'
        onClick={() => setIsOpen(!isOpen)}
        className='group mb-2 flex w-full cursor-pointer items-center justify-between'
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsOpen(!isOpen);
          } else if (e.key === 'Escape') {
            setIsOpen(false);
          }
        }}
      >
        <SvgIconUI
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

        <SvgIconUI
          id={IconName.Expand}
          className={`mx-auto transition-transform duration-200 group-hover:fill-accentPrimary-darker md:size-8 ${
            isOpen ? 'rotate-180 transform fill-accentPrimary' : 'fill-whiteBase'
          }`}
          size={{ width: IconSize.HalfM, height: IconSize.HalfM }}
        />
      </div>

      <div
        ref={contentRef}
        className={`transition-max-height overflow-hidden duration-500 ease-out ${isOpen ? 'max-h-max' : 'max-h-0'} px-9 md:px-14 lg:px-16`}
      >
        <p className='generalText'>{children}</p>
      </div>
    </li>
  );
}
