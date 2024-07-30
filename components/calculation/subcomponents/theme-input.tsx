'use client';

import { useId, useState } from 'react';

import { AriaDescription, AriaId } from 'types';
import { useCalculation } from 'context';
import { getThemeInputStyles } from 'helpers';

import { AriaDescriptionUI } from 'ui';

export default function ThemeInput() {
  const [isBlurred, setIsBlurred] = useState(false);
  const id = useId();

  const { calculationData, handleThemeInputChange } = useCalculation();

  const hasBackground = calculationData.theme !== '' && isBlurred;
  const inputClass = getThemeInputStyles(hasBackground);

  return (
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
        onChange={handleThemeInputChange}
        autoComplete='off'
        aria-describedby={AriaId.ThemeInput}
      />
      <AriaDescriptionUI
        id={AriaId.ThemeInput}
        description={AriaDescription.ThemeInput}
      />
    </label>
  );
}
