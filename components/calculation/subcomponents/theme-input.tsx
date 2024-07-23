'use client';

import { useId, useState } from 'react';

import { AriaDescription, AriaId, AriaLabel, ButtonType, IconName, IconSize } from 'types';
import { useCalculation } from 'context';
import { getThemeInputStyles } from 'helpers';

import { AriaDescriptionUI, SvgIconUI } from 'ui';

export default function ThemeInput() {
  const [isBlurred, setIsBlurred] = useState(false);
  const id = useId();

  const { calculationData, handleThemeChange, resetCalculation } = useCalculation();

  const hasBackground = calculationData.theme !== '' && isBlurred;
  const inputClass = getThemeInputStyles(hasBackground);

  return (
    <>
      <label htmlFor={id}>
        <input
          type='text'
          id={id}
          name={id}
          value={calculationData.theme}
          className={inputClass}
          placeholder='Введіть тему (не обов`язково)'
          onFocus={() => setIsBlurred(false)}
          onBlur={() => setIsBlurred(true)}
          onChange={handleThemeChange}
          autoComplete='off'
          aria-describedby={AriaId.ThemeInput}
        />
        <AriaDescriptionUI
          id={AriaId.ThemeInput}
          description={AriaDescription.ThemeInput}
        />
      </label>
      <button
        type={ButtonType.Button}
        onClick={resetCalculation}
        className='group absolute right-2 top-1/2 z-50 h-10 w-10 -translate-y-1/2 md:right-4'
      >
        <SvgIconUI
          id={IconName.Arrow}
          ariaHidden={false}
          ariaLabel={AriaLabel.Reload}
          size={{ width: IconSize.L, height: IconSize.L }}
          className='fill-darkBase group-hover:fill-accentPrimary dark:fill-whiteBase dark:group-hover:fill-accentSecondary'
        />
      </button>
    </>
  );
}
