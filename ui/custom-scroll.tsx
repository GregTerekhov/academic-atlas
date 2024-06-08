'use client';

import * as ScrollArea from '@radix-ui/react-scroll-area';

interface ICustomScroll {
  // children: React.ReactNode;
  // className?: string;
}

const TAGS = Array.from({ length: 30 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

function CustomScroll(
  {
    // children, className
  }: ICustomScroll,
) {
  return (
    <ScrollArea.Root
      type='auto'
      className='h-60 w-full overflow-hidden border-2 border-solid '
    >
      <ScrollArea.Viewport className='w-full rounded bg-white'>
        <div className='px-5 py-[15px]'>
          <div>Tags</div>
          {TAGS.map((tag) => (
            <div
              className='mt-2.5 border-t pt-2.5 text-[13px] leading-[18px] text-black'
              key={tag}
            >
              {tag}
            </div>
          ))}
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar
        orientation='vertical'
        className='flex touch-none select-none bg-black p-0.5 transition-colors duration-[160ms] ease-out data-[orientation=vertical]:w-2.5'
      >
        <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-red-700 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']" />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
}

export default CustomScroll;
