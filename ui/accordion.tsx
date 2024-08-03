'use client';

import { useRef, useState } from 'react';

import { type IWithChildren } from 'types';
import { AccordionHeader } from './subcomponents';

interface IAccordionProps extends IWithChildren {
  title: string;
  id: string;
}

export default function Accordion({ children, title, id }: Readonly<IAccordionProps>) {
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
    <li className='border-b border-darkBase bg-transparent py-4 dark:border-whiteBase md:py-6'>
      <AccordionHeader
        title={title}
        isOpen={isOpen}
        onToggle={handleToggle}
        onKeyDown={handleKeyDown}
        id={id}
      />
      <div
        ref={contentRef}
        style={{ maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px' }}
        className='overflow-hidden px-9 transition-[max-height] duration-300 ease-out md:px-14 lg:px-16'
        id={`accordion-content-${id}`}
        aria-labelledby={`accordion-header-${id}`}
        role='region'
        aria-hidden={!isOpen}
      >
        <p className='generalText'>{children}</p>
      </div>
    </li>
  );
}
