'use client';

import { ReactNode, useCallback, useEffect, useState } from 'react';

import { ThemeVariants } from 'types';
import { getPreference, setPreference } from 'helpers';
import ThemeContext from './ThemeContext';

interface IThemeProviderProps {
  children: ReactNode;
  storageKey: string;
  startTheme?: string | undefined;
}

export default function ThemeProvider({
  children,
  storageKey,
  startTheme = ThemeVariants.LIGHT,
}: IThemeProviderProps) {
  const initialTheme = startTheme ?? getPreference(storageKey);
  const [theme, setTheme] = useState<string>(initialTheme);

  useEffect(() => {
    setPreference(storageKey, theme);
  }, [storageKey, theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) =>
      prevTheme === ThemeVariants.DARK ? ThemeVariants.LIGHT : ThemeVariants.DARK,
    );
  }, []);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
