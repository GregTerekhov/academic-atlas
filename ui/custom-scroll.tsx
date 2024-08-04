'use client';

import * as ScrollArea from '@radix-ui/react-scroll-area';

import { type IWithChildren } from 'types';
import { getScrollBarAreaStyles, getScrollThumbStyles } from 'styles';

interface ICustomScroll extends IWithChildren {
  className?: string;
}

function CustomScroll({ children, className }: ICustomScroll) {
  const scrollBarAreaClass = getScrollBarAreaStyles();
  const thumbClass = getScrollThumbStyles();

  return (
    <ScrollArea.Root type='auto'>
      <ScrollArea.Viewport className={className}>{children}</ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        orientation='vertical'
        className={scrollBarAreaClass}
      >
        <ScrollArea.Thumb className={thumbClass} />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}

export default CustomScroll;
