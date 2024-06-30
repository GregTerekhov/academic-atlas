'use client';

import { useRef, useState } from 'react';

import { AccordionHeader } from './subcomponents';

interface IAccordionProps {
  children: React.ReactNode;
  title: string;
}

export default function Accordion({ children, title }: Readonly<IAccordionProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleToggle = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (
      e.type === 'click' ||
      (e.type === 'keydown' && (e as React.KeyboardEvent).key === 'Enter')
    ) {
      setIsOpen((prevState) => !prevState);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <li className='border-b border-whiteBase bg-transparent py-4 md:py-6'>
      <AccordionHeader
        title={title}
        isOpen={isOpen}
        onToggle={handleToggle}
        onKeyDown={handleKeyDown}
      />
      {/*
          FIXME: change to appropriated method of transition
        */}
      <div
        ref={contentRef}
        style={{ maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px' }}
        className={`overflow-hidden px-9 transition-[max-height] duration-300 ease-out md:px-14 lg:px-16`}
      >
        <p className='generalText'>{children}</p>
      </div>
    </li>
  );
}
