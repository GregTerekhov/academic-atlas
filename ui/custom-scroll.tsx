'use client';

import * as ScrollArea from '@radix-ui/react-scroll-area';

interface ICustomScroll {
  children: React.ReactNode;
  className?: string;
}

function CustomScroll({ children, className }: ICustomScroll) {
  return (
    <ScrollArea.Root
      type='auto'
      className={className}
    >
      <ScrollArea.Viewport className='h-full w-full'>{children}</ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        orientation='vertical'
        className='touch-none select-none bg-darkBase/75 p-0.5 transition-colors  duration-[160ms] ease-out data-[orientation=vertical]:h-full data-[orientation=vertical]:w-4'
      >
        <ScrollArea.Thumb className="relative flex-1 before:absolute before:left-1/2 before:top-1/2 before:h-full before:w-3 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-lg  before:bg-disabled-foreground before:content-[''] " />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}

export default CustomScroll;
