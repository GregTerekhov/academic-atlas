'use client';

import * as ScrollArea from '@radix-ui/react-scroll-area';

interface ICustomScroll {
  children: React.ReactNode;
  className?: string;
}

function CustomScroll({ children, className }: ICustomScroll) {
  return (
    <ScrollArea.Root type='auto'>
      <ScrollArea.Viewport className={className}>{children}</ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        orientation='vertical'
        className='touch-none select-none bg-darkBase/75 p-0.5 transition-colors data-[orientation=vertical]:h-full data-[orientation=vertical]:w-4'
      >
        <ScrollArea.Thumb className="relative before:absolute before:h-full before:w-3 before:rounded-lg before:bg-disabled-foreground before:content-[''] " />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}

export default CustomScroll;
