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
        className={`${hasBackground ? 'border-transparent bg-accent-lightGradient text-base font-bold text-whiteBase dark:bg-accent-darkGradient md:text-medium lg:text-lg' : 'border-accentPrimary text-sm text-darkBase dark:border-accentSecondary-darker dark:bg-darkBase dark:text-whiteBase max-md:leading-130 md:text-base lg:text-big'} focus-outline-none h-10 w-full rounded-lg border bg-whiteBase px-2 py-[11px] caret-accentPrimary placeholder-shown:text-darkBase focus:outline-transparent focus:ring-2 focus:ring-accentPrimary dark:caret-accentSecondary placeholder-shown:dark:text-whiteBase dark:focus:ring-accentSecondary md:h-12 md:px-4`}
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
