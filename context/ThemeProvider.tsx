'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { type IWithChildren, ThemeVariants } from 'types';
import { getPreference, setPreference } from 'helpers';

interface IThemeProviderProps extends IWithChildren {
  storageKey: string;
  startTheme?: string | undefined;
}

interface IThemeContext {
  theme: string | undefined;
  toggleTheme: () => void;
}

const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({ children, storageKey, startTheme }: IThemeProviderProps) => {
  const initialTheme = startTheme ?? getPreference(storageKey) ?? ThemeVariants.LIGHT;
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
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
