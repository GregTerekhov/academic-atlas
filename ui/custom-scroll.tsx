'use client';

import * as ScrollArea from '@radix-ui/react-scroll-area';
// import { getScrollBarAreaStyles, getScrollThumbStyles } from 'styles/ui'; //FIXME: use these functions

import { type IWithChildren } from 'types';

interface ICustomScroll extends IWithChildren {
  className?: string;
}

function CustomScroll({ children, className }: ICustomScroll) {
  // const scrollBarAreaClass = getScrollBarAreaStyles(); //FIXME: use this const
  // const thumbClass = getScrollThumbStyles(); //FIXME: use this const

  return (
    <ScrollArea.Root type='auto'>
      <ScrollArea.Viewport className={className}>{children}</ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        orientation='vertical'
        className='!right-4 !top-4 touch-none select-none bg-darkBase/10 p-0.5 transition-colors data-[orientation=vertical]:h-full data-[orientation=vertical]:!max-h-scroll data-[orientation=vertical]:w-4 dark:bg-darkBase/75'
      >
        {/* FIXME: replace these styles on const scrollBarAreaClass */}
        <ScrollArea.Thumb className="relative before:absolute before:h-full before:w-3 before:rounded-lg before:bg-disabled-foreground before:content-['']" />
        {/* FIXME: replace these styles on const thumbClass */}
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}

export default CustomScroll;
