'use client';

import { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';

const Switch = forwardRef<
  ElementRef<typeof SwitchPrimitives.Root>,
  ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ children, ...props }, ref) => (
  <SwitchPrimitives.Root
    className='inline-flex h-10 w-20 shrink-0 cursor-pointer items-center  rounded-[20px] border border-solid border-accentSecondary shadow-sm transition-colors'
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb className='pointer-events-none flex h-8 w-8 items-center justify-center rounded-full bg-accentSecondary shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-11 data-[state=unchecked]:translate-x-1'>
      {children}
    </SwitchPrimitives.Thumb>
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export default Switch;
