'use client';

import { useState } from 'react';

import { useCalculation } from 'context';

export default function ThemeInput() {
  const [isBlurred, setIsBlurred] = useState(false);

  const { calculationData, handleThemeChange } = useCalculation();

  const hasBackground = calculationData.theme !== '' && isBlurred;

  return (
    <label htmlFor='theme'>
      <input
        type='text'
        id='theme'
        value={calculationData.theme}
        className={`${hasBackground ? 'border-transparent bg-accent-gradient text-base font-bold text-whiteBase md:text-medium lg:text-lg' : 'border-accentSecondary-darker text-sm text-darkBase dark:bg-darkBase dark:text-whiteBase max-md:leading-130 md:text-base lg:text-big'} w-full rounded-lg border bg-whiteBase px-2 py-[11px] caret-accentSecondary placeholder-shown:text-darkBase  placeholder-shown:dark:text-whiteBase md:h-12 md:px-4`}
        placeholder='Введіть тему (не обов`язково)'
        onFocus={() => setIsBlurred(false)}
        onBlur={() => setIsBlurred(true)}
        onChange={handleThemeChange}
        autoComplete='off'
      />
      <span className='sr-only'>Enter your work theme</span>
    </label>
  );
}
