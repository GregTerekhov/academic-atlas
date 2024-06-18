'use client';

import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

const Switch = forwardRef<
  ElementRef<typeof SwitchPrimitives.Root>,
  ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ children, ...props }, ref) => (
  <SwitchPrimitives.Root
    className='inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-[20px] transition-transform duration-300 hover:rotate-90'
    {...props}
    ref={ref}
    aria-label='Switch theme button'
  >
    <SwitchPrimitives.Thumb className='pointer-events-none flex h-8 w-8 items-center justify-center rounded-full ring-0 '>
      {children}
    </SwitchPrimitives.Thumb>
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export default Switch;
